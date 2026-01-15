import React from 'react';
import { PAGE_IMAGES } from '../data/images';
import { useLanguage } from '../contexts/LanguageContext';

type ImageMode = 'DATA' | 'PUBLIC';


const IMAGES_SOURCE: ImageMode = 'PUBLIC';

export const Door: React.FC = () => {
  const { t } = useLanguage();

  const PUBLIC_IMAGES = {
    hero: 'public/DOOR.png',
    feature: 'public/Df4.jpg',
    collection: [
      'public/door-01.png',
      'public/door-02.png',
      'public/image1 (2).png',

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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">

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
              className="absolute inset-0 w-full h-full object-cover rounded-sm animate-image-reveal"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {IMAGES.collection.map((imgUrl, i) => (
              <div
                key={i}
                className="bg-stone-50 dark:bg-stone-800 p-12 group hover:shadow-lg transition-all duration-500 relative overflow-hidden text-center"
              >
                <div className="aspect-[3/4] bg-white dark:bg-stone-700 mb-8 flex items-center justify-center relative z-10 shadow-sm group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Door ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 animate-image-reveal"
                    loading="lazy"
                  />
                </div>

                <div className="relative z-10">
                  <h4 className="text-brand-900 dark:text-stone-100 font-mono text-lg mb-2">{t("The Door", "ประตูรุ่น")} {i + 1}</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-xs tracking-widest uppercase">{t("Select Edition", "รุ่นคัดพิเศษ")}</p>

                  <div className="mt-4 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 bg-stone-800 rounded-full"></div>
                    <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                    <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="mb-12">
            <h3 className="text-brand-900 dark:text-stone-100 font-bold text-2xl mb-12">{t("Color", "สี")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { code: "LQ6268", name: "Hickory", img: "public/c1.png" },
                { code: "LQ7124", name: "Oak", img: "public/c2.png" },
                { code: "LQ8116", name: "Marble", img: "public/c3.png" },
                { code: "LQ8128", name: "Marble", img: "public/c4.png" },
                { code: "LQ8136", name: "Marble", img: "public/c5.png" },
                { code: "LQ8145", name: "Cement", img: "public/c6.png" },
              ].map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-transparent group-hover:border-stone-300 dark:group-hover:border-stone-600 transition-all p-1">
                    <div className="w-full h-full rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden relative">

                      <img src={swatch.img} alt={swatch.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-brand-900 dark:text-stone-100 font-medium text-sm mb-1">{swatch.code}-</p>
                  <p className="text-stone-500 dark:text-stone-400 text-sm font-light">{swatch.name}</p>
                </div>
              ))}
            </div>
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
            <div className="aspect-square bg-stone-100 dark:bg-stone-800 flex items-center justify-center overflow-hidden">
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
