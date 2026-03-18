import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const quickCards = [
  {
    title: { en: "Door", th: "ประตู" },
    img: "/home-collections/01.png",
    path: "/door",
    description: {
      en: "Where Wood Styles Define Your Journey,Transform your interiors with doors that boast not only durability but also a rich array of styles, from wood to fabric and leather-inspired designs.",
      th: "สไตล์ไม้ที่บ่งบอกถึงการเดินทางของคุณเปลี่ยนโฉมภายในบ้านของคุณด้วยประตูที่ไม่เพียงแต่ทนทาน แต่ยังมีสไตล์ให้เลือกมากมาย ตั้งแต่ลายไม้ ผ้า ไปจนถึงดีไซน์ที่ได้แรงบันดาลใจจากหนัง"
    }
  },
  {
    title: { en: "Doorframe", th: "วงกบ" },
    img: "/home-collections/doorframe.png",
    path: "/wall-panel",
    description: {
      en: "Transform your walls with our decorative panels, adding texture and depth to your interior.",
      th: "เปลี่ยนผนังของคุณด้วยแผ่นตกแต่งผนัง เพิ่มพื้นผิวและมิติให้กับการตกแต่งภายใน"
    }
  },
  {
    title: { en: "Service Shaft", th: "ช่องชาร์ป" },
    img: "/home-collections/service-shaft.png",
    path: "/service-shaft",
    description: {
      en: "Step into a world of refined functionality with our Shaft Wall Access Panels, designed to offer effortless access to essential compartments.",
      th: "สัมผัสโลกแห่งฟังก์ชันการใช้งานที่เหนือระดับด้วยแผงปิดช่องเข้าถึงผนังช่องลิฟต์ของเรา ซึ่งได้รับการออกแบบมาเพื่อมอบการเข้าถึงช่องเก็บของที่จำเป็นได้อย่างง่ายดาย"
    }
  },
  {
    title: { en: "Flooring", th: "พื้นไม้" },
    img: "/home-collections/flooring.png",
    path: "/flooring",
    description: {
      en: "Durable, luxurious, and elegantly crafted, SPC Flooring redefines your spaces with lasting beauty. Introducing SPC Flooring, a modern marvel that combines durability, luxury, and timeless design.",
      th: "พื้น SPC มีความทนทาน หรูหรา และได้รับการออกแบบอย่างประณีต ช่วยเปลี่ยนโฉมพื้นที่ของคุณด้วยความงามที่ยั่งยืน ขอแนะนำพื้น SPC นวัตกรรมสมัยใหม่ที่ผสานความทนทาน ความหรูหรา และการออกแบบเหนือกาลเวลา"
    }
  },
];


const row1Brands = [
  { id: 1, name: "Client 1", src: "/brand-customer/b1.png" },
  { id: 2, name: "Client 2", src: "/brand-customer/b2.png" },
  { id: 3, name: "Client 3", src: "/brand-customer/b3.png" },
  { id: 4, name: "Client 4", src: "/brand-customer/b4.png" },
  { id: 5, name: "Client 5", src: "/brand-customer/b5.png" },
  { id: 6, name: "Client 6", src: "/brand-customer/b6.png" },
  { id: 7, name: "Client 7", src: "/brand-customer/b7.png" },
  { id: 8, name: "Client 8", src: "/brand-customer/b8.png" },
  { id: 9, name: "Client 9", src: "/brand-customer/b9.png" },
  { id: 10, name: "Client 10", src: "/brand-customer/b10.png" },
  { id: 11, name: "Client 11", src: "/brand-customer/b11.png" },
  { id: 12, name: "Client 12", src: "/brand-customer/b12.png" },
  { id: 13, name: "Client 13", src: "/brand-customer/b13.png" },
  { id: 14, name: "Client 14", src: "/brand-customer/b14.png" },
  { id: 15, name: "Client 15", src: "/brand-customer/b15.png" },
  { id: 16, name: "Client 16", src: "/brand-customer/b16.png" },
  { id: 17, name: "Client 17", src: "/brand-customer/b17.png" },
  { id: 18, name: "Client 18", src: "/brand-customer/b18.png" },
  { id: 19, name: "Client 19", src: "/brand-customer/b19.png" },
  { id: 20, name: "Client 20", src: "/brand-customer/b20.png" },
  { id: 21, name: "Client 21", src: "/brand-customer/b21.png" },
  { id: 22, name: "Client 22", src: "/brand-customer/b22.png" },
  { id: 23, name: "Client 23", src: "/brand-customer/b23.png" },
  { id: 24, name: "Client 24", src: "/brand-customer/b24.png" },
  { id: 25, name: "Client 25", src: "/brand-customer/b25.png" },
  { id: 26, name: "Client 26", src: "/brand-customer/b26.png" },
  { id: 27, name: "Client 27", src: "/brand-customer/b27.png" },
];

