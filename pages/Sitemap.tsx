import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const sitemapData = [
  {
    title: { en: "Home", th: "หน้าหลัก" },
    path: "/",
    children: [],
  },
  {
    title: { en: "About Us", th: "เกี่ยวกับเรา" },
    path: "/our-company",
    children: [],
  },
  {
    title: { en: "Products", th: "สินค้า" },
    path: null,
    children: [
      {
        title: { en: "Doors", th: "ประตู" },
        path: "/door",
        children: [],
      },
      {
        title: { en: "Door Frames", th: "วงกบ" },
        path: "/doorframe",
        children: [],
      },
      {
        title: { en: "Flooring", th: "พื้นไม้" },
        path: "/flooring",
        children: [],
      },
      {
        title: { en: "Service Shaft", th: "ช่องชาร์ป" },
        path: "/service-shaft",
        children: [],
      },
      {
        title: { en: "Staircase", th: "บันได" },
        path: "/staircase",
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
    title: { en: "Request for Quote", th: "ขอใบเสนอราคา" },
    path: "/quote",
    children: [],
  },
  {
    title: { en: "B2B", th: "B2B" },
    path: "/b2b",
    children: [],
  },
  {
    title: { en: "Affiliate", th: "Affiliate" },
    path: "/affiliate",
    children: [],
  },
  {
    title: { en: "Contact Us", th: "ติดต่อเรา" },
    path: "/contact",
    children: [],
  },
];

export const Sitemap: React.FC = () => {
  const { t, language } = useLanguage();

  const getText = (obj: { en: string; th: string }) =>
    language === "EN" ? obj.en : obj.th;

  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-stone-100 mb-4">
          {t("Sitemap", "แผนผังเว็บไซต์")}
        </h1>
        <div className="w-20 h-1 bg-brand-500 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sitemapData.map((item, i) => (
            <div key={i}>
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-lg font-medium text-stone-900 dark:text-stone-100 hover:text-brand-500 transition-colors"
                >
                  {getText(item.title)}
                </Link>
              ) : (
                <span className="text-lg font-medium text-stone-900 dark:text-stone-100">
                  {getText(item.title)}
                </span>
              )}

              {item.children.length > 0 && (
                <ul className="mt-3 ml-4 space-y-2 border-l-2 border-stone-200 dark:border-stone-700 pl-4">
                  {item.children.map((child, j) => (
                    <li key={j}>
                      <Link
                        to={child.path}
                        className="text-stone-600 dark:text-stone-400 hover:text-brand-500 transition-colors"
                      >
                        {getText(child.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
