import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_IMAGES } from "../data/images";
import { useLanguage } from "../contexts/LanguageContext";

type ImageMode = "DATA" | "PUBLIC";
const IMAGES_SOURCE: ImageMode = "PUBLIC";

type Lang = "th" | "en";
type CollectionType = "WPC" | "uPVC" | "Melamine";

type IconKey =
  | "ECO_FRIENDLY"
  | "WATER_PROOF"
  | "FLAME_RETARDANT"
  | "CHAMFER"
  | "STAINING"
  | "INDOOR_USE"
  | "INSECT_REPELLENT";

type IconItem = {
  key?: IconKey;
  img?: string;
  label: { th: string; en: string };
};

type Section =
  | {
    kind: "subsections";
    title: { th: string; en: string };
    subsections: Array<{
      title: { th: string; en: string };
      items: { th: string[]; en: string[] };
    }>;
  }
  | {
    kind: "list";
    title: { th: string; en: string };
    items: { th: string[]; en: string[] };
  }
  | {
    kind: "iconGrid";
    title: { th: string; en: string };
    icons: IconItem[];
  };

type DoorDetail = {
  modalTitle: { th: string; en: string };
  description: { th: string; en: string };
  sections: Section[];
};

interface Swatch {
  code: string;
  name: string;
  img: string;
  doorImg: string;
}

const swatches: Swatch[] = [
  { code: "Caramel Sand", name: "", img: "/door/Caramel Sand.png", doorImg: "/door/Caramel Sand.png" },
  { code: "Dark Mocha", name: "", img: "/door/Dark Mocha.png", doorImg: "/door/Dark Mocha.png" },
  { code: "Latte Beige", name: "", img: "/door/Latte Beige.png", doorImg: "/door/Latte Beige.png" },
  { code: "Milk Coffee", name: "", img: "/door/Milk Coffee.png", doorImg: "/door/Milk Coffee.png" },
  { code: "Mocha Brown", name: "", img: "/door/Mocha Brown.png", doorImg: "/door/Mocha Brown.png" },
  { code: "Mocha Mist", name: "", img: "/door/Mocha Mist.png", doorImg: "/door/Mocha Mist.png" },
];

const melamineSwatches: Swatch[] = [
  { code: "Earl Grey", name: "", img: "/door/Melamine/Earl Grey.png", doorImg: "/door/Melamine/Earl Grey.png" },
  { code: "Sand", name: "", img: "/door/Melamine/Sand.png", doorImg: "/door/Melamine/Sand.png" },
  { code: "Smoke Grey", name: "", img: "/door/Melamine/Smoke Grey.png", doorImg: "/door/Melamine/Smoke Grey.png" },
  { code: "Tobac Brown", name: "", img: "/door/Melamine/Tobac Brown.png", doorImg: "/door/Melamine/Tobac Brown.png" },
  { code: "Alpine White", name: "", img: "/door/Melamine/Alpine White.png", doorImg: "/door/Melamine/Alpine White.png" },
  { code: "Bronze Brown", name: "", img: "/door/Melamine/Bronze Brown.png", doorImg: "/door/Melamine/Bronze Brown.png" },
  { code: "Ivory Brown", name: "", img: "/door/Melamine/Ivory Brown.png", doorImg: "/door/Melamine/Ivory Brown.png" },
  { code: "Platinum Grey", name: "", img: "/door/Melamine/Platinum Grey.png", doorImg: "/door/Melamine/Platinum Grey.png" },
  { code: "Cocoa Oak", name: "", img: "/door/Melamine/Cocoa Oak.png", doorImg: "/door/Melamine/Cocoa Oak.png" },

];

