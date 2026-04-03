import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

export const Staircase: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white min-h-screen text-brand-900 pt-8 pb-12 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">


            <div id="collection" className="bg-white dark:bg-stone-950 pt-8 pb-16 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row h-auto gap-8">
                        {/* Title and Section 1 Text Content */}
                        <div className="w-full md:w-1/2 flex flex-col items-start pt-6 md:pt-10 text-left">
                            <div className="mb-6 relative">
                                <div className="w-12 h-0.5 bg-orange-500 mb-3 rounded-full" />
                                <h1 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium tracking-tight">
                                    {t("Staircase Collection", "คอลเลกชันบันได")}
                                </h1>
                            </div>

                            <div className="space-y-4 max-w-md">
                                <span className="text-[10px] font-medium text-orange-500 tracking-[0.2em] uppercase block">
                                    {t("Solid Rubberwood", "บันไดไม้จริง (ไม้ยางพารา)")}
                                </span>
                                <h3 className="text-xl md:text-2xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Elegance & Cost-Effectiveness", "ความง่างามที่คุ้มค่า")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm mb-4">
                                    {t(
                                        "Experience the warm embrace of nature with each step. Modern design meets affordability without compromise.",
                                        "สัมผัสความอบอุ่นของธรรมชาติในทุกก้าวเดิน ด้วยดีไซน์ทันสมัยที่มาพร้อมความคุ้มค่าอย่างลงตัว"
                                    )}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                                        <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">{t("thickness", "ความหนา")}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                            <p className="text-sm text-stone-600 dark:text-stone-300 font-mono">2 / 2.5 / 3 cm</p>
                                        </div>
                                    </div>
                                    <div className="p-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                                        <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">{t("features", "จุดเด่น")}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                            <p className="text-sm text-stone-600 dark:text-stone-300">{t("butt / finger joint", "ต่อแบบ Butt / Finger Joint")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 1 Image */}
                        <div className="w-full md:w-1/2 flex items-start justify-center pt-6 md:pt-10">
                            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                                <img src="/staircase/w1.webp" alt="Solid Staircase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Engineered Wood Staircase */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-12">
                        <div className="order-2 lg:order-1 flex items-start justify-center">
                            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                                <img src="/staircase/w3.webp" alt="Engineered Staircase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="mb-4">
                                <span className="text-[10px] font-medium text-orange-500 tracking-[0.2em] uppercase block mb-2">
                                    {t("Engineered Wood", "บันไดไม้เอ็นจิเนียร์")}
                                </span>
                                <h3 className="text-xl md:text-2xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Nature's Luxury Touch", "สัมผัสหรูหราจากธรรมชาติ")}
                                </h3>
                            </div>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm mb-4">
                                {t(
                                    "A harmonious blend of nature's allure and timeless design, inviting you to ascend with grace.",
                                    "การผสมผสานที่ลงตัวระหว่างเสน่ห์ของธรรมชาติและดีไซน์ที่เหนือกาลเวลา"
                                )}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                                    <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">{t("veneer", "ผิวหน้าไม้")}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                        <p className="text-sm text-stone-600 dark:text-stone-300">{t("oak, walnut, teak", "โอ๊ค, วอลนัท, สัก")}</p>
                                    </div>
                                </div>
                                <div className="p-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                                    <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">{t("finish", "การเคลือบผิว")}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                        <p className="text-sm text-stone-600 dark:text-stone-300">UV Coating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: WPC Staircase */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-12">
                        <div>
                            <div className="mb-4">
                                <span className="text-[10px] font-medium text-orange-500 tracking-[0.2em] uppercase block mb-2">
                                    {t("WPC Staircase", "บันได WPC")}
                                </span>
                                <h3 className="text-xl md:text-2xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Seamless Integration", "การเชื่อมต่อที่ไร้รอยต่อ")}
                                </h3>
                            </div>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm mb-4">
                                {t(
                                    "Innovation meets elegance, perfectly integrating with SPC floors for a unified interior design.",
                                    "นวัตกรรมที่มาพร้อมความสวยงาม ออกแบบมาให้กลมกลืนกับพื้น SPC ได้อย่างสมบูรณ์แบบ"
                                )}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                                    <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">{t("durability", "ความทนทาน")}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                        <p className="text-sm text-stone-600 dark:text-stone-300">{t("wear-resistant", "ทนทานต่อการใช้งาน")}</p>
                                    </div>
                                </div>
                                <div className="p-4 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                                    <h4 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">{t("eco", "เป็นมิตรต่อสิ่งแวดล้อม")}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                        <p className="text-sm text-stone-600 dark:text-stone-300">Eco-Friendly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start justify-center">
                            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                                <img src="/staircase/w2.webp" alt="WPC Staircase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
