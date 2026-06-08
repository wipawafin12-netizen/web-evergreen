import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImageOff, Link2, ArrowUp, ArrowDown } from 'lucide-react';
import { pb, BANNERS, BannerRecord, fileUrl, pbErrorMessage } from '../../lib/pb';
import { compressImage } from '../../lib/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, Toggle, Spinner } from './ui';

const emptyForm = {
    title_en: '',
    title_th: '',
    subtitle_en: '',
    subtitle_th: '',
    link: '',
    active: true,
    sort: 0,
};

type FormState = typeof emptyForm;

export const AdminBanners: React.FC = () => {
    const { t } = useLanguage();
    const [items, setItems] = useState<BannerRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<BannerRecord | null>(null);
    const [creating, setCreating] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(BANNERS).getFullList<BannerRecord>({ sort: 'sort,created' });
            setItems(list);
        } catch (err) {
            alert(pbErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const remove = async (item: BannerRecord) => {
        if (!confirm(t('Delete this banner? This cannot be undone.', 'ลบแบนเนอร์นี้? ไม่สามารถย้อนกลับได้'))) return;
        try {
            await pb.collection(BANNERS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const toggleActive = async (item: BannerRecord) => {
        try {
            const updated = await pb.collection(BANNERS).update<BannerRecord>(item.id, { active: !item.active });
            setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    // Swap the sort order with the neighbour in the given direction.
    const move = async (index: number, dir: -1 | 1) => {
        const target = index + dir;
        if (target < 0 || target >= items.length) return;
        const a = items[index];
        const b = items[target];
        // Use positional values so ordering is always well-defined even if the
        // existing sort numbers are duplicated/zero.
        try {
            await Promise.all([
                pb.collection(BANNERS).update(a.id, { sort: target }),
                pb.collection(BANNERS).update(b.id, { sort: index }),
            ]);
            load();
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const showForm = creating || editing !== null;

    return (
        <div>
            <PageHeader
                title={t('Homepage Banners', 'แบนเนอร์หน้าแรก')}
                subtitle={t('The rotating hero images at the top of the homepage', 'ภาพแบนเนอร์ที่หมุนสไลด์ด้านบนสุดของหน้าแรก')}
                action={
                    <button
                        onClick={() => { setCreating(true); setEditing(null); }}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('New banner', 'เพิ่มแบนเนอร์')}
                    </button>
                }
            />

            {loading ? (
                <Spinner />
            ) : items.length === 0 ? (
                <Card className="p-12 text-center text-stone-500 dark:text-stone-400">
                    {t(
                        'No banners yet. The homepage is showing its built-in default images. Add a banner to take over.',
                        'ยังไม่มีแบนเนอร์ หน้าแรกกำลังแสดงภาพเริ่มต้นที่ติดมากับระบบ เพิ่มแบนเนอร์เพื่อแทนที่ได้เลย'
                    )}
                </Card>
            ) : (
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <Card key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-full sm:w-44 aspect-[33/14] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 flex items-center justify-center">
                                {item.image ? (
                                    <img src={fileUrl(item, item.image, '600x0')} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageOff className="w-5 h-5 text-stone-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-stone-800 dark:text-stone-100 truncate">
                                    {item.title_th || item.title_en || t('(Image-only banner)', '(แบนเนอร์ภาพล้วน)')}
                                </p>
                                {item.link && (
                                    <p className="flex items-center gap-1.5 text-xs text-stone-400 truncate mt-1">
                                        <Link2 className="w-3.5 h-3.5 flex-shrink-0" />
                                        {item.link}
                                    </p>
                                )}
                            </div>

                            {/* Reorder */}
                            <div className="flex sm:flex-col items-center gap-1">
                                <button
                                    onClick={() => move(index, -1)}
                                    disabled={index === 0}
                                    className="p-1.5 text-stone-400 hover:text-brand-500 disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
                                    aria-label={t('Move up', 'เลื่อนขึ้น')}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => move(index, 1)}
                                    disabled={index === items.length - 1}
                                    className="p-1.5 text-stone-400 hover:text-brand-500 disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
                                    aria-label={t('Move down', 'เลื่อนลง')}
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => toggleActive(item)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-full transition-colors ${item.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-stone-100 text-stone-500 dark:bg-stone-800'}`}
                            >
                                {item.active ? t('Active', 'แสดงอยู่') : t('Hidden', 'ซ่อนอยู่')}
                            </button>

                            <div className="flex items-center gap-1">
                                <button onClick={() => { setEditing(item); setCreating(false); }} className="p-2 text-stone-500 hover:text-brand-500 transition-colors" aria-label="Edit">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => remove(item)} className="p-2 text-stone-500 hover:text-red-500 transition-colors" aria-label="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {showForm && (
                <BannerForm
                    record={editing}
                    nextSort={items.length}
                    onClose={() => { setEditing(null); setCreating(false); }}
                    onSaved={() => { setEditing(null); setCreating(false); load(); }}
                />
            )}
        </div>
    );
};

const BannerForm: React.FC<{ record: BannerRecord | null; nextSort: number; onClose: () => void; onSaved: () => void }> = ({ record, nextSort, onClose, onSaved }) => {
    const { t } = useLanguage();
    const [form, setForm] = useState<FormState>(() =>
        record
            ? {
                title_en: record.title_en || '',
                title_th: record.title_th || '',
                subtitle_en: record.subtitle_en || '',
                subtitle_th: record.subtitle_th || '',
                link: record.link || '',
                active: !!record.active,
                sort: record.sort ?? 0,
            }
            : { ...emptyForm, sort: nextSort }
    );
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (saving) return;
        if (!record && !imageFile) {
            setError(t('Please choose a banner image.', 'กรุณาเลือกภาพแบนเนอร์'));
            return;
        }
        setSaving(true);
        setError('');
        try {
            const data = new FormData();
            data.append('title_en', form.title_en.trim());
            data.append('title_th', form.title_th.trim());
            data.append('subtitle_en', form.subtitle_en.trim());
            data.append('subtitle_th', form.subtitle_th.trim());
            data.append('link', form.link.trim());
            data.append('active', String(form.active));
            data.append('sort', String(form.sort || 0));
            if (imageFile) data.append('image', await compressImage(imageFile));

            if (record) {
                await pb.collection(BANNERS).update(record.id, data);
            } else {
                await pb.collection(BANNERS).create(data);
            }
            onSaved();
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const currentImage = record?.image ? fileUrl(record, record.image, '600x0') : '';
    const previewImage = imageFile ? URL.createObjectURL(imageFile) : currentImage;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl my-8">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 rounded-t-xl">
                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100">
                        {record ? t('Edit banner', 'แก้ไขแบนเนอร์') : t('New banner', 'เพิ่มแบนเนอร์')}
                    </h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    <Field
                        label={t('Banner image', 'ภาพแบนเนอร์')}
                        hint={t('Wide image (around 33:14, e.g. 1650×700). JPG/PNG/WebP, up to 5 MB.', 'ภาพแนวนอน (สัดส่วนราว 33:14 เช่น 1650×700) JPG/PNG/WebP ไม่เกิน 5 MB')}
                    >
                        <div className="space-y-3">
                            {previewImage ? (
                                <div className="w-full aspect-[33/14] rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                                    <img src={previewImage} alt="" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-full aspect-[33/14] rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                                    <ImageOff className="w-6 h-6 text-stone-300" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="text-sm text-stone-600 dark:text-stone-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-600 file:text-xs file:font-bold hover:file:bg-brand-100"
                            />
                        </div>
                    </Field>

                    <Field
                        label={t('Link when clicked', 'ลิงก์เมื่อคลิก')}
                        hint={t('Optional. Full URL (https://...) or an internal path like /door.', 'ไม่บังคับ ใส่ลิงก์เต็ม (https://...) หรือเส้นทางภายในเว็บ เช่น /door')}
                    >
                        <TextInput value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="https://shop.chhindustry.com/" maxLength={500} />
                    </Field>

                    <div className="border-t border-stone-100 dark:border-stone-800 pt-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                            {t('Overlay text (optional)', 'ข้อความบนภาพ (ไม่บังคับ)')}
                        </p>
                        <p className="text-[11px] text-stone-400 mb-4">
                            {t('Leave blank for an image-only banner.', 'เว้นว่างไว้หากต้องการแบนเนอร์ภาพล้วน')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field label={t('Heading (TH)', 'หัวข้อ (ไทย)')}>
                                <TextInput value={form.title_th} onChange={(e) => set('title_th', e.target.value)} maxLength={200} />
                            </Field>
                            <Field label={t('Heading (EN)', 'หัวข้อ (อังกฤษ)')}>
                                <TextInput value={form.title_en} onChange={(e) => set('title_en', e.target.value)} maxLength={200} />
                            </Field>
                            <Field label={t('Subheading (TH)', 'คำอธิบาย (ไทย)')}>
                                <TextInput value={form.subtitle_th} onChange={(e) => set('subtitle_th', e.target.value)} maxLength={300} />
                            </Field>
                            <Field label={t('Subheading (EN)', 'คำอธิบาย (อังกฤษ)')}>
                                <TextInput value={form.subtitle_en} onChange={(e) => set('subtitle_en', e.target.value)} maxLength={300} />
                            </Field>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 border-t border-stone-100 dark:border-stone-800 pt-5">
                        <Toggle checked={form.active} onChange={(v) => set('active', v)} label={t('Active (show on site)', 'แสดงบนเว็บไซต์')} />
                    </div>

                    {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors">
                            {t('Cancel', 'ยกเลิก')}
                        </button>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-brand-900 dark:bg-brand-500 text-white rounded-lg hover:bg-brand-800 dark:hover:bg-brand-600 transition-colors disabled:opacity-60">
                            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {t('Save', 'บันทึก')}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
