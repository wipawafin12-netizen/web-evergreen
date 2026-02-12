import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// TODO: Replace with your actual LINE Channel ID and Redirect URI
const LINE_CLIENT_ID = 'YOUR_LINE_CHANNEL_ID';
const LINE_REDIRECT_URI = encodeURIComponent(window.location.origin + '/affiliate/callback');
const LINE_STATE = 'affiliate_login';
const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${LINE_REDIRECT_URI}&state=${LINE_STATE}&scope=profile%20openid%20email`;

export const Affiliate: React.FC = () => {
    const { t } = useLanguage();

    const handleLineLogin = () => {
        window.location.href = LINE_LOGIN_URL;
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

                    {/* Right Column: LINE Login */}
                    <div className="animate-fade-in-up delay-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-brand-900 dark:text-stone-100 mb-3">
                                {t("Sign In", "ลงชื่อเข้าใช้")}
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                {t("Sign in to track your order status and receive special promotions.", "เข้าสู่ระบบเพื่อติดตามสถานะคำสั่งซื้อและรับโปรโมชั่นพิเศษ")}
                            </p>
                        </div>

                        <button
                            onClick={handleLineLogin}
                            className="w-full py-4 px-6 bg-[#06C755] hover:bg-[#05b54e] text-white rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-green-500/30"
                        >
                            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            {t("Sign in with LINE", "เข้าสู่ระบบด้วย LINE")}
                        </button>

                        <div className="relative my-8 text-center">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-stone-200 dark:bg-stone-700"></div>
                            <span className="relative bg-white dark:bg-stone-900 px-4 text-sm text-stone-400">
                                {t("Safe and fast", "ปลอดภัยและรวดเร็ว")}
                            </span>
                        </div>

                        <p className="text-center text-xs text-stone-400 dark:text-stone-500 leading-relaxed">
                            {t(
                                "By continuing, you agree to our Terms of Use and Privacy Policy.",
                                "การดำเนินการต่อแสดงว่าคุณยอมรับ ข้อกำหนดการใช้งาน และ นโยบายความเป็นส่วนตัว"
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
