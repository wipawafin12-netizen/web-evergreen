import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote, ArrowUpRight, Plus, Facebook, Instagram, Phone, Leaf, Users, ShieldCheck, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const B2B: React.FC = () => {
    const { t } = useLanguage();
    const [activeSpot, setActiveSpot] = useState<number | null>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % 5);
        }, 6000);
        return () => clearInterval(timer);
    }, [isPaused]);

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
            quote: "ซื้อบ้านมาหลายหลัง แต่นี่คือครั้งแรกที่รู้สึกว่าประตูมัน 'ใช่' จริงๆ",
            text: "เลือก Evergreen เพราะเพื่อนแนะนำ แต่ตัดสินใจซื้อเพราะลองจับแล้วรู้เลยว่าต่างกัน ประตูหนัก เงียบ เปิดปิดลื่น ไม่มีเสียงดังก๊อกแก๊กให้รำคาญ วงกบตรง ไม่บวมตามอากาศ ผ่านหน้าฝนมาสองปีแล้ว ยังสวยเหมือนเดิม บอกตรงๆ ว่าคุ้มกว่าที่คิดไว้มากค่ะ",
            name: "คุณพิมพ์ชนก",
            role: "เจ้าของบ้านสร้างใหม่ย่านพระราม 2",
            initials: "พช",
            color: "bg-rose-100 text-rose-800"
        },
        {
            quote: "ในธุรกิจนี้ ของที่ดีคือของที่ไม่ทำให้เราต้องโทรหาซัพพลายเออร์ซ้ำ",
            text: "ทำโครงการมากว่า 15 ปี เปลี่ยนซัพพลายเออร์มาหลายเจ้า มาลงเอยที่ Evergreen ตั้งแต่โปรเจกต์ที่ 3 แล้วไม่เคยเปลี่ยนอีกเลย ของส่งตรงเวลา spec ไม่คลาดเคลื่อน ทีมดูแลหลังการขายยังโทรตามงานเองด้วย สิ่งที่ Developer ต้องการคือความมั่นใจ — Evergreen ให้ตรงนั้นได้ครับ",
            name: "คุณธนกร",
            role: "เจ้าของโครงการคอนโดมิเนียม จ.เชียงใหม่",
            initials: "ธก",
            color: "bg-blue-100 text-blue-800"
        },
        {
            quote: "ของดีมันช่วยให้งานเราดูดีขึ้นด้วย",
            text: "รับงานมาเยอะ เจอประตูไม่ดี มาก็เยอะ รู้เลยว่าของที่ไหนดีไม่ดี พอแกะกล่องมาแล้วจะปวดหัว แต่ของ Evergreen มาตรงขนาด วงกบได้ฉากจริง ติดตั้งง่าย ไม่ต้องมาแก้งานตามหลัง ลูกค้าก็พอใจ งานจบสวย เราก็ได้หน้า ใครถามก็แนะนำเจ้านี้ครับ",
            name: "คุณสมศักดิ์",
            role: "ผู้รับเหมาก่อสร้าง ประสบการณ์ 20 ปี",
            initials: "สศ",
            color: "bg-amber-100 text-amber-800"
        },
        {
            quote: "ช่างมันรู้ครับ ของดีหรือไม่ดี แค่ยกขึ้นมาก็รู้แล้ว",
            text: "ผมติดประตูมาหลายยี่ห้อ บางทีแผ่นบิด บางทีรูบานพับไม่ตรง ต้องมานั่งแก้เสียเวลา ของ Evergreen ผิวเรียบสม่ำเสมอ ขนาดได้มาตรฐาน วงกบ WPC ก็ตัดง่าย ไม่บิด ติดได้เลยไม่ต้องปรับมาก งานเสร็จเร็ว ลูกค้าไม่บ่น ผมก็ไม่ต้องมาแก้ฟรี ดีทุกฝ่ายครับ",
            name: "พี่ต้อย",
            role: "ช่างไม้อิสระ ประสบการณ์ติดตั้งประตูกว่า 300 บาน",
            initials: "ตย",
            color: "bg-green-100 text-green-800"
        },
        {
            quote: "ประตูคือ statement piece ชิ้นแรกที่แขกทุกคนสังเกตเห็น",
            text: "ในฐานะ Designer รายละเอียดคือทุกอย่าง เลือกใช้ประตูไม้วีเนียร์ของ Evergreen ให้โฮมออฟฟิศตัวเองค่ะ ลายไม้สวย ธรรมชาติ ไม่ดูพลาสติก เข้ากับงาน material อื่นได้ง่าย ที่ชอบที่สุดคือ finish มันนิ่งมาก ไม่ต้องมาลุ้นว่าของจะออกมาต่างจาก catalog ไหน — ได้ตรงที่เลือก ตรงที่คาดหวัง",
            name: "คุณวรินทร์",
            role: "Interior Designer & เจ้าของโฮมออฟฟิศสไตล์มินิมอล",
            initials: "วร",
            color: "bg-purple-100 text-purple-800"
        }
    ];




    const showcaseImages = [
        { src: "/B2B/d1.webp" },
        { src: "/B2B/df2.webp" },
        { src: "/B2B/dd.webp" },
    ];

    const row1Brands = [
        { id: 1, name: "Client 1", src: "/brand-customer/b1.webp" },
        { id: 2, name: "Client 2", src: "/brand-customer/b2.webp" },
        { id: 3, name: "Client 3", src: "/brand-customer/b3.webp" },
        { id: 4, name: "Client 4", src: "/brand-customer/b4.webp" },
        { id: 5, name: "Client 5", src: "/brand-customer/b5.webp" },
        { id: 6, name: "Client 6", src: "/brand-customer/b6.webp" },
        { id: 7, name: "Client 7", src: "/brand-customer/b7.webp" },
        { id: 8, name: "Client 8", src: "/brand-customer/b8.webp" },
        { id: 9, name: "Client 9", src: "/brand-customer/b9.webp" },
        { id: 10, name: "Client 10", src: "/brand-customer/b10.webp" },
        { id: 11, name: "Client 11", src: "/brand-customer/b11.webp" },
        { id: 12, name: "Client 12", src: "/brand-customer/b12.webp" },
        { id: 13, name: "Client 13", src: "/brand-customer/b13.webp" },
        { id: 14, name: "Client 14", src: "/brand-customer/b14.webp" },
        { id: 15, name: "Client 15", src: "/brand-customer/b15.webp" },
        { id: 16, name: "Client 16", src: "/brand-customer/b16.webp" },
        { id: 17, name: "Client 17", src: "/brand-customer/b17.webp" },
        { id: 18, name: "Client 18", src: "/brand-customer/b18.webp" },
        { id: 19, name: "Client 19", src: "/brand-customer/b19.webp" },
        { id: 20, name: "Client 20", src: "/brand-customer/b20.webp" },
        { id: 21, name: "Client 21", src: "/brand-customer/b21.webp" },
        { id: 22, name: "Client 22", src: "/brand-customer/b22.webp" },
        { id: 23, name: "Client 23", src: "/brand-customer/b23.webp" },
        { id: 24, name: "Client 24", src: "/brand-customer/b24.webp" },
        { id: 25, name: "Client 25", src: "/brand-customer/b25.webp" },
        { id: 26, name: "Client 26", src: "/brand-customer/b26.webp" },
        { id: 27, name: "Client 27", src: "/brand-customer/b27.webp" },
    ];

    const row2Brands = [
        { id: 1, name: "Client 1", src: "/brand-customer2/b1.webp" },
        { id: 2, name: "Client 2", src: "/brand-customer2/b2.webp" },
        { id: 3, name: "Client 3", src: "/brand-customer2/b3.webp" },
        { id: 4, name: "Client 4", src: "/brand-customer2/b4.webp" },
        { id: 5, name: "Client 5", src: "/brand-customer2/b5.webp" },
        { id: 6, name: "Client 6", src: "/brand-customer2/b6.webp" },
        { id: 7, name: "Client 7", src: "/brand-customer2/b7.webp" },
        { id: 8, name: "Client 8", src: "/brand-customer2/b8.webp" },
        { id: 9, name: "Client 9", src: "/brand-customer2/b9.webp" },
        { id: 10, name: "Client 10", src: "/brand-customer2/b10.webp" },
        { id: 11, name: "Client 11", src: "/brand-customer2/b11.webp" },
        { id: 12, name: "Client 12", src: "/brand-customer2/b12.webp" },
        { id: 13, name: "Client 13", src: "/brand-customer2/b13.webp" },
        { id: 14, name: "Client 14", src: "/brand-customer2/b14.webp" },
        { id: 15, name: "Client 15", src: "/brand-customer2/b15.webp" },
        { id: 16, name: "Client 16", src: "/brand-customer2/b16.webp" },
        { id: 17, name: "Client 17", src: "/brand-customer2/b17.webp" },
        { id: 18, name: "Client 18", src: "/brand-customer2/b18.webp" },
        { id: 19, name: "Client 19", src: "/brand-customer2/b19.webp" },
        { id: 20, name: "Client 20", src: "/brand-customer2/b20.webp" },
        { id: 21, name: "Client 21", src: "/brand-customer2/b21.webp" },
        { id: 22, name: "Client 22", src: "/brand-customer2/b22.webp" },
        { id: 23, name: "Client 23", src: "/brand-customer2/b23.webp" },
        { id: 24, name: "Client 24", src: "/brand-customer2/b24.webp" },
        { id: 25, name: "Client 25", src: "/brand-customer2/b25.webp" },
        { id: 26, name: "Client 26", src: "/brand-customer2/b26.webp" },
        { id: 27, name: "Client 27", src: "/brand-customer2/b27.webp" },
        { id: 28, name: "Client 28", src: "/brand-customer2/b28.webp" },
        { id: 29, name: "Client 29", src: "/brand-customer2/b29.webp" },

    ];

    const row3Brands = [
        { id: 1, name: "Client 1", src: "/brand-customer3/b1.webp" },
        { id: 2, name: "Client 2", src: "/brand-customer3/b2.webp" },
        { id: 3, name: "Client 3", src: "/brand-customer3/b3.webp" },
        { id: 4, name: "Client 4", src: "/brand-customer3/b4.webp" },
        { id: 5, name: "Client 5", src: "/brand-customer3/b5.webp" },
        { id: 6, name: "Client 6", src: "/brand-customer3/b6.webp" },
        { id: 7, name: "Client 7", src: "/brand-customer3/b7.webp" },
        { id: 8, name: "Client 8", src: "/brand-customer3/b8.webp" },
        { id: 9, name: "Client 9", src: "/brand-customer3/b9.webp" },
        { id: 10, name: "Client 10", src: "/brand-customer3/b10.webp" },
        { id: 11, name: "Client 11", src: "/brand-customer3/b11.webp" },
        { id: 12, name: "Client 12", src: "/brand-customer3/b12.webp" },
        { id: 13, name: "Client 13", src: "/brand-customer3/b13.webp" },
        { id: 14, name: "Client 14", src: "/brand-customer3/b14.webp" },
        { id: 15, name: "Client 15", src: "/brand-customer3/b15.webp" },
        { id: 16, name: "Client 16", src: "/brand-customer3/b16.webp" },
        { id: 17, name: "Client 17", src: "/brand-customer3/b17.webp" },
    ];


    return (

        <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden mb-24">
                <div className="absolute inset-0">
                    <img
                        src="/B2B/dd.webp"
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


                {/* Reviews Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-3">{t("Testimonials", "รีวิวจากลูกค้า")}</span>
                        <h2 className="text-2xl md:text-4xl font-medium tracking-widest text-stone-900 dark:text-stone-50">{t("Voices of Trust", "เสียงจากผู้ไว้วางใจ")}</h2>
                    </div>

                    <style>{`
                        @keyframes testimonialFadeIn {
                            from { opacity: 0; transform: translateY(12px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .testimonial-enter { animation: testimonialFadeIn 0.5s ease-out; }
                    `}</style>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Main Featured Card */}
                        <div
                            className="relative bg-white dark:bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)] border border-stone-100/80 dark:border-stone-800"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Top gradient accent */}
                            <div className="h-1.5 bg-gradient-to-r from-[#E64A19] via-orange-400 to-amber-400"></div>

                            <div className="p-8 md:p-12 lg:p-14">
                                <div key={activeTestimonial} className="testimonial-enter">
                                    {/* Header: Quote icon + Stars */}
                                    <div className="flex items-start justify-between mb-8">
                                        <Quote className="w-10 h-10 md:w-14 md:h-14 text-[#E64A19]/10" strokeWidth={1.5} />
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quote text */}
                                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-50 leading-snug mb-6">
                                        "{testimonials[activeTestimonial].quote}"
                                    </p>

                                    {/* Full review */}
                                    <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base leading-relaxed mb-10">
                                        {testimonials[activeTestimonial].text}
                                    </p>

                                    {/* Author + Navigation */}
                                    <div className="flex items-center justify-between pt-8 border-t border-stone-100 dark:border-stone-800">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-sm ${testimonials[activeTestimonial].color}`}>
                                                {testimonials[activeTestimonial].initials}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base md:text-lg text-stone-900 dark:text-stone-100">{testimonials[activeTestimonial].name}</h4>
                                                <p className="text-xs md:text-sm text-stone-400">{testimonials[activeTestimonial].role}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-400 hover:text-[#E64A19] hover:border-[#E64A19] transition-all duration-200 cursor-pointer"
                                            >
                                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                            <button
                                                onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-400 hover:text-[#E64A19] hover:border-[#E64A19] transition-all duration-200 cursor-pointer"
                                            >
                                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom progress bar */}
                            <div className="h-1 bg-stone-100 dark:bg-stone-800">
                                <div
                                    className="h-full bg-gradient-to-r from-[#E64A19] to-orange-400 rounded-full"
                                    style={{
                                        width: `${((activeTestimonial + 1) / testimonials.length) * 100}%`,
                                        transition: 'width 0.5s ease-out'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Dot Selector */}
                        <div className="flex justify-center items-center gap-2.5 mt-8">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTestimonial(idx)}
                                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                                        idx === activeTestimonial
                                            ? 'w-8 h-3 bg-[#E64A19] shadow-md'
                                            : 'w-3 h-3 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
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