const WPC_DETAILS: DoorDetail[] = [
  {
    modalTitle: { th: "WPC", en: "WPC" },
    description: {
      th: "Introducing the WPC Elegance Series, a harmonious blend of Wood Plastic Composite innovation and premium PVC resin.",
      en: "Introducing the WPC Elegance Series, a harmonious blend of Wood Plastic Composite innovation and premium PVC resin.",
    },
    sections: [
      {
        kind: "subsections",
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ขนาดมาตรฐาน (Standard Size)", en: "Standard Size" },
            items: {
              th: ["3.5 x 70 x 200 ซม.", "3.5 x 80 x 200 ซม.", "3.5 x 90 x 200 ซม."],
              en: ["3.5 x 70 x 200 cm", "3.5 x 80 x 200 cm", "3.5 x 90 x 200 cm"],
            },
          },
          {
            title: { th: "สเปก (Specification)", en: "Specification" },
            items: {
              th: [
                "ปรับขนาดได้ (Customizable Dimensions)",
                "ผิวสำเร็จ: ทาสี, PVC DecorFilm (Surface Finishes: Paint, PVC DecorFilm)",
                "แนะนำสำหรับงานภายใน (Recommended for Indoor Use)",
              ],
              en: [
                "Customizable Dimensions",
                "Surface Finishes: Paint, PVC DecorFilm",
                "Recommended for Indoor Use",
              ],
            },
          },
        ],
      },
      {
        kind: "iconGrid",
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        icons: [
          { img: "/door/Eco Friendly.jpg", label: { th: "เป็นมิตรต่อสิ่งแวดล้อม", en: "Eco Friendly" } },
          { img: "/door/Water Proof.jpg", label: { th: "กันน้ำ", en: "Water Proof" } },
          { img: "/door/Flame Retardant.jpg", label: { th: "ไม่ลามไฟ", en: "Flame Retardant" } },
          { img: "/door/Chamfer.jpg", label: { th: "ลบมุม", en: "Chamfer" } },
          { img: "/door/Staining.jpg", label: { th: "รองรับการทำสี", en: "Staining" } },
          { img: "/door/Indoor Use.png", label: { th: "ใช้งานภายใน", en: "Indoor Use" } },
          { img: "/door/Insect Repellent.jpg", label: { th: "กันแมลง/ปลวก", en: "Insect Repellent" } },
        ],
      },
    ],
  },
];

const upvcSwatches: Swatch[] = [
  { code: "no groove", name: "", img: "/door/dd5.png", doorImg: "/door/dd5.png" },
  { code: "1-Line Groove", name: "", img: "/door/dd3.png", doorImg: "/door/dd3.png" },
  { code: "2-Line Groove", name: "", img: "/door/dd4.png", doorImg: "/door/dd4.png" },
  { code: "3-Line Groove", name: "", img: "/door/dd6.png", doorImg: "/door/dd6.png" },
  { code: "4-Line Groove", name: "", img: "/door/dd1.png", doorImg: "/door/dd1.png" },
  { code: "5-Line Groove", name: "", img: "/door/dd2.png", doorImg: "/door/dd2.png" },
];

const UPVC_DETAILS: DoorDetail[] = [
  {
    modalTitle: { th: "uPVC", en: "uPVC" },
    description: {
      th: "ประตู uPVC Zen Series โทนขาวสะอาดตา ให้ความรู้สึกโปร่ง สบาย เหมาะกับบ้านสไตล์โมเดิร์นและมินิมอล ไม่จำเป็นต้องทาสีเพิ่ม ดูแลรักษาง่าย",
      en: "uPVC Zen Series in clean white tone. Bright, calm, and minimal look. No extra paint needed and easy to maintain.",
    },
    sections: [
      {
        kind: "subsections",
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ขนาดมาตรฐาน (Standard Size)", en: "Standard Size" },
            items: {
              th: ["3.5 x 70 x 200 ซม.", "3.5 x 80 x 200 ซม.", "3.5 x 90 x 200 ซม."],
              en: ["3.5 x 70 x 200 cm", "3.5 x 80 x 200 cm", "3.5 x 90 x 200 cm"],
            },
          },
          {
            title: { th: "ผิวบาน (Surface Finish)", en: "Surface Finish" },
            items: {
              th: ["Smooth (ผิวเรียบ)", "Modern (สไตล์ทันสมัย)", "Natural (ลายไม้ธรรมชาติ)"],
              en: ["Smooth", "Modern", "Natural"],
            },
          },
          {
            title: { th: "โครงสร้างบาน (Door Core)", en: "Door Core" },
            items: {
              th: ["โครงสร้างแน่น แ็ข็งแรง", "ช่วยให้บานคงรูปได้ดี"],
              en: ["Dense structure, durable", "Helps maintain shape well"],
            },
          },
        ],
      },
      {
        kind: "iconGrid",
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        icons: [
          { img: "/door/Chamfer.jpg", label: { th: "ลบมุม", en: "CHAMFER" } },
          { img: "/door/Indoor Use.png", label: { th: "ใช้งานภายใน", en: "INDOOR USE" } },
          { img: "/door/Outdoor Use.jpg", label: { th: "ใช้งานภายนอก", en: "OUTDOOR USE" } },
          { img: "/door/Insect Repellent.jpg", label: { th: "กันแมลง/ปลวก", en: "INSECT REPELLENT" } },
          { img: "/door/Eco Friendly.jpg", label: { th: "เป็นมิตรต่อสิ่งแวดล้อม", en: "ECO FRIENDLY" } },
          { img: "/door/Water Proof.jpg", label: { th: "กันน้ำ", en: "WATER PROOF" } },
          { img: "/door/Flame Retardant.jpg", label: { th: "ไม่ลามไฟ", en: "FLAME RETARDANT" } },
        ],
      },
    ],
  },
];

