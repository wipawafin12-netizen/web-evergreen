import React, { useState } from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

type ImageMode = 'DATA' | 'PUBLIC';


const IMAGES_SOURCE: ImageMode = 'PUBLIC';

const DOOR_DETAILS = [
  {
    description: {
      th: "ประตูดีไซน์ Minimal Modern โทนไม้ธรรมชาติ ให้ความรู้สึกอบอุ่น เรียบ คลีน เหมาะกับบ้านสไตล์ Modern / Japandi / Minimal Luxury เส้นสายเรียบ ไม่มีลวดลายรบกวนสายตา มือจับทรงยาวแนวตั้ง ช่วยเสริมภาพลักษณ์พรีเมียมและทันสมัย",
      en: "Minimal Modern design door in natural wood tones, offering a warm, simple, and clean feel. Perfect for Modern / Japandi / Minimal Luxury homes. Clean lines with no distracting patterns. Vertical long handle enhances the premium and modern look."
    },
    sections: [
      {
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ผิวบาน (Surface Finish)", en: "Surface Finish" },
            items: {
              th: ["ผิวลายไม้สีอ่อน โทน Natural Wood", "ผิวเรียบ ดูเป็นธรรมชาติ ให้สัมผัสอบอุ่น", "ทำความสะอาดง่าย ไม่อมฝุ่น"],
              en: ["Light wood grain surface, Natural Wood tone", "Smooth natural look, warm touch", "Easy to clean, dust-resistant"]
            }
          },
          {
            title: { th: "โครงสร้างบาน (Door Core)", en: "Door Core" },
            items: {
              th: ["โครงสร้างแข็งแรง ให้บานประตูคงรูป ไม่บิดงอ", "รองรับการใช้งานภายในอาคารได้ดี"],
              en: ["Strong structure, maintains shape, no warping", "Suitable for indoor use"]
            }
          },
          {
            title: { th: "ขอบบาน (Edge Finish)", en: "Edge Finish" },
            items: {
              th: ["เก็บขอบเรียบเนียน สีสม่ำเสมอ", "เพิ่มความทนทาน ลดการกระแทกบริเวณขอบ"],
              en: ["Smooth edge finish, consistent color", "Increases durability, reduces impact damage"]
            }
          }
        ]
      },
      {
        title: { th: "มือจับ (Handle)", en: "Handle" },
        items: {
          th: ["มือจับทรงยาวแนวตั้ง สีเทา/สแตนเลสด้าน", "ดีไซน์โมเดิร์น จับถนัดมือ เสริมลุคมินิมอล"],
          en: ["Vertical long handle, Grey/Matte Stainless", "Modern design, ergonomic grip, enhances minimal look"]
        }
      },
      {
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        items: {
          th: ["ดีไซน์ Minimal เรียบหรู เข้าได้กับหลายสไตล์บ้าน", "โทนสีไม้ธรรมชาติ ช่วยให้พื้นที่ดูอบอุ่น โปร่ง สบายตา", "ดูแลรักษาง่าย เหมาะกับการใช้งานในชีวิตประจำวัน", "ภาพรวมให้ความรู้สึก Modern Luxury แบบไม่หวือหวา"],
          en: ["Minimal elegant design, fits various styles", "Natural wood tone creates warm, airy atmosphere", "Easy maintenance, suitable for daily use", "Overall Modern Luxury feel without being flashy"]
        }
      },


    ]
  },
  {
    description: {
      th: "ประตูสไตล์ Scandinavian Loft โดดเด่นด้วยโทนสีขาวนวลตา ผสานความเท่ของมือจับสีดำด้าน หน้าบานเซาะร่องเส้นนอน ให้ความรู้สึกโปร่งโล่ง สบายตา แต่แฝงความทันสมัย",
      en: "Scandinavian Loft style door featuring creamy white tones combined with cool matte black handles. Horizontal grooved panel creates an airy, comfortable feel with modern hidden details."
    },
    sections: [
      {
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ผิวบาน (Surface Finish)", en: "Surface Finish" },
            items: {
              th: ["ผิวพ่นสีอุตสาหกรรม เกรดพรีเมียม", "สีขาวด้าน (Matte White)", "เช็ดทำความสะอาดง่าย"],
              en: ["Premium industrial spray finish", "Matte White", "Easy to wipe clean"]
            }
          }
        ]
      },
      {
        title: { th: "มือจับ (Handle)", en: "Handle" },
        items: {
          th: ["มือจับก้านโยกสีดำด้าน", "รูปทรงเหลี่ยม กระชับมือ"],
          en: ["Matte black lever handle", "Square shape, firm grip"]
        }
      },
      {
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        items: {
          th: ["สีขาวช่วยให้ห้องดูกว้างขึ้น", "ลายเซาะร่องเพิ่มมิติให้บานประตู", "เหมาะกับห้องขนาดเล็กถึงกลาง"],
          en: ["White color expands visual space", "Grooved pattern adds dimension", "Ideal for small to medium rooms"]
        }
      },
      {
        title: { th: "เหมาะสำหรับ (Suitable For)", en: "Suitable For" },
        items: {
          th: ["คอนโดมิเนียม", "ห้องนอนเล็ก", "สตูดิโอ"],
          en: ["Condominiums", "Small Bedroom", "Studio"]
        }
      }
    ]
  },
  {
    description: {
      th: "ประตูไม้โอ๊คสีเข้ม ดีไซน์ Timeless Classic มอบความหรูหรา โอ่อ่า ให้กับพื้นที่ ลวดลายไม้ชัดเจน สัมผัสถึงธรรมชาติอย่างแท้จริง เหมาะกับบ้านสไตล์ Luxury หรือ Classic Contemporary",
      en: "Dark Oak door in Timeless Classic design, offering luxury and grandeur. Distinct wood grain provides a genuine natural touch. Perfect for Luxury or Classic Contemporary homes."
    },
    sections: [
      {
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ผิวบาน (Surface Finish)", en: "Surface Finish" },
            items: {
              th: ["วีเนียร์ไม้โอ๊คแท้ (Real Oak Veneer)", "ย้อมสี Dark Walnut", "เคลือบแลคเกอร์ด้านโชว์เสี้ยนไม้"],
              en: ["Real Oak Veneer", "Dark Walnut stain", "Matte lacquer open-pore finish"]
            }
          }
        ]
      },
      {
        title: { th: "มือจับ (Handle)", en: "Handle" },
        items: {
          th: ["มือจับก้านโยกสีทองเหลืองรมดำ", "ดีไซน์วินเทจ ร่วมสมัย"],
          en: ["Antique Brass lever handle", "Vintage contemporary design"]
        }
      },
      {
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        items: {
          th: ["เพิ่มความภูมิฐานให้ตัวบ้าน", "ลายไม้เป็นเอกลักษณ์เฉพาะบาน", "เก็บเสียงรบกวนได้ดี"],
          en: ["Adds dignity to the home", "Unique wood grain per door", "Good sound insulation"]
        }
      },
      {
        title: { th: "เหมาะสำหรับ (Suitable For)", en: "Suitable For" },
        items: {
          th: ["ห้องนอน Master", "ห้องรับแขก", "ห้องประชุมผู้บริหาร"],
          en: ["Master Bedroom", "Living Room", "Executive Meeting Room"]
        }
      }
    ]
  },
  {
    description: {
      th: "ประตูบานทึบเรียบหรูโทนสีเทาอ่อน (Light Grey) สไตล์ Modern Corporate ให้ความรู้สึกสุขุม น่าเชื่อถือ เหมาะสำหรับอาคารสำนักงาน หรือบ้านที่ต้องการความเรียบง่ายแต่เป็นทางการ",
      en: "Solid sleek Light Grey door in Modern Corporate style. Conveying calm and reliability. Ideal for office buildings or homes seeking formal simplicity."
    },
    sections: [
      {
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ผิวบาน (Surface Finish)", en: "Surface Finish" },
            items: {
              th: ["ลามิเนตแรงดันสูง (HPL)", "ทนต่อรอยขีดข่วน", "สีเทาด้านสม่ำเสมอทั่วบาน"],
              en: ["High Pressure Laminate (HPL)", "Scratch resistant", "Consistent matte grey color"]
            }
          }
        ]
      },
      {
        title: { th: "มือจับ (Handle)", en: "Handle" },
        items: {
          th: ["มือจับก้านโยกสแตนเลส (Hairline Stainless)", "ทนทาน ไม่เป็นสนิม"],
          en: ["Hairline Stainless lever handle", "Durable, rust-free"]
        }
      },
      {
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        items: {
          th: ["แข็งแรง ทนทานต่อการใช้งานหนัก", "ดูแลรักษาง่ายมาก", "เข้าได้กับเฟอร์นิเจอร์สำนักงานส่วนใหญ่"],
          en: ["Strong, distinct durability", "Very easy maintenance", "Matches most office furniture"]
        }
      },
      {
        title: { th: "เหมาะสำหรับ (Suitable For)", en: "Suitable For" },
        items: {
          th: ["สำนักงาน", "ประตูทางเข้าห้อง", "พื้นที่ส่วนกลาง"],
          en: ["Office", "Room Entrance", "Common Areas"]
        }
      }
    ]
  },
  {
    description: {
      th: "ประตูบานกระจกเฟรมไม้ สไตล์ Japandi ผสมผสานความอบอุ่นของไม้กับความโปร่งใสของกระจก ช่วยดึงแสงธรรมชาติเข้าสู่ตัวบ้าน ทำให้พื้นที่ดูลื่นไหลและเชื่อมต่อกัน",
      en: "Wood framed glass door in Japandi style, blending wood warmth with glass transparency. Draws natural light into the home, creating fluid and connected spaces."
    },
    sections: [
      {
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ผิวบาน (Surface Finish)", en: "Surface Finish" },
            items: {
              th: ["กรอบบานไม้จริง (Solid Wood Frame)", "กระจกนิรภัยเทมเปอร์ใสหรือขุ่น", "ทำสีธรรมชาติ"],
              en: ["Solid Wood Frame", "Tempered Clear/Frosted Glass", "Natural Finish"]
            }
          }
        ]
      },
      {
        title: { th: "มือจับ (Handle)", en: "Handle" },
        items: {
          th: ["มือจับแบบดึง (Pull Handle) ไม้เข้าชุด", "ติดตั้งระบบ Soft Close"],
          en: ["Matching Wood Pull Handle", "Soft Close system installed"]
        }
      },
      {
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        items: {
          th: ["ช่วยประหยัดพลังงานแสงสว่าง", "สร้างความรู้สึกเชื่อมต่อระหว่างห้อง", "ดีไซน์โดดเด่นเป็น Centerpiece"],
          en: ["Saves lighting energy", "Creates connection between rooms", "Standout Centerpiece design"]
        }
      },
      {
        title: { th: "เหมาะสำหรับ (Suitable For)", en: "Suitable For" },
        items: {
          th: ["ห้องครัว", "ห้องนั่งเล่น", "กั้นโซน Walk-in Closet"],
          en: ["Kitchen", "Living Room", "Walk-in Closet Partition"]
        }
      }
    ]
  }
];