const row2Brands = [
  { id: 1, name: "Client 1", src: "/brand-customer2/b1.png" },
  { id: 2, name: "Client 2", src: "/brand-customer2/b2.png" },
  { id: 3, name: "Client 3", src: "/brand-customer2/b3.png" },
  { id: 4, name: "Client 4", src: "/brand-customer2/b4.png" },
  { id: 5, name: "Client 5", src: "/brand-customer2/b5.png" },
  { id: 6, name: "Client 6", src: "/brand-customer2/b6.png" },
  { id: 7, name: "Client 7", src: "/brand-customer2/b7.png" },
  { id: 8, name: "Client 8", src: "/brand-customer2/b8.png" },
  { id: 9, name: "Client 9", src: "/brand-customer2/b9.png" },
  { id: 10, name: "Client 10", src: "/brand-customer2/b10.png" },
  { id: 11, name: "Client 11", src: "/brand-customer2/b11.png" },
  { id: 12, name: "Client 12", src: "/brand-customer2/b12.png" },
  { id: 13, name: "Client 13", src: "/brand-customer2/b13.png" },
  { id: 14, name: "Client 14", src: "/brand-customer2/b14.png" },
  { id: 15, name: "Client 15", src: "/brand-customer2/b15.png" },
  { id: 16, name: "Client 16", src: "/brand-customer2/b16.png" },
  { id: 17, name: "Client 17", src: "/brand-customer2/b17.png" },
  { id: 18, name: "Client 18", src: "/brand-customer2/b18.png" },
  { id: 19, name: "Client 19", src: "/brand-customer2/b19.png" },
  { id: 20, name: "Client 20", src: "/brand-customer2/b20.png" },
  { id: 21, name: "Client 21", src: "/brand-customer2/b21.png" },
  { id: 22, name: "Client 22", src: "/brand-customer2/b22.png" },
  { id: 23, name: "Client 23", src: "/brand-customer2/b23.png" },
  { id: 24, name: "Client 24", src: "/brand-customer2/b24.png" },
  { id: 25, name: "Client 25", src: "/brand-customer2/b25.png" },
  { id: 26, name: "Client 26", src: "/brand-customer2/b26.png" },
  { id: 27, name: "Client 27", src: "/brand-customer2/b27.png" },
  { id: 28, name: "Client 28", src: "/brand-customer2/b28.png" },
  { id: 29, name: "Client 29", src: "/brand-customer2/b29.png" },
];

const row3Brands = [
  { id: 1, name: "Client 1", src: "/brand-customer3/b1.png" },
  { id: 2, name: "Client 2", src: "/brand-customer3/b2.png" },
  { id: 3, name: "Client 3", src: "/brand-customer3/b3.png" },
  { id: 4, name: "Client 4", src: "/brand-customer3/b4.png" },
  { id: 5, name: "Client 5", src: "/brand-customer3/b5.png" },
  { id: 6, name: "Client 6", src: "/brand-customer3/b6.png" },
  { id: 7, name: "Client 7", src: "/brand-customer3/b7.png" },
  { id: 8, name: "Client 8", src: "/brand-customer3/b8.png" },
  { id: 9, name: "Client 9", src: "/brand-customer3/b9.png" },
  { id: 10, name: "Client 10", src: "/brand-customer3/b10.png" },
  { id: 11, name: "Client 11", src: "/brand-customer3/b11.png" },
  { id: 12, name: "Client 12", src: "/brand-customer3/b12.png" },
  { id: 13, name: "Client 13", src: "/brand-customer3/b13.png" },
  { id: 14, name: "Client 14", src: "/brand-customer3/b14.png" },
  { id: 15, name: "Client 15", src: "/brand-customer3/b15.png" },
  { id: 16, name: "Client 16", src: "/brand-customer3/b16.png" },
  { id: 17, name: "Client 17", src: "/brand-customer3/b17.png" },
];

