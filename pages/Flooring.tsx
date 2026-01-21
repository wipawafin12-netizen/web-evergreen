import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const Flooring: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">

            <div className="flex flex-col md:flex-row h-screen max-h-[900px]">

                <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-white dark:bg-stone-800 z-10">
                    <div>

                        <h1 className="text-2xl md:text-2xl lg:text-2xl text-brand-900 dark:text-stone-100 mb-8 leading-[0.9]">
                            {t("Talking about", "พูดคุยเรื่อง")} <br /> {t("flooring.", "พื้นไม้")}
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 max-w-sm mb-12 text-sm leading-relaxed">
                            {t("It is a social lubricant or a dangerous stimulant? explore our collection of premium floorings designed for modern living.", "มันคือตัวเชื่อมความสัมพันธ์หรือสิ่งกระตุ้นที่อันตราย? สำรวจคอลเลกชันพื้นไม้พรีเมียมของเราที่ออกแบบมาเพื่อการอยู่อาศัยที่ทันสมัย")}
                        </p>
                        <a href="#collection" className="text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors dark:text-stone-100">
                            {t("Show Collection", "ดูคอลเลกชัน")}
                        </a>

                        <div className="flex gap-8 mt-24 text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
                            <span>{t("Modern", "ทันสมัย")}</span>
                            <span>{t("Classic", "คลาสสิก")}</span>
                            <span>{t("Minimal", "มินิมอล")}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-white dark:bg-stone-800 relative p-4 md:p-12 flex items-center justify-center">
                    <div className="relative w-full h-full overflow-hidden shadow-sm">
                        <img
                            src={PAGE_IMAGES.flooring.hero}
                            alt="Flooring Hero"
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>


            <div id="collection" className="bg-white dark:bg-stone-950 py-32 px-6">
                <div className="container mx-auto">
                    <h3 className="text-brand-900 dark:text-stone-100 font-serif text-3xl mb-16">{t("Signature Selection.", "คัดสรรพิเศษ")}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            ...PAGE_IMAGES.flooring.collection,
                            "public/fr.png"
                        ].map((imgUrl, i) => (
                            <Link key={i} to="/door" className="block bg-stone-50 dark:bg-stone-800 p-12 group hover:shadow-lg transition-all duration-500 relative overflow-hidden text-center cursor-pointer">
                                <div className="aspect-[3/4] bg-white dark:bg-stone-700 mb-8 flex items-center justify-center relative z-10 shadow-sm group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden rounded-3xl">
                                    <img src={imgUrl} alt={`Flooring ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-brand-900 dark:text-stone-100 font-mono text-lg mb-2">{t("The Flooring", "พื้นไม้รุ่น")} {i + 1}</h4>
                                    <p className="text-stone-500 dark:text-stone-400 text-xs tracking-widest uppercase">{t("Select Edition", "รุ่นคัดพิเศษ")}</p>
                                    <p className="text-sm font-serif text-brand-900 dark:text-stone-200 mt-2">
                                        ฿{[1890, 2200, 1950, 2400][i]?.toLocaleString() || "1,890"}
                                    </p>
                                    <div className="mt-4 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1 h-1 bg-stone-800 rounded-full"></div>
                                        <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                        <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


            <div className="container mx-auto py-32 px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-4xl mb-6 text-stone-900 dark:text-stone-100">{t("The House Blend.", "เดอะ เฮาส์ เบลนด์")}</h3>
                        <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed text-sm">
                            {t("Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum. Specialized flooring construction ensures longevity and style.", "เราใส่ใจในทุกรายละเอียด การก่อสร้างพื้นไม้แบบพิเศษช่วยให้มั่นใจได้ถึงอายุการใช้งานที่ยาวนานและสไตล์ที่โดดเด่น")}
                        </p>
                        <a href="#" className="text-xs uppercase underline dark:text-stone-100">{t("Read More", "อ่านเพิ่มเติม")}</a>
                    </div>
                    <div className="">
                        <div className="aspect-square bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden rounded-3xl">
                            <img src={PAGE_IMAGES.flooring.feature} alt="Flooring Feature" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
