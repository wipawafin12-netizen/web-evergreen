import React from "react";

import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export const OurCompany: React.FC = () => {
  const { t } = useLanguage();
  const reviews = [
    {
      name: "Anne Cooper",
      role: "Architect",
      text: "Clean lines, solid build, and the finish feels premium.",
      rating: 5,
    },
    {
      name: "Jenny Wilson",
      role: "Homeowner",
      text: "Installation was smooth. The door looks timeless in our space.",
      rating: 5,
    },
  ];

  const collection = [
    { title: "Modern Panel", subtitle: "Oak tone", img: "/image1 (2).png" },
    { title: "Minimal Flat", subtitle: "Warm sand", img: "/image2.png" },
    { title: "Classic Line", subtitle: "Soft white", img: "/door-02.png" },
    { title: "Studio Edition", subtitle: "Natural wood", img: "/w3.png" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">

      <section className="px-6 md:px-12 pt-32 pb-20">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 opacity-80">
            {t("Est. 1974", "ก่อตั้ง 1974")}
          </p>
          <h1 className="mt-8 font-serif text-3xl md:text-5xl lg:text-[56px] leading-[1.1] text-stone-900 dark:text-stone-100">
            {t("Inspire", "สร้างแรงบันดาลใจ")} <span className="italic text-stone-500">{t("everyday living.", "การใช้ชีวิตทุกวัน")}</span>
          </h1>
        </div>
      </section>


      <section className="px-6 md:px-12 pb-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">


            <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-4">
              <div className="relative overflow-hidden group">
                <div className="aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <img
                    src="/image1 (2).png"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 animate-image-reveal"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 pl-1">
                {t("Craftsmanship", "งานฝีมือ")}
              </p>
            </div>

            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between h-full pt-12 md:pt-24 gap-20">


              <div className="max-w-md">
                <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-6">
                  {t("Our Story", "เรื่องราวของเรา")}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl leading-snug text-stone-800 dark:text-stone-200">
                  {t("Built quietly. Designed to last.", "สร้างอย่างเงียบเชียบ ออกแบบให้คงทน")}
                </h2>
                <p className="mt-6 text-sm md:text-base text-stone-500 dark:text-stone-400 leading-loose">
                  {t("We proudly trace our origins from a humble sawmill to a preeminent producer of construction materials. Our approach is simple—timeless design, dependable engineering, and materials that feel right in every space.", "เราภูมิใจในรากฐานจากโรงเลื่อยเล็กๆ สู่ผู้ผลิตวัสดุก่อสร้างชั้นนำ แนวทางของเราเรียบง่าย—ดีไซน์ที่ไร้กาลเวลา วิศวกรรมที่เชื่อถือได้ และวัสดุที่ลงตัวในทุกพื้นที่")}
                </p>
                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500">
                    — Evergreen
                  </p>
                </div>
              </div>


              <div className="relative pl-0 md:pl-12">
                <div className="aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900 group">
                  <img
                    src="/image2.png"
                    alt="Sustainability"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 animate-image-reveal"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-stone-400 pl-1">
                  {t("Sustainability", "ความยั่งยืน")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="container mx-auto max-w-6xl border-t border-stone-200 dark:border-stone-800 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">

            <div>
              <div className="flex items-baseline gap-4 mb-10">
                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100">{t("Reviews", "รีวิว")}</h3>
                <span className="text-xs text-stone-400 uppercase tracking-widest">{t("5.0 Average", "เฉลี่ย 5.0")}</span>
              </div>
              <div className="space-y-10">
                {reviews.map((r, idx) => (
                  <div key={idx} className="group">
                    <p className="text-lg font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
                      "{r.text}"
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-stone-900 dark:text-stone-100 tracking-wide uppercase">
                        {r.name} <span className="text-stone-400 ml-1">— {r.role}</span>
                      </p>
                      <div className="text-[10px] text-orange-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="flex flex-col justify-center">
              <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">
                {t("Join our newsletter", "รับข่าวสารจากเรา")}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 leading-relaxed max-w-sm">
                {t("Receive quiet updates, material insights, and design notes. No spam, ever.", "รับข่าวสาร อัปเดตวัสดุใหม่ๆ และเกร็ดความรู้เรื่องดีไซน์ ไม่มีสแปมแน่นอน")}
              </p>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address for newsletter"
                  className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-800 dark:focus:border-stone-200 transition-colors"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[10px] uppercase tracking-[0.25em] text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-300 transition-colors"
                  >
                    {t("Subscribe", "ติดตาม")} -&gt;
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>


      <section className="px-6 md:px-12 pb-32">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100">{t("Essentials", "สินค้าแนะนำ")}</h4>
            <Link to="/products" className="text-[10px] uppercase tracking-[0.25em] text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200">{t("View All", "ดูทั้งหมด")}</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {collection.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-stone-100 dark:bg-stone-900 mb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-image-reveal"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100">
                  {item.title}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
