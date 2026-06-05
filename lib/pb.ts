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
