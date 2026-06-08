import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { pb, SETTINGS, SettingsRecord } from '../lib/pb';

// Defaults mirror the site's original hardcoded content. They are used until the
// settings record loads from PocketBase, and as a safety net if the request
// fails — so the public site always renders correct contact details.
export const DEFAULT_SETTINGS: SettingsRecord = {
    id: '',
    collectionId: '',
    collectionName: SETTINGS,
    created: '',
    updated: '',
    cta_enabled: true,
    cta_title_en: 'Not sure which door is right for you?',
    cta_title_th: 'ยังไม่แน่ใจว่าประตูแบบไหนเหมาะกับคุณ?',
    cta_subtitle_en: 'Try our interactive door finder tool',
    cta_subtitle_th: 'ลองใช้เครื่องมือค้นหาประตูแบบอินเทอร์แอคทีฟ',
    cta_button_en: 'Find Your Perfect Door',
    cta_button_th: 'ค้นหาประตูที่เหมาะกับคุณ',
    cta_link: 'https://door.chhindustry.com/',
    phone_office: '02-921-9979',
    phone_sales: '062-539-9980',
    email: 'mkt.evergreenchh@gmail.com',
    hours_en: 'Mon-Fri 8:30am - 4:30pm',
    hours_th: 'จันทร์-ศุกร์ 8:30 - 16:30 น.',
    address_en: '9/1 Moo 2, Bang Len – Lat Lum Kaew Road, Khun Si, Sai Noi District, Nonthaburi 11150',
    address_th: '9/1 หมู่ 2 ถนนบางเลน-ลาดหลุมแก้ว ต.ขุนศรี อ.ไทรน้อย จ.นนทบุรี 11150',
    map_link: 'https://maps.google.com/?q=9/1+หมู่+2+ถนนบางเลน-ลาดหลุมแก้ว+ต.ขุนศรี+อ.ไทรน้อย+จ.นนทบุรี+11150',
    facebook: 'https://www.facebook.com/Evergreenchh',
    instagram: 'https://www.instagram.com/evergreenchh',
    line: 'https://bit.ly/evergreenchh',
    tiktok: 'https://www.tiktok.com/@evergreen_chh',
} as SettingsRecord;

const SettingsContext = createContext<SettingsRecord>(DEFAULT_SETTINGS);

// Merge a partial record from PocketBase over the defaults so any blank field
// transparently falls back to the original site value.
function merge(record: Partial<SettingsRecord>): SettingsRecord {
    const out = { ...DEFAULT_SETTINGS } as Record<string, unknown>;
    for (const [key, value] of Object.entries(record)) {
        if (value !== '' && value !== null && value !== undefined) out[key] = value;
    }
    return out as SettingsRecord;
}

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SettingsRecord>(DEFAULT_SETTINGS);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const list = await pb.collection(SETTINGS).getList<SettingsRecord>(1, 1);
                if (active && list.items.length) setSettings(merge(list.items[0]));
            } catch {
                /* keep defaults */
            }
        })();
        return () => { active = false; };
    }, []);

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
