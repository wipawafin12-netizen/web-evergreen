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
                                <img src="/doorframe/01.png" alt="Wooden Doorframe" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* New Wood Species Characteristics Section */}
                    <div className="pb-12 border-b border-stone-200 dark:border-stone-800">
                        <div className="text-center mb-8">
                            <span className="text-xs font-medium text-orange-500 tracking-widest block mb-2">
                                {t("Wood Characteristics", "คุณลักษณะของเนื้อไม้")}
                            </span>
                            <h3 className="text-xl md:text-2xl text-brand-900 dark:text-stone-100 font-medium">
                                {t("Premium Wood Species", "เนื้อไม้เกรดพรีเมียม")}
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                {
                                    name: t("Makha", "ไม้มะค่า"),
                                    en: "It has a beautiful, distinct wood grain with a light orange color. It can be used both indoors and outdoors, making it ideal for natural wood grain finishes.",
                                    th: "มีลายไม้ที่สวยงามและชัดเจน พร้อมสีส้มอ่อน สามารถใช้ได้ทั้งภายในและภายนอก เหมาะอย่างยิ่งสำหรับการทำสีโชว์ลายไม้ธรรมชาติ",
                                    img: "/doorframe/Makha.png"
                                },
                                {
                                    name: t("Red", "ไม้แดง"),
                                    en: "It is strong with a reddish wood tone and a distinct wood grain. It can be used both indoors and outdoors, making it suitable for natural wood grain finishes.",
                                    th: "มีความแข็งแรงทนทาน พร้อมโทนสีไม้แดงและลายไม้ที่ชัดเจน สามารถใช้ได้ทั้งภายในและภายนอก เหมาะสำหรับการทำสีโชว์ลายไม้ธรรมชาติ",
                                    img: "/doorframe/RED.png"
                                },
                                {
                                    name: t("Oak", "ไม้โอ๊ค"),
                                    en: "It is strong, with a green-yellow wood tone that turns brown when exposed to sunlight. It can be used both indoors and outdoors, making it suitable for oil-based finishes.",
                                    th: "มีความแข็งแรง พร้อมโทนสีไม้เหลืองอมเขียวซึ่งจะเปลี่ยนเป็นสีน้ำตาลเมื่อโดนแสงแดด สามารถใช้ได้ทั้งภายในและภายนอก เหมาะสำหรับการทำสีประเภทน้ำมัน",
                                    img: "/doorframe/Whiteoak.png"
                                },
                                {
                                    name: t("Takian", "ไม้ตะเคียน"),
                                    en: "It is strong, with a distinct wood grain and a light tone. It is suitable for indoor use and ideal for finishes that showcase the wood grain.",
                                    th: "มีความแข็งแรง พร้อมลายไม้ที่ชัดเจนและโทนสีอ่อน เหมาะสำหรับการใช้งานภายในและเหมาะอย่างยิ่งสำหรับการทำสีที่ต้องการโชว์ลายไม้",
                                    img: "/doorframe/Takien.png"
                                }
                            ].map((species, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="aspect-square w-full mb-3 relative group">
                                        <div className="absolute inset-0 bg-stone-100 dark:bg-stone-900 rounded-xl transform group-hover:scale-95 transition-transform duration-500"></div>
                                        <img src={species.img} alt={species.name} className="relative z-10 w-full h-full object-contain p-3 transform group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <h4 className="text-sm font-medium text-brand-900 dark:text-stone-100 mb-1">{species.name}</h4>
                                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                                        {t(species.en, species.th)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* New Premium Color Palettes Section */}
                    <div className="pb-12 border-b border-stone-200 dark:border-stone-800">
                        <div className="text-center mb-6">
                            <span className="text-[10px] font-medium text-orange-500 tracking-[0.3em] block mb-2 uppercase">
                                {t("Aesthetic Combinations", "การจับคู่สีที่ลงตัว")}
                            </span>
                            <h3 className="text-lg md:text-xl text-stone-900 dark:text-stone-100 font-serif font-light mb-2">
                                {t("Color Palettes", "พาเลทสีแนะนำ")}
                            </h3>
                            <p className="text-xs text-stone-500 dark:text-stone-400 font-light italic">
                                {t("Designer combinations for premium spaces", "เฉดสีที่ช่วยยกระดับพื้นที่ให้ดูหรูหรา")}
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-4">
                            {[
                                {
                                    name: t("Makha Warm Honey", "ไม้มะค่าอุ่นละมุน"),
                                    colors: ["#FFF9F0", "#EBC08D", "#D38C4F", "#854D27"]
                                },
                                {
                                    name: t("Redwood Deep Earth", "ไม้แดงเข้มขลัง"),
                                    colors: ["#F9F2F0", "#C17C6D", "#91483A", "#4D2621"]
                                },
                                {
                                    name: t("Natural Oak Sands", "ทรายโอ๊คธรรมชาติ"),
                                    colors: ["#F8F8F0", "#E3D4C1", "#BC9F7A", "#634E34"]
                                },
                                {
                                    name: t("Takian Light Pecan", "ไม้ตะเคียนนวลตา"),
                                    colors: ["#FAF9F6", "#D9C3A9", "#AF8F6F", "#4B3621"]
                                }
                            ].map((palette, i) => (
                                <div key={i} className="bg-white/60 dark:bg-stone-900/40 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-stone-100 dark:border-stone-800 flex flex-col items-center group hover:bg-white/80 dark:hover:bg-stone-900/60 transition-all duration-500">
                                    <span className="text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] text-[8px] mb-3 font-medium">
                                        {palette.name}
                                    </span>
                                    <div className="grid grid-cols-4 gap-2 w-full">
                                        {palette.colors.map((color, idx) => (
                                            <div key={idx} className="flex flex-col gap-2">
                                                <div
                                                    className="aspect-[4/1] rounded-lg shadow-inner transform group-hover:scale-[1.02] transition-transform duration-500"
                                                    style={{ backgroundColor: color }}
                                                />
                                                <span className="text-[8px] md:text-[9px] font-mono text-stone-400 dark:text-stone-500 text-center">
                                                    {color}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: WPC Doorframe */}
                    <div className="pb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            <div className="order-2 lg:order-1 aspect-square rounded-2xl overflow-hidden shadow-lg">
                                <img src="/doorframe/02.png" alt="WPC Doorframe" className="w-full h-full object-cover" />
                            </div>
                            <div className="order-1 lg:order-2">
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
                                            "Our WPC Doorframes aren't just durable and waterproof; they are termite-proof, flame retardant, and paintable. A green choice that aligns with modern safe living and an enduring future.",
                                            "วงกบประตู WPC ของเราไม่เพียงแต่ทนทานและกันน้ำ แต่ยังป้องกันปลวก ทนไฟ และสามารถทาสีทับได้ เป็นทางเลือกสีเขียวที่ตอบโจทย์การอยู่อาศัยที่ปลอดภัยในปัจจุบัน"
                                        )}
                                    </p>
                                </div>
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                                            {t("Technical Specification", "ข้อมูลทางเทคนิค")}
                                        </h4>
                                        <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                                            <li>• {t("Base 7 cm / 9.5 cm", "ฐาน 7 ซม. / 9.5 ซม.")}</li>
                                            <li>• {t("Suits 3.5 cm Door Thickness", "รองรับประตูหนา 3.5 ซม.")}</li>
                                            <li>• {t("Fast Installation (Adjustable Architrave)", "ติดตั้งร่วมกับซับวงกบปรับระดับได้")}</li>
                                            <li>• {t("Indoor & Outdoor Use", "ใช้ได้ทั้งภายในและภายนอก")}</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                                            {t("Available Tones", "เฉดสีที่มีจำหน่าย")}
                                        </h4>
                                        <p className="text-xs text-stone-600 dark:text-stone-400">
                                            {t("Classic White and Natural Wood Tones", "สีขาวคลาสสิกและโทนสีลายไม้ธรรมชาติ")}
                                        </p>
                                        <div className="flex gap-2">
                                            <div className="w-5 h-5 rounded-full bg-white border border-stone-200 shadow-sm" title="White" />
                                            <div className="w-5 h-5 rounded-full bg-[#B5905E] shadow-sm" title="Wood Tone" />
                                            <div className="w-5 h-5 rounded-full bg-[#54433A] shadow-sm" title="Dark Tone" />
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
