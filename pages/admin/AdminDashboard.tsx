import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Package, Users, ArrowRight } from 'lucide-react';
import { pb, NEWS, PRODUCTS, ADMINS } from '../../lib/pb';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader, Card } from './ui';

export const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();
    const [counts, setCounts] = useState<{ news?: number; products?: number; admins?: number }>({});

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const [news, products, admins] = await Promise.all([
                    pb.collection(NEWS).getList(1, 1),
                    pb.collection(PRODUCTS).getList(1, 1),
                    pb.collection(ADMINS).getList(1, 1),
                ]);
                if (active) {
                    setCounts({ news: news.totalItems, products: products.totalItems, admins: admins.totalItems });
                }
            } catch {
                /* ignore — cards just show no count */
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    const cards = [
        { to: '/admin/news', icon: Newspaper, label: t('News & Promotions', 'ข่าว/โปรโมชั่น'), count: counts.news },
        { to: '/admin/products', icon: Package, label: t('Products', 'สินค้า'), count: counts.products },
        { to: '/admin/accounts', icon: Users, label: t('Admin Accounts', 'บัญชีผู้ดูแล'), count: counts.admins },
    ];

    return (
        <div>
            <PageHeader
                title={t('Dashboard', 'แดชบอร์ด')}
                subtitle={t('Manage your website content', 'จัดการเนื้อหาเว็บไซต์ของคุณ')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map(({ to, icon: Icon, label, count }) => (
                    <Link key={to} to={to}>
                        <Card className="p-6 hover:border-brand-400 transition-colors h-full">
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg text-brand-500">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-3xl font-bold text-brand-900 dark:text-stone-100">
                                    {count ?? '—'}
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
