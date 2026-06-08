import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImageOff, Star } from 'lucide-react';
import {
    pb,
    PRODUCTS,
    ProductRecord,
    ProductCategory,
    PRODUCT_CATEGORIES,
    CATEGORY_LABELS,
    fileUrl,
    pbErrorMessage,
} from '../../lib/pb';
import { compressImage } from '../../lib/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, TextArea, Toggle, Spinner, inputClass } from './ui';

const emptyForm = {
    name_en: '',
    name_th: '',
    category: 'door' as ProductCategory,
    description_en: '',
    description_th: '',
    spec_en: '',
    spec_th: '',
    featured: false,
    sort: 0,
    published: true,
};

type FormState = typeof emptyForm;

export const AdminProducts: React.FC = () => {
    const { language, t } = useLanguage();
    const [items, setItems] = useState<ProductRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<ProductRecord | null>(null);
    const [creating, setCreating] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(PRODUCTS).getFullList<ProductRecord>({ sort: 'category,sort,-created' });
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

    const remove = async (item: ProductRecord) => {
        if (!confirm(t('Delete this product? This cannot be undone.', 'ลบสินค้านี้? ไม่สามารถย้อนกลับได้'))) return;
        try {
            await pb.collection(PRODUCTS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const showForm = creating || editing !== null;

    return (
        <div>
            <PageHeader
                title={t('Products', 'สินค้า')}
                subtitle={t('Items shown on the public Catalog page', 'รายการที่แสดงในหน้าแคตตาล็อกสาธารณะ')}
                action={
                    <button
                        onClick={() => { setCreating(true); setEditing(null); }}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('New product', 'เพิ่มสินค้า')}
                    </button>
                }
            />

            {loading ? (
                <Spinner />
            ) : items.length === 0 ? (
                <Card className="p-12 text-center text-stone-500 dark:text-stone-400">
                    {t('No products yet. Add your first one.', 'ยังไม่มีสินค้า เพิ่มสินค้าแรกได้เลย')}
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden flex flex-col">
                            <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                                {item.images?.length ? (
                                    <img src={fileUrl(item, item.images[0], '400x300')} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageOff className="w-6 h-6 text-stone-300" />
                                )}
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
                                        {language === 'TH' ? CATEGORY_LABELS[item.category]?.th : CATEGORY_LABELS[item.category]?.en}
                                    </span>
                                    {item.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                                    {!item.published && <span className="text-[10px] text-stone-400">({t('Draft', 'ฉบับร่าง')})</span>}
                                </div>
                                <p className="font-bold text-stone-800 dark:text-stone-100 truncate">{item.name_th || item.name_en}</p>
                                <p className="text-xs text-stone-400 truncate mb-3">{item.name_en}</p>
                                <div className="mt-auto flex items-center justify-end gap-1">
                                    <button onClick={() => { setEditing(item); setCreating(false); }} className="p-2 text-stone-500 hover:text-brand-500 transition-colors" aria-label="Edit">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => remove(item)} className="p-2 text-stone-500 hover:text-red-500 transition-colors" aria-label="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {showForm && (
                <ProductForm
                    record={editing}
                    onClose={() => { setEditing(null); setCreating(false); }}
                    onSaved={() => { setEditing(null); setCreating(false); load(); }}
                />
            )}
        </div>
    );
};

const ProductForm: React.FC<{ record: ProductRecord | null; onClose: () => void; onSaved: () => void }> = ({ record, onClose, onSaved }) => {
    const { language, t } = useLanguage();
    const [form, setForm] = useState<FormState>(() =>
        record
            ? {
                name_en: record.name_en || '',
                name_th: record.name_th || '',
                category: record.category || 'door',
                description_en: record.description_en || '',
                description_th: record.description_th || '',
                spec_en: record.spec_en || '',
                spec_th: record.spec_th || '',
                featured: !!record.featured,
                sort: record.sort || 0,
                published: !!record.published,
            }
            : { ...emptyForm }
    );
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [removed, setRemoved] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

    const existingImages = (record?.images || []).filter((img) => !removed.includes(img));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);
        setError('');
        try {
            const data = new FormData();
            data.append('name_en', form.name_en.trim());
            data.append('name_th', form.name_th.trim());
            data.append('category', form.category);
            data.append('description_en', form.description_en);
            data.append('description_th', form.description_th);
            data.append('spec_en', form.spec_en.trim());
            data.append('spec_th', form.spec_th.trim());
            data.append('featured', String(form.featured));
            data.append('published', String(form.published));
            data.append('sort', String(form.sort || 0));
            for (const f of newFiles) data.append('images', await compressImage(f));
            removed.forEach((filename) => data.append('images-', filename));

            if (record) {
                await pb.collection(PRODUCTS).update(record.id, data);
            } else {
                await pb.collection(PRODUCTS).create(data);
            }
            onSaved();
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl my-8">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900 rounded-t-xl">
                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100">
                        {record ? t('Edit product', 'แก้ไขสินค้า') : t('New product', 'เพิ่มสินค้า')}
                    </h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label={t('Name (TH)', 'ชื่อ (ไทย)')}>
                            <TextInput value={form.name_th} onChange={(e) => set('name_th', e.target.value)} required maxLength={200} />
                        </Field>
                        <Field label={t('Name (EN)', 'ชื่อ (อังกฤษ)')}>
                            <TextInput value={form.name_en} onChange={(e) => set('name_en', e.target.value)} required maxLength={200} />
                        </Field>
                        <Field label={t('Category', 'หมวดหมู่')}>
                            <select
                                value={form.category}
                                onChange={(e) => set('category', e.target.value as ProductCategory)}
                                className={`${inputClass} appearance-none`}
                            >
                                {PRODUCT_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{language === 'TH' ? CATEGORY_LABELS[c].th : CATEGORY_LABELS[c].en}</option>
                                ))}
                            </select>
                        </Field>
                        <Field label={t('Sort order', 'ลำดับการแสดง')} hint={t('Lower numbers show first', 'ตัวเลขน้อยแสดงก่อน')}>
                            <TextInput type="number" value={form.sort} onChange={(e) => set('sort', Number(e.target.value))} />
                        </Field>
                        <Field label={t('Specs (TH)', 'สเปค (ไทย)')}>
                            <TextInput value={form.spec_th} onChange={(e) => set('spec_th', e.target.value)} maxLength={500} />
                        </Field>
                        <Field label={t('Specs (EN)', 'สเปค (อังกฤษ)')}>
                            <TextInput value={form.spec_en} onChange={(e) => set('spec_en', e.target.value)} maxLength={500} />
                        </Field>
                        <Field label={t('Description (TH)', 'รายละเอียด (ไทย)')}>
                            <TextArea rows={4} value={form.description_th} onChange={(e) => set('description_th', e.target.value)} />
                        </Field>
                        <Field label={t('Description (EN)', 'รายละเอียด (อังกฤษ)')}>
                            <TextArea rows={4} value={form.description_en} onChange={(e) => set('description_en', e.target.value)} />
                        </Field>
                    </div>

                    <Field label={t('Images', 'รูปภาพ')} hint={t('Up to 8 images, 5 MB each. First image is the cover.', 'สูงสุด 8 รูป รูปละไม่เกิน 5 MB รูปแรกเป็นภาพปก')}>
                        <div className="flex flex-wrap gap-3 mb-3">
                            {record && existingImages.map((img) => (
                                <div key={img} className="relative w-20 h-20">
                                    <img src={fileUrl(record, img, '200x200')} alt="" className="w-20 h-20 rounded-lg object-cover border border-stone-200 dark:border-stone-700" />
                                    <button type="button" onClick={() => setRemoved((r) => [...r, img])} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5" aria-label="Remove">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {newFiles.map((f, i) => (
                                <div key={i} className="relative w-20 h-20">
                                    <img src={URL.createObjectURL(f)} alt="" className="w-20 h-20 rounded-lg object-cover border border-brand-300" />
                                    <button type="button" onClick={() => setNewFiles((arr) => arr.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5" aria-label="Remove">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            multiple
                            onChange={(e) => { setNewFiles((arr) => [...arr, ...Array.from(e.target.files || [])]); e.target.value = ''; }}
                            className="text-sm text-stone-600 dark:text-stone-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-600 file:text-xs file:font-bold hover:file:bg-brand-100"
                        />
                    </Field>

                    <div className="flex flex-wrap items-center gap-6">
                        <Toggle checked={form.published} onChange={(v) => set('published', v)} label={t('Published', 'เผยแพร่')} />
                        <Toggle checked={form.featured} onChange={(v) => set('featured', v)} label={t('Featured', 'สินค้าแนะนำ')} />
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
