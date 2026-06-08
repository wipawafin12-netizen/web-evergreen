import React, { useEffect, useState } from 'react';
import { Loader2, Megaphone, Phone, Share2, CheckCircle2 } from 'lucide-react';
import { pb, SETTINGS, SettingsRecord, pbErrorMessage } from '../../lib/pb';
import { DEFAULT_SETTINGS } from '../../contexts/SettingsContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, Toggle, Spinner } from './ui';

type FormState = {
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

const toForm = (rec: Partial<SettingsRecord>): FormState => ({
    cta_enabled: rec.cta_enabled ?? DEFAULT_SETTINGS.cta_enabled,
    cta_title_en: rec.cta_title_en ?? '',
    cta_title_th: rec.cta_title_th ?? '',
    cta_subtitle_en: rec.cta_subtitle_en ?? '',
    cta_subtitle_th: rec.cta_subtitle_th ?? '',
    cta_button_en: rec.cta_button_en ?? '',
    cta_button_th: rec.cta_button_th ?? '',
    cta_link: rec.cta_link ?? '',
    phone_office: rec.phone_office ?? '',
    phone_sales: rec.phone_sales ?? '',
    email: rec.email ?? '',
    hours_en: rec.hours_en ?? '',
    hours_th: rec.hours_th ?? '',
    address_en: rec.address_en ?? '',
    address_th: rec.address_th ?? '',
    map_link: rec.map_link ?? '',
    facebook: rec.facebook ?? '',
    instagram: rec.instagram ?? '',
    line: rec.line ?? '',
    tiktok: rec.tiktok ?? '',
});

const Section: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <Card className="p-6">
        <div className="flex items-center gap-2.5 mb-5">
            <div className="p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg text-brand-500"><Icon className="w-4 h-4" /></div>
            <h2 className="font-bold text-stone-800 dark:text-stone-100">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </Card>
);

