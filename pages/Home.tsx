import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const quickCards = [
  { title: "Door", img: "/DOOR.png", path: "/door" },
  { title: "Flooring", img: "/image1 (2).png", path: "/flooring" },
  { title: "Wall Panel", img: "/image2.png", path: "/wall-panel" },
  { title: "Service Shaft", img: "/door-02.png", path: "/service-shaft" },
];

const zigzag = [
  {
    title: "Residential",
    img: "/DF3.png",
    path: "/door",
    desc: "Refined doors and surfaces for everyday living.",
  },
  {
    title: "Commercial",
    img: "/Df4.jpg",
    path: "/our-company",
    desc: "Built for projects. Designed to last.",
  },
  {
    title: "Sustainable",
    img: "/Df5.png",
    path: "/about-us",
    desc: "Materials that respect spaces and nature.",
  },
];

export const Home: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">


      <section className="relative">
        <div className="absolute top-0 inset-x-0 h-px bg-stone-200/70 dark:bg-stone-800/70" />

        <div className="px-6 md:px-12 pt-28 md:pt-36 pb-20">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <p className="text-[10px] uppercase tracking-[0.45em] text-stone-400 dark:text-stone-500 mb-8">
                {t("Evergreen / Door Products", "เอเวอร์กรีน / ผลิตภัณฑ์ประตู")}
              </p>


              <h1 className="font-serif tracking-tight leading-[1.1]">
                <span className="block text-4xl md:text-6xl">
                  {t("50 Years of", "50 ปีแห่ง")}
                </span>
                <span className="block text-4xl md:text-6xl">
                  {t("Architectural Products", "ผลิตภัณฑ์สถาปัตยกรรม")}
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                {t("Quietly engineered. Timelessly designed. A collection of doors and surfaces crafted for modern spaces.", "วิศวกรรมที่เงียบสงบ ดีไซน์ที่ไร้กาลเวลา คอลเลกชันประตูและพื้นผิวที่สร้างสรรค์สำหรับพื้นที่สมัยใหม่")}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/door"
                  className="px-7 py-3 text-[11px] uppercase tracking-[0.25em] border border-stone-300 dark:border-stone-700 hover:border-stone-800 dark:hover:border-stone-200 transition-colors"
                >
                  {t("Our Products", "ผลิตภัณฑ์ของเรา")}
                </Link>

                <Link
                  to="/contact-us"
                  className="px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                >
                  {t("For Pro", "สำหรับมืออาชีพ")}
                  <span className="ml-2 inline-block w-10 h-px bg-stone-300 dark:bg-stone-600 align-middle" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-stone-200/70 dark:bg-stone-800/70" />
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">

            <h2 className="font-serif text-xl md:text-2xl">
              {t("Collections", "คอลเลกชัน")}
            </h2>
            <p className="hidden md:block text-[10px] uppercase tracking-[0.35em] text-stone-400 dark:text-stone-500">
              {t("Explore categories", "สำรวจหมวดหมู่")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickCards.map((item, i) => (
              <Link key={i} to={item.path} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800">
                  <div className="aspect-[4/3]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-image-reveal"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm">
                    {t(item.title, item.title === "Door" ? "ประตู" : item.title === "Flooring" ? "พื้นไม้" : item.title === "Wall Panel" ? "ผนังตกแต่ง" : "ช่องชาร์ป")}
                  </p>
                  <span className="text-xs text-stone-400 dark:text-stone-500">{t("View", "ดูสินค้า")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-10 px-6 md:px-12">
        <div className="container mx-auto space-y-20">
          {zigzag.map((row, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={row.title}
                className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden rounded-3xl bg-stone-100 dark:bg-stone-800">
                    <div className="aspect-[5/4]">
                      <img
                        src={row.img}
                        alt={row.title}
                        className="w-full h-full object-cover animate-image-reveal"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 md:px-6">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-stone-400 dark:text-stone-500 mb-4">
                    0{idx + 1}
                  </p>


                  <h3 className="font-serif text-2xl md:text-4xl mb-5 leading-tight">
                    {t(row.title, row.title === "Residential" ? "ที่พักอาศัย" : row.title === "Commercial" ? "เชิงพาณิชย์" : "ความยั่งยืน")}
                  </h3>

                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed max-w-lg mb-10">
                    {t(row.desc, row.desc.startsWith("Refined") ? "ประตูและพื้นผิวที่ประณีตสำหรับการใช้ชีวิตประจำวัน" : row.desc.startsWith("Built") ? "สร้างมาเพื่อโครงการ ออกแบบมาให้คงทน" : "วัสดุที่เคารพพื้นที่และธรรมชาติ")}
                  </p>

                  <Link
                    to={row.path}
                    className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
                  >
                    {t("Explore", "สำรวจ")}
                    <span className="inline-block w-12 h-px bg-stone-300 dark:bg-stone-600" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="py-16" />
    </div>
  );
};
