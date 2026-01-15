import React, { useState } from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight, ChevronDown, ArrowRight } from 'lucide-react';

type FilterType = 'All' | 'New' | 'Best Sellers';

export const WallPanel: React.FC = () => {
    const { t } = useLanguage();
    const [openSpec, setOpenSpec] = useState(0);
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    // Combine images with mock categories for demonstration
    const wallPanelItems = PAGE_IMAGES.wallPanel.collection.map((url, index) => {
        // Assign categories based on index for demo purposes
        let categories: FilterType[] = ['All'];
        if (index === 0 || index === 2) categories.push('New');
        if (index === 1 || index === 3) categories.push('Best Sellers');

        return {
            id: `WP0${index + 1}`,
            url,
            categories
        };
    });

    const filteredItems = wallPanelItems.filter(item => item.categories.includes(activeFilter));

    const specializations = [
        {
            title: t("Designed with a degree", "ออกแบบด้วยดีกรี"),
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
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight font-serif">
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
                        <div key={item.id} className="group cursor-pointer animate-fade-in">
                            <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-900 overflow-hidden mb-4 relative">
                                <img
                                    src={item.url}
                                    alt={`Wall Panel ${item.id}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-center border-b border-stone-300 dark:border-stone-800 pb-3">
                                <span className="font-medium text-sm tracking-wide uppercase">#{item.id}</span>
                                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-black dark:text-stone-500 dark:group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Specialization Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-transparent">
                    <div className="lg:col-span-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">{t("Services", "บริการ")}</span>
                    </div>
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl md:text-4xl font-medium mb-12 font-serif">{t("Our specialization", "ความเชี่ยวชาญของเรา")}</h2>

                        <div className="flex gap-8 text-[11px] uppercase tracking-[0.1em] border-b border-stone-300 dark:border-stone-800 pb-4 mb-8">
                            <span className="pb-4 border-b border-black dark:border-white -mb-[17px] inline-block">{t("Interior Design", "ออกแบบภายใน")}</span>
                            <span className="text-stone-400">{t("Implementation", "การติดตั้ง")}</span>
                            <span className="text-stone-400">{t("Space Arrangement", "การจัดพื้นที่")}</span>
                        </div>

                        <div className="space-y-0">
                            {specializations.map((spec, index) => (
                                <div key={index} className="border-b border-stone-200 dark:border-stone-800">
                                    <button
                                        onClick={() => setOpenSpec(openSpec === index ? -1 : index)}
                                        className="w-full flex justify-between items-center py-6 text-left group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-stone-400">0{index + 1}</span>
                                            <span className="text-lg font-medium group-hover:pl-2 transition-all duration-300">{spec.title}</span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${openSpec === index ? 'rotate-180' : ''}`} />
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSpec === index ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-8 md:pl-10 pr-4">
                                            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed max-w-lg mb-6">
                                                {spec.content}
                                            </p>
                                            {spec.items.length > 0 && (
                                                <ul className="space-y-2">
                                                    {spec.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-center text-xs text-stone-600 dark:text-stone-300 uppercase tracking-wider">
                                                            <div className="w-1 h-1 bg-stone-400 rounded-full mr-3"></div>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16">
                            <button className="w-full bg-[#1a1a1a] dark:bg-stone-800 text-white py-5 uppercase text-xs tracking-[0.2em] hover:bg-stone-800 dark:hover:bg-stone-700 transition-colors flex justify-center items-center gap-2 group">
                                {t("Send Request", "ส่งคำขอ")}
                                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
