import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

export const Staircase: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-brand-50/30 dark:bg-stone-950 transition-colors duration-300">
            <div className="pt-32 pb-12 px-6 md:px-12">
                <h1 className="text-9xl font-serif text-brand-900 dark:text-white opacity-10 dark:opacity-5 -ml-4 pointer-events-none absolute top-20 select-none">

                </h1>
                <div className="flex justify-between items-end mb-32 relative z-10">
                    <h2 className="text-4xl md:text-5xl text-brand-900 dark:text-stone-100">{t("Staircase Collection", "คอลเลกชันบันได")}</h2>
                    <p className="text-stone-500 dark:text-stone-400 max-w-xs text-right hidden md:block">
                        {t("Explore our curated selection of fine staircase materials.", "สำรวจวัสดุบันไดที่เราคัดสรรมาอย่างดี")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Wood Types Grid */}
                    {[
                        {
                            name: "Makha",
                            description: "It has a beautiful, distinct wood grain with a light orange color. It can be used both indoors and outdoors, making it ideal for natural wood grain finishes.",
                            img: "public/Makha.png"
                        },
                        {
                            name: "Red",
                            description: "It is strong with a reddish wood tone and a distinct wood grain. It can be used both indoors and outdoors, making it suitable for natural wood grain finishes.",
                            img: "public/Red.png"
                        },
                        {
                            name: "Oak",
                            description: "It is strong, with a green-yellow wood tone that turns brown when exposed to sunlight. It can be used both indoors and outdoors, making it suitable for oil-based finishes.",
                            img: "public/Oak.png"
                        },
                        {
                            name: "Takian",
                            description: "It is strong, with a distinct wood grain and a light tone. It is suitable for indoor use and ideal for finishes that showcase the wood grain.",
                            img: "public/Tak.png"
                        }
                    ].map((wood, idx) => (
                        <div key={idx} className="flex flex-col text-center">
                            <div className="bg-transparent aspect-[4/3] mb-6 flex items-center justify-center overflow-hidden">
                                <img
                                    src={wood.img}
                                    alt={wood.name}
                                    className="w-full h-full object-cover rounded-sm shadow-md transition-transform duration-500 hover:scale-105 animate-image-reveal"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <h3 className="text-xl text-brand-900 dark:text-stone-100 mb-4">{t(wood.name, wood.name === "Makha" ? "ไม้มะค่า" : wood.name === "Red" ? "ไม้แดง" : wood.name === "Oak" ? "ไม้โอ๊ค" : "ไม้ตะเคียน")}</h3>
                            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                {t(wood.description, wood.name === "Makha" ? "มีลวดลายไม้ที่สวยงามชัดเจนและมีสีส้มอ่อน สามารถใช้ได้ทั้งภายในและภายนอก เหมาะสำหรับงานโชว์ลายไม้ธรรมชาติ" : wood.name === "Red" ? "มีความแข็งแรง โทนสีแดงและลายไม้ชัดเจน สามารถใช้ได้ทั้งภายในและภายนอก เหมาะสำหรับงานโชว์ลายไม้ธรรมชาติ" : wood.name === "Oak" ? "มีความแข็งแรง โทนสีเขียวเหลืองที่จะเปลี่ยนเป็นสีน้ำตาลเมื่อโดนแสงแดด สามารถใช้ได้ทั้งภายในและภายนอก เหมาะสำหรับงานทาสีน้ำมัน" : "มีความแข็งแรง ลายไม้ชัดเจนและโทนสีอ่อน เหมาะสำหรับใช้ภายในและงานโชว์ลายไม้")}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Specifications Section */}
                <div className="mt-32 border-t border-stone-200/60 dark:border-stone-800 pt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                        {/* Project Development */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-serif text-brand-900 dark:text-stone-100 mb-8">{t("For Project Development", "สำหรับโครงการพัฒนา")}</h3>
                            <div className="bg-white dark:bg-stone-900 p-8 md:p-12 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                                <h4 className="text-lg text-brand-900 dark:text-stone-100 mb-6">{t("Size", "ขนาด")}</h4>
                                <ul className="space-y-4 text-stone-600 dark:text-stone-400">
                                    <li className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                                        <span>{t("Standard", "มาตรฐาน")}</span>
                                        <span className="font-mono text-stone-500 dark:text-stone-400">2×4”, 2×5”</span>
                                    </li>
                                    <li className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                                        <span>{t("Special", "พิเศษ")}</span>
                                        <span className="font-mono text-stone-500 dark:text-stone-400">2×6”, 2×8”, 2×10”</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Interior */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-serif text-brand-900 dark:text-stone-100 mb-8">{t("For Interior", "สำหรับภายใน")}</h3>
                            <div className="bg-white dark:bg-stone-900 p-8 md:p-12 rounded-sm shadow-sm border border-stone-100 dark:border-stone-800 transition-colors">
                                <h4 className="text-lg text-brand-900 dark:text-stone-100 mb-6">{t("Size", "ขนาด")}</h4>
                                <ul className="space-y-4 text-stone-600 dark:text-stone-400">
                                    <li className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                                        <span>{t("Standard", "มาตรฐาน")}</span>
                                        <span className="font-mono text-stone-500 dark:text-stone-400">2×4”, 2×5”</span>
                                    </li>
                                    <li className="flex items-baseline justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                                        <span>{t("Special", "พิเศษ")}</span>
                                        <span className="font-mono text-stone-500 dark:text-stone-400">2×6”, 2×8”, 2×10”</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