const MELAMINE_DETAILS: DoorDetail[] = [
  {
    modalTitle: { th: "Melamine", en: "Melamine" },
    description: {
      th: "Unlocking Imagination: The Hester Series Melamine Doors\nWhere Creativity Meets the Heart of Your Home\n\nCrafting emotions and defining spaces; our Hester Series Melamine Doors resonate with a touch of artistic elegance that goes beyond the ordinary. Transform your interiors with doors that boast not only durability but also a rich array of styles, from wood to fabric and leather-inspired designs. Customize sizes, groove lines, and bring your imagination to life.",
      en: "Unlocking Imagination: The Hester Series Melamine Doors\nWhere Creativity Meets the Heart of Your Home\n\nCrafting emotions and defining spaces; our Hester Series Melamine Doors resonate with a touch of artistic elegance that goes beyond the ordinary. Transform your interiors with doors that boast not only durability but also a rich array of styles, from wood to fabric and leather-inspired designs. Customize sizes, groove lines, and bring your imagination to life.",
    },
    sections: [
      {
        kind: "subsections",
        title: { th: "วัสดุ (Material)", en: "Material" },
        subsections: [
          {
            title: { th: "ขนาดมาตรฐาน (Standard Size)", en: "Standard Size" },
            items: {
              th: ["3.5 x 80 x 200 ซม.", "3.5 x 90 x 200 ซม."],
              en: ["3.5 x 80 x 200 cm", "3.5 x 90 x 200 cm"],
            },
          },
          {
            title: { th: "สเปก (Specification)", en: "Specification" },
            items: {
              th: [
                "ปรับขนาดได้ (Customizable Dimensions)",
                "ไสขอบได้สูงสุดข้างละ 5 มม. (Max 5 mm. Trimmable Each Side)",
                "แนะนำสำหรับงานภายใน (Recommended for Indoor Use)",
              ],
              en: [
                "Customizable Dimensions",
                "Max 5 mm. Trimmable Each Side",
                "Recommended for Indoor Use",
              ],
            },
          },
        ],
      },
      {
        kind: "iconGrid",
        title: { th: "คุณสมบัติเด่น (Key Features)", en: "Key Features" },
        icons: [
          { img: "/door/Chamfer.jpg", label: { th: "ลบมุม", en: "CHAMFER" } },
          { img: "/door/Indoor Use.png", label: { th: "ใช้งานภายใน", en: "INDOOR USE" } },
          { img: "/door/Water Proof.jpg", label: { th: "ทำความสะอาดง่าย", en: "EASY CLEANING" } },
          { img: "/door/Eco Friendly.jpg", label: { th: "ประหยัด", en: "ECONOMICAL" } },
          { img: "/door/Flame Retardant.jpg", label: { th: "ทนทาน", en: "WEAR RESISTANT" } },
        ],
      },
    ],
  },
];

