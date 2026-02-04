import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
            descTh: "กันน้ำ 100% ไม่ดูดซึม ไม่มีสารทำให้นิ่ม ช่วยเพิ่มความเสถียรและทนความร้อน"
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
        { code: "SPC011", img: "public/Flooring/SPC011.png" },
        { code: "SPC014", img: "public/Flooring/SPC014.jpg" },
        { code: "SPC012", img: "public/Flooring/SPC012.jpg" },
        { code: "SPC013", img: "public/Flooring/SPC013.jpg" },
        { code: "SPC015", img: "public/Flooring/SPC015.png" },
        { code: "SPC016", img: "public/Flooring/SPC016.png" },
        { code: "SPC017", img: "public/Flooring/SPC018.png" },
        { code: "SPC018", img: "public/Flooring/SPC019.png" },
    ];

    const flooringPatterns = [
        { en: "Brickwork", th: "แบบก่ออิฐ", pattern: "brickwork" },
        { en: "Chevron", th: "แบบ Chevron", pattern: "chevron" },
        { en: "Herringbone", th: "แบบก้างปลา", pattern: "herringbone" },
        { en: "Random", th: "แบบสุ่ม", pattern: "random" },
        { en: "Step", th: "แบบขั้นบันได", pattern: "step" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row min-h-[600px] h-auto max-h-[900px]">
                <div className="w-full md:w-1/2 flex items-start justify-center px-8 md:px-16 pt-6 md:pt-10 bg-white dark:bg-stone-800 z-10 text-left">
                    <div className="max-w-md">
                        <span className="text-xs font-medium text-orange-500 tracking-[0.2em] uppercase block mb-3">
                            {t("SPC Flooring", "พื้น SPC")}
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl text-brand-900 dark:text-stone-100 mb-2 leading-tight font-semibold">
                            Evergreen SPC Floor
                        </h1>
                        <h2 className="text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-4 font-light">
                            {t("Elevate Spaces with Enduring Elegance", "ยกระดับพื้นที่ด้วยความสง่างามที่ยั่งยืน")}
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm leading-relaxed">
                            {t(
                                "Durable, luxurious, and elegantly crafted, SPC Flooring redefines your spaces with lasting beauty. Experience a wide range of styles, from real wood-like patterns to captivating designs. With advantages like being budget-friendly, soundproof, and resistant to stains and water, SPC Flooring is more than just flooring; it's a canvas for your unique vision.",
                                "พื้น SPC มีความทนทาน หรูหรา และได้รับการออกแบบอย่างประณีต ช่วยเปลี่ยนโฉมพื้นที่ของคุณด้วยความงามที่ยั่งยืน สัมผัสสไตล์ที่หลากหลาย ตั้งแต่ลายไม้ธรรมชาติไปจนถึงดีไซน์ที่น่าหลงใหล ด้วยข้อดีมากมาย ทั้งราคาประหยัด เก็บเสียง และทนต่อคราบและน้ำ พื้น SPC จึงไม่ใช่แค่พื้น แต่เป็นผืนผ้าใบสำหรับวิสัยทัศน์ของคุณ"
                            )}
                        </p>
                        <a href="#product-details" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors dark:text-stone-100">
                            {t("View Details", "ดูรายละเอียด")}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
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
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {heroImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div id="product-details" className="bg-white dark:bg-stone-950 py-16 px-6">
                <div className="container mx-auto max-w-6xl">

                    {/* Product Structure */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-semibold">
                                SPC Structure
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
                                {t("Beautiful, durable and easy to clean", "พื้นสวย ทนและทำความสะอาดง่าย")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative">
                                <img
                                    src="/Flooring/fr03.png"
                                    alt="SPC Floor Structure"
                                    className="w-full rounded-2xl shadow-lg"
                                />
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

                    {/* Features */}
                    <div className="mb-20">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-600 flex items-center justify-center mb-2 group-hover:border-orange-400 transition-colors">
                                        {index === 0 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                            </svg>
                                        )}
                                        {index === 5 && (
                                            <svg className="w-5 h-5 text-stone-500 dark:text-stone-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
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
                    <div className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                    <div className="mb-20">
                        <div className="text-center mb-10">
                            <div className="w-12 h-0.5 bg-orange-500 mx-auto mb-4 rounded-full" />
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Color Options", "ตัวเลือกสี")}
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
                                {t("8 beautiful wood tones to match your style", "8 โทนสีไม้สวยงามให้เลือกตามสไตล์ของคุณ")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {colorOptions.map((color, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="aspect-[3/4] rounded-xl shadow-md group-hover:shadow-xl transition-all group-hover:scale-105 border-2 border-transparent group-hover:border-orange-400 overflow-hidden bg-stone-100 dark:bg-stone-800">
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
                        <div className="text-center mb-10">
                            <div className="w-12 h-0.5 bg-orange-500 mx-auto mb-4 rounded-full" />
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Flooring Patterns", "รูปแบบการปูพื้น")}
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
                                {t("Choose your preferred installation pattern", "เลือกรูปแบบการติดตั้งที่คุณชอบ")}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
                            {flooringPatterns.map((pattern, index) => (
                                <div key={index} className="group">
                                    <div className="aspect-square bg-white dark:bg-stone-900 rounded-xl border-2 border-stone-200 dark:border-stone-700 p-4 group-hover:border-orange-400 transition-colors overflow-hidden">
                                        {/* Pattern SVG illustrations */}
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            {pattern.pattern === 'brickwork' && (
                                                <g stroke="currentColor" strokeWidth="1" fill="none" className="text-stone-400 dark:text-stone-500">
                                                    <rect x="5" y="5" width="40" height="15" />
                                                    <rect x="50" y="5" width="45" height="15" />
                                                    <rect x="5" y="25" width="25" height="15" />
                                                    <rect x="35" y="25" width="40" height="15" />
                                                    <rect x="80" y="25" width="15" height="15" />
                                                    <rect x="5" y="45" width="40" height="15" />
                                                    <rect x="50" y="45" width="45" height="15" />
                                                    <rect x="5" y="65" width="25" height="15" />
                                                    <rect x="35" y="65" width="40" height="15" />
                                                    <rect x="80" y="65" width="15" height="15" />
                                                    <rect x="5" y="85" width="40" height="10" />
                                                    <rect x="50" y="85" width="45" height="10" />
                                                </g>
                                            )}
                                            {pattern.pattern === 'chevron' && (
                                                <g stroke="currentColor" strokeWidth="1" fill="none" className="text-stone-400 dark:text-stone-500">
                                                    <path d="M50 5 L95 25 L50 45 L5 25 Z" />
                                                    <path d="M50 25 L95 45 L50 65 L5 45 Z" />
                                                    <path d="M50 45 L95 65 L50 85 L5 65 Z" />
                                                    <path d="M50 65 L95 85 L50 100 L5 85 Z" />
                                                </g>
                                            )}
                                            {pattern.pattern === 'herringbone' && (
                                                <g stroke="currentColor" strokeWidth="1" fill="none" className="text-stone-400 dark:text-stone-500">
                                                    <path d="M10 20 L30 10 L30 30 L10 40 Z" />
                                                    <path d="M30 10 L50 20 L50 40 L30 30 Z" />
                                                    <path d="M50 20 L70 10 L70 30 L50 40 Z" />
                                                    <path d="M70 10 L90 20 L90 40 L70 30 Z" />
                                                    <path d="M10 40 L30 30 L30 50 L10 60 Z" />
                                                    <path d="M30 30 L50 40 L50 60 L30 50 Z" />
                                                    <path d="M50 40 L70 30 L70 50 L50 60 Z" />
                                                    <path d="M70 30 L90 40 L90 60 L70 50 Z" />
                                                    <path d="M10 60 L30 50 L30 70 L10 80 Z" />
                                                    <path d="M30 50 L50 60 L50 80 L30 70 Z" />
                                                    <path d="M50 60 L70 50 L70 70 L50 80 Z" />
                                                    <path d="M70 50 L90 60 L90 80 L70 70 Z" />
                                                </g>
                                            )}
                                            {pattern.pattern === 'random' && (
                                                <g stroke="currentColor" strokeWidth="1" fill="none" className="text-stone-400 dark:text-stone-500">
                                                    <rect x="5" y="5" width="30" height="12" />
                                                    <rect x="40" y="5" width="25" height="12" />
                                                    <rect x="70" y="5" width="25" height="12" />
                                                    <rect x="5" y="22" width="20" height="12" />
                                                    <rect x="30" y="22" width="35" height="12" />
                                                    <rect x="70" y="22" width="25" height="12" />
                                                    <rect x="5" y="39" width="40" height="12" />
                                                    <rect x="50" y="39" width="20" height="12" />
                                                    <rect x="75" y="39" width="20" height="12" />
                                                    <rect x="5" y="56" width="25" height="12" />
                                                    <rect x="35" y="56" width="30" height="12" />
                                                    <rect x="70" y="56" width="25" height="12" />
                                                    <rect x="5" y="73" width="35" height="12" />
                                                    <rect x="45" y="73" width="25" height="12" />
                                                    <rect x="75" y="73" width="20" height="12" />
                                                </g>
                                            )}
                                            {pattern.pattern === 'step' && (
                                                <g stroke="currentColor" strokeWidth="1" fill="none" className="text-stone-400 dark:text-stone-500">
                                                    <rect x="5" y="5" width="28" height="12" />
                                                    <rect x="38" y="5" width="28" height="12" />
                                                    <rect x="71" y="5" width="24" height="12" />
                                                    <rect x="5" y="22" width="28" height="12" />
                                                    <rect x="38" y="22" width="28" height="12" />
                                                    <rect x="71" y="22" width="24" height="12" />
                                                    <rect x="5" y="39" width="28" height="12" />
                                                    <rect x="38" y="39" width="28" height="12" />
                                                    <rect x="71" y="39" width="24" height="12" />
                                                    <rect x="5" y="56" width="28" height="12" />
                                                    <rect x="38" y="56" width="28" height="12" />
                                                    <rect x="71" y="56" width="24" height="12" />
                                                    <rect x="5" y="73" width="28" height="12" />
                                                    <rect x="38" y="73" width="28" height="12" />
                                                    <rect x="71" y="73" width="24" height="12" />
                                                </g>
                                            )}
                                        </svg>
                                    </div>
                                    <p className="text-center mt-3 text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-orange-500 transition-colors">
                                        {t(pattern.en, pattern.th)}
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
