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

const BRAND_COLOR = '#E87722';
const VISIT_COLOR = '#0F766E';
const TEXT_DARK = '#1F2937';
const TEXT_MUTED = '#6B7280';
const DIVIDER = '#E5E7EB';

const infoRow = (label: string, value: string) => ({
    type: 'box',
    layout: 'baseline',
    spacing: 'sm',
    contents: [
        {
            type: 'text',
            text: label,
            color: TEXT_MUTED,
            size: 'sm',
            flex: 2,
        },
        {
            type: 'text',
            text: value,
            wrap: true,
            color: TEXT_DARK,
            size: 'sm',
            flex: 5,
            weight: 'bold',
        },
    ],
});

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
    const companyName = (body.companyName || '').trim();
    const phoneNumber = (body.phoneNumber || '').trim();
    const emailAddress = (body.emailAddress || '').trim();
    const subjectText = (body.subjectText || '').trim();
    const message = (body.message || '').trim();
    const visit = body.visit;
    const isVisit = !!(visit?.date && visit?.time);

    if (!fullName || !phoneNumber || !subjectText) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const headerColor = isVisit ? VISIT_COLOR : BRAND_COLOR;
    const headerTitle = isVisit ? 'นัดเข้าชมโรงงาน' : 'ติดต่อใหม่จากเว็บไซต์';

    const bodyContents: any[] = [
        {
            type: 'text',
            text: subjectText,
            weight: 'bold',
            size: 'md',
            color: headerColor,
        },
        {
            type: 'separator',
            margin: 'md',
            color: DIVIDER,
        },
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
        const d = new Date(visit!.date!);
        const dateText = d.toLocaleDateString('th-TH', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        bodyContents.push(
            {
                type: 'separator',
                margin: 'lg',
                color: DIVIDER,
            },
            {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                    {
                        type: 'text',
                        text: 'รายละเอียดนัดหมาย',
                        weight: 'bold',
                        size: 'sm',
                        color: VISIT_COLOR,
                    },
                    infoRow('วันที่', dateText),
                    infoRow('เวลา', `${visit!.time} น.`),
                    ...(visit!.visitors ? [infoRow('ผู้เข้าชม', `${visit!.visitors} ท่าน`)] : []),
                ],
            }
        );
    }

    if (message) {
        bodyContents.push(
            {
                type: 'separator',
                margin: 'lg',
                color: DIVIDER,
            },
            {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                    {
                        type: 'text',
                        text: 'ข้อความ',
                        weight: 'bold',
                        size: 'sm',
                        color: TEXT_MUTED,
                    },
                    {
                        type: 'text',
                        text: message,
                        wrap: true,
                        size: 'sm',
                        color: TEXT_DARK,
                    },
                ],
            }
        );
    }

    const footerButtons: any[] = [
        {
            type: 'button',
            style: 'primary',
            color: headerColor,
            height: 'sm',
            action: {
                type: 'uri',
                label: 'โทรกลับ',
                uri: `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`,
            },
        },
    ];

    if (emailAddress) {
        footerButtons.push({
            type: 'button',
            style: 'secondary',
            height: 'sm',
            action: {
                type: 'uri',
                label: 'ส่งอีเมล',
                uri: `mailto:${emailAddress}`,
            },
        });
    }

    const flexMessage = {
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
            body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                paddingAll: '16px',
                contents: bodyContents,
            },
            footer: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                paddingAll: '12px',
                contents: footerButtons,
            },
            styles: {
                footer: {
                    separator: true,
                    separatorColor: DIVIDER,
                },
            },
        },
    };

    try {
        const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                to: groupId,
                messages: [flexMessage],
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
