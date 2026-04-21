import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
const quickCards = [
  {
    title: { en: "Door", th: "ประตู" },
    img: "/home-collections/01.webp",
    path: "/door",
    description: {
      en: "Where Wood Styles Define Your Journey,Transform your interiors with doors that boast not only durability but also a rich array of styles, from wood to fabric and leather-inspired designs.",
      th: "บานประตูที่สะท้อนตัวตนและเรื่องราวของคุณ ด้วยประตูที่ไม่เพียงแข็งแรงทนทาน แต่ยังโดดเด่นด้วยดีไซน์หลากหลาย ทั้งลายไม้ ลายผ้า ไปจนถึงผิวสัมผัสที่เสมือนไม้จริง"
    }
  },
  {
    title: { en: "Doorframe", th: "วงกบ" },
    img: "/home-collections/doorframe.webp",
    path: "/doorframe",
    description: {
      en: "Durable WPC doorframes designed to complement your doors, combining strength with a natural wood finish.",
      th: "วงกบ WPC ที่แข็งแรงทนทาน ออกแบบมาให้เข้ากับประตูของคุณ ผสานความแข็งแรงกับสัมผัสของไม้ธรรมชาติ"
    }
  },
  {
    title: { en: "Service Shaft", th: "ช่องชาร์ป" },
    img: "/home-collections/service-shaft (1).png",
    path: "/service-shaft",
    description: {
      en: "Step into a world of refined functionality with our Shaft Wall Access Panels, designed to offer effortless access to essential compartments.",
      th: "ยืดหยุ่นทุกการใช้งาน สามารถปรับเปลี่ยนขนาดรูปแบบและความต้องการได้อย่างหลากหลาย"
    }
  },
  {
    title: { en: "Flooring", th: "พื้น" },
    img: "/home-collections/flooring.webp",
    path: "/flooring",
    description: {
      en: "Durable, luxurious, and elegantly crafted, SPC Flooring redefines your spaces with lasting beauty. Introducing SPC Flooring, a modern marvel that combines durability, luxury, and timeless design.",
      th: "ขอแนะนำพื้น SPC นวัตกรรมสมัยใหม่ที่ผสานความทนทาน ความหรูหรา และการออกแบบเหนือกาลเวลา"
    }
  },
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

const heroSlides = [
  {
    img: "/home-collections/back.webp",
    pretitle: { en: "", th: "" },
    title1: { en: "", th: "" },
    title2: { en: "Not Just Doors, But Architecture", th: "ไม่ใช่แค่ประตู แต่คือสถาปัตยกรรม" },
    desc: { en: "Quietly engineered. Timelessly designed. A collection of doors and surfaces crafted for modern spaces.", th: "ความงดงามและดีไซน์ที่ไร้กาลเวลา คอลเลกชันประตูและวงกบ สวย ทน ทันสมัย" }
  },
  {
    img: "/home-collections/Brandner.webp",
    pretitle: { en: "", th: "" },
    title1: { en: "", th: "" },
    title2: { en: "", th: "" },
    desc: { en: "", th: "" }
  },
];

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef<number>(0);
  
  const nextSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const handleSwipe = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, [nextSlide, prevSlide]);

  // Touch events (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    handleSwipe();
  };

  // Mouse drag events (desktop)
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    touchStartX.current = dragStartX.current;
    touchEndX.current = e.clientX;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDragging.current) {
      handleSwipe();
      isDragging.current = false;
    }
  };
  const onMouseLeaveSlider = () => {
    if (isDragging.current) {
      handleSwipe();
      isDragging.current = false;
    }
    setIsHeroPaused(false);
  };

  // Auto-play
  useEffect(() => {
    if (isHeroPaused || heroSlides.length <= 1) return;
    heroTimerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    };
  }, [isHeroPaused, nextSlide]);

  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">

      {/* Door Finder CTA Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-2.5 md:py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white text-center sm:text-left">
            <p className="text-sm md:text-base font-semibold leading-snug">{t("Not sure which door is right for you?", "ยังไม่แน่ใจว่าประตูแบบไหนเหมาะกับคุณ?")}</p>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">{t("Try our interactive door finder tool", "ลองใช้เครื่องมือค้นหาประตูแบบอินเทอร์แอคทีฟ")}</p>
          </div>
          <a
            href="https://door.chhindustry.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-5 py-2 text-xs md:text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-lg shadow-md hover:shadow-lg whitespace-nowrap"
          >
            {t("Find Your Perfect Door", "ค้นหาประตูที่เหมาะกับคุณ")}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </section>

      <section
        className="relative select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={onMouseLeaveSlider}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >


        <div className="relative aspect-video sm:aspect-auto sm:h-[50vh] md:h-[70vh] lg:h-[85vh] flex items-center justify-center bg-[#FDFBF7] dark:bg-stone-950">

          <div className="absolute inset-0 z-0 overflow-hidden">

            <div className="relative w-full h-full">
              {heroSlides.map((slide, idx) => {
                const hasText = slide.title2.en || slide.title2.th;
                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentHeroSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      }`}
                  >
                    <img
                      src={slide.img}
                      alt="Brand Showcase"
                      draggable={false}
                      className={`w-full h-full pointer-events-none brightness-110 ${hasText ? "object-cover" : "object-contain"}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>


          <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20 text-center">
            <div className="max-w-5xl mx-auto">

              <div key={currentHeroSlide} className="animate-fade-in-up">
                <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.45em] text-white/90 mb-3 sm:mb-6 font-bold drop-shadow-md">
                  {language === 'EN' ? heroSlides[currentHeroSlide].pretitle.en : heroSlides[currentHeroSlide].pretitle.th}
                </p>

                <h1 className="font-sans font-bold uppercase tracking-wide leading-tight text-white mb-4 sm:mb-8 drop-shadow-lg" style={{ fontSize: 'clamp(1.5rem, 5vw, 4.5rem)' }}>
                  <span className="block mb-2 sm:mb-4">
                    {language === 'EN' ? heroSlides[currentHeroSlide].title1.en : heroSlides[currentHeroSlide].title1.th}
                  </span>      
                  <span className="block text-brand-500">
                    {language === 'EN' ? heroSlides[currentHeroSlide].title2.en : heroSlides[currentHeroSlide].title2.th}
                  </span>
                </h1>

                <p className="max-w-xl font-medium text-stone-100 leading-relaxed mx-auto mb-6 sm:mb-10 drop-shadow-md" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                  {language === 'EN' ? heroSlides[currentHeroSlide].desc.en : heroSlides[currentHeroSlide].desc.th}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          {heroSlides.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentHeroSlide
                    ? "w-8 bg-brand-500"
                    : "w-1.5 bg-white/40"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-stone-200/70 dark:bg-stone-800/70" />
      </section>

      <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 px-6 md:px-12 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8 text-stone-900 dark:text-stone-100 font-light">
              {t("Craftsmanship × Global Standards for a Better Quality of Life", "งานฝีมือ × มาตรฐานสากล เพื่อคุณภาพชีวิตที่ดีกว่า")}
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              {t("From a humble sawmill to a leading construction materials manufacturer", "จากโรงเลื่อยไม้เล็กๆ สู่ผู้ผลิตวัสดุก่อสร้างชั้นนำ")}
            </p>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mt-3">
              {t("Over 50 years of relentless innovation, blending traditional craftsmanship with modern production technology, for every space you call home.", "กว่า 50 ปีที่เราไม่หยุดพัฒนา ผสานภูมิปัญญางานช่างกับนวัตกรรมการผลิต เพื่อทุกพื้นที่ที่คุณอาศัยอยู่")}
            </p>
          </div>
        </div>



      </section>
      <section className="pt-6 pb-12 sm:pt-10 sm:pb-16 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">

            <h2 className="text-xl md:text-2xl">
              {t("Collections", "คอลเลกชัน")}
            </h2>
            <p className="hidden md:block text-[10px] uppercase tracking-[0.35em] text-stone-400 dark:text-stone-500">
              {t("Explore categories", "สำรวจหมวดหมู่")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickCards.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedCardIndex(selectedCardIndex === i ? null : i)}
                className={`group block cursor-pointer transition-opacity duration-300 ${selectedCardIndex !== null && selectedCardIndex !== i ? 'opacity-50' : 'opacity-100'}`}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 transition-all duration-300 ${selectedCardIndex === i ? 'ring-2 ring-brand-500 shadow-xl scale-[1.02]' : ''}`}>
                  <div className="aspect-[3/5]">
                    <img
                      src={item.img}
                      alt={language === 'EN' ? item.title.en : item.title.th}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-image-reveal"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center text-center">
                  <p className={`text-sm transition-colors ${selectedCardIndex === i ? 'text-brand-500 font-bold' : ''}`}>
                    {language === 'EN' ? item.title.en : item.title.th}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Content Section */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${selectedCardIndex !== null ? 'max-h-[500px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'}`}>
            {selectedCardIndex !== null && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 md:p-12 border border-stone-100 dark:border-stone-800 shadow-sm animate-fade-in-up">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl text-brand-900 dark:text-stone-100 mb-4">
                      {language === 'EN' ? quickCards[selectedCardIndex].title.en : quickCards[selectedCardIndex].title.th}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
                      {language === 'EN' ? quickCards[selectedCardIndex].description.en : quickCards[selectedCardIndex].description.th}
                    </p>
                    <Link
                      to="/quote"
                      className="inline-flex items-center gap-2 bg-[#f37021] text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide hover:bg-[#d65f17] transition-all duration-300 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                      {t("Get Quote", "ขอใบเสนอราคา")}
                    </Link>
                  </div>
                  <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 hidden md:block">
                    <img
                      src={quickCards[selectedCardIndex].img}
                      alt="Detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}      
          </div>
        </div>
      </section>




      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-7xl border-t border-stone-200 dark:border-stone-800 pt-12">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-3">{t("trusted by", "ได้รับความไว้วางใจจาก")}</span>
            <h2 className="text-2xl md:text-4xl font-medium tracking-widest text-stone-900 dark:text-stone-50">{t("Leading Companies", "บริษัทชั้นนำ")}</h2>
          </div>

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
              animation: scroll 120s linear infinite;
            }
            .animate-scroll-reverse {
              animation: scroll-reverse 120s linear infinite;
            }
          `}</style>

          <div className="flex flex-col gap-8">
            {/* Row 1 - Our Clients Developer */}
            <div>
              <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-400 mb-4">{t("Our Clients Developer", "ลูกค้ากลุ่มผู้พัฒนาโครงการ")}</h3>
              <div className="relative overflow-hidden w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="flex gap-4 items-center animate-scroll w-max">
                  {[...row1Brands, ...row1Brands].map((brand, i) => (
                    <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 flex items-center justify-center p-6 border border-stone-100 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 mx-1">
                      <img src={brand.src} alt={brand.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2 - Main Contractor */}
            <div>
              <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-400 mb-4">{t("Main Contractor", "ผู้รับเหมาหลัก")}</h3>
              <div className="relative overflow-hidden w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="flex gap-4 items-center animate-scroll-reverse w-max">
                  {[...row2Brands, ...row2Brands].map((brand, i) => (
                    <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 flex items-center justify-center p-6 border border-stone-100 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 mx-1">
                      <img src={brand.src} alt={brand.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-400 mb-4">{t("Hotel & Service Apartment", "โรงแรมและเซอร์วิสอพาร์ตเมนต์")}</h3>
              <div className="relative overflow-hidden w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="flex gap-4 items-center animate-scroll w-max">
                  {[...row3Brands, ...row3Brands].map((brand, i) => (
                    <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 flex items-center justify-center p-6 border border-stone-100 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 mx-1">
                      <img src={brand.src} alt={brand.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16" />
    </div>
  );
};
