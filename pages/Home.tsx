import React from "react";
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
    title: { en: "Flooring", th: "พื้นไม้" },
    img: "/home-collections/flooring.png",
    path: "/flooring",
    description: {
      en: "Durable, luxurious, and elegantly crafted, SPC Flooring redefines your spaces with lasting beauty. Introducing SPC Flooring, a modern marvel that combines durability, luxury, and timeless design.",
      th: "พื้น SPC มีความทนทาน หรูหรา และได้รับการออกแบบอย่างประณีต ช่วยเปลี่ยนโฉมพื้นที่ของคุณด้วยความงามที่ยั่งยืน ขอแนะนำพื้น SPC นวัตกรรมสมัยใหม่ที่ผสานความทนทาน ความหรูหรา และการออกแบบเหนือกาลเวลา"
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
    img: "/home-collections/04.png",
    path: "/service-shaft",
    description: {
      en: "Step into a world of refined functionality with our Shaft Wall Access Panels, designed to offer effortless access to essential compartments.",
      th: "สัมผัสโลกแห่งฟังก์ชันการใช้งานที่เหนือระดับด้วยแผงปิดช่องเข้าถึงผนังช่องลิฟต์ของเรา ซึ่งได้รับการออกแบบมาเพื่อมอบการเข้าถึงช่องเก็บของที่จำเป็นได้อย่างง่ายดาย"
    }
  },
];


const heroSlides = [
  {
    img: "/home-collections/back.png",
    pretitle: { en: "Evergreen / Door Products", th: "เอเวอร์กรีน / ผลิตภัณฑ์ประตู" },
    title1: { en: "50 Years of", th: "50 ปีแห่ง" },
    title2: { en: "Architectural Products", th: "ผลิตภัณฑ์สถาปัตยกรรม" },
    desc: { en: "Quietly engineered. Timelessly designed. A collection of doors and surfaces crafted for modern spaces.", th: "วิศวกรรมที่เงียบสงบ ดีไซน์ที่ไร้กาลเวลา คอลเลกชันประตูและพื้นผิวที่สร้างสรรค์สำหรับพื้นที่สมัยใหม่" }
  },
  {
    img: "/home-collections/01.png",
    pretitle: { en: "Evergreen / Flooring", th: "เอเวอร์กรีน / พื้นไม้" },
    title1: { en: "Timeless", th: "อมตะ" },
    title2: { en: "Wood Flooring", th: "พื้นไม้ธรรมชาติ" },
    desc: { en: "Bring warmth and character to every room with our premium selection of engineered wood flooring.", th: "นำความอบอุ่นและเอกลักษณ์สู่ทุกห้องด้วยพื้นไม้เอ็นจิเนียร์คัดพิเศษของเรา" }
  },
  {
    img: "/home-collections/back.png",
    pretitle: { en: "Evergreen / Innovation", th: "เอเวอร์กรีน / นวัตกรรม" },
    title1: { en: "Modern", th: "ทันสมัย" },
    title2: { en: "Door Solutions", th: "โซลูชันประตู" },
    desc: { en: "Designed for durability and style, perfect for contemporary living spaces and architectural demands.", th: "ออกแบบมาเพื่อความทนทานและสไตล์ เหมาะสำหรับพื้นที่อยู่อาศัยร่วมสมัยและความต้องการทางสถาปัตยกรรม" }
  }
];

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCardIndex, setSelectedCardIndex] = React.useState<number | null>(null);
  const [currentHeroSlide, setCurrentHeroSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">


      <section className="relative">


        <div className="relative min-h-[600px] flex items-center justify-center pt-20">
        
          <div className="absolute inset-0 z-0 overflow-hidden">

            <div className="relative w-full h-full">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentHeroSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                >
                  <img
                    src={slide.img}
                    alt="Brand Showcase"
                    className="w-full h-full object-cover"
                  />
            
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </div>
          </div>

      
          <div className="relative z-10 container mx-auto px-6 md:px-12 py-20 text-center">
            <div className="max-w-5xl mx-auto animate-fade-in-up">
         
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
        </div>

        <div className="h-px bg-stone-200/70 dark:bg-stone-800/70" />
      </section>


      <section className="py-20 px-6 md:px-12 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6 text-stone-900 dark:text-stone-100 font-light">
              {t("Where Craftsmanship Meets Better Quality of Life", "งานฝีมือผสานกับคุณภาพชีวิตที่ดีกว่า")}
            </h2>
            <div className="w-20 h-1 bg-brand-500 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              {t("With a legacy spanning over 50 years in manufacturing excellence, images, we proudly trace  our origins from a humble sawmill to  a preeminent producer of construction materials.", "ด้วยมรดกอันยาวนานกว่า 50 ปีในด้านความเป็นเลิศทางการผลิต เราภาคภูมิใจที่ได้สืบย้อนต้นกำเนิดจากโรงเลื่อยไม้เล็กๆ สู่ผู้ผลิตวัสดุก่อสร้างชั้นนำ")}
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




      <div className="py-16" />
    </div>
  );
};
