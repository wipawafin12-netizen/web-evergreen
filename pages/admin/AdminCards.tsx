import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImageOff } from 'lucide-react';
import { pb, HOME_CARDS, HomeCardRecord, fileUrl, pbErrorMessage } from '../../lib/pb';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, TextArea, Toggle, Spinner } from './ui';

const emptyForm = {
    title_en: '',
    title_th: '',
    description_en: '',
    description_th: '',
    link: '',
    active: true,
    sort: 0,
};

type FormState = typeof emptyForm;

export const AdminCards: React.FC = () => {
    const { language, t } = useLanguage();
    const [items, setItems] = useState<HomeCardRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<HomeCardRecord | null>(null);
    const [creating, setCreating] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(HOME_CARDS).getFullList<HomeCardRecord>({ sort: 'sort,created' });
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

    const remove = async (item: HomeCardRecord) => {
        if (!confirm(t('Delete this card?', 'ลบการ์ดนี้?'))) return;
        try {
            await pb.collection(HOME_CARDS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const showForm = creating || editing !== null;

    return (
        <div>
            <PageHeader
                title={t('Collection Cards', 'การ์ดคอลเลกชัน')}
                subtitle={t('The "Collections" cards on the homepage', 'การ์ดในส่วน "คอลเลกชัน" บนหน้าแรก')}
                action={
                    <button
                        onClick={() => { setCreating(true); setEditing(null); }}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('New card', 'เพิ่มการ์ด')}
                    </button>
                }
            />

            {loading ? (
                <Spinner />
            ) : items.length === 0 ? (
                <Card className="p-12 text-center text-stone-500 dark:text-stone-400">
                    {t(
                        'No cards yet. The homepage shows its built-in collection cards. Add cards to take over.',
                        'ยังไม่มีการ์ด หน้าแรกแสดงการ์ดคอลเลกชันที่ติดมากับระบบ เพิ่มการ์ดเพื่อแทนที่ได้เลย'
                    )}
                </Card>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden flex flex-col">
                            <div className="aspect-[3/5] bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                                {item.image ? (
                                    <img src={fileUrl(item, item.image, '400x0')} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageOff className="w-6 h-6 text-stone-300" />
                                )}
                            </div>
                            <div className="p-3 flex-1 flex flex-col">
                                <p className="font-bold text-sm text-stone-800 dark:text-stone-100 truncate">
                                    {(language === 'TH' ? item.title_th : item.title_en) || item.title_th || item.title_en}
                                </p>
                                {!item.active && <span className="text-[10px] text-stone-400">({t('Hidden', 'ซ่อนอยู่')})</span>}
                                <div className="mt-auto flex items-center justify-end gap-1 pt-2">
                                    <button onClick={() => { setEditing(item); setCreating(false); }} className="p-1.5 text-stone-400 hover:text-brand-500 transition-colors" aria-label="Edit">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => remove(item)} className="p-1.5 text-stone-400 hover:text-red-500 transition-colors" aria-label="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {showForm && (
                <CardForm
                    record={editing}
                    nextSort={items.length}
                    onClose={() => { setEditing(null); setCreating(false); }}
                    onSaved={() => { setEditing(null); setCreating(false); load(); }}
                />
            )}
        </div>
    );
};

const CardForm: React.FC<{ record: HomeCardRecord | null; nextSort: number; onClose: () => void; onSaved: () => void }> = ({ record, nextSort, onClose, onSaved }) => {
    const { t } = useLanguage();
    const [form, setForm] = useState<FormState>(() =>
        record
            ? {
                title_en: record.title_en || '',
                title_th: record.title_th || '',
                description_en: record.description_en || '',
                description_th: record.description_th || '',
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
            setError(t('Please choose a card image.', 'กรุณาเลือกรูปการ์ด'));
            return;
        }
        setSaving(true);
        setError('');
        try {
            const data = new FormData();
            data.append('title_en', form.title_en.trim());
            data.append('title_th', form.title_th.trim());
            data.append('description_en', form.description_en.trim());
            data.append('description_th', form.description_th.trim());
            data.append('link', form.link.trim());
            data.append('active', String(form.active));
            data.append('sort', String(form.sort || 0));
            if (imageFile) data.append('image', imageFile);

            if (record) {
                await pb.collection(HOME_CARDS).update(record.id, data);
            } else {
                await pb.collection(HOME_CARDS).create(data);
            }
            onSaved();
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const currentImage = record?.image ? fileUrl(record, record.image, '400x0') : '';
    const previewImage = imageFile ? URL.createObjectURL(imageFile) : currentImage;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl my-8">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 rounded-t-xl">
                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100">
                        {record ? t('Edit card', 'แก้ไขการ์ด') : t('New card', 'เพิ่มการ์ด')}
                    </h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    <Field label={t('Card image', 'รูปการ์ด')} hint={t('Tall image (around 3:5). JPG/PNG/WebP, up to 5 MB.', 'ภาพแนวตั้ง (สัดส่วนราว 3:5) JPG/PNG/WebP ไม่เกิน 5 MB')}>
                        <div className="space-y-3">
                            <div className="w-32 aspect-[3/5] rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                                {previewImage ? (
                                    <img src={previewImage} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageOff className="w-6 h-6 text-stone-300" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="text-sm text-stone-600 dark:text-stone-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-600 file:text-xs file:font-bold hover:file:bg-brand-100"
                            />
                        </div>
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label={t('Title (TH)', 'ชื่อ (ไทย)')}>
                            <TextInput value={form.title_th} onChange={(e) => set('title_th', e.target.value)} required maxLength={120} />
                        </Field>
                        <Field label={t('Title (EN)', 'ชื่อ (อังกฤษ)')}>
                            <TextInput value={form.title_en} onChange={(e) => set('title_en', e.target.value)} required maxLength={120} />
                        </Field>
                        <Field label={t('Description (TH)', 'รายละเอียด (ไทย)')}>
                            <TextArea rows={4} value={form.description_th} onChange={(e) => set('description_th', e.target.value)} maxLength={1000} />
                        </Field>
                        <Field label={t('Description (EN)', 'รายละเอียด (อังกฤษ)')}>
                            <TextArea rows={4} value={form.description_en} onChange={(e) => set('description_en', e.target.value)} maxLength={1000} />
                        </Field>
                    </div>

                    <Field label={t('Link when clicked', 'ลิงก์เมื่อคลิก')} hint={t('Optional. Full URL or an internal path like /door.', 'ไม่บังคับ ใส่ลิงก์เต็มหรือเส้นทางภายใน เช่น /door')}>
                        <TextInput value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="/door" maxLength={500} />
                    </Field>

                    <Toggle checked={form.active} onChange={(v) => set('active', v)} label={t('Active (show on site)', 'แสดงบนเว็บไซต์')} />

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
