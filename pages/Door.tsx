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
  { code: "LQ6268", name: "Hickory", img: "/door/ddd1.png", doorImg: "/door/ddd4.png" },
  { code: "LQ7124", name: "Oak", img: "/door/ddd2.png", doorImg: "/door/ddd2.png" },
  { code: "LQ8116", name: "Marble", img: "/door/ddd3.png", doorImg: "/door/ddd3.png" },
  { code: "LQ8128", name: "Marble", img: "/door/ddd4.png", doorImg: "/door/ddd1.png" },
  { code: "LQ8136", name: "Marble", img: "/door/ddd5.png", doorImg: "/door/ddd5.png" },
  { code: "LQ8145", name: "Cement", img: "/door/ddd6.png", doorImg: "/door/ddd6.png" },
];

const melamineSwatches: Swatch[] = [
  { code: "MLD102", name: "", img: "/door/m1.png", doorImg: "/door/m1.png" },
  { code: "MLD202", name: "", img: "/door/m2.png", doorImg: "/door/m2.png" },
  { code: "MLD302", name: "", img: "/door/m3.png", doorImg: "/door/m3.png" },
  { code: "MLD402", name: "", img: "/door/m4.png", doorImg: "/door/m4.png" },
  { code: "MLD502", name: "", img: "/door/m5.png", doorImg: "/door/m5.png" },
  { code: "MLD602", name: "", img: "/door/m6.png", doorImg: "/door/m6.png" },
  { code: "MLD702", name: "", img: "/door/m7.png", doorImg: "/door/m7.png" },
  { code: "MLD802", name: "", img: "/door/m8.png", doorImg: "/door/m8.png" },
  { code: "MLD902", name: "", img: "/door/m9.png", doorImg: "/door/m9.png" },
  { code: "MLD1011", name: "", img: "/door/m10.png", doorImg: "/door/m10.png" },
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
                "ออปชัน: เกล็ดระบายอากาศ / กระจก (Optional: Louvers / Glass)",
                "ดีไซน์ร่องเส้นได้ไม่จำกัด (Unlimited Designs with Groove Lines)",
                "ผิวสำเร็จ: ทาสี, PVC DecorFilm (Surface Finishes: Paint, PVC DecorFilm)",
                "แนะนำสำหรับงานภายใน (Recommended for Indoor Use)",
                "ไสขอบได้สูงสุดข้างละ 5 มม. (Max 5 mm. Trimmable Each Side)",
              ],
              en: [
                "Customizable Dimensions",
                "Optional: Louvers / Glass",
                "Unlimited Designs with Groove Lines",
                "Surface Finishes: Paint, PVC DecorFilm",
                "Recommended for Indoor Use",
                "Max 5 mm. Trimmable Each Side",
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
  { code: "SMOOTH", name: "Smooth", img: "/door/dd5.png", doorImg: "/door/dd5.png" },
  { code: "MODERN", name: "Modern", img: "/door/dd2.png", doorImg: "/door/dd2.png" },
  { code: "NATURAL", name: "Natural", img: "/door/dd3.png", doorImg: "/door/dd3.png" },
  { code: "CLASSIC", name: "Classic", img: "/door/dd4.png", doorImg: "/door/dd4.png" },
  { code: "ELEGANT", name: "Elegant", img: "/door/dd1.png", doorImg: "/door/dd1.png" },
  { code: "PREMIUM", name: "Premium", img: "/door/dd6.png", doorImg: "/door/dd6.png" },
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
                "ออปชัน: เกล็ดระบายอากาศ / กระจก (Optional: Louvers / Glass)",
                "ดีไซน์ร่องเส้นได้ไม่จำกัด (Unlimited Designs with Groove Lines)",
                "ไสขอบได้สูงสุดข้างละ 5 มม. (Max 5 mm. Trimmable Each Side)",
                "แนะนำสำหรับงานภายใน (Recommended for Indoor Use)",
              ],
              en: [
                "Customizable Dimensions",
                "Optional: Louvers / Glass",
                "Unlimited Designs with Groove Lines",
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
  const [selectedColor, setSelectedColor] = useState<Swatch | null>(null);

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

  // Dynamic Theme Colors
  const isMelamine = collection === "Melamine";
  const accentBg = "bg-orange-500";
  const accentText = "text-orange-500";
  const accentBorder = "hover:border-orange-200/40";
  const accentRing = "ring-orange-500/10";
  const accentFocusBorder = "border-orange-500";
  const bulletBorder = "group-hover:border-orange-400";

  const collectionSwatches = isMelamine ? melamineSwatches : (collection === "uPVC" ? upvcSwatches : swatches);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Product Info */}
      <div className={`w-full lg:w-7/12 flex flex-col gap-4 ${isImageRight ? "order-2 lg:order-1" : "order-2"}`}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-0.5 w-8 ${accentBg}`} />
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${accentText}`}>{collection} SERIES</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-900 dark:text-stone-100 mb-3 tracking-tight leading-tight">
              {currentDoorName}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm max-w-xl whitespace-pre-line">
            {langKey === "en" ? data.description.en : data.description.th}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Main Specifications Box: Combines Subsections and Lists */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-brand-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">
              {t("Technical Specifications", "ข้อมูลทางเทคนิค")}
            </h5>
            <div className="bg-stone-100/40 dark:bg-stone-900/20 rounded-[2rem] p-6 md:p-8 border border-stone-100 dark:border-stone-800/40 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {data.sections.map((section, idx) => {
                if (section.kind === "subsections") {
                  return section.subsections.map((sub, sIdx) => (
                    <div key={`${idx}-${sIdx}`} className="flex flex-col gap-4">
                      <h6 className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                        {langKey === "en" ? sub.title.en : sub.title.th}
                      </h6>
                      {/* Every section now gets an even more subtle minimal frame */}
                      <div className={`bg-white/30 dark:bg-stone-900/20 p-5 rounded-[1.5rem] border border-stone-200/30 dark:border-stone-800/30 shadow-sm transition-all duration-300 hover:shadow-md ${accentBorder}`}>
                        {(idx === 0 && sIdx === 0) ? (
                          /* Standard Size: Bold List Style */
                          <ul className="flex flex-col gap-5">
                            {(langKey === "en" ? sub.items.en : sub.items.th).map((item, ii) => (
                              <li key={ii} className="flex items-center gap-3.5 group">
                                <div className={`w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 group-hover:${accentBg} transition-all duration-300`} />
                                <span className="text-sm font-bold text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white transition-colors cursor-default">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          /* All other subsections: Minimalist Style inside Frame */
                          <ul className="flex flex-col gap-4">
                            {(langKey === "en" ? sub.items.en : sub.items.th).map((item, ii) => (
                              <li key={ii} className="flex items-start gap-3 group">
                                <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full border-2 border-stone-200 dark:border-stone-700 ${bulletBorder} transition-colors`} />
                                <span className="text-[13px] font-medium text-stone-500 dark:text-stone-400 leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ));
                }
                if (section.kind === "list") {
                  /* List (e.g. Key Features): Also wrapped in an even more subtle minimal frame */
                  return (
                    <div key={idx} className="flex flex-col gap-6">
                      <h6 className="font-bold text-stone-800 dark:text-stone-200 text-sm">
                        {langKey === "en" ? section.title.en : section.title.th}
                      </h6>
                      <div className={`bg-white/30 dark:bg-stone-900/20 p-5 rounded-[1.5rem] border border-stone-200/30 dark:border-stone-800/30 shadow-sm transition-all duration-300 hover:shadow-md ${accentBorder}`}>
                        <ul className="flex flex-col gap-4">
                          {(langKey === "en" ? section.items.en : section.items.th).map((item, ii) => (
                            <li key={ii} className="flex items-start gap-3 group">
                              <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full border-2 border-stone-200 dark:border-stone-700 ${bulletBorder} transition-colors`} />
                              <span className="text-[13px] font-medium text-stone-500 dark:text-stone-400 leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Surface Texture & Color selection (WPC / Melamine / uPVC) */}
          {(collection === "WPC" || collection === "Melamine" || collection === "uPVC") && (
            <div className="flex flex-col gap-3 pt-1">
              <h5 className="font-bold text-brand-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">
                {t("Surface Texture & Color", "เลือกดูสีและลายไม้")}
              </h5>
              <div className="grid grid-cols-5 md:grid-cols-6 xl:grid-cols-8 gap-4">
                {collectionSwatches.map((swatch, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setSelectedColor(swatch)}
                    className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
                  >
                    <div className={`relative w-12 h-12 rounded-full p-1 border-2 transition-all duration-500 ${selectedColor?.code === swatch.code
                      ? `${accentFocusBorder} scale-110 shadow-lg ring-4 ${accentRing}`
                      : "border-transparent bg-white dark:bg-stone-800 hover:border-orange-200"
                      }`}>
                      <img src={swatch.img} alt={swatch.name} className="w-full h-full object-cover rounded-full shadow-inner" />
                      {selectedColor?.code === swatch.code && (
                        <div className={`absolute -top-1 -right-1 ${accentBg} text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className={`text-[10px] font-black tracking-tight transition-colors ${selectedColor?.code === swatch.code ? accentText : "text-stone-500"
                        }`}>
                        {swatch.code}
                      </span>
                      {swatch.name && <span className="text-[8px] uppercase font-bold text-stone-400 group-hover:text-stone-500 transition-colors line-clamp-1">{swatch.name}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Icon Grids (Features) */}
          {data.sections.map((section, idx) => {
            if (section.kind === "iconGrid") {
              return (
                <div key={idx} className="flex flex-col gap-3 pt-1">
                  <h5 className="font-bold text-brand-900 dark:text-stone-100 uppercase tracking-widest text-[10px]">
                    {langKey === "en" ? section.title.en : section.title.th}
                  </h5>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                    {section.icons.map((it, iIdx) => (
                      <div key={iIdx} className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center group hover:border-orange-100 dark:hover:border-orange-900 transition-all duration-500 shadow-sm">
                        <div className="w-10 h-10 mb-3 grayscale group-hover:grayscale-0 transition-all duration-700">
                          <img src={it.img} alt={it.label.en} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-[8px] font-black text-stone-600 dark:text-stone-400 tracking-widest uppercase leading-tight">
                          {langKey === "en" ? it.label.en : it.label.th}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}


        </div>
      </div>

      {/* Big Image Panel */}
      <div className={`w-full lg:w-5/12 flex flex-col gap-4 ${isImageRight ? "order-1 lg:order-2" : "order-1"}`}>
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
          <img
            src={selectedColor?.doorImg || selectedDoorImg}
            alt={currentDoorName}
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>

        {/* Order Button - Full Width Style */}
        <div className="-mt-4">
          <a
            href={`https://evergreen-online.vercel.app/configure/door/customize?material=${collection.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 shadow-orange-500/30 text-white w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl hover:shadow-orange-500/40 active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
            {t("Order Now", "สั่งซื้อสินค้า")}
          </a>
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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-8 py-12 max-w-7xl flex flex-col gap-10">
        <div id="wpc">
          <ProductCollectionSection collection="WPC" images={IMAGES} t={t} imagePosition="left" />
        </div>
        <div id="upvc">
          <ProductCollectionSection collection="uPVC" images={IMAGES} t={t} imagePosition="right" />
        </div>
        <div id="melamine">
          <ProductCollectionSection collection="Melamine" images={IMAGES} t={t} imagePosition="left" />
        </div>
      </div>

          </div>
  );
};
