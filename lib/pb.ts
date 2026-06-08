import PocketBase, { type RecordModel } from 'pocketbase';

// Same-origin by default ("/pb" is proxied to the PocketBase container by
// nginx). For local dev against a local PocketBase, set VITE_PB_URL.
const PB_URL = import.meta.env.VITE_PB_URL || '/pb';

export const pb = new PocketBase(PB_URL);

// React 19 StrictMode runs effects twice in dev; disabling auto-cancellation
// prevents the second render from aborting the first request.
pb.autoCancellation(false);

export const ADMINS = 'admins';
export const NEWS = 'news';
export const PRODUCTS = 'products';
export const BANNERS = 'banners';
export const LEADS = 'leads';
export const SETTINGS = 'settings';
export const LOGOS = 'logos';
export const HOME_CARDS = 'home_cards';

export type NewsRecord = RecordModel & {
    title_en: string;
    title_th: string;
    excerpt_en: string;
    excerpt_th: string;
    body_en: string;
    body_th: string;
    cover: string;
    published: boolean;
    publish_date: string;
};

export const PRODUCT_CATEGORIES = [
    'door',
    'doorframe',
    'flooring',
    'staircase',
    'wallpanel',
    'serviceshaft',
    'other',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ProductCategory, { en: string; th: string }> = {
    door: { en: 'Door', th: 'ประตู' },
    doorframe: { en: 'Doorframe', th: 'วงกบ' },
    flooring: { en: 'Flooring', th: 'พื้นไม้' },
    staircase: { en: 'Staircase', th: 'บันได' },
    wallpanel: { en: 'Wall Panel', th: 'ผนังตกแต่ง' },
    serviceshaft: { en: 'Service Shaft', th: 'ช่องชาร์ป' },
    other: { en: 'Other', th: 'อื่นๆ' },
};

export type ProductRecord = RecordModel & {
    name_en: string;
    name_th: string;
    category: ProductCategory;
    description_en: string;
    description_th: string;
    spec_en: string;
    spec_th: string;
    images: string[];
    featured: boolean;
    sort: number;
    published: boolean;
};

export type AdminRecord = RecordModel & {
    email: string;
    name: string;
};

export type BannerRecord = RecordModel & {
    title_en: string;
    title_th: string;
    subtitle_en: string;
    subtitle_th: string;
    image: string;
    link: string;
    active: boolean;
    sort: number;
};

export type LeadStatus = 'new' | 'contacted' | 'done';

export type LeadRecord = RecordModel & {
    name: string;
    company: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
    visit_date: string;
    visit_time: string;
    visitors: string;
    status: LeadStatus;
};

export type SettingsRecord = RecordModel & {
    cta_enabled: boolean;
    cta_title_en: string;
    cta_title_th: string;
    cta_subtitle_en: string;
    cta_subtitle_th: string;
    cta_button_en: string;
    cta_button_th: string;
    cta_link: string;
    phone_office: string;
    phone_sales: string;
    email: string;
    hours_en: string;
    hours_th: string;
    address_en: string;
    address_th: string;
    map_link: string;
    facebook: string;
    instagram: string;
    line: string;
    tiktok: string;
};

export const LOGO_GROUPS = ['developer', 'contractor', 'hotel'] as const;
export type LogoGroup = (typeof LOGO_GROUPS)[number];

export const LOGO_GROUP_LABELS: Record<LogoGroup, { en: string; th: string }> = {
    developer: { en: 'Developer', th: 'ผู้พัฒนาโครงการ' },
    contractor: { en: 'Main Contractor', th: 'ผู้รับเหมาหลัก' },
    hotel: { en: 'Hotel & Service Apartment', th: 'โรงแรม/เซอร์วิสอพาร์ตเมนต์' },
};

export type LogoRecord = RecordModel & {
    name: string;
    image: string;
    group: LogoGroup;
    sort: number;
    active: boolean;
};

export type HomeCardRecord = RecordModel & {
    title_en: string;
    title_th: string;
    description_en: string;
    description_th: string;
    image: string;
    link: string;
    sort: number;
    active: boolean;
};

/** Build a URL for an uploaded file (optionally a resized thumbnail, e.g. "600x0"). */
export function fileUrl(record: RecordModel, filename: string, thumb?: string): string {
    if (!filename) return '';
    return pb.files.getURL(record, filename, thumb ? { thumb } : undefined);
}

/** Human-readable message from a PocketBase/network error. */
export function pbErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
    const e = err as { message?: string; response?: { message?: string } };
    return e?.response?.message || e?.message || fallback;
}
