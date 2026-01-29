import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, CheckCircle2, DollarSign, Users, TrendingUp } from 'lucide-react';

export const Affiliate: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        url: '',
        type: 'individual' as 'individual' | 'company',
        agency: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Database logic removed
        console.log("Form submitted (Mock):", formData);

        if (isLoginMode) {
            alert(t("Login feature is currently unavailable.", "ระบบเข้าสู่ระบบยังไม่เปิดให้บริการในขณะนี้"));
        } else {
            setSubmitted(true);
            alert(t("Registration successful! (Demo Mode)", "ลงทะเบียนสำเร็จ! (โหมดทดสอบ)"));
            // Reset form after success
            setFormData({
                email: '',
                password: '',
                url: '',
                type: 'individual',
                agency: '',
                acceptTerms: false
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 transition-colors duration-300 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Welcome Text */}
                    <div className="lg:pr-12 animate-fade-in-up">
                        <span className="text-stone-400 font-medium tracking-[0.2em] text-sm uppercase mb-4 block">
                            {t("Welcome to", "ยินดีต้อนรับสู่")}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-brand-900 dark:text-stone-100 mb-6 leading-tight">
                            EVERGREEN <br />
                            <span className="text-[#FFAB40]">Affiliate</span>
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 text-lg leading-relaxed mb-8 max-w-md">
                            {t("The best income-generating assistant for content creators in Thailand. Join us to share premium architectural products.", "ตัวช่วยสร้างรายได้ให้แก่ผู้เผยแพร่คอนเทนต์ที่ดีที่สุดในประเทศไทย มาร่วมเป็นส่วนเนึ่งในการส่งต่อผลิตภัณฑ์สถาปัตยกรรมระดับพรีเมียม")}
                        </p>


                    </div>

                    {/* Right Column: Registration Form */}
                    <div className="bg-white dark:bg-stone-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 animate-fade-in-up delay-100">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-brand-900 dark:text-stone-100">
                                {isLoginMode ? t("Welcome Back", "ยินดีต้อนรับกลับ") : t("Join Evergreen Affiliate", "สมัคร Evergreen Affiliate")}
                            </h2>
                            <p className="text-xs text-stone-500 mt-2">
                                {isLoginMode ? t("Login to your account", "เข้าสู่ระบบบัญชีของคุณ") : t("Register via social or email", "สมัครผ่านโซเชียลหรืออีเมล")}
                            </p>
                        </div>

                        {/* Social Login Buttons (Mock) */}
                        <div className="space-y-3 mb-8">
                            <button className="w-full py-2.5 px-4 bg-[#FFAB40] text-white rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-[#FF9100] transition-colors text-sm">
                                <span className="font-bold">Facebook</span> {t("Continue with Facebook", "ดำเนินการต่อด้วย Facebook")}
                            </button>
                            <button className="w-full py-2.5 px-4 bg-white border border-stone-200 text-stone-700 rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-stone-50 transition-colors text-sm">
                                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                {t("Sign in with Google", "เข้าสู่ระบบด้วย Google")}
                            </button>
                        </div>

                        <div className="relative mb-8 text-center">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-stone-200 dark:bg-stone-800"></div>
                            <span className="relative bg-white dark:bg-stone-900 px-4 text-xs text-stone-400 uppercase tracking-widest">
                                {t("OR", "หรือ")}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t("Email", "อีเมล")}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder={t("Password", "รหัสผ่าน")}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-brand-500">
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>


                            {!isLoginMode && (
                                <>
                                    <div>
                                        <input
                                            type="text"
                                            name="url"
                                            placeholder={t("Social Media URL (Facebook, YouTube, etc.)", "ระบุ URL เว็บไซต์, Facebook, YouTube, อื่นๆ")}
                                            value={formData.url}
                                            onChange={handleInputChange}
                                            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            name="agency"
                                            value={formData.agency}
                                            onChange={handleInputChange}
                                            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        >
                                            <option value="" disabled>{t("Select Organization / Agency", "ท่านเป็น Affiliator จากหน่วยงาน/สังกัดใด")}</option>
                                            <option value="agency1">Agency A</option>
                                            <option value="agency2">Agency B</option>
                                            <option value="freelance">{t("Independent / Freelance", "อิสระ / ฟรีแลนซ์")}</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="individual"
                                                checked={formData.type === 'individual'}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                                            />
                                            <span className="text-sm text-stone-600 dark:text-stone-300">{t("Individual", "บุคคล")}</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="company"
                                                checked={formData.type === 'company'}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                                            />
                                            <span className="text-sm text-stone-600 dark:text-stone-300">{t("Company", "บริษัท")}</span>
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                                            className="mt-1 w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                                            required
                                        />
                                        <span className="text-xs text-stone-500 leading-relaxed">
                                            {t("By creating an account, you agree to our Terms of Use and Privacy Policy.", "ในการสร้างบัญชี หมายถึงคุณยอมรับเงื่อนไข ข้อตกลงการใช้งาน และ นโยบายส่วนบุคคล")}
                                        </span>
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-[#FFAB40] hover:bg-[#FF9100] text-white font-bold py-3.5 rounded-full transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/30"
                            >
                                {isLoginMode ? t("Login", "เข้าสู่ระบบ") : (submitted ? t("Registered Successfully!", "ลงทะเบียนสำเร็จ!") : t("Register Now", "ลงทะเบียน"))}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-stone-500 dark:text-stone-400 text-xs">
                                {isLoginMode ? t("Don't have an account?", "ยังไม่มีบัญชี?") : t("Already have an account?", "ฉันมีบัญชีผู้ใช้แล้ว")}
                                <button
                                    onClick={() => setIsLoginMode(!isLoginMode)}
                                    type="button"
                                    className="ml-1 text-[#FFAB40] font-bold hover:underline"
                                >
                                    {isLoginMode ? t("Register", "ลงทะเบียน") : t("Login", "เข้าสู่ระบบ")}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};
