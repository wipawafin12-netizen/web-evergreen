type Body = {
    fullName?: string;
    companyName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    subjectText?: string;
    message?: string;
    visit?: {
        date?: string;
        time?: string;
        visitors?: string;
    } | null;
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const groupId = process.env.LINE_GROUP_ID;

    if (!token || !groupId) {
        res.status(500).json({ error: 'LINE credentials not configured' });
        return;
    }

    const body: Body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const fullName = (body.fullName || '').trim();
    const phoneNumber = (body.phoneNumber || '').trim();
    const emailAddress = (body.emailAddress || '').trim();
    const subjectText = (body.subjectText || '').trim();

    if (!fullName || !phoneNumber || !subjectText) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const lines: string[] = [
        'ติดต่อใหม่จากเว็บไซต์',
        '────────────────',
        `ชื่อ: ${fullName}`,
    ];
    if (body.companyName?.trim()) lines.push(`บริษัท: ${body.companyName.trim()}`);
    lines.push(`เบอร์โทร: ${phoneNumber}`);
    if (emailAddress) lines.push(`อีเมล: ${emailAddress}`);
    lines.push(`เรื่อง: ${subjectText}`);

    if (body.visit?.date && body.visit?.time) {
        const d = new Date(body.visit.date);
        const dateText = d.toLocaleDateString('th-TH', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        lines.push('');
        lines.push('นัดเข้าชมโรงงาน');
        lines.push(`วันที่: ${dateText}`);
        lines.push(`เวลา: ${body.visit.time} น.`);
        if (body.visit.visitors) lines.push(`ผู้เข้าชม: ${body.visit.visitors} ท่าน`);
    }

    if (body.message?.trim()) {
        lines.push('');
        lines.push('ข้อความ:');
        lines.push(body.message.trim());
    }

    const text = lines.join('\n');

    try {
        const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                to: groupId,
                messages: [{ type: 'text', text }],
            }),
        });

        if (!lineRes.ok) {
            const errorText = await lineRes.text();
            console.error('LINE API error', lineRes.status, errorText);
            res.status(502).json({ error: 'LINE API rejected the request', status: lineRes.status });
            return;
        }

        res.status(200).json({ ok: true });
    } catch (err) {
        console.error('LINE push failed', err);
        res.status(500).json({ error: 'Failed to send message' });
    }
}
