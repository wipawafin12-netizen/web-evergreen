import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface SitemapItem {
  title: { en: string; th: string };
  path: string | null;
  desc?: { en: string; th: string };
  children: SitemapItem[];
}

const sitemapData: SitemapItem[] = [
  {
    title: { en: "Home", th: "หน้าหลัก" },
    path: "/",
    children: [],
  },
  {
    title: { en: "About Us", th: "เกี่ยวกับเรา" },
    path: "/our-company",
    desc: { en: "Company history, vision & mission", th: "ประวัติบริษัท วิสัยทัศน์ และพันธกิจ" },
    children: [],
  },
  {
    title: { en: "Products", th: "สินค้า" },
    path: null,
    children: [
      {
        title: { en: "Doors", th: "ประตู" },
        path: "/door",
        desc: { en: "WPC / uPVC / Melamine (Hester Series)", th: "WPC / uPVC / Melamine (Hester Series)" },
        children: [],
      },
      {
        title: { en: "Door Frames", th: "วงกบ" },
        path: "/doorframe",
        desc: { en: "WPC / Makawood / Redwood / Oak / Takien", th: "WPC / มะค่า / แดง / โอ๊ค / ตะเคียน" },
        children: [],
      },
      {
        title: { en: "SPC Flooring", th: "พื้น SPC" },
        path: "/flooring",
        children: [],
      },
      {
        title: { en: "Service Shaft", th: "ช่องชาร์ป" },
        path: "/service-shaft",
        desc: { en: "OEM / ODM / One-Stop-Service", th: "OEM / ODM / One-Stop-Service" },
        children: [],
      },
      {
        title: { en: "Staircase", th: "บันได" },
        path: "/staircase",
        desc: { en: "Solid Rubberwood / Engineered Wood / WPC", th: "ไม้ยางพาราประสาน / เอ็นจิเนียร์ / WPC" },
        children: [],
      },
      {
        title: { en: "Wall Panel", th: "ผนัง/แผ่นตกแต่ง" },
        path: "/wall-panel",
        children: [],
      },
    ],
  },
  {
    title: { en: "Services", th: "บริการ" },
    path: "/services",
    children: [],
  },
  {
    title: { en: "Business", th: "ธุรกิจ" },
    path: null,
    children: [
      { title: { en: "Request for Quote", th: "ขอใบเสนอราคา" }, path: "/quote", children: [] },
      { title: { en: "B2B", th: "B2B" }, path: "/b2b", children: [] },
      { title: { en: "Affiliate", th: "Affiliate" }, path: "/affiliate", children: [] },
    ],
  },
  {
    title: { en: "Contact Us", th: "ติดต่อเรา" },
    path: "/contact",
    desc: { en: "Office: 02-921-9979 | Sales: 062-539-9980", th: "สำนักงาน: 02-921-9979 | ฝ่ายขาย: 062-539-9980" },
    children: [],
  },
];

export const Sitemap: React.FC = () => {
  const { t, language } = useLanguage();

  const getText = (obj: { en: string; th: string }) =>
    language === "EN" ? obj.en : obj.th;

  const renderItem = (item: SitemapItem, depth: number = 0) => {
    const isLink = !!item.path;
    const titleEl = isLink ? (
      <Link
        to={item.path!}
        className={`hover:text-brand-500 transition-colors ${
          depth === 0
            ? "text-lg font-medium text-stone-900 dark:text-stone-100"
            : depth === 1
            ? "text-base text-stone-700 dark:text-stone-300"
            : "text-sm text-stone-500 dark:text-stone-400"
        }`}
      >
        {getText(item.title)}
      </Link>
    ) : (
      <span className="text-lg font-medium text-stone-900 dark:text-stone-100">
        {getText(item.title)}
      </span>
    );

    return (
      <div key={getText(item.title)}>
        {titleEl}
        {item.desc && (
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
            {getText(item.desc)}
          </p>
        )}
        {item.children.length > 0 && (
          <ul className="mt-3 ml-4 space-y-2 border-l-2 border-stone-200 dark:border-stone-700 pl-4">
            {item.children.map((child) => (
              <li key={getText(child.title)}>
                {renderItem(child, depth + 1)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-stone-100 mb-4">
          {t("Sitemap", "แผนผังเว็บไซต์")}
        </h1>
        <div className="w-20 h-1 bg-brand-500 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sitemapData.map((item) => renderItem(item, 0))}
        </div>
      </div>
    </div>
  );
};