export const AdminSettings: React.FC = () => {
    const { t } = useLanguage();
    const [recordId, setRecordId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const list = await pb.collection(SETTINGS).getList<SettingsRecord>(1, 1);
                if (list.items.length) {
                    setRecordId(list.items[0].id);
                    setForm(toForm(list.items[0]));
                } else {
                    setForm(toForm({}));
                }
            } catch (err) {
                setError(pbErrorMessage(err));
                setForm(toForm({}));
            }
        })();
    }, []);

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((f) => (f ? { ...f, [key]: value } : f));
        setSaved(false);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form || saving) return;
        setSaving(true);
        setError('');
        try {
            if (recordId) {
                await pb.collection(SETTINGS).update(recordId, form);
            } else {
                const created = await pb.collection(SETTINGS).create<SettingsRecord>(form);
                setRecordId(created.id);
            }
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    if (!form) return <Spinner />;

    return (
        <div>
            <PageHeader
                title={t('Site Settings', 'ตั้งค่าเว็บไซต์')}
                subtitle={t('Top banner bar, contact details and social links shown across the site', 'แถบบนสุด ข้อมูลติดต่อ และลิงก์โซเชียลที่แสดงทั่วทั้งเว็บ')}
            />

            <form onSubmit={submit} className="space-y-5 max-w-4xl">
                <Section icon={Megaphone} title={t('Top promo bar (homepage)', 'แถบโปรโมชั่นด้านบน (หน้าแรก)')}>
                    <div className="md:col-span-2">
                        <Toggle checked={form.cta_enabled} onChange={(v) => set('cta_enabled', v)} label={t('Show the promo bar', 'แสดงแถบโปรโมชั่น')} />
                    </div>
                    <Field label={t('Heading (TH)', 'หัวข้อ (ไทย)')}>
                        <TextInput value={form.cta_title_th} onChange={(e) => set('cta_title_th', e.target.value)} maxLength={200} />
                    </Field>
                    <Field label={t('Heading (EN)', 'หัวข้อ (อังกฤษ)')}>
                        <TextInput value={form.cta_title_en} onChange={(e) => set('cta_title_en', e.target.value)} maxLength={200} />
                    </Field>
                    <Field label={t('Subtext (TH)', 'คำอธิบาย (ไทย)')}>
                        <TextInput value={form.cta_subtitle_th} onChange={(e) => set('cta_subtitle_th', e.target.value)} maxLength={200} />
                    </Field>
                    <Field label={t('Subtext (EN)', 'คำอธิบาย (อังกฤษ)')}>
                        <TextInput value={form.cta_subtitle_en} onChange={(e) => set('cta_subtitle_en', e.target.value)} maxLength={200} />
                    </Field>
                    <Field label={t('Button text (TH)', 'ข้อความปุ่ม (ไทย)')}>
                        <TextInput value={form.cta_button_th} onChange={(e) => set('cta_button_th', e.target.value)} maxLength={80} />
                    </Field>
                    <Field label={t('Button text (EN)', 'ข้อความปุ่ม (อังกฤษ)')}>
                        <TextInput value={form.cta_button_en} onChange={(e) => set('cta_button_en', e.target.value)} maxLength={80} />
                    </Field>
                    <div className="md:col-span-2">
                        <Field label={t('Button link', 'ลิงก์ปุ่ม')}>
                            <TextInput value={form.cta_link} onChange={(e) => set('cta_link', e.target.value)} placeholder="https://door.chhindustry.com/" maxLength={500} />
                        </Field>
                    </div>
                </Section>

                <Section icon={Phone} title={t('Contact details', 'ข้อมูลติดต่อ')}>
                    <Field label={t('Phone (office)', 'โทร (ออฟฟิศ)')}>
                        <TextInput value={form.phone_office} onChange={(e) => set('phone_office', e.target.value)} maxLength={60} />
                    </Field>
                    <Field label={t('Phone (sales)', 'โทร (ฝ่ายขาย)')}>
                        <TextInput value={form.phone_sales} onChange={(e) => set('phone_sales', e.target.value)} maxLength={60} />
                    </Field>
                    <Field label={t('Email', 'อีเมล')}>
                        <TextInput value={form.email} onChange={(e) => set('email', e.target.value)} maxLength={160} />
                    </Field>
                    <Field label={t('Map link', 'ลิงก์แผนที่')}>
                        <TextInput value={form.map_link} onChange={(e) => set('map_link', e.target.value)} maxLength={1000} />
                    </Field>
                    <Field label={t('Office hours (TH)', 'เวลาทำการ (ไทย)')}>
                        <TextInput value={form.hours_th} onChange={(e) => set('hours_th', e.target.value)} maxLength={120} />
                    </Field>
                    <Field label={t('Office hours (EN)', 'เวลาทำการ (อังกฤษ)')}>
                        <TextInput value={form.hours_en} onChange={(e) => set('hours_en', e.target.value)} maxLength={120} />
                    </Field>
                    <Field label={t('Address (TH)', 'ที่อยู่ (ไทย)')}>
                        <TextInput value={form.address_th} onChange={(e) => set('address_th', e.target.value)} maxLength={400} />
                    </Field>
                    <Field label={t('Address (EN)', 'ที่อยู่ (อังกฤษ)')}>
                        <TextInput value={form.address_en} onChange={(e) => set('address_en', e.target.value)} maxLength={400} />
                    </Field>
                </Section>

                <Section icon={Share2} title={t('Social links', 'ลิงก์โซเชียล')}>
                    <Field label="Facebook">
                        <TextInput value={form.facebook} onChange={(e) => set('facebook', e.target.value)} maxLength={300} />
                    </Field>
                    <Field label="Instagram">
                        <TextInput value={form.instagram} onChange={(e) => set('instagram', e.target.value)} maxLength={300} />
                    </Field>
                    <Field label="LINE">
                        <TextInput value={form.line} onChange={(e) => set('line', e.target.value)} maxLength={300} />
                    </Field>
                    <Field label="TikTok">
                        <TextInput value={form.tiktok} onChange={(e) => set('tiktok', e.target.value)} maxLength={300} />
                    </Field>
                </Section>

                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                <div className="flex items-center justify-end gap-4 sticky bottom-0 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur py-3 -mx-1 px-1">
                    {saved && (
                        <span className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-4 h-4" /> {t('Saved', 'บันทึกแล้ว')}
                        </span>
                    )}
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-brand-900 dark:bg-brand-500 text-white rounded-lg hover:bg-brand-800 dark:hover:bg-brand-600 transition-colors disabled:opacity-60">
                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {t('Save settings', 'บันทึกการตั้งค่า')}
                    </button>
                </div>
            </form>
        </div>
    );
};
