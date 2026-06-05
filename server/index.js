'use strict';

/**
 * Evergreen contact backend.
 *
 * Zero-dependency Node HTTP server that receives contact / factory-visit
 * submissions from the website and pushes them to a LINE group as a Flex
 * Message. It runs behind nginx (which proxies /api/ to this service), so it
 * never needs to terminate TLS or serve static files itself.
 *
 * Hardening vs. the old serverless function:
 *   - per-IP rate limiting
 *   - honeypot field to absorb dumb bots
 *   - request body size cap + field length caps
 *   - basic email / phone format validation
 *   - dates parsed in local (factory) time, not UTC
 */

const http = require('http');

const PORT = Number(process.env.PORT) || 8080;
const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const GROUP_ID = process.env.LINE_GROUP_ID;

// ---- limits -----------------------------------------------------------------
const MAX_BODY_BYTES = 16 * 1024; // 16 KB is plenty for a contact form
const FIELD_LIMITS = {
    fullName: 120,
    companyName: 160,
    phoneNumber: 40,
    emailAddress: 160,
    subjectText: 120,
    message: 2000,
    visitors: 6,
};

// ---- rate limiter (in-memory, per IP) ---------------------------------------
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5; // max submissions per window per IP
const hits = new Map(); // ip -> number[] (timestamps)

function isRateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > RATE_MAX;
}

// Occasionally drop stale IP buckets so the map can't grow unbounded.
setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of hits) {
        const recent = times.filter((t) => now - t < RATE_WINDOW_MS);
        if (recent.length === 0) hits.delete(ip);
        else hits.set(ip, recent);
    }
}, RATE_WINDOW_MS).unref();

// ---- LINE colours -----------------------------------------------------------
const LINE_GREEN = '#06C755';
const LINE_GREEN_DARK = '#04A648';
const TEXT_DARK = '#1F2937';
const TEXT_MUTED = '#6B7280';
const DIVIDER = '#E5E7EB';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,40}$/;

function getClientIp(req) {
    const fwd = req.headers['x-forwarded-for'];
    if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
    return req.socket.remoteAddress || 'unknown';
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];
        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                reject(new Error('payload too large'));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });
        req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        req.on('error', reject);
    });
}

function sendJson(res, status, payload) {
    const body = JSON.stringify(payload);
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
}

const clip = (value, max) => String(value == null ? '' : value).trim().slice(0, max);

const infoRow = (label, value) => ({
    type: 'box',
    layout: 'baseline',
    spacing: 'sm',
    contents: [
        { type: 'text', text: label, color: TEXT_MUTED, size: 'sm', flex: 2 },
        { type: 'text', text: value, wrap: true, color: TEXT_DARK, size: 'sm', flex: 5, weight: 'bold' },
    ],
});

/** Parse a YYYY-MM-DD string as a local date (avoids UTC off-by-one in UTC+7). */
function parseLocalDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function buildFlexMessage(data) {
    const { fullName, companyName, phoneNumber, emailAddress, subjectText, message, visit } = data;
    const isVisit = !!(visit && visit.date && visit.time);

    const headerColor = LINE_GREEN;
    const headerTitle = isVisit ? 'นัดเข้าชมโรงงาน' : 'ติดต่อใหม่จากเว็บไซต์';

    const bodyContents = [
        { type: 'text', text: subjectText, weight: 'bold', size: 'md', color: headerColor },
        { type: 'separator', margin: 'md', color: DIVIDER },
        {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            spacing: 'sm',
            contents: [
                infoRow('ชื่อ', fullName),
                ...(companyName ? [infoRow('บริษัท', companyName)] : []),
                infoRow('เบอร์โทร', phoneNumber),
                ...(emailAddress ? [infoRow('อีเมล', emailAddress)] : []),
            ],
        },
    ];

    if (isVisit) {
        const d = parseLocalDate(visit.date);
        const dateText = d
            ? d.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            : visit.date;

        bodyContents.push(
            { type: 'separator', margin: 'lg', color: DIVIDER },
            {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                    { type: 'text', text: 'รายละเอียดนัดหมาย', weight: 'bold', size: 'sm', color: LINE_GREEN_DARK },
                    infoRow('วันที่', dateText),
                    infoRow('เวลา', `${visit.time} น.`),
                    ...(visit.visitors ? [infoRow('ผู้เข้าชม', `${visit.visitors} ท่าน`)] : []),
                ],
            }
        );
    }

    if (message) {
        bodyContents.push(
            { type: 'separator', margin: 'lg', color: DIVIDER },
            {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                    { type: 'text', text: 'ข้อความ', weight: 'bold', size: 'sm', color: TEXT_MUTED },
                    { type: 'text', text: message, wrap: true, size: 'sm', color: TEXT_DARK },
                ],
            }
        );
    }

    const footerButtons = [
        {
            type: 'button',
            style: 'primary',
            color: headerColor,
            height: 'sm',
            action: { type: 'uri', label: 'โทรกลับ', uri: `tel:${phoneNumber.replace(/[^0-9+]/g, '')}` },
        },
    ];

    if (emailAddress) {
        footerButtons.push({
            type: 'button',
            style: 'secondary',
            height: 'sm',
            action: { type: 'uri', label: 'ส่งอีเมล', uri: `mailto:${emailAddress}` },
        });
    }

    return {
        type: 'flex',
        altText: `${headerTitle} - ${fullName}${companyName ? ` (${companyName})` : ''}`,
        contents: {
            type: 'bubble',
            size: 'mega',
            header: {
                type: 'box',
                layout: 'vertical',
                paddingAll: '16px',
                backgroundColor: headerColor,
                contents: [
                    {
                        type: 'text',
                        text: isVisit ? '📅 ' + headerTitle : '✉️ ' + headerTitle,
                        weight: 'bold',
                        color: '#FFFFFF',
                        size: 'lg',
                    },
                    {
                        type: 'text',
                        text: new Date().toLocaleString('th-TH', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                        color: '#FFFFFFCC',
                        size: 'xs',
                        margin: 'xs',
                    },
                ],
            },
            body: { type: 'box', layout: 'vertical', spacing: 'md', paddingAll: '16px', contents: bodyContents },
            footer: { type: 'box', layout: 'vertical', spacing: 'sm', paddingAll: '12px', contents: footerButtons },
            styles: { footer: { separator: true, separatorColor: DIVIDER } },
        },
    };
}

