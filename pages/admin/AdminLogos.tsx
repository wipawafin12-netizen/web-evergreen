import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, ImageOff } from 'lucide-react';
import { pb, LOGOS, LogoRecord, LogoGroup, LOGO_GROUPS, LOGO_GROUP_LABELS, fileUrl, pbErrorMessage } from '../../lib/pb';
import { compressImage } from '../../lib/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, Toggle, Spinner, inputClass } from './ui';

const emptyForm = {
    name: '',
    group: 'developer' as LogoGroup,
    active: true,
    sort: 0,
};

type FormState = typeof emptyForm;

export const AdminLogos: React.FC = () => {
    const { language, t } = useLanguage();
    const [items, setItems] = useState<LogoRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<LogoRecord | null>(null);
    const [creating, setCreating] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(LOGOS).getFullList<LogoRecord>({ sort: 'group,sort,created' });
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

    const remove = async (item: LogoRecord) => {
        if (!confirm(t('Delete this logo?', 'ลบโลโก้นี้?'))) return;
        try {
            await pb.collection(LOGOS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const showForm = creating || editing !== null;

    return (
        <div>
            <PageHeader
                title={t('Customer Logos', 'โลโก้ลูกค้า')}
                subtitle={t('Logos in the "trusted by" rows on the homepage', 'โลโก้ในแถบ "ได้รับความไว้วางใจจาก" บนหน้าแรก')}
                action={
                    <button
                        onClick={() => { setCreating(true); setEditing(null); }}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('New logo', 'เพิ่มโลโก้')}
                    </button>
                }
            />

            {loading ? (
                <Spinner />
            ) : items.length === 0 ? (
                <Card className="p-12 text-center text-stone-500 dark:text-stone-400">
                    {t(
                        'No logos yet. The homepage shows its built-in logo set. Once you add logos to a group, they replace the defaults for that group.',
                        'ยังไม่มีโลโก้ หน้าแรกแสดงชุดโลโก้ที่ติดมากับระบบ เมื่อเพิ่มโลโก้ในกลุ่มใด โลโก้ที่เพิ่มจะแทนที่ค่าเริ่มต้นของกลุ่มนั้น'
                    )}
                </Card>
            ) : (
                <div className="space-y-8">
                    {LOGO_GROUPS.map((group) => {
                        const groupItems = items.filter((i) => i.group === group);
                        return (
                            <div key={group}>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                                    {language === 'TH' ? LOGO_GROUP_LABELS[group].th : LOGO_GROUP_LABELS[group].en}
                                    <span className="ml-2 text-stone-300 dark:text-stone-600">({groupItems.length})</span>
                                </h2>
                                {groupItems.length === 0 ? (
                                    <p className="text-xs text-stone-400">{t('Using default logos for this group.', 'กำลังใช้โลโก้เริ่มต้นของกลุ่มนี้')}</p>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {groupItems.map((item) => (
                                            <Card key={item.id} className="p-3 flex flex-col">
                                                <div className="aspect-[3/2] bg-white dark:bg-stone-800 rounded-lg flex items-center justify-center p-3 mb-2 border border-stone-100 dark:border-stone-700">
                                                    {item.image ? (
                                                        <img src={fileUrl(item, item.image, '300x0')} alt={item.name} className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        <ImageOff className="w-5 h-5 text-stone-300" />
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="text-xs text-stone-500 dark:text-stone-400 truncate flex items-center gap-1">
                                                        {!item.active && <span className="w-1.5 h-1.5 rounded-full bg-stone-300" title={t('Hidden', 'ซ่อนอยู่')} />}
                                                        {item.name || '—'}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <button onClick={() => { setEditing(item); setCreating(false); }} className="p-1.5 text-stone-400 hover:text-brand-500 transition-colors" aria-label="Edit">
                                                            <Pencil className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button onClick={() => remove(item)} className="p-1.5 text-stone-400 hover:text-red-500 transition-colors" aria-label="Delete">
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {showForm && (
                <LogoForm
                    record={editing}
                    onClose={() => { setEditing(null); setCreating(false); }}
                    onSaved={() => { setEditing(null); setCreating(false); load(); }}
                />
            )}
        </div>
    );
};

const LogoForm: React.FC<{ record: LogoRecord | null; onClose: () => void; onSaved: () => void }> = ({ record, onClose, onSaved }) => {
    const { language, t } = useLanguage();
    const [form, setForm] = useState<FormState>(() =>
        record
            ? { name: record.name || '', group: record.group || 'developer', active: !!record.active, sort: record.sort || 0 }
            : { ...emptyForm }
    );
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (saving) return;
        if (!record && !imageFile) {
            setError(t('Please choose a logo image.', 'กรุณาเลือกไฟล์โลโก้'));
            return;
        }
        setSaving(true);
        setError('');
        try {
            const data = new FormData();
            data.append('name', form.name.trim());
            data.append('group', form.group);
            data.append('active', String(form.active));
            data.append('sort', String(form.sort || 0));
            if (imageFile) data.append('image', await compressImage(imageFile, { maxDimension: 600, format: 'image/png' }));

            if (record) {
                await pb.collection(LOGOS).update(record.id, data);
            } else {
                await pb.collection(LOGOS).create(data);
            }
            onSaved();
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const currentImage = record?.image ? fileUrl(record, record.image, '300x0') : '';
    const previewImage = imageFile ? URL.createObjectURL(imageFile) : currentImage;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-md my-8">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100">
                        {record ? t('Edit logo', 'แก้ไขโลโก้') : t('New logo', 'เพิ่มโลโก้')}
                    </h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    <Field label={t('Logo image', 'ไฟล์โลโก้')} hint={t('PNG/WebP/SVG, transparent background preferred, up to 2 MB', 'PNG/WebP/SVG พื้นหลังโปร่งใสจะดีที่สุด ไม่เกิน 2 MB')}>
                        <div className="space-y-3">
                            <div className="w-full aspect-[3/2] rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center p-4">
                                {previewImage ? (
                                    <img src={previewImage} alt="" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <ImageOff className="w-6 h-6 text-stone-300" />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="text-sm text-stone-600 dark:text-stone-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-600 file:text-xs file:font-bold hover:file:bg-brand-100"
                            />
                        </div>
                    </Field>

                    <Field label={t('Name', 'ชื่อ')} hint={t('For your reference only', 'สำหรับอ้างอิงภายในเท่านั้น')}>
                        <TextInput value={form.name} onChange={(e) => set('name', e.target.value)} maxLength={120} />
                    </Field>

                    <Field label={t('Group', 'กลุ่ม')}>
                        <select value={form.group} onChange={(e) => set('group', e.target.value as LogoGroup)} className={`${inputClass} appearance-none`}>
                            {LOGO_GROUPS.map((g) => (
                                <option key={g} value={g}>{language === 'TH' ? LOGO_GROUP_LABELS[g].th : LOGO_GROUP_LABELS[g].en}</option>
                            ))}
                        </select>
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