const ProductCollectionSection: React.FC<{
  collection: CollectionType;
  images: any;
  t: (en: string, th: string) => string;
  imagePosition?: "left" | "right";
}> = ({ collection, images, t, imagePosition = "left" }) => {
  const [selectedDoorIndex, setSelectedDoorIndex] = useState<number>(0);

  const isMelamine = collection === "Melamine";
  const collectionSwatches = isMelamine ? melamineSwatches : (collection === "uPVC" ? upvcSwatches : swatches);

  const [selectedColor, setSelectedColor] = useState<Swatch | null>(collectionSwatches[0] || null);

  const currentNames =
    collection === "WPC" ? images.wpcNames :
      collection === "uPVC" ? images.upvcNames :
        images.melamineNames;

  const langKey: Lang = t("EN", "TH") === "EN" ? "en" : "th";

  const currentDoorName =
    (langKey === "en"
      ? currentNames[selectedDoorIndex]?.en
      : currentNames[selectedDoorIndex]?.th) || t("The Door", "ประตูรุ่น") + " " + (selectedDoorIndex + 1);

  const selectedDoorImg =
    collection === "WPC"
      ? images.wpcCollection[selectedDoorIndex] :
      collection === "uPVC"
        ? images.upvcCollection[selectedDoorIndex]
        : images.melamineCollection[selectedDoorIndex];

  const DETAILS =
    collection === "WPC" ? WPC_DETAILS :
      collection === "uPVC" ? UPVC_DETAILS :
        MELAMINE_DETAILS;

  const data = DETAILS[selectedDoorIndex] || DETAILS[0];

  const isImageRight = imagePosition === "right";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Image */}
      <div className={`${isImageRight ? "lg:order-2" : "lg:order-1"}`}>
        <div className="sticky top-24">
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 dark:from-stone-900 dark:to-stone-950">
            <img
              src={selectedColor?.doorImg || selectedDoorImg}
              alt={currentDoorName}
              className="w-full h-full object-contain transition-all duration-700"
            />
          </div>

          {/* CTA Button - Under Image */}
          <a
            href={`https://evergreen-online.vercel.app/configure/door/customize?material=${collection.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300"
          >
            {t("Order Now", "สั่งซื้อ")}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col ${isImageRight ? "lg:order-1" : "lg:order-2"}`}>
        {/* Header */}
        <div className="mb-4">
          <p className="text-[11px] font-medium tracking-[0.3em] text-orange-500 uppercase mb-2">
            {collection}
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
            {currentDoorName}
          </h1>
        </div>

        {/* Description */}
        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 max-w-md">
          {langKey === "en" ? data.description.en : data.description.th}
        </p>

        {/* Specs - 2 Column Layout */}
        <div className="mb-6">
          {data.sections.map((section, idx) => {
            if (section.kind === "subsections") {
              return (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.subsections.slice(0, 2).map((sub, sIdx) => (
                    <div key={sIdx} className="p-5 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20">
                      <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
                        {langKey === "en" ? sub.title.en : sub.title.th}
                      </h3>
                      <div className="space-y-2">
                        {(langKey === "en" ? sub.items.en : sub.items.th).map((item, ii) => (
                          <div key={ii} className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                            <p className="text-sm text-stone-600 dark:text-stone-300">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}

          {/* Surface Texture & Color - inside specs */}
          <div className="mt-4">
            <h3 className="text-xs font-bold tracking-[0.15em] text-stone-800 dark:text-stone-200 uppercase mb-3">
              {langKey === "en" ? "Surface Texture & Color" : "พื้นผิวและสี"}
            </h3>
            <div className="flex flex-wrap gap-3">
              {collectionSwatches.map((swatch, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setSelectedColor(swatch)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                    selectedColor?.code === swatch.code ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden ${
                    selectedColor?.code === swatch.code ? "ring-2 ring-orange-500 ring-offset-2" : ""
                  }`}>
                    <img src={swatch.img} alt={swatch.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-stone-700 dark:text-stone-300">{swatch.code}</p>
                    <p className="text-[8px] text-stone-400 uppercase tracking-wide">{swatch.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-xs font-bold tracking-[0.15em] text-stone-800 dark:text-stone-200 uppercase mb-2">
              {langKey === "en" ? "Key Features" : "คุณสมบัติเด่น"}
            </h3>
            <div className="w-12 h-0.5 bg-orange-500"></div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {data.sections.map((section) => {
              if (section.kind === "iconGrid") {
                return section.icons.map((it, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex flex-col items-center gap-1"
                  >
                    {it.img && (
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-stone-800/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden">
                        <img src={it.img} alt={langKey === "en" ? it.label.en : it.label.th} className="w-8 h-8 object-contain" />
                      </div>
                    )}
                    <p className="text-[8px] font-bold text-stone-500 dark:text-stone-400 uppercase text-center tracking-wide leading-tight">
                      {langKey === "en" ? it.label.en : it.label.th}
                    </p>
                  </div>
                ));
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Door: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const PUBLIC_IMAGES = {
    hero: "/door/Df4.jpg",
    feature: "/door/door1.png",
    wpcCollection: [
      "/door/บานเรียบ.png",
      "/door/บานเรียบ.png",
      "/door/บานเรียบ.png",
      "/door/บานเรียบ.png",
      "/door/บานเรียบ.png",
      "/door/บานเรียบ.png",
    ],
    wpcNames: [
      { th: "WPC-Door", en: "WPC-Door" },
      { th: "มอคค่ามิสต์", en: "WPC-Mocha Mist" },
      { th: "น้ำตาลมอคค่า", en: "WPC-Mocha Brown" },
      { th: "คาราเมลแซนด์", en: "WPC-Caramel Sand" },
      { th: "นมกาแฟ", en: "WPC-Milk Coffee" },
      { th: "น้ำตาลดำ", en: "WPC-Dark Mocha" },
    ],
    upvcCollection: [
      "/door/dd1.png",
      "/door/dd2.png",
      "/door/dd3.png",
      "/door/dd4.png",
      "/door/dd5.png",
      "/door/dd6.png",
    ],
    upvcNames: [
      { th: "uPVC-Door", en: "uPVC-Door" },
      { th: "uPVC-Door", en: "uPVC-Door" },
      { th: "uPVC-Door", en: "uPVC-Door" },
      { th: "uPVC-Door", en: "uPVC-Door" },
      { th: "uPVC-Door", en: "uPVC-Door" },
      { th: "uPVC-Door", en: "uPVC-Door" },
    ],
    melamineCollection: [
      "/door/dd1.png",
      "/door/dd2.png",
      "/door/dd3.png",
      "/door/dd4.png",
      "/door/dd5.png",
      "/door/dd6.png",
    ],
    melamineNames: Array(6).fill({ th: "Melamine-Door", en: "Melamine-Door" }),
  };

  const IMAGES =
    IMAGES_SOURCE === "PUBLIC"
      ? PUBLIC_IMAGES
      : {
        hero: PAGE_IMAGES.door.hero,
        feature: PAGE_IMAGES.door.feature,
        wpcCollection: PAGE_IMAGES.door.collection,
        wpcNames: Array(6).fill({ th: "The Door", en: "The Door" }),
        upvcCollection: PAGE_IMAGES.door.collection,
        upvcNames: Array(6).fill({ th: "The Door", en: "The Door" }),
        melamineCollection: PAGE_IMAGES.door.collection,
        melamineNames: Array(6).fill({ th: "The Door", en: "The Door" }),
      };

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-stone-950">
      {/* WPC Section */}
      <section id="wpc" className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <ProductCollectionSection collection="WPC" images={IMAGES} t={t} imagePosition="left" />
        </div>
      </section>

      {/* uPVC Section */}
      <section id="upvc" className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <ProductCollectionSection collection="uPVC" images={IMAGES} t={t} imagePosition="right" />
        </div>
      </section>

      {/* Melamine Section */}
      <section id="melamine">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <ProductCollectionSection collection="Melamine" images={IMAGES} t={t} imagePosition="left" />
        </div>
      </section>
    </div>
  );
};
