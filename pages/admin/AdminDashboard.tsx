import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Images, LayoutGrid, Newspaper, Package, Building2, Settings, Users, ArrowRight } from 'lucide-react';
import { pb, NEWS, PRODUCTS, ADMINS, BANNERS, LEADS, LOGOS, HOME_CARDS } from '../../lib/pb';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card } from './ui';

type Counts = { leads?: number; newLeads?: number; banners?: number; cards?: number; news?: number; products?: number; logos?: number; admins?: number };

export const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();
    const [counts, setCounts] = useState<Counts>({});

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const [leads, newLeads, banners, cards, news, products, logos, admins] = await Promise.all([
                    pb.collection(LEADS).getList(1, 1),
                    pb.collection(LEADS).getList(1, 1, { filter: 'status = "new" || status = ""' }),
                    pb.collection(BANNERS).getList(1, 1),
                    pb.collection(HOME_CARDS).getList(1, 1),
                    pb.collection(NEWS).getList(1, 1),
                    pb.collection(PRODUCTS).getList(1, 1),
                    pb.collection(LOGOS).getList(1, 1),
                    pb.collection(ADMINS).getList(1, 1),
                ]);
                if (active) {
                    setCounts({
                        leads: leads.totalItems,
                        newLeads: newLeads.totalItems,
                        banners: banners.totalItems,
                        cards: cards.totalItems,
                        news: news.totalItems,
                        products: products.totalItems,
                        logos: logos.totalItems,
                        admins: admins.totalItems,
                    });
                }
            } catch {
                /* ignore — cards just show no count */
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    const cards: { to: string; icon: React.ElementType; label: string; count?: number; badge?: number }[] = [
        { to: '/admin/leads', icon: Inbox, label: t('Inquiries', 'กล่องข้อความ'), count: counts.leads, badge: counts.newLeads },
        { to: '/admin/banners', icon: Images, label: t('Homepage Banners', 'แบนเนอร์หน้าแรก'), count: counts.banners },
        { to: '/admin/cards', icon: LayoutGrid, label: t('Collection Cards', 'การ์ดคอลเลกชัน'), count: counts.cards },
        { to: '/admin/news', icon: Newspaper, label: t('News & Promotions', 'ข่าว/โปรโมชั่น'), count: counts.news },
        { to: '/admin/products', icon: Package, label: t('Products', 'สินค้า'), count: counts.products },
        { to: '/admin/logos', icon: Building2, label: t('Customer Logos', 'โลโก้ลูกค้า'), count: counts.logos },
        { to: '/admin/settings', icon: Settings, label: t('Site Settings', 'ตั้งค่าเว็บไซต์') },
        { to: '/admin/accounts', icon: Users, label: t('Admin Accounts', 'บัญชีผู้ดูแล'), count: counts.admins },
    ];

    return (
        <div>
            <PageHeader
                title={t('Dashboard', 'แดชบอร์ด')}
                subtitle={t('Manage your website content', 'จัดการเนื้อหาเว็บไซต์ของคุณ')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map(({ to, icon: Icon, label, count, badge }) => (
                    <Link key={to} to={to}>
                        <Card className="p-6 hover:border-brand-400 transition-colors h-full">
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg text-brand-500">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="flex items-center gap-2">
                                    {badge ? (
                                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-500 text-white">
                                            {badge} {t('new', 'ใหม่')}
                                        </span>
                                    ) : null}
                                    <span className="text-3xl font-bold text-brand-900 dark:text-stone-100">
                                        {count ?? '—'}
                                    </span>
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-medium text-stone-700 dark:text-stone-200">{label}</span>
                                <ArrowRight className="w-4 h-4 text-stone-400" />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
