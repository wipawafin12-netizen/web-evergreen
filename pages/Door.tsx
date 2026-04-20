import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

interface DoorPattern {
  name: { th: string; en: string };
  img: string;
  doorImg: string;
}

interface Swatch {
  code: string;
  name: string;
  img: string;
  doorImg: string;
  hex?: string;
  patterns?: { img: string; doorImg: string }[];
}


function useImageOverrides() {
  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem("door-image-overrides-v2") || "{}");
    } catch {
      return {};
    }
  });


  const getImg = useCallback(
    (imageKey: string, fallbackSrc: string) => overrides[imageKey] || fallbackSrc,
    [overrides]
  );

  const handleFileSelect = useCallback((imageKey: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setOverrides((prev) => {
        const next = { ...prev, [imageKey]: dataUrl };
        localStorage.setItem("door-image-overrides-v2", JSON.stringify(next));
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem("door-image-overrides-v2");
    setOverrides({});
  }, []);

  const clearOne = useCallback((imageKey: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[imageKey];
      localStorage.setItem("door-image-overrides-v2", JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    getImg,
    handleFileSelect,
    clearAll,
    clearOne,
    hasOverrides: Object.keys(overrides).length > 0,
  };
}


const EditBtn: React.FC<{
  imageKey: string;
  onFileSelect: (key: string, file: File) => void;
  onResetOne?: (key: string) => void;
}> = ({ imageKey, onFileSelect, onResetOne }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center justify-center z-30 rounded"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
        title="คลิกเพื่อเปลี่ยนรูป"
      >
        <div className="flex items-center gap-2">
          <div className="bg-white/90 text-stone-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
            เปลี่ยนรูป
          </div>
          {onResetOne && (
            <button
              type="button"
              className="bg-red-500/90 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onResetOne(imageKey);
              }}
            >
              รีเซ็ต
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileSelect(imageKey, f);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
    </>
  );
};

const swatches: Swatch[] = [
  {
    code: "Caramel Sand", name: "", img: "/door/WPC/1.webp", doorImg: "/door/WPC/wpc1.webp",
    patterns: [
      { img: "/door/WPC/wpc1.webp", doorImg: "/door/WPC/wpc1.webp" },
      { img: "/door/WPC/wpc2.webp", doorImg: "/door/WPC/wpc2.webp" },
      { img: "/door/WPC/wpc3.webp", doorImg: "/door/WPC/wpc3.webp" },
      { img: "/door/WPC/wpc4.webp", doorImg: "/door/WPC/wpc4.webp" },
      { img: "/door/WPC/wpc5.webp", doorImg: "/door/WPC/wpc5.webp" },
      { img: "/door/WPC/wpc6.webp", doorImg: "/door/WPC/wpc6.webp" },
    ],
  },
  {
    code: "Dark Mocha", name: "", img: "/door/WPC/2.webp", doorImg: "/door/WPC/2.webp",
    patterns: [
      { img: "/door/WPC/wpc11.webp", doorImg: "/door/WPC/wpc11.webp" },
      { img: "/door/WPC/wpc22.webp", doorImg: "/door/WPC/wpc22.webp" },
      { img: "/door/WPC/wpc33.webp", doorImg: "/door/WPC/wpc33.webp" },
      { img: "/door/WPC/wpc44.webp", doorImg: "/door/WPC/wpc44.webp" },
      { img: "/door/WPC/wpc55.webp", doorImg: "/door/WPC/wpc55.webp" },
      { img: "/door/WPC/wpc66.webp", doorImg: "/door/WPC/wpc66.webp" },
    ],
  },
  {
    code: "Latte Beige", name: "", img: "/door/WPC/3.webp", doorImg: "/door/WPC/3.webp",
    patterns: [
      { img: "/door/WPC/wpc111.webp", doorImg: "/door/WPC/wpc111.webp" },
      { img: "/door/WPC/wpc222.webp", doorImg: "/door/WPC/wpc222.webp" },
      { img: "/door/WPC/wpc333.webp", doorImg: "/door/WPC/wpc333.webp" },
      { img: "/door/WPC/wpc444.webp", doorImg: "/door/WPC/wpc444.webp" },
      { img: "/door/WPC/wpc555.webp", doorImg: "/door/WPC/wpc555.webp" },
      { img: "/door/WPC/wpc666.webp", doorImg: "/door/WPC/wpc666.webp" },
    ],
  },
  {
    code: "Milk Coffee", name: "", img: "/door/WPC/4.webp", doorImg: "/door/WPC/4.webp",
    patterns: [
      { img: "/door/WPC/wpc1111.webp", doorImg: "/door/WPC/wpc1111.webp" },
      { img: "/door/WPC/wpc2222.webp", doorImg: "/door/WPC/wpc2222.webp" },
      { img: "/door/WPC/wpc3333.webp", doorImg: "/door/WPC/wpc3333.webp" },
      { img: "/door/WPC/wpc4444.webp", doorImg: "/door/WPC/wpc4444.webp" },
      { img: "/door/WPC/wpc5555.webp", doorImg: "/door/WPC/wpc5555.webp" },
      { img: "/door/WPC/wpc6666.webp", doorImg: "/door/WPC/wpc6666.webp" },
    ],
  },
  {
    code: "Mocha Brown", name: "", img: "/door/WPC/4.webp", doorImg: "/door/WPC/4.webp",
    patterns: [
      { img: "/door/WPC/wpc11111.webp", doorImg: "/door/WPC/wpc11111.webp" },
      { img: "/door/WPC/wpc22222.webp", doorImg: "/door/WPC/wpc22222.webp" },
      { img: "/door/WPC/wpc33333.webp", doorImg: "/door/WPC/wpc33333.webp" },
      { img: "/door/WPC/wpc44444.webp", doorImg: "/door/WPC/wpc44444.webp" },
      { img: "/door/WPC/wpc55555.webp", doorImg: "/door/WPC/wpc55555.webp" },
      { img: "/door/WPC/wpc66666.webp", doorImg: "/door/WPC/wpc66666.webp" },
    ],
  },
  {
    code: "Mocha Mist", name: "", img: "/door/WPC/4.webp", doorImg: "/door/WPC/4.webp",
    patterns: [
      { img: "/door/WPC/wpc111111.webp", doorImg: "/door/WPC/wpc111111.webp" },
      { img: "/door/WPC/wpc222222.webp", doorImg: "/door/WPC/wpc222222.webp" },
      { img: "/door/WPC/wpc333333.webp", doorImg: "/door/WPC/wpc333333.webp" },
      { img: "/door/WPC/wpc444444.webp", doorImg: "/door/WPC/wpc444444.webp" },
      { img: "/door/WPC/wpc555555.webp", doorImg: "/door/WPC/wpc555555.webp" },
      { img: "/door/WPC/wpc666666.webp", doorImg: "/door/WPC/wpc666666.webp" },
    ],
  },

];

const wpcPatterns: DoorPattern[] = [
  { name: { th: "ไม่มีร่อง", en: "No Groove" }, img: "/door/WPC/wpc1.webp", doorImg: "/door/WPC/wpc1.webp" },
  { name: { th: "ร่อง1เส้น", en: "1-Line Groove" }, img: "/door/WPC/wpc2.webp", doorImg: "/door/WPC/wpc2.webp" },
  { name: { th: "ร่อง2เส้น", en: "2-Line Groove" }, img: "/door/WPC/wpc3.webp", doorImg: "/door/WPC/wpc3.webp" },
  { name: { th: "ร่อง3เส้น", en: "3-Line Groove" }, img: "/door/WPC/wpc4.webp", doorImg: "/door/WPC/wpc4.webp" },
  { name: { th: "ร่อง4เส้น", en: "4-Line Groove" }, img: "/door/WPC/wpc5.webp", doorImg: "/door/WPC/wpc5.webp" },
  { name: { th: "ร่อง5เส้น", en: "5-Line Groove" }, img: "/door/WPC/wpc6.webp", doorImg: "/door/WPC/wpc6.webp" },



];


const melaminePatterns: DoorPattern[] = [
  { name: { th: "ไม่มีร่อง", en: "No Groove" }, img: "/door/Melamine/Earl Grey-1.webp", doorImg: "/door/Melamine/Earl Grey-1.webp" },
  { name: { th: "ร่อง1เส้น", en: "1-Line Groove" }, img: "/door/Melamine/Earl Grey-2.webp", doorImg: "/door/Melamine/Earl Grey-2.webp" },
  { name: { th: "ร่อง2เส้น", en: "2-Line Groove" }, img: "/door/Melamine/Earl Grey-3.webp", doorImg: "/door/Melamine/Earl Grey-3.webp" },
  { name: { th: "ร่อง3เส้น", en: "3-Line Groove" }, img: "/door/Melamine/Earl Grey-4.webp", doorImg: "/door/Melamine/Earl Grey-4.webp" },
  { name: { th: "ร่อง4เส้น", en: "4-Line Groove" }, img: "/door/Melamine/Earl Grey-5.webp", doorImg: "/door/Melamine/Earl Grey-5.webp" },
  { name: { th: "ร่อง5เส้น", en: "5-Line Groove" }, img: "/door/Melamine/Earl Grey-6.webp", doorImg: "/door/Melamine/Earl Grey-6.webp" },
];

const melamineSwatches: Swatch[] = [
  {
    code: "Earl Grey", name: "", img: "/door/Melamine/Earl Grey.webp", doorImg: "/door/Melamine/Earl Grey.webp", hex: "#928B84",
    patterns: [
      { img: "/door/Melamine/Earl Grey-1.webp", doorImg: "/door/Melamine/Earl Grey-1.webp" },
      { img: "/door/Melamine/Earl Grey-2.webp", doorImg: "/door/Melamine/Earl Grey-2.webp" },
      { img: "/door/Melamine/Earl Grey-3.webp", doorImg: "/door/Melamine/Earl Grey-3.webp" },
      { img: "/door/Melamine/Earl Grey-4.webp", doorImg: "/door/Melamine/Earl Grey-4.webp" },
      { img: "/door/Melamine/Earl Grey-5.webp", doorImg: "/door/Melamine/Earl Grey-5.webp" },
      { img: "/door/Melamine/Earl Grey-6.webp", doorImg: "/door/Melamine/Earl Grey-6.webp" },
    ],
  },
  {
    code: "Sand", name: "", img: "/door/Melamine/Sand Oak.webp", doorImg: "/door/Melamine/Sand Oak.webp", hex: "#C2B49E",
    patterns: [
      { img: "/door/Melamine/Sand Oak-1.webp", doorImg: "/door/Melamine/Sand Oak-1.webp" },
      { img: "/door/Melamine/Sand Oak-2.webp", doorImg: "/door/Melamine/Sand Oak-2.webp" },
      { img: "/door/Melamine/Sand Oak-3.webp", doorImg: "/door/Melamine/Sand Oak-3.webp" },
      { img: "/door/Melamine/Sand Oak-4.webp", doorImg: "/door/Melamine/Sand Oak-4.webp" },
      { img: "/door/Melamine/Sand Oak-5.webp", doorImg: "/door/Melamine/Sand Oak-5.webp" },
      { img: "/door/Melamine/Sand Oak-6.webp", doorImg: "/door/Melamine/Sand Oak-6.webp" },
    ],
  },
  {
    code: "Smoke Grey", name: "", img: "/door/Melamine/Smoke Grey.webp", doorImg: "/door/Melamine/Smoke Grey.webp", hex: "#6E6862",
    patterns: [
      { img: "/door/Melamine/Smoke Grey-1.webp", doorImg: "/door/Melamine/Smoke Grey-1.webp" },
      { img: "/door/Melamine/Smoke Grey-2.webp", doorImg: "/door/Melamine/Smoke Grey-2.webp" },
      { img: "/door/Melamine/Smoke Grey-3.webp", doorImg: "/door/Melamine/Smoke Grey-3.webp" },
      { img: "/door/Melamine/Smoke Grey-4.webp", doorImg: "/door/Melamine/Smoke Grey-4.webp" },
      { img: "/door/Melamine/Smoke Grey-5.webp", doorImg: "/door/Melamine/Smoke Grey-5.webp" },
      { img: "/door/Melamine/Smoke Grey-6.webp", doorImg: "/door/Melamine/Smoke Grey-6.webp" },
    ],
  },
  {
    code: "Tobac Brown", name: "", img: "/door/Melamine/Tobac Brown.webp", doorImg: "/door/Melamine/Tobac Brown.webp", hex: "#5E4839",
    patterns: [
      { img: "/door/Melamine/Tobac Brown-1.webp", doorImg: "/door/Melamine/Tobac Brown-1.webp" },
      { img: "/door/Melamine/Tobac Brown-2.webp", doorImg: "/door/Melamine/Tobac Brown-2.webp" },
      { img: "/door/Melamine/Tobac Brown-3.webp", doorImg: "/door/Melamine/Tobac Brown-3.webp" },
      { img: "/door/Melamine/Tobac Brown-4.webp", doorImg: "/door/Melamine/Tobac Brown-4.webp" },
      { img: "/door/Melamine/Tobac Brown-5.webp", doorImg: "/door/Melamine/Tobac Brown-5.webp" },
      { img: "/door/Melamine/Tobac Brown-6.webp", doorImg: "/door/Melamine/Tobac Brown-6.webp" },
    ],
  },
  {
    code: "Alpine White", name: "", img: "/door/Melamine/Alpine White.webp", doorImg: "/door/Melamine/Alpine White.webp", hex: "#E8E3DD",
    patterns: [
      { img: "/door/Melamine/Alpine White-1.webp", doorImg: "/door/Melamine/Alpine White-1.webp" },
      { img: "/door/Melamine/Alpine White-2.webp", doorImg: "/door/Melamine/Alpine White-2.webp" },
      { img: "/door/Melamine/Alpine White-3.webp", doorImg: "/door/Melamine/Alpine White-3.webp" },
      { img: "/door/Melamine/Alpine White-4.webp", doorImg: "/door/Melamine/Alpine White-4.webp" },
      { img: "/door/Melamine/Alpine White-5.webp", doorImg: "/door/Melamine/Alpine White-5.webp" },
      { img: "/door/Melamine/Alpine White-6.webp", doorImg: "/door/Melamine/Alpine White-6.webp" },
    ],
  },
  {
    code: "Bronze Brown", name: "", img: "/door/Melamine/Bronze Brown.webp", doorImg: "/door/Melamine/Bronze Brown.webp", hex: "#55423A",
    patterns: [
      { img: "/door/Melamine/Bronze Brown-1.webp", doorImg: "/door/Melamine/Bronze Brown-1.webp" },
      { img: "/door/Melamine/Bronze Brown-2.webp", doorImg: "/door/Melamine/Bronze Brown-2.webp" },
      { img: "/door/Melamine/Bronze Brown-3.webp", doorImg: "/door/Melamine/Bronze Brown-3.webp" },
      { img: "/door/Melamine/Bronze Brown-4.webp", doorImg: "/door/Melamine/Bronze Brown-4.webp" },
      { img: "/door/Melamine/Bronze Brown-5.webp", doorImg: "/door/Melamine/Bronze Brown-5.webp" },
      { img: "/door/Melamine/Bronze Brown-6.webp", doorImg: "/door/Melamine/Bronze Brown-6.webp" },
    ],
  },
  {
    code: "Ivory Brown", name: "", img: "/door/Melamine/Ivory Brown.webp", doorImg: "/door/Melamine/Ivory Brown.webp", hex: "#B5A08A",
    patterns: [
      { img: "/door/Melamine/Ivory Brown-1.webp", doorImg: "/door/Melamine/Ivory Brown-1.webp" },
      { img: "/door/Melamine/Ivory Brown-2.webp", doorImg: "/door/Melamine/Ivory Brown-2.webp" },
      { img: "/door/Melamine/Ivory Brown-3.webp", doorImg: "/door/Melamine/Ivory Brown-3.webp" },
      { img: "/door/Melamine/Ivory Brown-4.webp", doorImg: "/door/Melamine/Ivory Brown-4.webp" },
      { img: "/door/Melamine/Ivory Brown-5.webp", doorImg: "/door/Melamine/Ivory Brown-5.webp" },
      { img: "/door/Melamine/Ivory Brown-6.webp", doorImg: "/door/Melamine/Ivory Brown-6.webp" },
    ],
  },
  {
    code: "Platinum Grey", name: "", img: "/door/Melamine/Platinum Grey.webp", doorImg: "/door/Melamine/Platinum Grey.webp", hex: "#A19A93",
    patterns: [
      { img: "/door/Melamine/Platinum Grey-1.webp", doorImg: "/door/Melamine/Platinum Grey-1.webp" },
      { img: "/door/Melamine/Platinum Grey-2.webp", doorImg: "/door/Melamine/Platinum Grey-2.webp" },
      { img: "/door/Melamine/Platinum Grey-3.webp", doorImg: "/door/Melamine/Platinum Grey-3.webp" },
      { img: "/door/Melamine/Platinum Grey-4.webp", doorImg: "/door/Melamine/Platinum Grey-4.webp" },
      { img: "/door/Melamine/Platinum Grey-5.webp", doorImg: "/door/Melamine/Platinum Grey-5.webp" },
      { img: "/door/Melamine/Platinum Grey-6.webp", doorImg: "/door/Melamine/Platinum Grey-6.webp" },
    ],
  },
  {
    code: "Cocoa Oak", name: "", img: "/door/Melamine/Cocoa Oak.webp", doorImg: "/door/Melamine/Cocoa Oak.webp", hex: "#705644",
    patterns: [
      { img: "/door/Melamine/Cocoa Oak-1.webp", doorImg: "/door/Melamine/Cocoa Oak-1.webp" },
      { img: "/door/Melamine/Cocoa Oak-2.webp", doorImg: "/door/Melamine/Cocoa Oak-2.webp" },
      { img: "/door/Melamine/Cocoa Oak-3.webp", doorImg: "/door/Melamine/Cocoa Oak-3.webp" },
      { img: "/door/Melamine/Cocoa Oak-4.webp", doorImg: "/door/Melamine/Cocoa Oak-4.webp" },
      { img: "/door/Melamine/Cocoa Oak-5.webp", doorImg: "/door/Melamine/Cocoa Oak-5.webp" },
      { img: "/door/Melamine/Cocoa Oak-6.webp", doorImg: "/door/Melamine/Cocoa Oak-6.webp" },
    ],
  },
];

const WPC_DETAILS: DoorDetail[] = [
  {
    modalTitle: { th: "WPC", en: "WPC" },
    description: {
      th: "ประตูไม้สังเคราะห์ กันชื้น กันปลวก สีสำเร็จพร้อมใช้งาน\n\nยกระดับภาพรวมของบ้านให้ดูอบอุ่นและมีสไตล์ ด้วยโทนสีที่เข้ากับหลายบรรยากาศ พร้อมคุณสมบัติที่ใช้งานได้จริงและคุ้มค่าในระยะยาว\n\nWPC (Wood Plastic Composite) คือวัสดุไม้สังเคราะห์คุณภาพสูงที่ออกแบบมาเพื่อพื้นที่ความชื้นสูง โดยให้ความแข็งแรงทั้ง “โครงสร้าง” และ “หน้าบาน” มากกว่า พร้อมเสริมภายในด้วย PS Foam ช่วยลดการส่งผ่านเสียง และช่วยกันความร้อนจากภายนอกได้ในระดับหนึ่ง\n\nเหมาะสำหรับพื้นที่ที่ต้องเจอน้ำและความชื้นบ่อย ๆ เช่น ห้องน้ำ ห้องครัว ห้องซักล้าง ช่วยลดปัญหากวนใจเรื่อง ปลวก มอด",
      en: "Synthetic Wood Door: Moisture-Resistant, Termite-Proof, Ready-to-Use Finish.\n\nElevate your home's ambiance with warm, stylish tones that suit various atmospheres, offering practical features and long-term value.\n\nWPC (Wood Plastic Composite) is a high-quality synthetic material designed for high-humidity areas, providing superior strength in both structure and surface. Reinforced with PS Foam inside, it helps reduce sound transmission and insulates against external heat.\n\nIdeal for areas frequently exposed to water and moisture like bathrooms, kitchens, and laundry rooms. Forget about termites, weevils, and decay—enjoy peace of mind with every use.",
    },
    sections: [
      {
        kind: "subsections",
        title: { th: "วัสดุ", en: "Material" },
        subsections: [
          {
            title: { th: "ขนาดมาตรฐาน", en: "Standard Size" },
            items: {
              th: ["3.5 x 70 x 200 ซม.", "3.5 x 80 x 200 ซม.", "3.5 x 90 x 200 ซม."],
              en: ["3.5 x 70 x 200 cm", "3.5 x 80 x 200 cm", "3.5 x 90 x 200 cm"],
            },
          },
          {
            title: { th: "สเปก", en: "Specification" },
            items: {
              th: ["ปรับขนาดได้", "ผิวสำเร็จ: ทาสี, PVC DecorFilm", "แนะนำสำหรับงานภายใน"],
              en: ["Customizable Dimensions", "Surface Finishes: Paint, PVC DecorFilm", "Recommended for Indoor Use"],
            },
          },
        ],
      },
      {
        kind: "iconGrid",
        title: { th: "คุณสมบัติเด่น", en: "Key Features" },
        icons: [
          { key: "ECO_FRIENDLY", img: "/door/Eco-Friendly.webp", label: { th: "เป็นมิตรต่อสิ่งแวดล้อม", en: "Eco Friendly" } },
          { key: "WATER_PROOF", img: "/door/Water-Proof.webp", label: { th: "กันน้ำ", en: "Water Proof" } },
          { key: "FLAME_RETARDANT", img: "/door/Flame-Retardant.webp", label: { th: "ไม่ลามไฟ", en: "Flame Retardant" } },
          { key: "CHAMFER", img: "/door/Chamfer.webp", label: { th: "ลบมุม", en: "Chamfer" } },
          { key: "INDOOR_USE", img: "/door/Indoor-Use.webp", label: { th: "ใช้งานภายใน", en: "Indoor Use" } },
          { key: "INSECT_REPELLENT", img: "/door/Insect-Repellent.webp", label: { th: "กันแมลง/ปลวก", en: "Insect Repellent" } },
        ],
      },
    ],
  },
];

const upvcPatterns: DoorPattern[] = [
  { name: { th: "ไม่มีร่อง", en: "No Groove" }, img: "/door/uPVC/upvc1.webp", doorImg: "/door/uPVC/upvc1.webp" },
  { name: { th: "ร่อง 1 เส้น", en: "1-Line Groove" }, img: "/door/uPVC/upvc2.webp", doorImg: "/door/uPVC/upvc2.webp" },
  { name: { th: "ร่อง 2 เส้น", en: "2-Line Groove" }, img: "/door/uPVC/upvc3.webp", doorImg: "/door/uPVC/upvc3.webp" },
  { name: { th: "ร่อง 3 เส้น", en: "3-Line Groove" }, img: "/door/uPVC/upvc4.webp", doorImg: "/door/uPVC/upvc4.webp" },
  { name: { th: "ร่อง 4 เส้น", en: "4-Line Groove" }, img: "/door/uPVC/upvc5.webp", doorImg: "/door/uPVC/upvc5.webp" },
  { name: { th: "ร่อง 5 เส้น", en: "5-Line Groove" }, img: "/door/uPVC/upvc6.webp", doorImg: "/door/uPVC/upvc6.webp" },
];

const upvcSwatches: Swatch[] = [
  { code: "ขาว", name: "", img: "/door/uPVC/upvc.webp", doorImg: "/door/uPVC/upvc.webp" },

];

const UPVC_DETAILS: DoorDetail[] = [
  {
    modalTitle: { th: "uPVC", en: "uPVC" },
    description: {
      th: "ประตูกันน้ำ100% กันปลวก ทนแดด พร้อมใช้งานได้จริง\n\nอีกหนึ่งตัวเลือกยอดนิยมสำหรับพื้นที่ที่เจอความชื้นเป็นประจำ ไม่ว่าจะเป็น ประตูห้องน้ำ ห้องซักล้าง หรือ ประตูหลังบ้าน รองรับการใช้งานได้หลากหลายสภาพอากาศ ทั้ง ฝนและแสงแดด ใช้งานได้อย่างมั่นใจ\n\nผิววัสดุทำความสะอาดง่าย ดูแลไม่ยุ่งยาก และช่วยลดปัญหาเรื่อง ปลวก มอด ที่มักเกิดกับประตูไม้ทั่วไป โครงสร้างถูกออกแบบให้แข็งแรงด้วยวัสดุสังเคราะห์ พร้อมเสริมความแข็งแรงในตำแหน่ง เจาะลูกบิด เพื่อความทนทานในการใช้งานระยะยาว\n\nภายในเสริมด้วย EPS Foam ความหนาแน่นสูง ช่วยซับเสียง และลดการส่งผ่านความร้อนจากภายนอกได้ในระดับหนึ่ง ทำให้ใช้งานสบายขึ้นในทุกวัน",
      en: "Waterproof Door: Moisture-Resistant, Ready for Real Life.\n\nA popular choice for moisture-prone areas—whether for bathrooms, laundry rooms, or back doors. Withstands various weather conditions, including rain and sunlight, for confident usage.\n\nEasy-to-clean surface with low maintenance. Eliminates termite and weevil problems common with real wood. The structure is engineered for strength using synthetic materials, with extra reinforcement at the knob installation point for long-term durability.\n\nInternally reinforced with high-density EPS Foam to absorb sound and reduce heat transmission, enhancing everyday comfort.",
    },
    sections: [
      {
        kind: "subsections",
        title: { th: "วัสดุ", en: "Material" },
        subsections: [
          {
            title: { th: "ขนาดมาตรฐาน", en: "Standard Size" },
            items: {
              th: ["3.5 x 70 x 200 ซม.", "3.5 x 80 x 200 ซม.", "3.5 x 90 x 200 ซม."],
              en: ["3.5 x 70 x 200 cm", "3.5 x 80 x 200 cm", "3.5 x 90 x 200 cm"],
            },
          },
          {
            title: { th: "ผิวบาน", en: "Surface Finish" },
            items: {
              th: ["ผิวเรียบ", "สไตล์ทันสมัย", "ลายไม้ธรรมชาติ"],
              en: ["Smooth", "Modern", "Natural"],
            },
          },
          {
            title: { th: "โครงสร้างบาน", en: "Door Core" },
            items: {
              th: ["โครงสร้างแน่น แ็ข็งแรง", "ช่วยให้บานคงรูปได้ดี"],
              en: ["Dense structure, durable", "Helps maintain shape well"],
            },
          },
        ],
      },
      {
        kind: "iconGrid",
        title: { th: "คุณสมบัติเด่น", en: "Key Features" },
        icons: [
          { key: "CHAMFER", img: "/door/Chamfer.webp", label: { th: "ลบมุม", en: "CHAMFER" } },
          { key: "INDOOR_USE", img: "/door/Indoor-Use.webp", label: { th: "ใช้งานภายใน", en: "INDOOR USE" } },
          { img: "/door/Outdoor-Use.webp", label: { th: "ใช้งานภายนอก", en: "OUTDOOR USE" } },
          { key: "INSECT_REPELLENT", img: "/door/Insect-Repellent.webp", label: { th: "กันแมลง/ปลวก", en: "INSECT REPELLENT" } },
          { key: "ECO_FRIENDLY", img: "/door/Eco-Friendly.webp", label: { th: "เป็นมิตรต่อสิ่งแวดล้อม", en: "ECO FRIENDLY" } },
          { key: "WATER_PROOF", img: "/door/Water-Proof.webp", label: { th: "กันน้ำ", en: "WATER PROOF" } },
          { key: "FLAME_RETARDANT", img: "/door/Flame-Retardant.webp", label: { th: "ไม่ลามไฟ", en: "FLAME RETARDANT" } },
        ],
      },
    ],
  },
];

const MELAMINE_DETAILS: DoorDetail[] = [
  {
    modalTitle: { th: "Melamine", en: "Melamine" },
    description: {
      th: "ปลดปล่อยจินตนาการ: ประตูเมลามีน ซีรีส์ Hester\nเมื่อความคิดสร้างสรรค์มาบรรจบกับหัวใจของบ้านคุณ\n\nสร้างสรรค์อารมณ์และกำหนดพื้นที่ ประตูเมลามีนซีรีส์ Hester มาพร้อมความสง่างามเชิงศิลปะที่เหนือระดับ เปลี่ยนโฉมภายในบ้านด้วยประตูที่ไม่เพียงแต่ทนทาน แต่ยังมีสไตล์หลากหลาย ตั้งแต่ลายไม้ ผ้า ไปจนถึงลายหนัง ปรับแต่งขนาด เส้นร่อง และทำให้จินตนาการของคุณเป็นจริง",
      en: "Unlocking Imagination: The Hester Series Melamine Doors\nWhere Creativity Meets the Heart of Your Home\n\nCrafting emotions and defining spaces; our Hester Series Melamine Doors resonate with a touch of artistic elegance that goes beyond the ordinary. Transform your interiors with doors that boast not only durability but also a rich array of styles, from wood to fabric and leather-inspired designs. Customize sizes, groove lines, and bring your imagination to life.",
    },
    sections: [
      {
        kind: "subsections",
        title: { th: "วัสดุ", en: "Material" },
        subsections: [
          {
            title: { th: "ขนาดมาตรฐาน", en: "Standard Size" },
            items: {
              th: ["3.5 x 80 x 200 ซม.", "3.5 x 90 x 200 ซม."],
              en: ["3.5 x 80 x 200 cm", "3.5 x 90 x 200 cm"],
            },
          },
          {
            title: { th: "สเปก", en: "Specification" },
            items: {
              th: ["ปรับขนาดได้", "ไสขอบได้สูงสุดข้างละ 5 มม.", "แนะนำสำหรับงานภายใน"],
              en: ["Customizable Dimensions", "Max 5 mm. Trimmable Each Side", "Recommended for Indoor Use"],
            },
          },
        ],
      },
      {
        kind: "iconGrid",
        title: { th: "คุณสมบัติเด่น", en: "Key Features" },
        icons: [
          { key: "CHAMFER", img: "/door/Chamfer.webp", label: { th: "ลบมุม", en: "CHAMFER" } },
          { key: "INDOOR_USE", img: "/door/Indoor-Use.webp", label: { th: "ใช้งานภายใน", en: "INDOOR USE" } },
          { img: "/door/Water-Proof.webp", label: { th: "ทำความสะอาดง่าย", en: "EASY CLEANING" } },
          { img: "/door/Eco-Friendly.webp", label: { th: "ประหยัด", en: "ECONOMICAL" } },
          { img: "/door/Melamine/water-resistant.webp", label: { th: "ทนทาน", en: "WEAR RESISTANT" } },
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
  editMode: boolean;
  getImg: (imageKey: string, fallbackSrc: string) => string;
  onFileSelect: (key: string, file: File) => void;
  onResetOne: (key: string) => void;
}> = ({
  collection,
  images,
  t,
  imagePosition = "left",
  editMode,
  getImg,
  onFileSelect,
  onResetOne,
}) => {
    const [selectedDoorIndex, setSelectedDoorIndex] = useState<number>(0);

    const isMelamine = collection === "Melamine";
    const collectionSwatches = isMelamine
      ? melamineSwatches
      : collection === "uPVC"
        ? upvcSwatches
        : swatches;

    const collectionPatterns =
      collection === "WPC"
        ? wpcPatterns
        : collection === "uPVC"
          ? upvcPatterns
          : collection === "Melamine"
            ? melaminePatterns
            : null;

    const [selectedColor, setSelectedColor] = useState<Swatch | null>(collectionSwatches[0] || null);
    const [selectedPatternIndex, setSelectedPatternIndex] = useState<number>(0);


    const effectivePatterns = useMemo(() => {
      if (!collectionPatterns) return null;
      if (!selectedColor?.patterns) return collectionPatterns;
      return collectionPatterns.map((pattern, idx) => ({
        ...pattern,
        img: selectedColor.patterns![idx]?.img || pattern.img,
        doorImg: selectedColor.patterns![idx]?.doorImg || pattern.doorImg,
      }));
    }, [collectionPatterns, selectedColor]);

    const selectedPattern = effectivePatterns?.[selectedPatternIndex] || null;

    const currentNames =
      collection === "WPC"
        ? images.wpcNames
        : collection === "uPVC"
          ? images.upvcNames
          : images.melamineNames;

    const langKey: Lang = t("EN", "TH") === "EN" ? "en" : "th";

    const currentDoorName =
      (langKey === "en" ? currentNames[selectedDoorIndex]?.en : currentNames[selectedDoorIndex]?.th) ||
      t("The Door", "ประตูรุ่น") + " " + (selectedDoorIndex + 1);

    const selectedDoorImg =
      collection === "WPC"
        ? images.wpcCollection[selectedDoorIndex]
        : collection === "uPVC"
          ? images.upvcCollection[selectedDoorIndex]
          : images.melamineCollection[selectedDoorIndex];

    const DETAILS = collection === "WPC" ? WPC_DETAILS : collection === "uPVC" ? UPVC_DETAILS : MELAMINE_DETAILS;
    const data = DETAILS[selectedDoorIndex] || DETAILS[0];


    const mainDoorKey = `door:${collection}:${selectedDoorIndex}`;


    const mainDoorFallbackSrc = selectedPattern?.doorImg || selectedDoorImg;
    const mainDoorSrc = getImg(mainDoorKey, mainDoorFallbackSrc);

    const isImageRight = imagePosition === "right";

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-1 gap-x-4 md:gap-12 lg:gap-16 items-start">
        {/* Image */}
        <div className={`${isImageRight ? "lg:order-2" : "lg:order-1"}`}>
          <div className="sticky top-24">
            <div className="relative">
              <img
                src={mainDoorSrc}
                alt={currentDoorName}
                className="w-full transition-all duration-700"
              />



              {editMode && (
                <EditBtn
                  imageKey={mainDoorKey}
                  onFileSelect={onFileSelect}
                  onResetOne={onResetOne}
                />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isImageRight ? "lg:order-1" : "lg:order-2"}`}>
          {/* Header */}
          <div className="mb-4 order-2 md:order-1">
            <p className="text-[11px] font-medium tracking-[0.3em] text-orange-500 uppercase mb-2">{collection}</p>
            <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
              {currentDoorName}
            </h1>
          </div>

          {/* Description */}
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 max-w-md whitespace-pre-line order-3 md:order-2">
            {langKey === "en" ? data.description.en : data.description.th}
          </p>

          {/* Specs - 2 Column Layout */}
          {/* Specs - 2 Column Layout */}
          <div className="mb-2 order-1 md:order-3">
            {/* Door Patterns */}
            {effectivePatterns && effectivePatterns.length > 0 && (
              <div className="mb-2">
                <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">
                  {langKey === "en" ? "Patterns" : "ลายประตู"}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {effectivePatterns.map((pattern, pIdx) => {
                    const patternKey = `pattern:${collection}:${pattern.name.en}`;
                    const pSrc = getImg(patternKey, pattern.img);

                    return (
                      <button
                        key={pIdx}
                        onClick={() => setSelectedPatternIndex(pIdx)}
                        className={`group flex flex-col items-center gap-1 transition-all duration-200 ${selectedPatternIndex === pIdx ? "opacity-100" : "opacity-60 hover:opacity-100"
                          }`}
                      >
                        <div
                          className={`relative w-14 h-20 rounded-md overflow-hidden transition-all duration-200 ${selectedPatternIndex === pIdx ? "ring-2 ring-orange-500" : ""
                            }`}
                        >
                          <img
                            src={pSrc}
                            alt={langKey === "en" ? pattern.name.en : pattern.name.th}
                            className="w-full h-full object-contain"
                          />


                          {editMode && (
                            <EditBtn
                              imageKey={patternKey}
                              onFileSelect={onFileSelect}
                              onResetOne={onResetOne}
                            />
                          )}
                        </div>

                        <p className="text-[8px] text-stone-500 dark:text-stone-400 text-center leading-tight max-w-[56px] truncate">
                          {langKey === "en" ? pattern.name.en : pattern.name.th}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Surface Texture & Color */}
            <div className="mb-4">
              <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">
                {langKey === "en" ? "Colors" : "สี"}
              </h3>

              <div className="flex flex-wrap gap-2">
                {collectionSwatches.map((swatch, sIdx) => {
                  const swatchKey = `swatch:${collection}:${swatch.code}`;
                  const swatchSrc = getImg(swatchKey, swatch.img);

                  return (
                    <button
                      key={sIdx}
                      onClick={() => setSelectedColor(swatch)}
                      className={`flex flex-col items-center gap-1 transition-all duration-200 ${selectedColor?.code === swatch.code ? "opacity-100" : "opacity-60 hover:opacity-100"
                        }`}
                    >
                      <div
                        className={`relative w-10 h-10 rounded-full overflow-hidden transition-all duration-200 ${selectedColor?.code === swatch.code ? "ring-2 ring-orange-500" : ""
                          }`}
                      >
                        <img src={swatchSrc} alt={swatch.code} className="w-full h-full object-cover" />
                        {editMode && (
                          <EditBtn
                            imageKey={swatchKey}
                            onFileSelect={onFileSelect}
                            onResetOne={onResetOne}
                          />
                        )}
                      </div>
                      <p className="text-[8px] text-stone-500 dark:text-stone-400 text-center max-w-[44px] truncate">
                        {swatch.code}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {data.sections.map((section, idx) => {
              if (section.kind === "subsections") {
                return (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {section.subsections.slice(0, 2).map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 border border-stone-200 dark:border-stone-700 rounded-xl bg-white/50 dark:bg-stone-800/20"
                      >
                        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-2">
                          {langKey === "en" ? sub.title.en : sub.title.th}
                        </h3>
                        <div className="space-y-1">
                          {(langKey === "en" ? sub.items.en : sub.items.th).map((item, ii) => (
                            <div key={ii} className="flex items-start gap-2">
                              <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                              <p className="text-xs text-stone-600 dark:text-stone-300">{item}</p>
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

            {/* CTA Button in Content Column */}
            <div className="mt-1">
              <a
                href={`https://evergreen-online.vercel.app/configure/door/customize?material=${collection.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 rounded-lg shadow-md hover:shadow-lg"
              >
                {t("Order Now", "สั่งซื้อ")}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-0 order-4">
            <div className="mb-4">
              <h3 className="text-xs font-bold tracking-[0.15em] text-stone-800 dark:text-stone-200 uppercase mb-2">
                {langKey === "en" ? "Key Features" : "คุณสมบัติเด่น"}
              </h3>
              <div className="w-12 h-0.5 bg-orange-500"></div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {data.sections.map((section) => {
                if (section.kind === "iconGrid") {
                  return section.icons.map((it, iIdx) => {
                    const iconKey = `icon:${collection}:${it.key || it.label.en}`;
                    const iconSrc = it.img ? getImg(iconKey, it.img) : "";

                    return (
                      <div key={iIdx} className="flex flex-col items-center gap-1">
                        {it.img && (
                          <div className="relative w-12 h-12 rounded-full bg-white dark:bg-stone-800/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden">
                            <img
                              src={iconSrc}
                              alt={langKey === "en" ? it.label.en : it.label.th}
                              className="w-8 h-8 object-contain"
                            />
                            {editMode && (
                              <EditBtn
                                imageKey={iconKey}
                                onFileSelect={onFileSelect}
                                onResetOne={onResetOne}
                              />
                            )}
                          </div>
                        )}
                        <p className="text-[8px] font-bold text-stone-500 dark:text-stone-400 uppercase text-center tracking-wide leading-tight">
                          {langKey === "en" ? it.label.en : it.label.th}
                        </p>
                      </div>
                    );
                  });
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div >
    );
  };

export const Door: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);

  const { getImg, handleFileSelect, clearAll, clearOne, hasOverrides } = useImageOverrides();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash]);

  const PUBLIC_IMAGES = {
    hero: "/door/Df4.webp",
    feature: "/door/door1.webp",
    wpcCollection: [
      "/door/WPC/wpc1.webp",
      "/door/WPC/wpc2.webp",
      "/door/WPC/wpc3.webp",
      "/door/WPC/wpc4.webp",
      "/door/WPC/wpc5.webp",
      "/door/WPC/wpc6.webp",
    ],
    wpcNames: [
      { th: "WPC-Door", en: "WPC-Door" },
      { th: "มอคค่ามิสต์", en: "WPC-Mocha Mist" },
      { th: "น้ำตาลมอคค่า", en: "WPC-Mocha Brown" },
      { th: "คาราเมลแซนด์", en: "WPC-Caramel Sand" },
      { th: "นมกาแฟ", en: "WPC-Milk Coffee" },
      { th: "น้ำตาลดำ", en: "WPC-Dark Mocha" },
    ],
    upvcCollection: ["/door/uPVC/upvc1.webp", "/door/uPVC/upvc2.webp", "/door/uPVC/upvc3.webp", "/door/uPVC/upvc4.webp", "/door/uPVC/upvc5.webp", "/door/uPVC/upvc6.webp"],
    upvcNames: Array(6).fill({ th: "uPVC-Door", en: "uPVC-Door" }),
    melamineCollection: ["/door/Melamine/Earl Grey-1.webp", "/door/Melamine/Earl Grey-2.webp", "/door/Melamine/Earl Grey-3.webp", "/door/Melamine/Earl Grey-4.webp", "/door/Melamine/Earl Grey-5.webp", "/door/Melamine/Earl Grey-6.webp"],
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
    <div className="min-h-screen bg-white dark:bg-stone-950">

      {/* Door Finder CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white text-center sm:text-left">
            <p className="text-sm font-medium">{t("Not sure which door is right for you?", "ยังไม่แน่ใจว่าประตูแบบไหนเหมาะกับคุณ?")}</p>
            <p className="text-xs text-white/80">{t("Try our interactive door finder tool", "ลองใช้เครื่องมือค้นหาประตูแบบอินเทอร์แอคทีฟ")}</p>
          </div>
          <a
            href="https://door.chhindustry.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-6 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-lg shadow-md hover:shadow-lg whitespace-nowrap"
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

      {/* WPC Section */}
      <section id="wpc">
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-4 md:py-16">
          <ProductCollectionSection
            collection="WPC"
            images={IMAGES}
            t={t}
            imagePosition="left"
            editMode={editMode}
            getImg={getImg}
            onFileSelect={handleFileSelect}
            onResetOne={clearOne}
          />
        </div>
      </section>

      {/* uPVC Section */}
      <section id="upvc">
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-4 md:py-16">
          <ProductCollectionSection
            collection="uPVC"
            images={IMAGES}
            t={t}
            imagePosition="right"
            editMode={editMode}
            getImg={getImg}
            onFileSelect={handleFileSelect}
            onResetOne={clearOne}
          />
        </div>
      </section>

      {/* Melamine Section */}
      <section id="melamine">
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-4 md:py-16">
          <ProductCollectionSection
            collection="Melamine"
            images={IMAGES}
            t={t}
            imagePosition="left"
            editMode={editMode}
            getImg={getImg}
            onFileSelect={handleFileSelect}
            onResetOne={clearOne}
          />
        </div>
      </section>
    </div>
  );
};
