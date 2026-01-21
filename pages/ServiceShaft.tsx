import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const ServiceShaft: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-[#FDFBF9] dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-300">
            {/* Hero Section - Split Layout */}
            {/* Hero Section - Redesigned */}
            <section className="min-h-screen px-4 py-4 md:p-6 flex items-center">
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                    {/* Left Image - Framed & Floating */}
                    <div className="relative h-[60vh] lg:h-[88vh] bg-stone-200 dark:bg-stone-800 rounded-[2.5rem] overflow-hidden order-1 shadow-sm">
                        <img
                            src={PAGE_IMAGES.serviceShaft.hero}
                            alt="Service Shaft Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Right Text - Left Aligned & Airy */}
                    <div className="flex flex-col justify-center order-2 lg:px-12 xl:px-20">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="h-px w-12 bg-stone-300 dark:bg-stone-700"></span>
                                <span className="text-[11px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 font-medium">
                                    {t("Concealed Functionality", "ฟังก์ชันที่ซ่อนอยู่")}
                                </span>
                            </div>

                            <h1 className="font-serif text-2xl md:text-4xl text-stone-900 dark:text-stone-50 leading-[1.1] mb-8">
                                {t("The invisible", "ความงาม")} <br />
                                <span className="block mt-2">{t("precision", "ที่ซ่อนเร้น")}</span>
                            </h1>

                            <p className="text-stone-600 dark:text-stone-300 text-base md:text-lg leading-relaxed mb-12 max-w-lg">
                                {t("We believe that utility should not compromise aesthetics. Our service shaft solutions are engineered to disappear, providing necessary access while maintaining the integrity of your interior design.", "เราเชื่อว่าประโยชน์ใช้สอยไม่ควรลดทอนความสวยงาม โซลูชันช่องชาร์ปของเราได้รับการออกแบบให้กลมกลืน ให้การเข้าถึงที่จำเป็นในขณะที่ยังรักษาความสมบูรณ์ของการออกแบบภายในของคุณ")}
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-10 py-5 rounded-full hover:bg-stone-700 dark:hover:bg-stone-200 transition-all duration-300"
                                >
                                    {t("Request Catalog", "ขอแคตตาล็อก")}
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 border-t border-stone-100 dark:border-stone-800">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">


                        <div className="md:col-span-4">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-4">
                                {t("The Concept", "แนวคิด")}
                            </p>
                            <h2 className="font-serif text-4xl text-stone-900 dark:text-stone-100 mb-6">
                                {t("Unseen Precision", "ความแม่นยำที่มองไม่เห็น")}
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-8">
                                {t("Every building requires complex systems to function—plumbing, electrical, ventilation. The challenge is to house them efficiently without disrupting the visual flow. Our aesthetic panels offer the perfect camouflage.", "อาคารทุกแห่งต้องการระบบที่ซับซ้อนในการทำงาน ไม่ว่าจะเป็นระบบประปา ไฟฟ้า หรือระบายอากาศ ความท้าทายคือการจัดเก็บอย่างมีประสิทธิภาพโดยไม่รบกวนสายตา แผ่นผนังที่สวยงามของเราคือการพรางตัวที่สมบูรณ์แบบ")}
                            </p>

                            <ul className="space-y-4 text-xs tracking-wide text-stone-600 dark:text-stone-400">
                                <li className="flex items-center gap-3">
                                    <span className="w-1 h-1 bg-brand-500 rounded-full"></span>
                                    {t("Seamless Integration", "การผสานรวมที่ไร้รอยต่อ")}
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1 h-1 bg-brand-500 rounded-full"></span>
                                    {t("Easy Maintenance Access", "เข้าถึงเพื่อบำรุงรักษาง่าย")}
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1 h-1 bg-brand-500 rounded-full"></span>
                                    {t("Sound Insulation", "ฉนวนกันเสียง")}
                                </li>
                            </ul>
                        </div>


                        <div className="md:col-span-8 grid grid-cols-2 gap-4 md:gap-8">
                            <div className="aspect-[3/4] bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-2xl">
                                <img
                                    src={PAGE_IMAGES.serviceShaft.collection[0]}
                                    alt="Detail 1"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 animate-image-reveal"
                                />
                            </div>
                            <div className="aspect-[3/4] bg-stone-100 dark:bg-stone-800 overflow-hidden rounded-2xl">
                                <img
                                    src={PAGE_IMAGES.serviceShaft.collection[1]}
                                    alt="Detail 2"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 animate-image-reveal"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom Section - Offerings */}
            <section className="py-24 px-6 md:px-12 bg-white dark:bg-stone-900">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-xl text-stone-300 block mb-4"></span>
                        <h3 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
                            {t("Technical Offerings", "ข้อเสนอทางเทคนิค")}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">

                        <div className="group">
                            <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
                                <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-2">01.</p>
                                <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-brand-500 transition-colors">
                                    {t("Flush Access Panels", "แผงช่องเซอร์วิสแบบฝัง")}
                                </h4>
                                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                    {t("Designed to sit perfectly flush with the surrounding wall, finished with the same material for total invisibility.", "ออกแบบมาให้เรียบไปกับผนังโดยรอบ ตกแต่งด้วยวัสดุเดียวกันเพื่อความแนบเนียนอย่างสมบูรณ์")}
                                </p>
                            </div>
                        </div>

                        {/* Offering 2 */}
                        <div className="group">
                            <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
                                <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-2">02.</p>
                                <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-brand-500 transition-colors">
                                    {t("Fire-Rated Risers", "ช่องชาร์ปกันไฟ")}
                                </h4>
                                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                    {t("Safety meets style. Certified fire-resistant materials that do not compromise on the high-end look of your project.", "ความปลอดภัยพบกับสไตล์ วัสดุกันไฟที่ผ่านการรับรองซึ่งไม่ลดทอนรูปลักษณ์ระดับไฮเอนด์ของโครงการคุณ")}
                                </p>
                            </div>
                        </div>

                        {/* Offering 3 */}
                        <div className="group">
                            <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
                                <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-2">03.</p>
                                <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-brand-500 transition-colors">
                                    {t("Acoustic Shafts", "ช่องชาร์ปกันเสียง")}
                                </h4>
                                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                    {t("Silence the noise of building systems with our acoustically dampened panels, perfect for residential zones.", "เงียบเสียงระบบอาคารด้วยแผงลดเสียงของเรา เหมาะสำหรับโซนที่พักอาศัย")}
                                </p>
                            </div>
                        </div>

                        {/* Offering 4 */}
                        <div className="group">
                            <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
                                <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-2">04.</p>
                                <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-brand-500 transition-colors">
                                    {t("Custom Finishes", "พื้นผิวสั่งทำพิเศษ")}
                                </h4>
                                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                    {t("From natural wood veneers to paintable primers, we supply the surface that matches your vision.", "ตั้งแต่วีเนียร์ไม้ธรรมชาติไปจนถึงสีรองพื้นทาสีได้ เราจัดหาพื้นผิวที่ตรงกับวิสัยทัศน์ของคุณ")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-20">
                        <Link
                            to="/services"
                            className="text-[10px] uppercase tracking-[0.2em] border-b border-stone-300 dark:border-stone-700 pb-1 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white text-stone-400 dark:text-stone-500 transition-all"
                        >
                            {t("View Full Specifications", "ดูข้อกำหนดทางเทคนิคทั้งหมด")}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
