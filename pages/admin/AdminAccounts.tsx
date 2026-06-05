import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X, Loader2, ShieldCheck } from 'lucide-react';
import { pb, ADMINS, AdminRecord, pbErrorMessage } from '../../lib/pb';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Field, TextInput, Spinner } from './ui';

export const AdminAccounts: React.FC = () => {
    const { t } = useLanguage();
    const { admin } = useAuth();
    const [items, setItems] = useState<AdminRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(ADMINS).getFullList<AdminRecord>({ sort: 'email' });
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

    const remove = async (item: AdminRecord) => {
        if (item.id === admin?.id) return;
        if (!confirm(t('Remove this admin account?', 'ลบบัญชีผู้ดูแลนี้?'))) return;
        try {
            await pb.collection(ADMINS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    return (
        <div>
            <PageHeader
                title={t('Admin Accounts', 'บัญชีผู้ดูแล')}
                subtitle={t('People who can sign in to this back-office', 'ผู้ที่สามารถเข้าสู่ระบบหลังบ้านได้')}
                action={
                    <button
                        onClick={() => setCreating(true)}
                        className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('Add admin', 'เพิ่มผู้ดูแล')}
                    </button>
                }
            />

            {loading ? (
                <Spinner />
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <Card key={item.id} className="p-4 flex items-center gap-4">
                            <div className="p-2.5 bg-brand-50 dark:bg-brand-900/20 rounded-full text-brand-500">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-stone-800 dark:text-stone-100 truncate">{item.name || item.email}</p>
                                <p className="text-xs text-stone-400 truncate">{item.email}</p>
                            </div>
                            {item.id === admin?.id ? (
                                <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                                    {t('You', 'คุณ')}
                                </span>
                            ) : (
                                <button onClick={() => remove(item)} className="p-2 text-stone-500 hover:text-red-500 transition-colors" aria-label="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            {creating && <AccountForm onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); }} />}
        </div>
    );
};

const AccountForm: React.FC<{ onClose: () => void; onSaved: () => void }> = ({ onClose, onSaved }) => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (saving) return;
        if (password.length < 8) {
            setError(t('Password must be at least 8 characters.', 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'));
            return;
        }
        setSaving(true);
        setError('');
        try {
            // Note: `verified` can only be set by superusers, so we don't send it.
            // The admins collection doesn't enforce verification for login.
            await pb.collection(ADMINS).create({
                name: name.trim(),
                email: email.trim(),
                password,
                passwordConfirm: password,
            });
            onSaved();
        } catch (err) {
            setError(pbErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-md my-8">
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                    <h2 className="font-bold text-lg text-brand-900 dark:text-stone-100">{t('Add admin', 'เพิ่มผู้ดูแล')}</h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={submit} className="p-6 space-y-5">
                    <Field label={t('Name', 'ชื่อ')}>
                        <TextInput value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                    </Field>
                    <Field label={t('Email', 'อีเมล')}>
                        <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
                    </Field>
                    <Field label={t('Password', 'รหัสผ่าน')} hint={t('At least 8 characters', 'อย่างน้อย 8 ตัวอักษร')}>
                        <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
                    </Field>

                    {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors">
                            {t('Cancel', 'ยกเลิก')}
                        </button>
                        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-brand-900 dark:bg-brand-500 text-white rounded-lg hover:bg-brand-800 dark:hover:bg-brand-600 transition-colors disabled:opacity-60">
                            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {t('Create', 'สร้าง')}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
