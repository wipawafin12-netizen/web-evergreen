import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Login: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email && password) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-center items-center px-6 transition-colors duration-300">
            <div className="w-full max-w-md bg-white p-12 shadow-sm rounded-sm border border-stone-100 dark:bg-stone-900 dark:border-stone-800 transition-colors">
                <h1 className="text-3xl text-brand-900 dark:text-stone-100 mb-2 text-center">{t("Welcome Back", "ยินดีต้อนรับกลับ")}</h1>
                <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-10">{t("Sign in to your account", "ลงชื่อเข้าใช้บัญชีของคุณ")}</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">{t("Email Address", "อีเมล")}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 py-3 px-4 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">{t("Password", "รหัสผ่าน")}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 py-3 px-4 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>


                </form>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-xs text-stone-400 hover:text-brand-500 transition-colors border-b border-transparent hover:border-brand-500">
                        {t("Back to Home", "กลับสู่หน้าหลัก")}
                    </Link>
                </div>
            </div>
        </div>
    );
};
