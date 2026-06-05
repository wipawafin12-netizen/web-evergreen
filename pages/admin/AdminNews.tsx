import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImageOff } from 'lucide-react';
import { pb, NEWS, NewsRecord, fileUrl, pbErrorMessage } from '../../lib/pb';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, TextArea, Toggle, Spinner } from './ui';

const emptyForm = {
    title_en: '',
    title_th: '',
    excerpt_en: '',
    excerpt_th: '',
    body_en: '',
    body_th: '',
    published: false,
    publish_date: '',
};

type FormState = typeof emptyForm;

export const AdminNews: React.FC = () => {
    const { t } = useLanguage();
    const [items, setItems] = useState<NewsRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<NewsRecord | null>(null);
    const [creating, setCreating] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(NEWS).getFullList<NewsRecord>({ sort: '-created' });
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

    const remove = async (item: NewsRecord) => {
        if (!confirm(t('Delete this item? This cannot be undone.', 'ลบรายการนี้? ไม่สามารถย้อนกลับได้'))) return;
        try {
            await pb.collection(NEWS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const showForm = creating || editing !== null;

    return (
        <div>
            <PageHeader
                title={t('News & Promotions', 'ข่าว/โปรโมชั่น')}
                subtitle={t('Posts shown on the public News page', 'โพสต์ที่แสดงในหน้าข่าวสาธารณะ')}
                action={
                    <button
                        onClick={() => { setCreating(true); setEditing(null); }}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('New post', 'เพิ่มโพสต์')}
                    </button>
                }
            />

            {loading ? (
                <Spinner />
            ) : items.length === 0 ? (
                <Card className="p-12 text-center text-stone-500 dark:text-stone-400">
                    {t('No posts yet. Create your first one.', 'ยังไม่มีโพสต์ เริ่มสร้างโพสต์แรกได้เลย')}
                </Card>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <Card key={item.id} className="p-4 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 flex-shrink-0 flex items-center justify-center">
                                {item.cover ? (
                                    <img src={fileUrl(item, item.cover, '100x100')} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageOff className="w-5 h-5 text-stone-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-stone-800 dark:text-stone-100 truncate">{item.title_th || item.title_en}</p>
                                <p className="text-xs text-stone-400 truncate">{item.title_en}</p>
                            </div>
                            <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${item.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-stone-100 text-stone-500 dark:bg-stone-800'}`}>
                                {item.published ? t('Published', 'เผยแพร่') : t('Draft', 'ฉบับร่าง')}
                            </span>
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
                <NewsForm
                    record={editing}
                    onClose={() => { setEditing(null); setCreating(false); }}
                    onSaved={() => { setEditing(null); setCreating(false); load(); }}
                />
            )}
        </div>
    );
};

const NewsForm: React.FC<{ record: NewsRecord | null; onClose: () => void; onSaved: () => void }> = ({ record, onClose, onSaved }) => {
    const { t } = useLanguage();
    const [form, setForm] = useState<FormState>(() =>
        record
            ? {
                title_en: record.title_en || '',
                title_th: record.title_th || '',
                excerpt_en: record.excerpt_en || '',
                excerpt_th: record.excerpt_th || '',
                body_en: record.body_en || '',
                body_th: record.body_th || '',
                published: !!record.published,
                publish_date: (record.publish_date || '').slice(0, 10),
            }
            : { ...emptyForm }
    );
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [removeCover, setRemoveCover] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);
        setError('');
        try {
            const data = new FormData();
            data.append('title_en', form.title_en.trim());
            data.append('title_th', form.title_th.trim());
            data.append('excerpt_en', form.excerpt_en.trim());
            data.append('excerpt_th', form.excerpt_th.trim());
            data.append('body_en', form.body_en);
            data.append('body_th', form.body_th);
            data.append('published', String(form.published));
            data.append('publish_date', form.publish_date ? `${form.publish_date} 00:00:00.000Z` : '');
            if (coverFile) data.append('cover', coverFile);
            else if (removeCover && record?.cover) data.append('cover-', record.cover);

            if (record) {
                await pb.collection(NEWS).update(record.id, data);
            } else {
                await pb.collection(NEWS).create(data);
            }
            onSaved();
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const currentCover = record?.cover && !removeCover ? fileUrl(record, record.cover, '200x200') : '';
    const previewCover = coverFile ? URL.createObjectURL(coverFile) : currentCover;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl my-8">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 rounded-t-xl">
                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100">
                        {record ? t('Edit post', 'แก้ไขโพสต์') : t('New post', 'เพิ่มโพสต์')}
                    </h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label={t('Title (TH)', 'หัวข้อ (ไทย)')}>
                            <TextInput value={form.title_th} onChange={(e) => set('title_th', e.target.value)} required maxLength={200} />
                        </Field>
                        <Field label={t('Title (EN)', 'หัวข้อ (อังกฤษ)')}>
                            <TextInput value={form.title_en} onChange={(e) => set('title_en', e.target.value)} required maxLength={200} />
                        </Field>
                        <Field label={t('Excerpt (TH)', 'คำโปรย (ไทย)')}>
                            <TextArea rows={2} value={form.excerpt_th} onChange={(e) => set('excerpt_th', e.target.value)} maxLength={300} />
                        </Field>
                        <Field label={t('Excerpt (EN)', 'คำโปรย (อังกฤษ)')}>
                            <TextArea rows={2} value={form.excerpt_en} onChange={(e) => set('excerpt_en', e.target.value)} maxLength={300} />
                        </Field>
                        <Field label={t('Body (TH)', 'เนื้อหา (ไทย)')}>
                            <TextArea rows={5} value={form.body_th} onChange={(e) => set('body_th', e.target.value)} />
                        </Field>
                        <Field label={t('Body (EN)', 'เนื้อหา (อังกฤษ)')}>
                            <TextArea rows={5} value={form.body_en} onChange={(e) => set('body_en', e.target.value)} />
                        </Field>
                    </div>

                    <Field label={t('Cover image', 'ภาพปก')} hint={t('JPG/PNG/WebP, up to 5 MB', 'JPG/PNG/WebP ไม่เกิน 5 MB')}>
                        <div className="flex items-center gap-4">
                            {previewCover ? (
                                <img src={previewCover} alt="" className="w-20 h-20 rounded-lg object-cover border border-stone-200 dark:border-stone-700" />
                            ) : (
                                <div className="w-20 h-20 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center"><ImageOff className="w-5 h-5 text-stone-300" /></div>
                            )}
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={(e) => { setCoverFile(e.target.files?.[0] || null); setRemoveCover(false); }}
                                    className="text-sm text-stone-600 dark:text-stone-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-600 file:text-xs file:font-bold hover:file:bg-brand-100"
                                />
                                {(record?.cover || coverFile) && (
                                    <button type="button" onClick={() => { setCoverFile(null); setRemoveCover(true); }} className="block text-xs text-red-500 hover:underline">
                                        {t('Remove image', 'ลบรูป')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </Field>

                    <div className="flex flex-wrap items-center gap-6">
                        <Toggle checked={form.published} onChange={(v) => set('published', v)} label={t('Published', 'เผยแพร่')} />
                        <Field label={t('Publish date', 'วันที่เผยแพร่')}>
                            <TextInput type="date" value={form.publish_date} onChange={(e) => set('publish_date', e.target.value)} />
                        </Field>
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
