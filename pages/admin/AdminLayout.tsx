import React from 'react';
import { NavLink, Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Inbox, Images, LayoutGrid, Newspaper, Package, Building2, Settings, Users, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        isActive
            ? 'bg-brand-500 text-white'
            : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
    }`;

export const AdminLayout: React.FC = () => {
    const { admin, isAuthed, logout } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    if (!isAuthed) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 md:min-h-screen bg-white dark:bg-stone-900 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 flex flex-col">
                <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-800">
                    <Link to="/" className="text-lg font-bold text-brand-900 dark:text-stone-100">
                        Evergreen <span className="text-brand-500">CMS</span>
                    </Link>
                    <p className="text-xs text-stone-400 mt-1 truncate">{admin?.email}</p>
                </div>

                <nav className="flex-1 p-3 space-y-1">
                    <NavLink to="/admin" end className={navLinkClass}>
                        <LayoutDashboard className="w-4 h-4" />
                        {t('Dashboard', 'แดชบอร์ด')}
                    </NavLink>
                    <NavLink to="/admin/leads" className={navLinkClass}>
                        <Inbox className="w-4 h-4" />
                        {t('Inquiries', 'กล่องข้อความ')}
                    </NavLink>
                    <NavLink to="/admin/banners" className={navLinkClass}>
                        <Images className="w-4 h-4" />
                        {t('Banners', 'แบนเนอร์')}
                    </NavLink>
                    <NavLink to="/admin/cards" className={navLinkClass}>
                        <LayoutGrid className="w-4 h-4" />
                        {t('Collection Cards', 'การ์ดคอลเลกชัน')}
                    </NavLink>
                    <NavLink to="/admin/news" className={navLinkClass}>
                        <Newspaper className="w-4 h-4" />
                        {t('News & Promotions', 'ข่าว/โปรโมชั่น')}
                    </NavLink>
                    <NavLink to="/admin/products" className={navLinkClass}>
                        <Package className="w-4 h-4" />
                        {t('Products', 'สินค้า')}
                    </NavLink>
                    <NavLink to="/admin/logos" className={navLinkClass}>
                        <Building2 className="w-4 h-4" />
                        {t('Customer Logos', 'โลโก้ลูกค้า')}
                    </NavLink>
                    <NavLink to="/admin/settings" className={navLinkClass}>
                        <Settings className="w-4 h-4" />
                        {t('Site Settings', 'ตั้งค่าเว็บไซต์')}
                    </NavLink>
                    <NavLink to="/admin/accounts" className={navLinkClass}>
                        <Users className="w-4 h-4" />
                        {t('Admin Accounts', 'บัญชีผู้ดูแล')}
                    </NavLink>
                </nav>

                <div className="p-3 border-t border-stone-100 dark:border-stone-800 space-y-1">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        {t('View site', 'ดูเว็บไซต์')}
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        {t('Sign out', 'ออกจากระบบ')}
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-5 md:p-8 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
};
