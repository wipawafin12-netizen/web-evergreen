import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

export const Staircase: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white min-h-screen text-brand-900 pt-12 pb-24 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">


            <div id="collection" className="bg-white dark:bg-stone-950 pt-16 pb-32 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row min-h-[500px] h-auto max-h-[900px] gap-12">
                        {/* Title and Section 1 Text Content */}
                        <div className="w-full md:w-1/2 flex flex-col items-start pt-12 md:pt-20 text-left">
                            <div className="mb-12 relative">
                                <div className="w-16 h-1 bg-orange-500 mb-8 rounded-full" />
                                <h1 className="text-4xl md:text-5xl text-brand-900 dark:text-stone-100 font-medium mb-4 tracking-tight">
                                    {t("Staircase Collection", "คอลเลกชันบันได")}
                                </h1>
                            </div>

                            <div className="space-y-8 max-w-md">
                                <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                    {t("Solid Rubberwood", "บันไดไม้จริง (ไม้ยางพารา)")}
                                </span>
                                <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Elegance & Cost-Effectiveness", "ความง่างามที่คุ้มค่า")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm pb-8 border-b border-stone-100 dark:border-stone-800">
                                    {t(
                                        "Experience the warm embrace of nature with each step. Modern design meets affordability without compromise.",
                                        "สัมผัสความอบอุ่นของธรรมชาติในทุกก้าวเดิน ด้วยดีไซน์ทันสมัยที่มาพร้อมความคุ้มค่าอย่างลงตัว"
                                    )}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("thickness", "ความหนา")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 font-mono">2 / 2.5 / 3 cm</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("features", "จุดเด่น")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">{t("butt / finger joint", "ต่อแบบ Butt / Finger Joint")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 1 Image */}
                        <div className="w-full md:w-1/2 flex items-start justify-center pt-12 md:pt-20">
                            <div className="relative w-full max-w-[450px] max-h-[600px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/staircase/w1.jpg" alt="Solid Staircase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Engineered Wood Staircase */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-32">
                        <div className="order-2 lg:order-1 flex items-start justify-center">
                            <div className="relative w-full max-w-[450px] max-h-[600px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/staircase/w3.jpg" alt="Engineered Staircase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                {t("Engineered Wood", "บันไดไม้เอ็นจิเนียร์")}
                            </span>
                            <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Nature's Luxury Touch", "สัมผัสหรูหราจากธรรมชาติ")}
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg pb-8 border-b border-stone-100 dark:border-stone-800">
                                {t(
                                    "A harmonious blend of nature's allure and timeless design, inviting you to ascend with grace.",
                                    "การผสมผสานที่ลงตัวระหว่างเสน่ห์ของธรรมชาติและดีไซน์ที่เหนือกาลเวลา"
                                )}
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("veneer", "ผิวหน้าไม้")}</h4>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">{t("oak, walnut, teak", "โอ๊ค, วอลนัท, สัก")}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("finish", "การเคลือบผิว")}</h4>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">UV Coating</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: WPC Staircase */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-32">
                        <div className="space-y-8">
                            <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                {t("WPC Staircase", "บันได WPC")}
                            </span>
                            <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Seamless Integration", "การเชื่อมต่อที่ไร้รอยต่อ")}
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm pb-8 border-b border-stone-100 dark:border-stone-800">
                                {t(
                                    "Innovation meets elegance, perfectly integrating with SPC floors for a unified interior design.",
                                    "นวัตกรรมที่มาพร้อมความสวยงาม ออกแบบมาให้กลมกลืนกับพื้น SPC ได้อย่างสมบูรณ์แบบ"
                                )}
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("durability", "ความทนทาน")}</h4>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">{t("wear-resistant", "ทนทานต่อการใช้งาน")}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("eco", "เป็นมิตรต่อสิ่งแวดล้อม")}</h4>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">Eco-Friendly</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start justify-center">
                            <div className="relative w-full max-w-[450px] max-h-[600px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/staircase/w2.jpg" alt="WPC Staircase" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
