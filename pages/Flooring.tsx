import React, { useState, useEffect } from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const Flooring: React.FC = () => {
    const { t } = useLanguage();

    const heroImages = [
        "/Flooring/fr04.png",
        "/Flooring/fr01.jpg",
        "/Flooring/fr02.png",
        "/Flooring/fr03.png"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">

            <div className="flex flex-col md:flex-row min-h-[600px] h-auto max-h-[900px]">

                <div className="w-full md:w-1/2 flex items-start justify-center px-12 md:px-24 pt-8 md:pt-12 bg-white dark:bg-stone-800 z-10 text-left">
                    <div className="max-w-md">

                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-brand-900 dark:text-stone-100 mb-8 leading-tight font-medium">
                            {t("Elevate Spaces with Enduring Elegance", "ยกระดับพื้นที่ด้วยความสง่างามที่ยั่งยืน")}
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 mb-12 text-sm leading-relaxed">
                            {t("Durable, luxurious, and elegantly crafted, SPC Flooring redefines your spaces with lasting beauty. Introducing SPC Flooring, a modern marvel that combines durability, luxury, and timeless design.", "พื้น SPC มีความทนทาน หรูหรา และได้รับการออกแบบอย่างประณีต ช่วยเปลี่ยนโฉมพื้นที่ของคุณด้วยความงามที่ยั่งยืน ขอแนะนำพื้น SPC นวัตกรรมสมัยใหม่ที่ผสานความทนทาน ความหรูหรา และการออกแบบเหนือกาลเวลา")}
                        </p>
                        <a href="#collection" className="text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors dark:text-stone-100">
                            {t("Show Collection", "ดูคอลเลกชัน")}
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-white dark:bg-stone-800 relative flex items-start justify-center pt-8 md:pt-12">
                    <div className="relative w-full h-full max-w-[500px] max-h-[650px] aspect-[4/5] overflow-hidden shadow-2xl rounded-3xl group">
                        {heroImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Flooring Hero ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {heroImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div id="collection" className="bg-white dark:bg-stone-950 py-32 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="mb-24 relative">
                        <div className="w-16 h-1 bg-orange-500 mb-8 rounded-full" />
                        <h2 className="text-4xl md:text-5xl text-brand-900 dark:text-stone-100 font-medium mb-12 tracking-tight">
                            {t("Flooring Collection", "คอลเลกชันพื้นไม้")}
                        </h2>
                    </div>

                    <div className="space-y-40">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8">
                                <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                    {t("Engineered Wood", "พื้นไม้เอ็นจิเนียร์")}
                                </span>
                                <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Creative Elegance", "ความสง่างามเชิงสร้างสรรค์")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg pb-8 border-b border-stone-100 dark:border-stone-800">
                                    {t(
                                        "Experience the warmth of traditional hardwood where real wood meets modern craftsmanship.",
                                        "สัมผัสความอบอุ่นของไม้จริงที่ผสานกับงานฝีมือสมัยใหม่"
                                    )}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("sizes", "ขนาด")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 font-mono">12 / 15 mm</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("species", "ไม้")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">{t("oak, walnut, teak", "โอ๊ค, วอลนัท, สัก")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/Flooring/fr02.png" alt="Engineered Wood" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/Flooring/fr01.jpg" alt="Laminate Floor" className="w-full h-full object-cover" />
                            </div>
                            <div className="order-1 lg:order-2 space-y-8">
                                <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                    {t("Laminate Flooring", "พื้นไม้ลามิเนต")}
                                </span>
                                <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Modern Durability", "ความทนทานที่ทันสมัย")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg pb-8 border-b border-stone-100 dark:border-stone-800">
                                    {t(
                                        "Designed for durability, our laminate flooring thrives in humid climates with moisture-resistant protection.",
                                        "ออกแบบเพื่อความทนทาน พร้อมการเคลือบป้องกันความชื้นพิเศษ"
                                    )}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("thickness", "ความหนา")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 font-mono">8 / 12 mm</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("rating", "ระดับ")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">AC3 / AC5</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8">
                                <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                    {t("SPC Flooring", "พื้นไม้ SPC")}
                                </span>
                                <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Enduring Beauty", "ความงามที่ยั่งยืน")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg pb-8 border-b border-stone-100 dark:border-stone-800">
                                    {t(
                                        "Modern SPC flooring that combines water-resistant durability with timeless wood patterns.",
                                        "พื้น SPC ทันสมัยที่รวมคุณสมบัติกันน้ำเข้ากับลวดลายไม้ที่สวยงาม"
                                    )}
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("features", "จุดเด่น")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">{t("100% water resistant", "กันน้ำ 100%")}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("installation", "การติดตั้ง")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400">{t("click lock system", "ระบบคลิกล็อก")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <img src="/Flooring/fr03.png" alt="SPC Floor" className="w-full h-full object-cover" />
                            </div>
                        </div>

                    </div>


                    <div className="mt-40 pt-20 border-t border-stone-100 dark:border-stone-800">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="order-2 lg:order-1 space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: t("Aluminum Joint", "รอยต่ออลูมิเนียม"), img: "/Flooring/25002.png" },
                                        { label: t("Seamless Flat Joint", "รอยต่อแบบเรียบ"), img: "/Flooring/25001.png" },
                                        { label: t("U Shape Groove", "ร่องรูปตัว U"), img: "/Flooring/25003.jpg" }
                                    ].map((join, idx) => (
                                        <div key={idx} className="text-center group">
                                            <div className="aspect-square bg-white dark:bg-stone-900 rounded-2xl mb-4 overflow-hidden border border-stone-200 dark:border-stone-800 p-4">
                                                <img src={join.img} alt={join.label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{join.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest border-b border-stone-200 dark:border-stone-800 pb-2">
                                        {t("Colors", "โทนสี")}
                                    </h4>
                                    <div className="flex gap-4 items-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-[#E5E5E5] shadow-inner border border-stone-200" />
                                            <span className="text-[10px] font-mono text-stone-400 tracking-tighter">WAS033</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-[#8E8E8E] shadow-inner border border-stone-200" />
                                            <span className="text-[10px] font-mono text-stone-400 tracking-tighter">WAS034</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-[#5E5E5E] shadow-inner border border-stone-200" />
                                            <span className="text-[10px] font-mono text-stone-400 tracking-tighter">WAS035</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 space-y-8">
                                <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                    {t("Technical Details", "รายละเอียดทางเทคนิค")}
                                </span>
                                <h3 className="text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                    {t("Installation & Specs", "การติดตั้งและสเปค")}
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { en: "Easy Installation with Click Lock System", th: "ติดตั้งง่ายด้วยระบบ Click Lock" },
                                        { en: "Various Design Matching SPC Floor", th: "ดีไซน์หลากหลายที่เข้ากับพื้น SPC" },
                                        { en: "Wear-Resistant & Waterproof", th: "ทนต่อการใช้งานและกันน้ำ" },
                                        { en: "Modern Design with U groove and V groove", th: "ดีไซน์ทันสมัยด้วยร่อง U และ V" },
                                        { en: "Flame Retardant", th: "คุณสมบัติไม่ลามไฟ" }
                                    ].map((spec, i) => (
                                        <div key={i} className="flex items-center gap-4 text-stone-600 dark:text-stone-300 border-b border-stone-100 dark:border-stone-800 pb-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                            <span className="text-base">{t(spec.en, spec.th)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
