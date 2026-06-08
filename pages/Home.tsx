import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { pb, BANNERS, BannerRecord, HOME_CARDS, HomeCardRecord, LOGOS, LogoRecord, fileUrl } from "../lib/pb";
type QuickCard = {
  title: { en: string; th: string };
  img: string;
  link: string;
  description: { en: string; th: string };
};

// Fallback cards shown until the homepage cards load from PocketBase (managed in
// /admin/cards). `link` powers the "Order Product" button (defaults to the shop).
const defaultQuickCards: QuickCard[] = [
  {
    title: { en: "Door", th: "ประตู" },
    img: "/home-collections/01.webp",
    link: "",
    description: {
      en: "Where Wood Styles Define Your Journey,Transform your interiors with doors that boast not only durability but also a rich array of styles, from wood to fabric and leather-inspired designs.",
      th: "บานประตูที่สะท้อนตัวตนและเรื่องราวของคุณ ด้วยประตูที่ไม่เพียงแข็งแรงทนทาน แต่ยังโดดเด่นด้วยดีไซน์หลากหลาย ทั้งลายไม้ ลายผ้า ไปจนถึงผิวสัมผัสที่เสมือนไม้จริง"
    }
  },
  {
    title: { en: "Doorframe", th: "วงกบ" },
    img: "/home-collections/doorframe.webp",
    link: "",
    description: {
      en: "Durable WPC doorframes designed to complement your doors, combining strength with a natural wood finish.",
      th: "วงกบ WPC ที่แข็งแรงทนทาน ออกแบบมาให้เข้ากับประตูของคุณ ผสานความแข็งแรงกับสัมผัสของไม้ธรรมชาติ"
    }
  },
  {
    title: { en: "Service Shaft", th: "ช่องชาร์ป" },
    img: "/home-collections/service-shaft (1).png",
    link: "",
    description: {
      en: "Step into a world of refined functionality with our Shaft Wall Access Panels, designed to offer effortless access to essential compartments.",
      th: "ยืดหยุ่นทุกการใช้งาน สามารถปรับเปลี่ยนขนาดรูปแบบและความต้องการได้อย่างหลากหลาย"
    }
  },
  {
    title: { en: "Flooring", th: "พื้น" },
    img: "/home-collections/flooring.webp",
    link: "",
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

type HeroSlide = {
  img: string;
  link: string;
  title: { en: string; th: string };
  subtitle: { en: string; th: string };
};

// Shown only as a fallback when no active banners exist in PocketBase.
// Admins manage the live banners under /admin/banners.
const defaultHeroSlides: HeroSlide[] = [
  {
    img: "",
    link: "https://shop.chhindustry.com/",
    title: { en: "", th: "" },
    subtitle: { en: "", th: "" },
  },
  {
    img: "/home-collections/ปรับไซส์โปรขึ้นเว็บ-4590 (1).jpg",
    link: "https://www.facebook.com/Evergreenchh?locale=th_TH",
    title: { en: "", th: "" },
    subtitle: { en: "", th: "" },
  },
];

type Brand = { id?: string | number; name: string; src: string };

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const settings = useSettings();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [quickCards, setQuickCards] = useState<QuickCard[]>(defaultQuickCards);
  const [logoRows, setLogoRows] = useState<{ developer: Brand[]; contractor: Brand[]; hotel: Brand[] }>({ developer: row1Brands, contractor: row2Brands, hotel: row3Brands });
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Pull live homepage cards from PocketBase (managed in /admin/cards). Keep the
  // built-in defaults when there are none or the request fails.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const list = await pb.collection(HOME_CARDS).getFullList<HomeCardRecord>({
          filter: 'active = true',
          sort: 'sort,created',
        });
        if (active && list.length) {
          setQuickCards(
            list.map((c) => ({
              title: { en: c.title_en || c.title_th, th: c.title_th || c.title_en },
              img: fileUrl(c, c.image),
              link: c.link || '',
              description: { en: c.description_en || '', th: c.description_th || '' },
            }))
          );
        }
      } catch {
        /* keep defaults */
      }
    })();
    return () => { active = false; };
  }, []);

  // Pull live customer logos from PocketBase (managed in /admin/logos). Replace a
  // group's defaults only when that group has active logos.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const list = await pb.collection(LOGOS).getFullList<LogoRecord>({
          filter: 'active = true',
          sort: 'sort,created',
        });
        if (!active || !list.length) return;
        const toBrand = (l: LogoRecord) => ({ id: l.id, name: l.name || 'Logo', src: fileUrl(l, l.image) });
        const dev = list.filter((l) => l.group === 'developer').map(toBrand);
        const con = list.filter((l) => l.group === 'contractor').map(toBrand);
        const hot = list.filter((l) => l.group === 'hotel').map(toBrand);
        setLogoRows({
          developer: dev.length ? dev : row1Brands,
          contractor: con.length ? con : row2Brands,
          hotel: hot.length ? hot : row3Brands,
        });
      } catch {
        /* keep defaults */
      }
    })();
    return () => { active = false; };
  }, []);

  // Pull live banners from PocketBase (managed in /admin/banners). Fall back to
  // the built-in defaults if there are none or the request fails.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const list = await pb.collection(BANNERS).getFullList<BannerRecord>({
          filter: 'active = true',
          sort: 'sort,created',
        });
        if (active && list.length) {
          setHeroSlides(
            list.map((b) => ({
              img: fileUrl(b, b.image),
              link: b.link || '',
              title: { en: b.title_en || '', th: b.title_th || '' },
              subtitle: { en: b.subtitle_en || '', th: b.subtitle_th || '' },
            }))
          );
          setCurrentHeroSlide(0);
        }
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  const heroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandedSectionRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef<number>(0);
  
  const nextSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

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
    touchEndX.current = e.touches[0].clientX;
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
      {settings.cta_enabled && (
        <section className="bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-6xl mx-auto px-4 md:px-12 py-1.5 md:py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-white text-center sm:text-left">
              <p className="text-xs md:text-sm font-semibold leading-snug">{language === 'EN' ? settings.cta_title_en : settings.cta_title_th}</p>
              <p className="text-[11px] md:text-xs text-white/90 mt-0.5">{language === 'EN' ? settings.cta_subtitle_en : settings.cta_subtitle_th}</p>
            </div>
            <a
              href={settings.cta_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-orange-600 hover:bg-orange-50 px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-md shadow-md hover:shadow-lg whitespace-nowrap"
            >
              {language === 'EN' ? settings.cta_button_en : settings.cta_button_th}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </section>
      )}

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


        <div className="hero-banner relative w-full aspect-[33/14] overflow-hidden bg-[#FDFBF7] dark:bg-stone-950">

          {/* Slides — frame matches image 16:9 so all text is fully visible, no crop, no side gaps */}
          {heroSlides.map((slide, idx) => {
            const imgEl = (
              <img
                src={slide.img}
                alt="Evergreen Promotion Banner"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover brightness-110 pointer-events-none"
              />
            );
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentHeroSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              >
                {slide.link ? (
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 block"
                    aria-label="Promo banner"
                    onClick={(e: React.MouseEvent) => {
                      const dx = Math.abs(touchEndX.current - touchStartX.current);
                      if (dx > 10) e.preventDefault();
                    }}
                  >
                    {imgEl}
                  </a>
                ) : (
                  imgEl
                )}
              </div>
            );
          })}

          {/* Text Overlay — absolute so it does not affect container height.
              Only rendered when the active banner actually has overlay text. */}
          {(() => {
            const slide = heroSlides[currentHeroSlide] || heroSlides[0];
            const title = language === 'EN' ? slide?.title.en : slide?.title.th;
            const subtitle = language === 'EN' ? slide?.subtitle.en : slide?.subtitle.th;
            if (!title && !subtitle) return null;
            return (
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20 text-center">
                  <div className="max-w-5xl mx-auto">
                    <div key={currentHeroSlide} className="animate-fade-in-up">
                      {title && (
                        <h1 className="font-sans font-bold uppercase tracking-wide leading-tight text-white mb-4 sm:mb-8 drop-shadow-lg" style={{ fontSize: 'clamp(1.5rem, 5vw, 4.5rem)' }}>
                          {title}
                        </h1>
                      )}
                      {subtitle && (
                        <p className="max-w-xl font-medium text-stone-100 leading-relaxed mx-auto mb-6 sm:mb-10 drop-shadow-md" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Slide Indicator Dots */}
          {heroSlides.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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
                onClick={() => {
                  const next = selectedCardIndex === i ? null : i;
                  setSelectedCardIndex(next);
                  if (next !== null) {
                    setTimeout(() => {
                      expandedSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 150);
                  }
                }}
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
          <div ref={expandedSectionRef} className={`overflow-hidden transition-all duration-500 ease-in-out scroll-mt-24 ${selectedCardIndex !== null ? 'max-h-[500px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'}`}>
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
                    <a
                      href={quickCards[selectedCardIndex].link || "https://shop.chhindustry.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#f37021] text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide hover:bg-[#d65f17] transition-all duration-300 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                      {t("Order Product", "สั่งซื้อสินค้า")}
                    </a>
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
                  {[...logoRows.developer, ...logoRows.developer].map((brand, i) => (
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
                  {[...logoRows.contractor, ...logoRows.contractor].map((brand, i) => (
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
                  {[...logoRows.hotel, ...logoRows.hotel].map((brand, i) => (
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
