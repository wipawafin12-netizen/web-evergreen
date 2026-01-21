import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

export const Doorframe: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white min-h-screen text-brand-900 pt-12 pb-24 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">


            <div className="container mx-auto px-6 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight text-[#E64A19]">
                    doorframe.
                </h1>

                <div className="flex justify-center gap-8 text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500">
                    <span>{t("New", "ใหม่")}</span>
                    <span>{t("Best Sellers", "ขายดี")}</span>
                    <span>{t("Collection", "คอลเลกชัน")}</span>
                </div>
            </div>


            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="max-w-md mx-auto md:mx-0 relative">

                    <div className="absolute -left-20 -top-20 -z-10 opacity-60 scale-[0.6] md:scale-75 pointer-events-none hidden md:block">
                        <div className="relative w-96 h-96">

                            <div className="absolute inset-0 bg-[#E6DCC5] rounded-full"></div>

                            <div className="absolute -top-4 right-1/3 w-24 h-24 bg-[#F2F0EB] rounded-full"></div>

                            <div className="absolute top-1/4 -left-8 w-20 h-20 bg-[#A68B6C] rounded-full"></div>

                            <div className="absolute bottom-1/4 -left-4 w-28 h-28 bg-[#7F6B5C] rounded-full"></div>

                            <div className="absolute top-1/2 -right-6 w-16 h-16 bg-[#2C2C2C] rounded-full"></div>

                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D3CDC5] rounded-full translate-y-4 translate-x-4"></div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif mb-6 leading-tight relative">
                        {t("Designed with a degree ", "ออกแบบด้วยดีกรีทาง")} <br />
                        <span className="italic text-stone-500 dark:text-stone-400"></span>
                    </h2>

                    <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-8">
                        {t("Minimalism has become part of our philosophy. This is not a tribute to fashion, but a conscious decision. We know that how a product looks is as important as how it feels.", "ความมินิมอลกลายเป็นส่วนหนึ่งของปรัชญาเรา นี่ไม่ใช่การตามแฟชั่น แต่เป็นการตัดสินใจอย่างมีสติ เรารู้ว่ารูปลักษณ์ของผลิตภัณฑ์มีความสำคัญพอๆ กับความรู้สึกที่ได้รับ")}
                    </p>

                    <button className="bg-stone-100 dark:bg-stone-800 text-brand-900 dark:text-stone-100 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                        {t("Discover", "ค้นพบ")}
                    </button>
                </div>

                <div className="relative">
                    <div className="aspect-[4/5] bg-stone-50 dark:bg-stone-900 rounded-3xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-stone-200 dark:text-stone-800 font-serif text-8xl opacity-20">

                        </div>

                        <img
                            src={PAGE_IMAGES.doorframe.hero}
                            alt="Doorframe"
                            className="object-cover w-full h-full"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>


            <section className="container mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-3 block">
                        {t("Finishes", "ผิวสัมผัส")}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif text-brand-900 dark:text-stone-100">
                        {t("The Palette", "ชุดสีที่เลือกสรร")}
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-4xl mx-auto">
                    {[
                        { name: "Depth Macadamia", code: "#7F6B5C", bg: "bg-[#7F6B5C]" },
                        { name: "Sophisticated Champagne", code: "#A68B6C", bg: "bg-[#A68B6C]" },
                        { name: "Mature Silk", code: "#E6DCC5", bg: "bg-[#E6DCC5]" },
                        { name: "Natural Tea with Milk", code: "#D3CDC5", bg: "bg-[#D3CDC5]" },
                        { name: "Minimal Rise", code: "#F2F0EB", bg: "bg-[#F2F0EB]" },
                        { name: "Accent Midnight", code: "#2C2C2C", bg: "bg-[#2C2C2C]" },
                        { name: "Cloudy Grey", code: "#AFAFAF", bg: "bg-[#AFAFAF]" },
                        { name: "Earthen Brown", code: "#6D4C41", bg: "bg-[#6D4C41]" },
                    ].map((color, idx) => (
                        <div key={idx} className="flex flex-col group cursor-pointer">
                            <div className={`h-8 w-full ${color.bg} mb-4 transition-transform duration-300 origin-left group-hover:scale-x-105`}></div>
                            <div>
                                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100 mb-1">
                                    {color.name}
                                </h4>
                                <span className="text-[10px] tracking-widest text-stone-400 font-mono">
                                    {color.code}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <div className="container mx-auto px-6">
                <h3 className="text-center font-serif text-2xl mb-12">
                    {t("Latest in Doorframe", "ล่าสุดในวงกบ")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PAGE_IMAGES.doorframe.collection.map((imgUrl, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="bg-stone-50 dark:bg-stone-800 aspect-square mb-4 relative overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-stone-100 dark:bg-stone-700 group-hover:scale-105 transition-transform duration-500"></div>
                                <img
                                    src={imgUrl}
                                    alt={`Product ${i + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex justify-between items-start mt-2">
                                <div>
                                    <p className="text-xs text-stone-500 dark:text-stone-400">
                                        {t("Premium Grade", "เกรดพรีเมียม")}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-serif text-brand-900 dark:text-stone-200">
                                        ฿{[2490, 3590, 2890, 3190][i]?.toLocaleString() || "2,490"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