async function handleContact(req, res) {
    if (!TOKEN || !GROUP_ID) {
        console.error('LINE credentials not configured');
        sendJson(res, 500, { error: 'LINE credentials not configured' });
        return;
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
        sendJson(res, 429, { error: 'Too many requests. Please try again later.' });
        return;
    }

    let raw;
    try {
        raw = await readBody(req);
    } catch {
        sendJson(res, 413, { error: 'Payload too large' });
        return;
    }

    let parsed;
    try {
        parsed = raw ? JSON.parse(raw) : {};
    } catch {
        sendJson(res, 400, { error: 'Invalid JSON' });
        return;
    }

    // Honeypot: real users never fill this hidden field. Pretend success so the
    // bot thinks it worked, but send nothing.
    if (clip(parsed.honeypot, 200)) {
        sendJson(res, 200, { ok: true });
        return;
    }

    const fullName = clip(parsed.fullName, FIELD_LIMITS.fullName);
    const companyName = clip(parsed.companyName, FIELD_LIMITS.companyName);
    const phoneNumber = clip(parsed.phoneNumber, FIELD_LIMITS.phoneNumber);
    const emailAddress = clip(parsed.emailAddress, FIELD_LIMITS.emailAddress);
    const subjectText = clip(parsed.subjectText, FIELD_LIMITS.subjectText);
    const message = clip(parsed.message, FIELD_LIMITS.message);

    const rawVisit = parsed.visit;
    const visit = rawVisit && rawVisit.date && rawVisit.time
        ? {
            date: clip(rawVisit.date, 20),
            time: clip(rawVisit.time, 10),
            visitors: clip(rawVisit.visitors, FIELD_LIMITS.visitors),
        }
        : null;

    if (!fullName || !phoneNumber || !subjectText) {
        sendJson(res, 400, { error: 'Missing required fields' });
        return;
    }
    if (!PHONE_RE.test(phoneNumber)) {
        sendJson(res, 400, { error: 'Invalid phone number' });
        return;
    }
    if (emailAddress && !EMAIL_RE.test(emailAddress)) {
        sendJson(res, 400, { error: 'Invalid email address' });
        return;
    }

    const flexMessage = buildFlexMessage({
        fullName,
        companyName,
        phoneNumber,
        emailAddress,
        subjectText,
        message,
        visit,
    });

    try {
        const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
            body: JSON.stringify({ to: GROUP_ID, messages: [flexMessage] }),
        });

        if (!lineRes.ok) {
            const errorText = await lineRes.text();
            console.error('LINE API error', lineRes.status, errorText);
            sendJson(res, 502, { error: 'LINE API rejected the request', status: lineRes.status });
            return;
        }

        sendJson(res, 200, { ok: true });
    } catch (err) {
        console.error('LINE push failed', err);
        sendJson(res, 500, { error: 'Failed to send message' });
    }
}

const server = http.createServer((req, res) => {
    const url = (req.url || '').split('?')[0];

    if (req.method === 'GET' && (url === '/api/health' || url === '/health')) {
        sendJson(res, 200, { ok: true });
        return;
    }

    if (url === '/api/contact-line') {
        if (req.method !== 'POST') {
            sendJson(res, 405, { error: 'Method not allowed' });
            return;
        }
        handleContact(req, res);
        return;
    }

    sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
    console.log(`Evergreen contact backend listening on :${PORT}`);
});