const DoorCard = ({ imgUrl, index, t, onClick }: { imgUrl: string, index: number, t: any, onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="bg-transparent group hover:shadow-lg transition-all duration-500 relative overflow-hidden text-center flex flex-col cursor-pointer"
    >
      <div className="aspect-[3/4] mb-8 flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden rounded-3xl">
        <img
          src={imgUrl}
          alt={`Door ${index + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 animate-image-reveal"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h4 className="text-brand-900 dark:text-stone-100 font-mono text-lg mb-2">{t("The Door", "ประตูรุ่น")} {index + 1}</h4>
        <p className="text-stone-500 dark:text-stone-400 text-xs tracking-widest uppercase">{t("Select Edition", "รุ่นคัดพิเศษ")}</p>
        <p className="text-sm font-serif text-brand-900 dark:text-stone-200 mt-2 mb-4">
          ฿{[2900, 1500, 1200, 1900, 2500][index]?.toLocaleString() || "12,900"}
        </p>

        <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs uppercase tracking-wider text-stone-400 border-b border-stone-400 pb-0.5">{t("View Details", "ดูรายละเอียด")}</span>
        </div>
      </div>
    </div>
  );
};

const DoorModal = ({ isOpen, onClose, imgUrl, index, t, language }: { isOpen: boolean, onClose: () => void, imgUrl: string, index: number, t: any, language: string }) => {
  
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  const data = DOOR_DETAILS[index] || DOOR_DETAILS[0]; 

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="bg-white dark:bg-stone-900 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-stone-900 dark:text-white"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
        </button>

       
        <div className="w-full md:w-5/12 h-64 md:h-auto bg-stone-100 dark:bg-stone-800 relative">
          <img
            src={imgUrl}
            alt={`Door ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto">
          <div className="mb-6">
            <h3 className="font-serif text-3xl md:text-4xl text-brand-900 dark:text-stone-100 mb-2">{t("The Door", "ประตูรุ่น")} {index + 1}</h3>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-4">{t("Select Edition", "รุ่นคัดพิเศษ")} — ฿{[2900, 1500, 1200, 1900, 2500][index]?.toLocaleString() || "12,900"}</p>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {language === 'EN' ? data.description.en : data.description.th}
            </p>
          </div>

          <div className="space-y-6">
            {data.sections.map((section, idx) => (
              <div key={idx} className="border-t border-stone-100 dark:border-stone-800 pt-4">
                <h5 className="font-bold text-brand-900 dark:text-stone-100 mb-3 uppercase tracking-wide text-xs">
                  {language === 'EN' ? section.title.en : section.title.th}
                </h5>

                {section.subsections ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl">
                        <p className="font-bold text-xs mb-2 text-stone-700 dark:text-stone-300">{language === 'EN' ? sub.title.en : sub.title.th}</p>
                        <ul className="space-y-1.5">
                          {language === 'EN' ? sub.items.en?.map((item, ii) => (
                            <li key={ii} className="text-xs text-stone-500 dark:text-stone-400 flex items-start gap-2">
                              <span className="block w-1 h-1 bg-stone-400 rounded-full mt-1.5 flex-shrink-0" />
                              {item}
                            </li>
                          )) : sub.items.th?.map((item, ii) => (
                            <li key={ii} className="text-xs text-stone-500 dark:text-stone-400 flex items-start gap-2">
                              <span className="block w-1 h-1 bg-stone-400 rounded-full mt-1.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {language === 'EN' ? section.items?.en?.map((item, ii) => (
                      <li key={ii} className="text-xs text-stone-500 dark:text-stone-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 border border-stone-300 rounded-full mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    )) : section.items?.th?.map((item, ii) => (
                      <li key={ii} className="text-xs text-stone-500 dark:text-stone-400 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 border border-stone-300 rounded-full mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Door: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDoorIndex, setSelectedDoorIndex] = useState<number | null>(null);

  interface Swatch {
    code: string;
    name: string;
    img: string;
    doorImg: string;
  }

  const swatches: Swatch[] = [
    { code: "LQ6268", name: "Hickory", img: "public/c1.png", doorImg: "public/Door Hick.png" },
    { code: "LQ7124", name: "Oak", img: "public/c2.png", doorImg: "public/Door Oak.png" },
    { code: "LQ8116", name: "Marble", img: "public/c3.png", doorImg: "public/Door Marble.png" },
    { code: "LQ8128", name: "Marble", img: "public/c4.png", doorImg: "public/Door M2.png" },
    { code: "LQ8136", name: "Marble", img: "public/c5.png", doorImg: "public/Door M3.png" },
    { code: "LQ8145", name: "Cement", img: "public/c6.png", doorImg: "public/Door M4.png" },
  ];

  const [hoveredSwatch, setHoveredSwatch] = useState<Swatch | null>(null);
  const [selectedSwatch, setSelectedSwatch] = useState<Swatch | null>(null);

  const activeSwatch = hoveredSwatch || selectedSwatch;


  const PUBLIC_IMAGES = {
    hero: 'public/door1.png',
    feature: 'public/Df4.jpg',
    collection: [
      'public/df2.png',
      'public/Ins1.png',
      'public/stu edition.png',
      'public/pp1.png',
      'public/Door Hick.png',
      
    ],
  };


  const IMAGES =
    IMAGES_SOURCE === 'PUBLIC'
      ? PUBLIC_IMAGES
      : {
        hero: PAGE_IMAGES.door.hero,
        feature: PAGE_IMAGES.door.feature,
        collection: PAGE_IMAGES.door.collection,
      };

  const selectedDoorImg = selectedDoorIndex !== null ? (IMAGES_SOURCE === 'PUBLIC' ? PUBLIC_IMAGES.collection[selectedDoorIndex] : PAGE_IMAGES.door.collection[selectedDoorIndex]) : '';

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">

      {/* Modal */}
      <DoorModal
        isOpen={selectedDoorIndex !== null}
        onClose={() => setSelectedDoorIndex(null)}
        imgUrl={selectedDoorImg}
        index={selectedDoorIndex || 0}
        t={t}
        language={t("EN", "TH") === "EN" ? "EN" : "TH"}
      />

      <div className="flex flex-col md:flex-row h-screen max-h-[900px]">

        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-white dark:bg-stone-800 z-10">
          <div>
            <h1 className="text-2xl md:text-2xl lg:text-2xl text-brand-900 dark:text-stone-100 mb-8 leading-[0.9]">
              {t("Talking about", "พูดคุยเรื่อง")} <br /> {t("door.", "ประตู")}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-sm mb-12 text-sm leading-relaxed">
              {t("It is a social lubricant or a dangerous stimulant? explore our collection of premium doors designed for modern living.", "มันคือตัวเชื่อมความสัมพันธ์หรือสิ่งกระตุ้นที่อันตราย? สำรวจคอลเลกชันประตูพรีเมียมของเราที่ออกแบบมาเพื่อการอยู่อาศัยที่ทันสมัย")}
            </p>
            <a
              href="#collection"
              className="text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors dark:text-stone-100"
            >
              {t("Show Collection", "ดูคอลเลกชัน")}
            </a>

            <div className="flex gap-8 mt-24 text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500">
              <span>{t("Modern", "ทันสมัย")}</span>
              <span>{t("Classic", "คลาสสิก")}</span>
              <span>{t("Minimal", "มินิมอล")}</span>
            </div>
          </div>
        </div>


        <div className="w-full md:w-1/2 bg-white dark:bg-stone-800 relative p-4 md:p-12 flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden shadow-sm">
            <img
              src={IMAGES.hero}
              alt="Door Hero"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl animate-image-reveal"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 z-10 text-white text-left opacity-90">
              <p className="font-serif italic text-lg tracking-wide"></p>
            </div>
          </div>
        </div>
      </div>


      <div id="collection" className="bg-white dark:bg-stone-950 py-32 px-6">
        <div className="container mx-auto">
          <h3 className="text-brand-900 dark:text-stone-100 font-serif text-3xl mb-16">{t("Signature Selection.", "คัดสรรพิเศษ")}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-32 items-start">
            {IMAGES.collection.map((imgUrl, i) => (
              <DoorCard
               
                imgUrl={imgUrl}
                index={i}
                t={t}
                onClick={() => setSelectedDoorIndex(i)}
              />
            ))}
          </div>


          <div className="mb-12 relative z-20">
            <h3 className="text-brand-900 dark:text-stone-100 font-bold text-2xl mb-12">{t("Color", "สี")}</h3>

            {/* Interactive Swatches Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-5xl mx-auto relative z-10">
              {swatches.map((swatch, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center group cursor-pointer relative"
                  onMouseEnter={() => setHoveredSwatch(swatch)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                  onClick={() => setSelectedSwatch(swatch)}
                >
                  {/* Floating Door Preview relative to this item */}
                  {activeSwatch?.code === swatch.code && (
                    <div className="absolute bottom-full mb-4 z-50 pointer-events-none animate-in fade-in zoom-in slide-in-from-bottom-2 duration-200">
                      <div className="relative w-40 h-[18rem] rounded-2xl">
                        <img
                          src={swatch.doorImg}
                          alt={swatch.name}
                          className="w-full h-full object-cover rounded-xl shadow-sm bg-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 border-2 p-1 transition-all duration-300 ${activeSwatch?.code === swatch.code ? 'border-stone-800 dark:border-stone-100 scale-110' : 'border-transparent group-hover:border-stone-300 dark:group-hover:border-stone-600'}`}>
                    <div className="w-full h-full rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden relative">
                      <img src={swatch.img} alt={swatch.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${activeSwatch?.code === swatch.code ? 'text-stone-900 dark:text-stone-100 font-bold' : 'text-stone-500 dark:text-stone-400'}`}>{swatch.code}</p>
                  <p className="text-stone-400 text-xs hidden md:block">{swatch.name}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-12 text-stone-400 text-xs">{t("Click to select", "คลิกเพื่อเลือก")}</p>
          </div>

        </div>
      </div>


      <div className="container mx-auto py-32 px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h3 className="text-4xl mb-6 text-stone-900 dark:text-stone-100">{t("The House Blend.", "เดอะ เฮาส์ เบลนด์")}</h3>
            <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed text-sm">
              {t("Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum. Specialized door construction ensures longevity and style.", "เราใส่ใจในทุกรายละเอียด การก่อสร้างประตูแบบพิเศษช่วยให้มั่นใจได้ถึงอายุการใช้งานที่ยาวนานและสไตล์ที่โดดเด่น")}
            </p>
            <a href="#" className="text-xs uppercase underline dark:text-stone-100">
              {t("Read More", "อ่านเพิ่มเติม")}
            </a>
          </div>

          <div className="">
            <div className="aspect-square bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden rounded-3xl">
              <img
                src={IMAGES.feature}
                alt="Door Feature"
                className="w-full h-full object-cover animate-image-reveal"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
