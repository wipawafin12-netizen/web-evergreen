import React, { useState } from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

interface AngleImage {
    src: string;
    alt: string;
}

interface Variant {
    colorId: string;
    colorName: string;
    colorNameTh: string;
    images: AngleImage[];
}

const woodenVariants: Variant[] = [
    {
        colorId: "makha",
        colorName: "Makawood",
        colorNameTh: "ไม้มะค่า",
        images: [
            { src: "/doorframe/Makha.png", alt: "ไม้มะค่า - ด้านหน้า" },
            // { src: "/doorframe/Makha-side.png", alt: "ไม้มะค่า - ด้านข้าง" },
            // { src: "/doorframe/Makha-detail.png", alt: "ไม้มะค่า - รายละเอียด" },
            // { src: "/doorframe/Makha-corner.png", alt: "ไม้มะค่า - มุม" },
        ],
    },
    {
        colorId: "red",
        colorName: "Redwood",
        colorNameTh: "ไม้แดง",
        images: [
            { src: "/doorframe/RED.png", alt: "ไม้แดง - ด้านหน้า" },
            // { src: "/doorframe/RED-side.png", alt: "ไม้แดง - ด้านข้าง" },
            // { src: "/doorframe/RED-detail.png", alt: "ไม้แดง - รายละเอียด" },
            // { src: "/doorframe/RED-corner.png", alt: "ไม้แดง - มุม" },
        ],
    },
    {
        colorId: "whiteoak",
        colorName: "White Oak",
        colorNameTh: "ไม้โอ๊ค",
        images: [
            { src: "/doorframe/Whiteoak.png", alt: "ไม้โอ๊ค - ด้านหน้า" },
            // { src: "/doorframe/Whiteoak-side.png", alt: "ไม้โอ๊ค - ด้านข้าง" },
            // { src: "/doorframe/Whiteoak-detail.png", alt: "ไม้โอ๊ค - รายละเอียด" },
            // { src: "/doorframe/Whiteoak-corner.png", alt: "ไม้โอ๊ค - มุม" },
        ],
    },
    {
        colorId: "takien",
        colorName: "Takien",
        colorNameTh: "ไม้ตะเคียน",
        images: [
            { src: "/doorframe/Takien.png", alt: "ไม้ตะเคียน - ด้านหน้า" },
            // { src: "/doorframe/Takien-side.png", alt: "ไม้ตะเคียน - ด้านข้าง" },
            // { src: "/doorframe/Takien-detail.png", alt: "ไม้ตะเคียน - รายละเอียด" },
            // { src: "/doorframe/Takien-corner.png", alt: "ไม้ตะเคียน - มุม" },
        ],
    },
];

const wpcVariants: Variant[] = [
    {
        colorId: "wpc-white",
        colorName: "White",
        colorNameTh: "สีขาว",
        images: [
            { src: "/doorframe/doorframe2.png", alt: "WPC สีขาว - ด้านหน้า" },
            { src: "public/doorframe/WPCมุม2.png", alt: "WPC สีน้ำตาล - ด้านหน้า" },
            { src: "public/doorframe/WPCมุม3.png", alt: "WPC สีน้ำตาล - ด้านหน้า" },
        ],
    },
    {
        colorId: "wpc-brown",
        colorName: "Natural Brown",
        colorNameTh: "สีน้ำตาลธรรมชาติ",
        images: [
            { src: "/doorframe/doorframe1.png", alt: "WPC สีน้ำตาล - ด้านหน้า" },
            { src: "public/doorframe/wpcมุม2.png", alt: "WPC สีน้ำตาล - ด้านหน้า" },
           
        ],
    },
];

/* ─── SingleColorGallery (one color with multiple angles) ── */
const SingleColorGallery: React.FC<{ variant: Variant }> = ({ variant }) => {
    const { t } = useLanguage();
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const currentImage = variant.images[activeImageIdx];

    return (
        <div>
            {/* Color label */}
            <h4 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                {t(variant.colorName, variant.colorNameTh)}
            </h4>

            {/* Main image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-stone-100 dark:bg-stone-900">
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full h-full object-cover transition-all duration-500"
                />
            </div>

            {/* Angle thumbnails */}
            <div className="flex gap-2 mt-3 flex-wrap">
                {variant.images.map((img, i) => (
                    <button
                        key={img.src}
                        onClick={() => setActiveImageIdx(i)}
                        className={`w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${activeImageIdx === i
                                ? "ring-2 ring-orange-500 opacity-100"
                                : "opacity-60 hover:opacity-90"
                            }`}
                    >
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                ))}
                {/* Placeholder slot for adding more images */}
                {variant.images.length < 4 && (
                    <div className="w-16 h-12 rounded-lg border-2 border-dashed border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-300 dark:text-stone-600 text-lg">
                        +
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── Page ────────────────────────────────────────────────── */
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
                        {/* Header + description */}
                        <div className="mb-10">
                            <div className="w-12 h-0.5 bg-orange-500 mb-4 rounded-full" />
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium mb-4 tracking-tight">
                                {t("Evergreen Wooden Doorframe", "วงกบไม้จริง เอเวอร์กรีน")}
                            </h2>
                            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
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
                                <div className="grid grid-cols-2 gap-4 max-w-md">
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Standard Sizes", "ขนาดมาตรฐาน")}</h4>
                                        <p className="font-mono text-xs text-stone-500">2"x4", 2"x5", 2"x6", 2"x8", 2"x10"</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">{t("Protection", "การป้องกัน")}</h4>
                                        <p className="text-xs text-stone-600 dark:text-stone-400">{t("Organic Insect Repellent", "สารสกัดธรรมชาติไล่แมลง")}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                                        {t("Order Now", "สั่งซื้อสินค้า")}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Each color on its own row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {woodenVariants.map((variant) => (
                                <SingleColorGallery key={variant.colorId} variant={variant} />
                            ))}
                        </div>
                    </div>

                    {/* Section 2: WPC Doorframe */}
                    <div className="pb-12">
                        {/* Header + description */}
                        <div className="mb-10">
                            <div className="w-12 h-0.5 bg-orange-500 mb-4 rounded-full" />
                            <h2 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 font-medium mb-4 tracking-tight">
                                {t("WPC Doorframe", "วงกบประตู WPC")}
                            </h2>
                            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
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
                                <div className="mt-6">
                                    <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                                        {t("Order Now", "สั่งซื้อสินค้า")}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Each color on its own row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {wpcVariants.map((variant) => (
                                <SingleColorGallery key={variant.colorId} variant={variant} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
