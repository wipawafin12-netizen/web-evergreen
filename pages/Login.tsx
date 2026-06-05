import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { pbErrorMessage } from '../lib/pb';

export const Login: React.FC = () => {
    const { t } = useLanguage();
    const { login, isAuthed } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Already signed in -> go straight to the back-office.
    useEffect(() => {
        if (isAuthed) navigate('/admin', { replace: true });
    }, [isAuthed, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || loading) return;

        setLoading(true);
        setError('');
        try {
            await login(email.trim(), password);
            navigate('/admin', { replace: true });
        } catch (err) {
            setError(
                pbErrorMessage(
                    err,
                    t('Invalid email or password.', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
                )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-center items-center px-6 transition-colors duration-300">
            <div className="w-full max-w-md bg-white p-12 shadow-sm rounded-sm border border-stone-100 dark:bg-stone-900 dark:border-stone-800 transition-colors">
                <h1 className="text-3xl text-brand-900 dark:text-stone-100 mb-2 text-center">{t("Admin Sign In", "เข้าสู่ระบบผู้ดูแล")}</h1>
                <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-10">{t("Back-office access only", "สำหรับผู้ดูแลระบบเท่านั้น")}</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">{t("Email Address", "อีเมล")}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            required
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
                            autoComplete="current-password"
                            required
                            className="w-full bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 py-3 px-4 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-brand-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg px-4 py-3">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-900 dark:bg-stone-100 text-white dark:text-brand-900 font-bold py-3.5 rounded-lg hover:bg-brand-800 dark:hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>{loading ? t("Signing in...", "กำลังเข้าสู่ระบบ...") : t("Sign In", "เข้าสู่ระบบ")}</span>
                    </button>
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
