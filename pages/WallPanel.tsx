import React, { useState, useEffect } from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight, ChevronDown, ArrowRight } from 'lucide-react';

type FilterType = 'All' | 'New' | 'Best Sellers';

export const WallPanel: React.FC = () => {
    const { t } = useLanguage();
    const [openSpec, setOpenSpec] = useState(0);
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    const detailImages = [
        "/wall-panel/w02.png",
        "/Home%20Collections/01.png",
        "/our-company/01.png"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % detailImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);


    const prices = [3200, 2800, 3500, 2900, 3100];
    const wallPanelData = [
        { id: 'WP01', price: 3200, images: ["/wall-panel/w01.png", "/wall-panel/w02.png", "/wall-panel/w03.png"], categories: ['All', 'New'] },
        { id: 'WP02', price: 2800, images: ["/wall-panel/w04.png", "/wall-panel/w05.png", "/wall-panel/w01.png"], categories: ['All', 'Best Sellers'] },
        { id: 'WP03', price: 3500, images: ["/wall-panel/w02.png", "/wall-panel/w03.png", "/wall-panel/w04.png"], categories: ['All', 'New'] },
        { id: 'WP04', price: 2900, images: ["/wall-panel/w05.png", "/wall-panel/w01.png", "/wall-panel/w02.png"], categories: ['All', 'Best Sellers'] },
    ];

    const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>(
        Object.fromEntries(wallPanelData.map(item => [item.id, item.images[0]]))
    );

    const filteredItems = wallPanelData.filter(item => item.categories.includes(activeFilter));

    const specializations = [
        {
            title: t("Designed with a degree", "ออกแบบ"),
            content: t("Minimalism has become part of our philosophy. This is not a tribute to fashion, but a conscious decision. We know that how a product looks is as important as how it feels.", "ความมินิมอลกลายเป็นส่วนหนึ่งของปรัชญาเรา นี่ไม่ใช่การตามแฟชั่น แต่เป็นการตัดสินใจอย่างมีสติ เรารู้ว่ารูปลักษณ์ของผลิตภัณฑ์มีความสำคัญพอๆ กับความรู้สึกที่ได้รับ"),
            items: [
                t("Concept development", "การพัฒนาแนวคิด"),
                t("Sketch design", "การออกแบบร่าง"),
                t("3D-visualization", "ภาพจำลอง 3 มิติ")
            ]
        },
        {
            title: t("Premium Installation", "การติดตั้งแบบพรีเมียม"),
            content: t("Our installation service ensures perfect fitting and finish.", "บริการติดตั้งของเราช่วยให้มั่นใจได้ถึงความลงตัวและความเรียบร้อยสมบูรณ์แบบ"),
            items: []
        },
        {
            title: t("Customization", "การปรับแต่งตามความต้องการ"),
            content: t("Tailored solutions for your specific architectural needs.", "โซลูชันที่ปรับให้เหมาะสมกับความต้องการทางสถาปัตยกรรมเฉพาะของคุณ"),
            items: []
        }
    ];

    const FilterButton = ({ filter, label }: { filter: FilterType, label: string }) => (
        <div className="relative pb-2 cursor-pointer" onClick={() => setActiveFilter(filter)}>
            <span className={`${activeFilter === filter ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'} transition-colors`}>
                {label}
            </span>
            {activeFilter === filter && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black dark:bg-white transition-all duration-300"></span>
            )}
        </div>
    );

    return (
        <div className="bg-[#f0f0ed] min-h-screen text-[#1a1a1a] dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300 font-sans pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-stone-300 dark:border-stone-800 pb-4 mb-16">
                    <div className="mb-8 md:mb-0">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 block mb-2">{t("Products", "สินค้า")}</span>
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
                            {t("Wall Panel", "ผนังตกแต่ง")}
                        </h1>
                    </div>

                    <div className="flex gap-8 text-[11px] uppercase tracking-[0.1em] font-medium">
                        <FilterButton filter="All" label={t("All", "ทั้งหมด")} />
                        <FilterButton filter="New" label={t("New", "ใหม่")} />
                        <FilterButton filter="Best Sellers" label={t("Best Sellers", "ขายดี")} />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 mb-32 min-h-[500px]">
                    {filteredItems.map((item, i) => (
                        <div key={item.id} className="group animate-fade-in">
                            <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-900 overflow-hidden mb-4 relative rounded-2xl">
                                <img
                                    src={selectedImages[item.id]}
                                    alt={`Wall Panel ${item.id}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none"></div>

                                {/* Image Selector Overlays */}
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    {item.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImages(prev => ({ ...prev, [item.id]: img }));
                                            }}
                                            className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${selectedImages[item.id] === img ? 'border-orange-500 scale-110' : 'border-white/50 hover:border-white'
                                                } shadow-lg`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-b border-stone-300 dark:border-stone-800 pb-3">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm tracking-wide uppercase">#{item.id}</span>
                                    <span className="text-sm text-stone-600 dark:text-stone-400 mt-1">฿{item.price.toLocaleString()}</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-black dark:text-stone-500 dark:group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* WPC Wall Panels Content */}
                <div className="space-y-32">
                    {/* Header & Description */}
                    <div className="border-t border-stone-300 dark:border-stone-800 pt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8">
                                <span className="text-sm font-medium text-orange-500 tracking-widest block">
                                    {t("Evergreen WPC Wall Panels", "ผนังตกแต่ง WPC เอเวอร์กรีน")}
                                </span>
                                <h3 className="text-3xl md:text-5xl text-brand-900 dark:text-stone-100 font-medium tracking-tight">
                                    {t("Elevate Spaces with WPC Interior Wall Panels", "ยกระดับพื้นที่ด้วยผนังตกแต่งภายใน WPC")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg pb-8 border-b border-stone-200 dark:border-stone-800">
                                    {t(
                                        "Innovative wall panels that redefine elegance; seamlessly install, save time, and enjoy modern living with eco-friendly timber-like finish.",
                                        "นวัตกรรมแผ่นผนังที่เปลี่ยนนิยามความหรูหรา ติดตั้งอย่างไร้รอยต่อ ประหยัดเวลา และตอบโจทย์การอยู่อาศัยที่ทันสมัย"
                                    )}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("highlights", "จุดเด่น")}</h4>
                                        <ul className="text-sm space-y-2 text-stone-600 dark:text-stone-400">
                                            <li>• {t("termite-proof & waterproof", "กันปลวกและกันน้ำ")}</li>
                                            <li>• {t("uv-resistant & lightweight", "ทนทานต่อ uv และน้ำหนักเบา")}</li>
                                            <li>• {t("no painting required", "ไม่ต้องทาสีทับ")}</li>
                                            <li>• {t("hassle-free maintenance", "ดูแลรักษาง่าย")}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">{t("standard size", "ขนาดมาตรฐาน")}</h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 font-mono">8 mm. x 600 / 900 / 1200 mm. x 2800 mm.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                                {detailImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Wall Panel Detail ${index + 1}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                    {detailImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-orange-500 w-6' : 'bg-white/50'
                                                }`}
                                        />
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
