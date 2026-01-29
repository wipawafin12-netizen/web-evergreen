import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote, ArrowUpRight, Plus, Facebook, Instagram, Phone, Leaf, Users, ShieldCheck } from 'lucide-react';

export const B2B: React.FC = () => {
    const { t } = useLanguage();
    const [activeSpot, setActiveSpot] = useState<number | null>(null);

    const companyValues = [
        {
            title: "Vision",
            titleTH: "วิสัยทัศน์",
            text: "Becoming the leading corporate providing innovative architectural products for better living.",
            textTH: "มุ่งมั่นที่จะเป็นองค์กรชั้นนำในการนำเสนอผลิตภัณฑ์สถาปัตยกรรมที่เป็นนวัตกรรมเพื่อชีวิตความเป็นอยู่ที่ดีขึ้น"
        },
        {
            title: "Mission",
            titleTH: "พันธกิจ",
            text: "Continuous Develop and Supply Products Matching Design From Ceiling to Floor at competitive price",
            textTH: "พัฒนาและจัดหาผลิตภัณฑ์ที่ตรงตามการออกแบบจากฝ้าเพดานจรดพื้นอย่างต่อเนื่องในราคาที่แข่งขันได้"
        },
        {
            title: "Purpose",
            titleTH: "เป้าหมาย",
            text: "We thrive to deliver \"First-Impression\" and \"Safetyness\" to your living space.",
            textTH: "เรามุ่งมั่นที่จะมอบ \"ความประทับใจแรก\" และ \"ความปลอดภัย\" ให้กับพื้นที่อยู่อาศัยของคุณ"
        }
    ];

    const testimonials = [
        {
            text: t("Lyght Living provided modern, ergonomic solutions that perfectly matched our office needs.", "Lyght Living นำเสนอโซลูชันที่ทันสมัยและถูกหลักสรีรศาสตร์ซึ่งตอบโจทย์สำนักงานของเราได้อย่างลงตัว"),
            name: t("Michael Thompson", "ไมเคิล ทอมป์สัน"),
            location: t("London, UK", "ลอนดอน, สหราชอาณาจักร"),
            initials: "MT",
            color: "bg-blue-100 text-blue-800"
        },
        {
            text: t("Renting allowed us to furnish beautifully without long-term commitments.", "การเช่าช่วยให้เราตกแต่งได้อย่างสวยงามโดยไม่ต้องมีภาระผูกพันระยะยาว"),
            name: t("Elena Rossi", "เอเลน่า รอสซี่"),
            location: t("Milan, Italy", "มิลาน, อิตาลี"),
            initials: "ER",
            color: "bg-orange-100 text-orange-800"
        },
        {
            text: t("The entire process from selection to delivery was smooth. I recommend Lyght Living to anyone", "กระบวนการทั้งหมดตั้งแต่การเลือกจนถึงการจัดส่งราบรื่นมาก ฉันขอแนะนำ Lyght Living ให้กับทุกคน"),
            name: t("Sofia Martinez", "โซเฟีย มาร์ติเนซ"),
            location: t("Madrid, Spain", "มาดริด, สเปน"),
            initials: "SM",
            color: "bg-green-100 text-green-800"
        }
    ];




    const showcaseImages = [
        { src: "public/B2B/d1.png" },
        { src: "public/B2B/df2.png" },
        { src: "public/B2B/dd.png" },
    ];

    const row1Brands = [
        { id: 1, name: "Client 1", src: "public/Brand Customer/b1.png" },
        { id: 2, name: "Client 2", src: "public/Brand Customer/b2.png" },
        { id: 3, name: "Client 3", src: "public/Brand Customer/b3.png" },
        { id: 4, name: "Client 4", src: "public/Brand Customer/b4.png" },
        { id: 5, name: "Client 5", src: "public/Brand Customer/b5.png" },
        { id: 6, name: "Client 6", src: "public/Brand Customer/b6.png" },
        { id: 7, name: "Client 7", src: "public/Brand Customer/b7.png" },
        { id: 8, name: "Client 8", src: "public/Brand Customer/b8.png" },
        { id: 9, name: "Client 9", src: "public/Brand Customer/b9.png" },
        { id: 10, name: "Client 10", src: "public/Brand Customer/b10.png" },
        { id: 11, name: "Client 11", src: "public/Brand Customer/b11.png" },
        { id: 12, name: "Client 12", src: "public/Brand Customer/b12.png" },
        { id: 13, name: "Client 13", src: "public/Brand Customer/b13.png" },
        { id: 14, name: "Client 14", src: "public/Brand Customer/b14.png" },
        { id: 15, name: "Client 15", src: "public/Brand Customer/b15.png" },
        { id: 16, name: "Client 16", src: "public/Brand Customer/b16.png" },
        { id: 17, name: "Client 17", src: "public/Brand Customer/b17.png" },
        { id: 18, name: "Client 18", src: "public/Brand Customer/b18.png" },
        { id: 19, name: "Client 19", src: "public/Brand Customer/b19.png" },
        { id: 20, name: "Client 20", src: "public/Brand Customer/b20.png" },
        { id: 21, name: "Client 21", src: "public/Brand Customer/b21.png" },
        { id: 22, name: "Client 22", src: "public/Brand Customer/b22.png" },
        { id: 23, name: "Client 23", src: "public/Brand Customer/b23.png" },
        { id: 24, name: "Client 24", src: "public/Brand Customer/b24.png" },
        { id: 25, name: "Client 25", src: "public/Brand Customer/b25.png" },
        { id: 26, name: "Client 26", src: "public/Brand Customer/b26.png" },
        { id: 27, name: "Client 27", src: "public/Brand Customer/b27.png" },
    ];

    const row2Brands = [
        { id: 1, name: "Client 1", src: "public/Brand Customer2/b1.png" },
        { id: 2, name: "Client 2", src: "public/Brand Customer2/b2.png" },
        { id: 3, name: "Client 3", src: "public/Brand Customer2/b3.png" },
        { id: 4, name: "Client 4", src: "public/Brand Customer2/b4.png" },
        { id: 5, name: "Client 5", src: "public/Brand Customer2/b5.png" },
        { id: 6, name: "Client 6", src: "public/Brand Customer2/b6.png" },
        { id: 7, name: "Client 7", src: "public/Brand Customer2/b7.png" },
        { id: 8, name: "Client 8", src: "public/Brand Customer2/b8.png" },
        { id: 9, name: "Client 9", src: "public/Brand Customer2/b9.png" },
        { id: 10, name: "Client 10", src: "public/Brand Customer2/b10.png" },
        { id: 11, name: "Client 11", src: "public/Brand Customer2/b11.png" },
        { id: 12, name: "Client 12", src: "public/Brand Customer2/b12.png" },
        { id: 13, name: "Client 13", src: "public/Brand Customer2/b13.png" },
        { id: 14, name: "Client 14", src: "public/Brand Customer2/b14.png" },
        { id: 15, name: "Client 15", src: "public/Brand Customer2/b15.png" },
        { id: 16, name: "Client 16", src: "public/Brand Customer2/b16.png" },
        { id: 17, name: "Client 17", src: "public/Brand Customer2/b17.png" },
        { id: 18, name: "Client 18", src: "public/Brand Customer2/b18.png" },
        { id: 19, name: "Client 19", src: "public/Brand Customer2/b19.png" },
        { id: 20, name: "Client 20", src: "public/Brand Customer2/b20.png" },
        { id: 21, name: "Client 21", src: "public/Brand Customer2/b21.png" },
        { id: 22, name: "Client 22", src: "public/Brand Customer2/b22.png" },
        { id: 23, name: "Client 23", src: "public/Brand Customer2/b23.png" },
        { id: 24, name: "Client 24", src: "public/Brand Customer2/b24.png" },
        { id: 25, name: "Client 25", src: "public/Brand Customer2/b25.png" },
        { id: 26, name: "Client 26", src: "public/Brand Customer2/b26.png" },
        { id: 27, name: "Client 27", src: "public/Brand Customer2/b27.png" },
        { id: 28, name: "Client 28", src: "public/Brand Customer2/b28.png" },
        { id: 29, name: "Client 29", src: "public/Brand Customer2/b29.png" },

    ];

    const row3Brands = [
        { id: 1, name: "Client 1", src: "public/Brand Costomer3/b1.png" },
        { id: 2, name: "Client 2", src: "public/Brand Costomer3/b2.png" },
        { id: 3, name: "Client 3", src: "public/Brand Costomer3/b3.png" },
        { id: 4, name: "Client 4", src: "public/Brand Costomer3/b4.png" },
        { id: 5, name: "Client 5", src: "public/Brand Costomer3/b5.png" },
        { id: 6, name: "Client 6", src: "public/Brand Costomer3/b6.png" },
        { id: 7, name: "Client 7", src: "public/Brand Costomer3/b7.png" },
        { id: 8, name: "Client 8", src: "public/Brand Costomer3/b8.png" },
        { id: 9, name: "Client 9", src: "public/Brand Costomer3/b9.png" },
        { id: 10, name: "Client 10", src: "public/Brand Costomer3/b10.png" },
        { id: 11, name: "Client 11", src: "public/Brand Costomer3/b11.png" },
        { id: 12, name: "Client 12", src: "public/Brand Costomer3/b12.png" },
        { id: 13, name: "Client 13", src: "public/Brand Costomer3/b13.png" },
        { id: 14, name: "Client 14", src: "public/Brand Costomer3/b14.png" },
        { id: 15, name: "Client 15", src: "public/Brand Costomer3/b15.png" },
        { id: 16, name: "Client 16", src: "public/Brand Costomer3/b16.png" },
        { id: 17, name: "Client 17", src: "public/Brand Costomer3/b17.png" },
    ];


    return (

        <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden mb-24">
                <div className="absolute inset-0">
                    <img
                        src="public/B2B/dd.png"
                        alt="Door Products"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative h-full container mx-auto px-6 max-w-7xl flex flex-col justify-center items-center text-center text-white">
                    <span className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4 text-white/90">
                        {t("Evergreen / Door Products", "เอเวอร์กรีน / ผลิตภัณฑ์ประตู")}
                    </span>

                    <h1 className="flex flex-col items-center justify-center font-sans font-bold leading-tight mb-6">
                        <span className="text-5xl md:text-7xl lg:text-8xl text-white mb-2">{t("EVERGREEN", "EVERGREEN")}</span>
                        <span className="text-5xl md:text-7xl lg:text-8xl text-orange-500"></span>
                        <span className="text-5xl md:text-7xl lg:text-8xl text-orange-500"></span>
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-white/90 font-light">
                        {t("Quietly engineered. Timelessly designed. A collection of doors and surfaces crafted for modern spaces.", "ออกแบบอย่างประณีต ดีไซน์ไร้กาลเวลา คอลเลกชันประตูและพื้นผิวที่สร้างสรรค์เพื่อพื้นที่สมัยใหม่")}
                    </p>
                </div>
            </div>

            <section className="px-6 md:px-12 pb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {companyValues.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 p-8 md:p-10 flex flex-col justify-center items-center text-center gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors duration-500 rounded-2xl md:rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
                                <h3 className="text-2xl md:text-3xl font-medium">
                                    {t(item.title, item.titleTH)}
                                </h3>
                                <p className="text-sm md:text-base font-light leading-relaxed text-stone-600 dark:text-stone-400">
                                    {t(item.text, item.textTH)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-7xl">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-stone-900 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${item.color}`}>
                                    {item.initials}
                                </div>
                                <Quote className="w-8 h-8 text-[#E64A19] opacity-20 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8 min-h-[100px]">
                                "{item.text}"
                            </p>

                            <div className="border-t border-stone-100 dark:border-stone-800 pt-6">
                                <h4 className="font-bold text-stone-900 dark:text-stone-100">{item.name}</h4>
                                <p className="text-sm text-stone-400">{item.location}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {showcaseImages.map((img, idx) => (
                        <div key={idx} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[600px] group">
                            <img
                                src={img.src}
                                alt={`Interior Showcase ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>



            </div>

            {/* ESG Section */}
            <div className="mb-24">
                <div className="text-center mb-16">
                    <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-4">{t("Sustainability", "ความยั่งยืน")}</span>
                    <h2 className="text-2xl md:text-4xl font-sans font-medium uppercase tracking-widest text-stone-900 dark:text-stone-50">{t("ESG Strategy", "กลยุทธ์ ESG")}</h2>
                    <p className="mt-4 text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-lg">
                        {t("We are committed to sustainable growth through responsible environmental practices, social awareness, and strong governance.", "เรามุ่งมั่นต่อการเติบโตอย่างยั่งยืนผ่านแนวทางปฏิบัติทางสิ่งแวดล้อมที่รับผิดชอบ ความตระหนักรู้ทางสังคม และธรรมาภิบาลที่เข้มแข็ง")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Environment */}
                    <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-emerald-500 group">
                        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <Leaf className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl text-stone-900 dark:text-stone-100 mb-6 font-medium">{t("Environment", "สิ่งแวดล้อม")}</h3>
                        <ul className="space-y-4">
                            {[
                                t("Climate Change Strategy", "กลยุทธ์การเปลี่ยนแปลงสภาพภูมิอากาศ"),
                                t("Green Building Standards", "มาตรฐานอาคารสีเขียว"),
                                t("Reduced Carbon Emissions", "การลดการปล่อยก๊าซคาร์บอน"),
                                t("Biodiversity Protection", "การปกป้องความหลากหลายทางชีวภาพ")
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-orange-400 group">
                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-8 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl text-stone-900 dark:text-stone-100 mb-6">{t("Social", "สังคม")}</h3>
                        <ul className="space-y-4">
                            {[
                                t("Diversity & Inclusion", "ความหลากหลายและการยอมรับ"),
                                t("Human Rights", "สิทธิมนุษยชน"),
                                t("Health & Safety", "สุขภาพและความปลอดภัย"),
                                t("Community Engagement", "การมีส่วนร่วมกับชุมชน")
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Governance */}
                    <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 group">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl text-stone-900 dark:text-stone-100 mb-6">{t("Governance", "ธรรมาภิบาล")}</h3>
                        <ul className="space-y-4">
                            {[
                                t("Risk Mitigation", "การลดความเสี่ยง"),
                                t("Board Independence", "ความเป็นอิสระของคณะกรรมการ"),
                                t("Anti-Bribery & Corruption", "การต่อต้านการให้สินบนและการทุจริต"),
                                t("Data Privacy & Security", "ความเป็นส่วนตัวและความปลอดภัยของข้อมูล")
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            <section className="px-6 md:px-12 pb-32">
                <div className="container mx-auto max-w-7xl border-t border-stone-200 dark:border-stone-800 pt-20">
                    <div className="text-center mb-12">
                        <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-4">{t("Trusted By", "ได้รับความไว้วางใจจาก")}</span>
                        <h2 className="text-2xl md:text-4xl font-medium uppercase tracking-widest text-stone-900 dark:text-stone-50">{t("Leading Companies", "บริษัทชั้นนำ")}</h2>
                    </div>

                    {/* Scrolling Logos */}
                    <style>{`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes scroll-reverse {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
                .animate-scroll {
                  animation: scroll 200s linear infinite;
                }
                .animate-scroll-reverse {
                  animation: scroll-reverse 200s linear infinite;
                }
              `}</style>

                    <div className="flex flex-col gap-16">
                        {/* Row 1 - Our Clients Developer */}
                        <div>
                            <h3 className="text-center text-lg md:text-xl font-medium uppercase tracking-widest text-stone-600 dark:text-stone-300 mb-6">{t("Our Clients Developer", "ลูกค้ากลุ่มผู้พัฒนาโครงการ")}</h3>
                            <div className="relative overflow-hidden w-full">
                                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="flex gap-8 items-center animate-scroll w-max">
                                    {[...row1Brands, ...row1Brands].map((brand, i) => (
                                        <div key={i} className="flex-shrink-0 w-72 h-48 flex items-center justify-center p-8 border border-stone-100 dark:border-stone-800 rounded-[2rem] bg-white dark:bg-stone-900 mx-2 hover:shadow-md transition-all">
                                            <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Row 2 - Main Contractor */}
                        <div>
                            <h3 className="text-center text-lg md:text-xl font-medium uppercase tracking-widest text-stone-600 dark:text-stone-300 mb-6">{t("Main Contractor", "ผู้รับเหมาหลัก")}</h3>
                            <div className="relative overflow-hidden w-full">
                                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="flex gap-8 items-center animate-scroll-reverse w-max">
                                    {[...row2Brands, ...row2Brands].map((brand, i) => (
                                        <div key={i} className="flex-shrink-0 w-72 h-48 flex items-center justify-center p-8 border border-stone-100 dark:border-stone-800 rounded-[2rem] bg-white dark:bg-stone-900 mx-2 hover:shadow-md transition-all">
                                            <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Row 3 - Hotel & Service Apartment */}
                        <div>
                            <h3 className="text-center text-lg md:text-xl font-medium uppercase tracking-widest text-stone-600 dark:text-stone-300 mb-6">{t("Hotel & Service Apartment", "โรงแรมและเซอร์วิสอพาร์ตเมนต์")}</h3>
                            <div className="relative overflow-hidden w-full">
                                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="flex gap-8 items-center animate-scroll w-max">
                                    {[...row3Brands, ...row3Brands].map((brand, i) => (
                                        <div key={i} className="flex-shrink-0 w-72 h-48 flex items-center justify-center p-8 border border-stone-100 dark:border-stone-800 rounded-[2rem] bg-white dark:bg-stone-900 mx-2 hover:shadow-md transition-all">
                                            <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>




    );
};
