import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Flooring: React.FC = () => {
    const { t } = useLanguage();

    const heroImage = "/Flooring/fr04.webp";

    const productLayers = [
        {
            en: "UV Layer",
            th: "UV Layer",
            descEn: "Top coating layer that protects against UV rays, water stains, dirt, and fingerprints",
            descTh: "ชั้นเคลือบผิวบนสุด ป้องกันรังสี UV คราบน้ำ คราบสกปรก รอยนิ้วมือ"
        },
        {
            en: "Wear Layer",
            th: "Wear Layer",
            descEn: "Protects surface from scratches and moisture",
            descTh: "ปกป้องผิวจากรอยขีดข่วน และความชื้น"
        },
        {
            en: "Printing Layer",
            th: "Printing Layer",
            descEn: "High-definition wood grain film with realistic patterns and colors",
            descTh: "ชั้นฟิล์มลายไม้ความละเอียดสูง มีลายไม้และเฉดสีสมจริงให้เลือกหลากหลาย"
        },
        {
            en: "SPC Stone Core",
            th: "SPC Stone Core",
            descEn: "100% waterproof, non-absorbent, plasticizer-free, adds stability and heat resistance",
            descTh: "กันน้ำ 100% เพื่มความแข็งแรง และทนความร้อน"
        },
    ];

    const features = [
        { en: "Water Proof", th: "กันน้ำ" },
        { en: "Sun Resistant", th: "ทนแดด" },
        { en: "Flame Retardant", th: "ไม่ลามไฟ" },
        { en: "Scratch Resistant", th: "ทนรอยขีดข่วน" },
        { en: "Pet Friendly", th: "เหมาะกับสัตว์เลี้ยง" },
        { en: "Child Safe", th: "ปลอดภัยสำหรับเด็ก" },
    ];

    const specifications = [
        { label: { en: "Material", th: "วัสดุ" }, value: { en: "100% Virgin Material", th: "วัสดุบริสุทธิ์ 100%" } },
        { label: { en: "Wear Layer", th: "ชั้นป้องกัน" }, value: { en: "0.3 mm / 0.5 mm", th: "0.3 มม. / 0.5 มม." } },
        { label: { en: "Backing Pad", th: "แผ่นรอง" }, value: { en: "1 mm IXPE / 2 mm EVA (Optional)", th: "1 มม. IXPE / 2 มม. EVA (เลือกได้)" } },
        { label: { en: "Installation", th: "การติดตั้ง" }, value: { en: "Fast & Easy with Click Lock", th: "ง่ายและรวดเร็วด้วยระบบคลิกล็อก" } },
        { label: { en: "Properties", th: "คุณสมบัติ" }, value: { en: "Stain-Resistant", th: "ทนต่อคราบสกปรก" } },
        { label: { en: "Standard", th: "มาตรฐาน" }, value: { en: "European Standard EN 13329:2016", th: "มาตรฐานยุโรป EN 13329:2016" } },
    ];
 
    const colorOptions = [
        { code: "SPC011", img: "/Flooring/SPC011.webp" },
        { code: "SPC012", img: "/Flooring/SPC012.webp" },
        { code: "SPC013", img: "/Flooring/SPC013.webp" },
        { code: "SPC014", img: "/Flooring/SPC014.webp" },
        { code: "SPC015", img: "/Flooring/SPC015.webp" },
        { code: "SPC016", img: "/Flooring/SPC016.webp" },
        { code: "SPC018", img: "/Flooring/SPC018.webp" },
        { code: "SPC019", img: "/Flooring/SPC019.webp" },
    ];

    const flooringPatterns = [
        { en: "Brick", img: "/Flooring/brick-pattern.webp" },
        { en: "Chevron", img: "/Flooring/Chevron.webp" },
        { en: "Herringbone", img: "/Flooring/Herringbone.webp" },
        { en: "Random", img: "/Flooring/Random.webp" },
        { en: "Step", img: "/Flooring/Step.webp" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row min-h-[450px] h-auto max-h-[700px]">
                <div className="w-full md:w-1/2 flex items-start justify-center px-8 md:px-16 pt-6 md:pt-10 bg-white dark:bg-stone-800 z-10 text-left">
                    <div className="max-w-md">
                        <span className="text-xs font-medium text-orange-500 tracking-[0.2em] uppercase block mb-3">
                            {t("SPC Flooring", "พื้น SPC")}
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-brand-900 dark:text-stone-100 mb-2 leading-tight font-semibold">
                            Evergreen SPC Floor
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm leading-relaxed">
                            {t(
                                "Durable, luxurious, and elegantly crafted, SPC Flooring redefines your spaces with lasting beauty. Experience a wide range of styles, from real wood-like patterns to captivating designs. With advantages like being budget-friendly, soundproof, and resistant to stains and water, SPC Flooring is more than just flooring; it's a canvas for your unique vision.",
                                "พื้น SPC มีความทนทาน หรูหรา ด้วยการออกแบบอย่างประณีต ช่วยเปลี่ยนโฉมพื้นของคุณด้วยความงามที่ยั่งยืน สัมผัสสไตล์ที่หลากหลาย ตั้งแต่ลายไม้ธรรมชาติไปจนถึงดีไซน์ที่น่าหลงใหล ด้วยข้อดีมากมาย ทั้งราคาประหยัด และมีความแข็งแรง พร้อมทั้งทำความสะอาดได้อย่างง่ายดาย"
                            )}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-white dark:bg-stone-800 relative flex items-start justify-center pt-6 md:pt-8">
                    <div className="relative w-full h-full max-w-[300px] max-h-[380px] aspect-[4/5] overflow-hidden shadow-2xl rounded-3xl">
                        <img
                            src={heroImage}
                            alt="Flooring Hero"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div id="product-details" className="bg-white dark:bg-stone-950 py-10 px-6">
                <div className="container mx-auto max-w-6xl">

                    {/* Product Structure */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="relative max-w-[400px] mx-auto lg:mx-0">
                                <img
                                    src="/Flooring/fr03.webp"
                                    alt="SPC Floor Structure"
                                    className="w-full rounded-2xl shadow-lg"
                                />
                            </div>
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-semibold">
                                        SPC Structure
                                    </h2>
                                    <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
                                        {t("Beautiful, durable and easy to clean", "พื้นสวย ทนและทำความสะอาดง่าย")}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                {productLayers.map((layer, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-5 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-orange-300 dark:hover:border-orange-500 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-base font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-brand-900 dark:text-stone-100 font-semibold text-lg">{layer.en}</h4>
                                            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 leading-relaxed">
                                                {t(layer.descEn, layer.descTh)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-600 flex items-center justify-center mb-2 group-hover:border-orange-400 transition-colors">
                                        {index === 0 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.25c-1.5 3-6 7.5-6 11.25a6 6 0 0012 0c0-3.75-4.5-8.25-6-11.25z" />
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                            </svg>
                                        )}
                                        {index === 3 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        {index === 4 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle cx="5" cy="11" r="1.75" strokeWidth={1.5} />
                                                <circle cx="19" cy="11" r="1.75" strokeWidth={1.5} />
                                                <circle cx="9" cy="6" r="1.75" strokeWidth={1.5} />
                                                <circle cx="15" cy="6" r="1.75" strokeWidth={1.5} />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 13c-2.5 0-4.75 2.5-4.75 5 0 1.5 1.2 2.5 2.5 2.5.9 0 1.5-.4 2.25-.4s1.35.4 2.25.4c1.3 0 2.5-1 2.5-2.5 0-2.5-2.25-5-4.75-5z" />
                                            </svg>
                                        )}
                                        {index === 5 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle cx="12" cy="6" r="2.5" strokeWidth={1.5} />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.5 13.5a3.5 3.5 0 017 0v3h-1.5v4.5h-4v-4.5H8.5v-3z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-xs text-stone-600 dark:text-stone-400">
                                        {t(feature.en, feature.th)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Standard Size & Specifications */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Standard Size */}
                            <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-8 border border-stone-100 dark:border-stone-800">
                                <h3 className="text-xl font-medium text-brand-900 dark:text-stone-100 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </div>
                                    {t("Standard Size", "ขนาดมาตรฐาน")}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-800 rounded-xl">
                                        <span className="text-stone-500 dark:text-stone-400 text-sm">{t("Thickness", "ความหนา")}</span>
                                        <span className="text-brand-900 dark:text-stone-100 font-mono font-medium">4 mm</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-800 rounded-xl">
                                        <span className="text-stone-500 dark:text-stone-400 text-sm">{t("Standard Size", "ขนาดมาตรฐาน")}</span>
                                        <span className="text-brand-900 dark:text-stone-100 font-mono font-medium">183 x 1220 mm</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-800 rounded-xl">
                                        <span className="text-stone-500 dark:text-stone-400 text-sm">{t("Herringbone Pattern", "ลายก้างปลา")}</span>
                                        <span className="text-brand-900 dark:text-stone-100 font-mono font-medium">125 x 625 mm</span>
                                    </div>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-8 border border-stone-100 dark:border-stone-800">
                                <h3 className="text-xl font-medium text-brand-900 dark:text-stone-100 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    {t("Specification", "สเปค")}
                                </h3>
                                <div className="space-y-3">
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="flex items-start gap-3 pb-3 border-b border-stone-200 dark:border-stone-700 last:border-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <span className="text-stone-500 dark:text-stone-400 text-xs block">{t(spec.label.en, spec.label.th)}</span>
                                                <span className="text-brand-900 dark:text-stone-100 text-sm">{t(spec.value.en, spec.value.th)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color Options */}
                    <div className="mb-8">
                        <div className="text-center mb-6">
                            <div className="w-12 h-0.5 bg-orange-500 mx-auto mb-4 rounded-full" />
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Color Options", "ตัวเลือกสี")}
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
                                {t("8 beautiful wood tones to match your style", "8 โทนสีไม้สวยงามให้เลือกตามสไตล์ของคุณ")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 max-w-4xl mx-auto">
                            {colorOptions.map((color, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="aspect-[5/1] rounded-lg overflow-hidden group-hover:scale-105 transition-all">
                                        <img
                                            src={color.img}
                                            alt={color.code}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-center mt-2 text-xs font-mono text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors">
                                        {color.code}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flooring Patterns */}
                    <div>
                        <div className="text-center mb-6">
                            <div className="w-12 h-0.5 bg-orange-500 mx-auto mb-4 rounded-full" />
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Flooring Patterns", "รูปแบบการปูพื้น")}
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
                                {t("Choose your preferred installation pattern", "เลือกรูปแบบการติดตั้งที่คุณชอบ")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                            {flooringPatterns.map((pattern, index) => (
                                <div key={index} className="group">
                                    <div className="aspect-square bg-white dark:bg-stone-900 rounded-lg border-2 border-stone-200 dark:border-stone-700 p-3 group-hover:border-orange-400 transition-colors overflow-hidden flex items-center justify-center">
                                        <img
                                            src={pattern.img}
                                            alt={pattern.en}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <p className="text-center mt-3 text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-orange-500 transition-colors">
                                        {pattern.en}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
