import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

export const Doorframe: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white min-h-screen text-brand-900 pt-12 pb-24 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">


            <div className="container mx-auto px-6 text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">
                    doorframe.
                </h1>

                <div className="flex justify-center gap-8 text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500">
                    <span>{t("New", "ใหม่")}</span>
                    <span>{t("Best Sellers", "ขายดี")}</span>
                    <span>{t("Collection", "คอลเลกชัน")}</span>
                </div>
            </div>


            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="max-w-md mx-auto md:mx-0">
                    <h2 className="text-3xl font-serif mb-6 leading-tight">
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
                    <div className="aspect-[4/5] bg-stone-50 dark:bg-stone-900 rounded-lg overflow-hidden relative">
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


            <div className="container mx-auto px-6">
                <h3 className="text-center font-serif text-2xl mb-12">
                    {t("Latest in Doorframe", "ล่าสุดในวงกบ")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PAGE_IMAGES.doorframe.collection.map((imgUrl, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="bg-stone-50 dark:bg-stone-800 aspect-square mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-stone-100 dark:bg-stone-700 group-hover:scale-105 transition-transform duration-500"></div>
                                <img
                                    src={imgUrl}
                                    alt={`Product ${i + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex justify-between items-start">
                                <div>

                                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                                        {t("Premium Grade", "เกรดพรีเมียม")}
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
