import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

export const Doorframe: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-brand-50/30 dark:bg-stone-950 transition-colors duration-300">
            <div className="pt-24 pb-8 px-6 md:px-12">
                <h1 className="text-9xl text-brand-900 dark:text-white opacity-10 dark:opacity-5 -ml-4 pointer-events-none absolute top-20 select-none">

                </h1>
                <div className="space-y-16">
                    {/* Section 1: Wooden Doorframe */}
                    <div className="border-b border-stone-200 dark:border-stone-800 pb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            <div>
                                <div className="w-12 h-0.5 bg-orange-500 mb-4 rounded-full" />
                                <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium mb-4 tracking-tight">
                                    {t("Evergreen Wooden Doorframe", "วงกบไม้จริง เอเวอร์กรีน")}
                                </h2>
                                <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                    <p className="text-stone-800 dark:text-stone-200 font-medium">
                                        {t("Crafted to Stand the Test of Time", "สร้างสรรค์ขึ้นเพื่อยืนหยัดผ่านการทดสอบของกาลเวลา")}
                                    </p>
                                    <p>
                                        {t(
                                            "Step into elegance with our Wooden Doorframe, a celebration of nature's charm and lasting strength. Echoing classic designs, these frames create spaces that stand as a testament to your refined taste, combining durability with timeless luxury.",
                                            "ก้าวเข้าสู่ความสง่างามด้วยวงกบไม้ของเรา การเฉลิมฉลองเสน่ห์ของธรรมชาติและความแข็งแกร่งที่ยาวนาน สะท้อนถึงการออกแบบที่คลาสสิกและสร้างพื้นที่ที่แสดงถึงรสนิยมอันประณีตของคุณ"
                                        )}
                                    </p>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Hardwood Species", "ประเภทไม้จริง")}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Makawood", "Redwood", "Takienwood", "Oak"].map((wood) => (
                                                <span key={wood} className="px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-full text-xs text-stone-600 dark:text-stone-400">
                                                    {t(wood, wood === "Makawood" ? "ไม้มะค่า" : wood === "Redwood" ? "ไม้แดง" : wood === "Takienwood" ? "ไม้ตะเคียน" : "ไม้โอ๊ค")}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Standard Sizes", "ขนาดมาตรฐาน")}</h4>
                                            <p className="font-mono text-xs text-stone-500">2\"x4\", 2\"x5\", 2\"x6\", 2\"x8\", 2\"x10\"</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Protection", "การป้องกัน")}</h4>
                                            <p className="text-xs text-stone-600 dark:text-stone-400">{t("Organic Insect Repellent", "สารสกัดธรรมชาติไล่แมลง")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                                <img src="public/doorframe/doorframe1.png" alt="Wooden Doorframe" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: WPC Doorframe */}
                    <div className="pb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            {/* Left: Image */}
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                                <img src="public/doorframe/doorframe2.png" alt="WPC Doorframe" className="w-full h-full object-cover" />
                            </div>

                            {/* Right: Content */}
                            <div>
                                <div className="w-12 h-0.5 bg-orange-500 mb-4 rounded-full" />
                                <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium mb-4 tracking-tight">
                                    {t("WPC Doorframe", "วงกบประตู WPC")}
                                </h2>
                                <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                                    <p className="text-stone-800 dark:text-stone-200 font-medium">
                                        {t("Innovation Meets Sustainability", "นวัตกรรมที่มาพร้อมกับความยั่งยืน")}
                                    </p>
                                    <p>
                                        {t(
                                            "Our WPC Doorframes aren't just durable and waterproof; they are termite-proof, flame retardant, and paintable. Perfect for both indoor and outdoor applications.",
                                            "วงกบประตู WPC ของเราไม่เพียงแต่ทนทานและกันน้ำ แต่ยังป้องกันปลวก ทนไฟ และสามารถทาสีทับได้ เหมาะสำหรับใช้งานทั้งภายในและภายนอก"
                                        )}
                                    </p>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Technical Specification", "ข้อมูลทางเทคนิค")}</h4>
                                        <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                {t("Base 7 cm / 9.5 cm", "ฐาน 7 ซม. / 9.5 ซม.")}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                {t("Suits 3.5 cm Door Thickness", "รองรับประตูหนา 3.5 ซม.")}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                {t("Fast Installation (Adjustable Architrave)", "ติดตั้งร่วมกับซับวงกบปรับระดับได้")}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                {t("Indoor & Outdoor Use", "ใช้ได้ทั้งภายในและภายนอก")}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Available Colors", "สีที่มีจำหน่าย")}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-full">
                                                <div className="w-4 h-4 rounded-full bg-white border border-stone-200 shadow-sm"></div>
                                                <span className="text-xs text-stone-600 dark:text-stone-400">{t("White", "สีขาว")}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-full">
                                                <div className="w-4 h-4 rounded-full bg-[#D4C4A8] shadow-sm"></div>
                                                <span className="text-xs text-stone-600 dark:text-stone-400">{t("Natural Brown", "สีน้ำตาลธรรมชาติ")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
