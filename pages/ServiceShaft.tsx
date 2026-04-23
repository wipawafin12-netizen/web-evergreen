import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const ServiceShaft: React.FC = () => {
    const { t } = useLanguage();

    const heroImage = "/service-shaft/s.webp";

    const services = [
        {
            title: "OEM",
            description: "We capable to customize products suitable for clients' needs",
            descriptionTH: "เราสามารถปรับแต่งผลิตภัณฑ์ให้เหมาะสมกับความต้องการของลูกค้า",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4 8 4v14" />
                    <path d="M17 21v-8.5a2.5 2.5 0 0 0-5 0V21" />
                </svg>
            )
        },
        {
            title: "ODM",
            description: "We exclusively design and develop products together with our clients",
            descriptionTH: "เราออกแบบและพัฒนาผลิตภัณฑ์ร่วมกับลูกค้าของเราโดยเฉพาะ",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                </svg>
            )
        },
        {
            title: "One-Stop-Service",
            description: "We offering turnkey solution to client",
            descriptionTH: "เรานำเสนอโซลูชั่นแบบครบวงจรให้กับลูกค้า",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <path d="M14 14h7v7h-7z" />
                    <path d="M3 14h7v7h-7z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF9] dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-300">
            {/* Hero Section - Split Layout */}
            {/* Hero Section - Redesigned */}
            <section className="min-h-screen px-4 py-4 md:p-6 flex items-center">
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                    {/* Left Image - Framed & Floating */}
                    <div className="relative h-[60vh] lg:h-[88vh] bg-stone-200 dark:bg-stone-800 rounded-[2.5rem] overflow-hidden order-1 shadow-sm group">
                        <img
                            src={heroImage}
                            alt="Service Shaft Hero"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>

                    </div>

                    {/* Right Text - Left Aligned & Airy */}
                    <div className="flex flex-col justify-center order-2 lg:px-12 xl:px-20">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="h-px w-12 bg-stone-300 dark:bg-stone-700"></span>
                                <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 font-medium">
                                    {t("Concealed Functionality", "ฟังก์ชันที่ซ่อนอยู่")}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-4xl text-stone-900 dark:text-stone-50 leading-[1.1] mb-8">
                                {t("The invisible", "ความงาม")} <br />
                                <span className="block mt-2">{t("precision", "ที่สัมผัสได้")}</span>
                            </h1>

                            <p className="text-stone-600 dark:text-stone-300 text-base md:text-lg leading-relaxed mb-12 max-w-lg">
                                {t("We believe that utility should not compromise aesthetics. Our service shaft solutions are engineered to disappear, providing necessary access while maintaining the integrity of your interior design.", "เพราะเราเชื่อว่าประโยชน์ใช้สอย ไม่ควรลดทอนความสวยงาม โซลูชั่นช่องชาร์ปของเรา ได้รับการออกแบบให้กลมกลืนกับทุกพื้นที่อย่างลงตัว")}
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Link
                                    to="/quote"
                                    className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-10 py-5 rounded-full hover:bg-stone-700 dark:hover:bg-stone-200 transition-all duration-300"
                                >
                                    {t("Request Catalog", "ขอแคตตาล็อก")}
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Section - B2B Services */}
            <section className="py-24 px-6 md:px-12 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-left mb-12">
                        <h2 className="text-3xl md:text-5xl text-stone-900 dark:text-stone-100">
                            {t(" Services", "บริการ ")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-lg transition-all duration-500 ease-out flex flex-col gap-6 items-start"
                            >
                                <div className="w-16 h-16 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:text-white group-hover:bg-[#E64A19] transition-colors duration-500">
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-stone-900 dark:text-stone-100 text-xl font-bold mb-3 tracking-wide group-hover:text-[#E64A19] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                        {t(service.description, service.descriptionTH)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
