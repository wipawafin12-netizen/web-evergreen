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
                                    className="w-full h-full object-cover rounded-sm shadow-md transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:rotate-1 animate-image-reveal"
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

                {/* Wood Color Shades Palette - Ultra Minimal */}
                <div className="mt-24 mb-32 border-t border-stone-200 dark:border-stone-800 pt-24">
                    <div className="text-center mb-16">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-2 block">
                            {t("Finishes", "เฉดสี")}
                        </span>
                        <h3 className="text-3xl font-serif text-brand-900 dark:text-stone-100">
                            {t("Available Tones", "โทนสีที่มีให้บริการ")}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 max-w-4xl mx-auto px-6">
                        {[
                            {
                                category: "Golden Tones",
                                colors: [
                                    { code: "#D9C6A7", label: "#D9C6A7" },
                                    { code: "#C8AD7F", label: "#C8AD7F" },
                                    { code: "#B5905E", label: "#B5905E" },
                                    { code: "#967249", label: "#967249" }
                                ]
                            },
                            {
                                category: "Reddish Tones",
                                colors: [
                                    { code: "#D49E80", label: "#D49E80" },
                                    { code: "#BF7A56", label: "#BF7A56" },
                                    { code: "#A05536", label: "#A05536" },
                                    { code: "#78361C", label: "#78361C" }
                                ]
                            },
                            {
                                category: "Light & Minimal",
                                colors: [
                                    { code: "#F2EBE0", label: "#F2EBE0" },
                                    { code: "#E6DCCA", label: "#E6DCCA" },
                                    { code: "#D8CABD", label: "#D8CABD" },
                                    { code: "#C4B6A6", label: "#C4B6A6" }
                                ]
                            },
                            {
                                category: "Deep & Dark",
                                colors: [
                                    { code: "#6B5B4E", label: "#6B5B4E" },
                                    { code: "#54433A", label: "#54433A" },
                                    { code: "#3E3029", label: "#3E3029" },
                                    { code: "#2A211D", label: "#2A211D" }
                                ]
                            }
                        ].map((group, idx) => (
                            <div key={idx} className="group-category">
                                <h4 className="font-serif text-lg text-brand-900 dark:text-stone-100 mb-6 border-b border-stone-200 dark:border-stone-800 pb-2">
                                    {group.category}
                                </h4>
                                <div className="grid grid-cols-4 gap-4">
                                    {group.colors.map((color, cIdx) => (
                                        <div key={cIdx} className="flex flex-col group cursor-pointer">
                                            <div
                                                className="w-full h-8 rounded-[2px] mb-3 transition-transform duration-300 origin-left group-hover:scale-x-110 relative overflow-hidden"
                                                style={{
                                                    backgroundColor: color.code,
                                                    backgroundImage: `
                                                        repeating-linear-gradient(90deg, rgba(50, 30, 10, 0.06) 0px, rgba(50, 30, 10, 0.06) 1px, transparent 1px, transparent 4px), 
                                                        repeating-linear-gradient(2deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 12px),
                                                        radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 80%)
                                                    `,
                                                    backgroundBlendMode: 'multiply'
                                                }}
                                            ></div>
                                            <span className="text-[9px] uppercase tracking-widest text-stone-500 dark:text-stone-400 font-mono opacity-70 group-hover:opacity-100 transition-opacity">
                                                {color.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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
