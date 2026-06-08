import React, { useEffect, useState } from 'react';
import { Trash2, Phone, Mail, Building2, Calendar, MessageSquare, Inbox } from 'lucide-react';
import { pb, LEADS, LeadRecord, LeadStatus, pbErrorMessage } from '../../lib/pb';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card, Spinner } from './ui';

const STATUS_META: Record<LeadStatus, { en: string; th: string; cls: string }> = {
    new: { en: 'New', th: 'ใหม่', cls: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' },
    contacted: { en: 'Contacted', th: 'ติดต่อแล้ว', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    done: { en: 'Done', th: 'เสร็จสิ้น', cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

const STATUS_ORDER: LeadStatus[] = ['new', 'contacted', 'done'];

const formatDateTime = (value: string, locale: string) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const AdminLeads: React.FC = () => {
    const { language, t } = useLanguage();
    const locale = language === 'TH' ? 'th-TH' : 'en-US';
    const [items, setItems] = useState<LeadRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | LeadStatus>('all');

    const load = async () => {
        setLoading(true);
        try {
            const list = await pb.collection(LEADS).getFullList<LeadRecord>({ sort: '-created' });
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

    const setStatus = async (item: LeadRecord, status: LeadStatus) => {
        try {
            const updated = await pb.collection(LEADS).update<LeadRecord>(item.id, { status });
            setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const remove = async (item: LeadRecord) => {
        if (!confirm(t('Delete this inquiry? This cannot be undone.', 'ลบข้อความนี้? ไม่สามารถย้อนกลับได้'))) return;
        try {
            await pb.collection(LEADS).delete(item.id);
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        } catch (err) {
            alert(pbErrorMessage(err));
        }
    };

    const visible = filter === 'all' ? items : items.filter((i) => (i.status || 'new') === filter);
    const newCount = items.filter((i) => (i.status || 'new') === 'new').length;

    const tabs: { key: 'all' | LeadStatus; label: string }[] = [
        { key: 'all', label: t('All', 'ทั้งหมด') },
        { key: 'new', label: t('New', 'ใหม่') },
        { key: 'contacted', label: t('Contacted', 'ติดต่อแล้ว') },
        { key: 'done', label: t('Done', 'เสร็จสิ้น') },
    ];

    return (
        <div>
            <PageHeader
                title={t('Inquiries', 'กล่องข้อความ')}
                subtitle={t('Messages and factory-visit requests sent from the contact form', 'ข้อความและคำขอเข้าชมโรงงานที่ส่งมาจากฟอร์มติดต่อ')}
            />

            <div className="flex flex-wrap items-center gap-2 mb-5">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === tab.key ? 'bg-brand-500 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'}`}
                    >
                        {tab.label}
                        {tab.key === 'new' && newCount > 0 && (
                            <span className={`ml-1.5 ${filter === tab.key ? 'text-white' : 'text-brand-500'}`}>({newCount})</span>
                        )}
                    </button>
                ))}
            </div>

            {loading ? (
                <Spinner />
            ) : visible.length === 0 ? (
                <Card className="p-12 text-center text-stone-500 dark:text-stone-400">
                    <Inbox className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    {t('No inquiries here yet.', 'ยังไม่มีข้อความในหมวดนี้')}
                </Card>
            ) : (
                <div className="space-y-3">
                    {visible.map((item) => {
                        const status = (item.status || 'new') as LeadStatus;
                        return (
                            <Card key={item.id} className="p-5">
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-bold text-stone-800 dark:text-stone-100">{item.name}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_META[status].cls}`}>
                                                {language === 'TH' ? STATUS_META[status].th : STATUS_META[status].en}
                                            </span>
                                            {item.subject && (
                                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                                                    {item.subject}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-stone-400 mt-1">{formatDateTime(item.created, locale)}</p>
                                    </div>
                                    <button onClick={() => remove(item)} className="p-2 text-stone-400 hover:text-red-500 transition-colors" aria-label="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-stone-600 dark:text-stone-300">
                                    {item.phone && (
                                        <a href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-brand-500 transition-colors">
                                            <Phone className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" /> {item.phone}
                                        </a>
                                    )}
                                    {item.email && (
                                        <a href={`mailto:${item.email}`} className="flex items-center gap-2 hover:text-brand-500 transition-colors truncate">
                                            <Mail className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" /> <span className="truncate">{item.email}</span>
                                        </a>
                                    )}
                                    {item.company && (
                                        <span className="flex items-center gap-2">
                                            <Building2 className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" /> {item.company}
                                        </span>
                                    )}
                                    {item.visit_date && (
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                                            {item.visit_date} {item.visit_time}{item.visitors ? ` · ${item.visitors} ${t('visitors', 'ท่าน')}` : ''}
                                        </span>
                                    )}
                                </div>

                                {item.message && (
                                    <div className="mt-3 flex items-start gap-2 text-sm text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 rounded-lg p-3">
                                        <MessageSquare className="w-3.5 h-3.5 text-stone-400 flex-shrink-0 mt-0.5" />
                                        <p className="whitespace-pre-wrap">{item.message}</p>
                                    </div>
                                )}

                                <div className="mt-4 flex items-center gap-1.5">
                                    <span className="text-xs text-stone-400 mr-1">{t('Mark as:', 'เปลี่ยนสถานะ:')}</span>
                                    {STATUS_ORDER.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setStatus(item, s)}
                                            disabled={status === s}
                                            className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${status === s ? `${STATUS_META[s].cls} cursor-default` : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                                        >
                                            {language === 'TH' ? STATUS_META[s].th : STATUS_META[s].en}
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