const heroSlides = [
  {
    img: "/home-collections/back.png",
    pretitle: { en: "", th: "" },
    title1: { en: "", th: "" },
    title2: { en: "Not Just Doors, But Architecture", th: "ไม่ใช่แค่ประตู แต่คือสถาปัตยกรรม" },
    desc: { en: "Quietly engineered. Timelessly designed. A collection of doors and surfaces crafted for modern spaces.", th: "ความงดงามและดีไซน์ที่ไร้กาลเวลา คอลเลกชันประตูและวงกบ สวย ทน ทันสมัย" }
  },
  {
    img: "/home-collections/Brandner.png",
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

  const nextSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

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


      <section
        className="relative"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >


        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] flex items-center justify-center">

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
                      className={`w-full h-full ${hasText ? "object-cover" : "object-contain sm:object-cover"}`}
                    />

                    {hasText && <div className="absolute inset-0 bg-black/40" />}
                  </div>
                );
              })}
            </div>
          </div>


          <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 text-center">
            <div className="max-w-5xl mx-auto">

              <div key={currentHeroSlide} className="animate-fade-in-up">
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/90 mb-6 font-bold drop-shadow-md">
                  {language === 'EN' ? heroSlides[currentHeroSlide].pretitle.en : heroSlides[currentHeroSlide].pretitle.th}
                </p>

                <h1 className="font-sans font-bold uppercase tracking-wide leading-none text-white mb-8 drop-shadow-lg">
                  <span className="block text-4xl md:text-6xl lg:text-7xl mb-4">
                    {language === 'EN' ? heroSlides[currentHeroSlide].title1.en : heroSlides[currentHeroSlide].title1.th}
                  </span>
                  <span className="block text-4xl md:text-6xl lg:text-7xl text-brand-500">
                    {language === 'EN' ? heroSlides[currentHeroSlide].title2.en : heroSlides[currentHeroSlide].title2.th}
                  </span>
                </h1>

                <p className="max-w-xl text-sm md:text-base font-medium text-stone-100 leading-relaxed mx-auto mb-10 drop-shadow-md">
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


      <section className="py-20 px-6 md:px-12 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6 text-stone-900 dark:text-stone-100 font-light">
              {t("Craftsmanship × Global Standards for a Better Quality of Life", "งานฝีมือ × มาตรฐานสากล เพื่อคุณภาพชีวิตที่ดีกว่า")}
            </h2>
            <div className="w-20 h-1 bg-brand-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              {t("From a humble sawmill to a leading construction materials manufacturer — over 50 years of relentless innovation, blending traditional craftsmanship with modern production technology, for every space you call home.", "จากโรงเลื่อยไม้เล็กๆ สู่ผู้ผลิตวัสดุก่อสร้างชั้นนำ — กว่า 50 ปีที่เราไม่หยุดพัฒนา ผสานภูมิปัญญางานช่างกับนวัตกรรมการผลิต เพื่อทุกพื้นที่ที่คุณอาศัยอยู่")}
            </p>
          </div>
        </div>



      </section>
      <section className="py-16 px-6 md:px-12">
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
                      to={quickCards[selectedCardIndex].path}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E64A19] hover:text-[#D84315] transition-colors"
                    >
                      {t("View Collection", "ดูคอลเลกชัน")}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:translate-x-1">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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

            {/* Row 3 - Hotel & Service Apartment */}
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
