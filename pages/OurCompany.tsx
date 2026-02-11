import React from "react";

import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export const OurCompany: React.FC = () => {
  const { t } = useLanguage();

  const history = [
    {
      year: "2564",
      title: "Westwind",
      titleTH: "เวสวินด์",
      description: "One-Stop-Service Solution under Westwind Services Co., Ltd.",
      descriptionTH: "ขยายขอบเขตการให้บริการเป็น One-Stop-Service Solution ให้กับลูกค้า ภายใต้ บจก. เวสวินด์ เซอร์วิสเซส",
      logo: "/logo/westwind-logo.png"
    },
    {
      year: "2563",
      title: "Evergreen",
      titleTH: "เอเวอร์กรีน",
      description: "Expanded product line to wood substitute under Evergreen brand.",
      descriptionTH: "ขยายไลน์สินค้า ผลิตภัณฑ์ในกลุ่มทดแทนไม้ และไม้สังเคราะห์ ภายใต้แบรนด์ Evergreen",
      logo: "/logo/evergreen-logo.png"
    },
    {
      year: "2560",
      title: "Standardization",
      titleTH: "การรับรอง",
      description: "ISO 9001:2015 Quality Management System Certification.",
      descriptionTH: "ผ่านการรับรอง ระบบคุณภาพ ISO 9001:2015",
      logo: "/logo/bsi-logo.png"
    },
    {
      year: "2540",
      title: "Expansion",
      titleTH: "ขยายโรงงาน",
      description: "Factory expansion covering 9,600 sq.m.",
      descriptionTH: "ขยายโรงงาน พื้นที่ 9,600 ตร.ม.",
      logo: null
    },
    {
      year: "2530",
      title: "Establishment",
      titleTH: "เริ่มกิจการ",
      description: "Established Sue Hah Huat Industry Co., Ltd. for wood products.",
      descriptionTH: "เริ่มกิจการ บริษัท ซื้อฮะฮวด อุตสาหกรรม จำกัด ประกอบกิจการผลิตไม้แปรรูป อาทิ วงกบ ประตู หน้าต่าง พื้น บันได",
      logo: "/logo/chh-logo.png"
    },
    {
      year: "2511",
      title: "Founding",
      titleTH: "ก่อตั้ง",
      description: "Founded Factory Sawmill at Bang Pho, Pracharat 1 Road.",
      descriptionTH: "ก่อตั้ง โรงเลื่อยจักร ซื้อฮะฮวด ประกอบกิจการเลื่อยไม้ แปรรูป ตั้งอยู่ ณ บางโพ ถ.ประชาราษฎร์ สาย 1",
      logo: null
    }
  ];

  const services = [
    {
      title: "OEM",
      description: "We capable to customize products suitable for clients' needs",
      descriptionTH: "เราสามารถปรับแต่งผลิตภัณฑ์ให้เหมาะสมกับความต้องการของลูกค้า",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4 8 4v14" />
          <path d="M17 21v-8.5a2.5 2.5 0 0 0-5 0V21" />
        </svg>
      )
    },
    {
      title: "ODM",
      description: "We exclusively design and develop products together with our clients",
      descriptionTH: "เราออกแบบและพัฒนาผลิตภัณฑ์ร่วมกับลูกค้าของเราโดยเฉพาะ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )
    },
    {
      title: "One-Stop-Service",
      description: "We offering turnkey solution to client",
      descriptionTH: "เรานำเสนอโซลูชั่นแบบครบวงจรให้กับลูกค้า",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <path d="M14 14h7v7h-7z" />
          <path d="M3 14h7v7h-7z" />
        </svg>
      )
    }
  ];

  const facilities = [
    {
      title: "Sainoi Nonthaburi",
      subtitle: "9,600 sq.m.",
      titleTH: "ไทรน้อย นนทบุรี",
      subtitleTH: "9,600 ตร.ม."
    },
    {
      title: "60+ Machines",
      subtitle: "3 Extrusion Production Lines",
      titleTH: "เครื่องจักร 60+",
      subtitleTH: "3 สายการผลิต Extrusion"
    },
    {
      title: "Capacity 9,000 door / month",
      subtitle: "WPC Doorframe : 7,000 set / month",
      titleTH: "กำลังผลิตประตู 9,000 บาน / เดือน",
      subtitleTH: "วงกบ WPC : 7,000 ชุด / เดือน"
    }
  ];

  const collection = [
    { title: "Modern Panel", subtitle: "Oak tone", img: "/our-company/11.png", price: "2,490", path: "/door" },
    { title: "Minimal Flat", subtitle: "Warm sand", img: "/our-company/33.png", price: "3,590", path: "/door" },

    { title: "Studio Edition", subtitle: "Natural wood", img: "/our-company/22.png", price: "3,190", path: "/door" },
    { title: "Urban Loft", subtitle: "Grey matte", img: "/our-company/44.png", price: "3,890", path: "/door" },
  ];

  const row1Brands = [
    { id: 1, name: "Client 1", src: "/brand-customer/b1.png" },
    { id: 2, name: "Client 2", src: "/brand-customer/b2.png" },
    { id: 3, name: "Client 3", src: "/brand-customer/b3.png" },
    { id: 4, name: "Client 4", src: "/brand-customer/b4.png" },
    { id: 5, name: "Client 5", src: "/brand-customer/b5.png" },
    { id: 6, name: "Client 6", src: "/brand-customer/b6.png" },
    { id: 7, name: "Client 7", src: "/brand-customer/b7.png" },
    { id: 8, name: "Client 8", src: "/brand-customer/b8.png" },
    { id: 9, name: "Client 9", src: "/brand-customer/b9.png" },
    { id: 10, name: "Client 10", src: "/brand-customer/b10.png" },
    { id: 11, name: "Client 11", src: "/brand-customer/b11.png" },
    { id: 12, name: "Client 12", src: "/brand-customer/b12.png" },
    { id: 13, name: "Client 13", src: "/brand-customer/b13.png" },
    { id: 14, name: "Client 14", src: "/brand-customer/b14.png" },
    { id: 15, name: "Client 15", src: "/brand-customer/b15.png" },
    { id: 16, name: "Client 16", src: "/brand-customer/b16.png" },
    { id: 17, name: "Client 17", src: "/brand-customer/b17.png" },
    { id: 18, name: "Client 18", src: "/brand-customer/b18.png" },
    { id: 19, name: "Client 19", src: "/brand-customer/b19.png" },
    { id: 20, name: "Client 20", src: "/brand-customer/b20.png" },
    { id: 21, name: "Client 21", src: "/brand-customer/b21.png" },
    { id: 22, name: "Client 22", src: "/brand-customer/b22.png" },
    { id: 23, name: "Client 23", src: "/brand-customer/b23.png" },
    { id: 24, name: "Client 24", src: "/brand-customer/b24.png" },
    { id: 25, name: "Client 25", src: "/brand-customer/b25.png" },
    { id: 26, name: "Client 26", src: "/brand-customer/b26.png" },
    { id: 27, name: "Client 27", src: "/brand-customer/b27.png" },
  ];

  const row2Brands = [
    { id: 1, name: "Client 1", src: "/brand-customer2/b1.png" },
    { id: 2, name: "Client 2", src: "/brand-customer2/b2.png" },
    { id: 3, name: "Client 3", src: "/brand-customer2/b3.png" },
    { id: 4, name: "Client 4", src: "/brand-customer2/b4.png" },
    { id: 5, name: "Client 5", src: "/brand-customer2/b5.png" },
    { id: 6, name: "Client 6", src: "/brand-customer2/b6.png" },
    { id: 7, name: "Client 7", src: "/brand-customer2/b7.png" },
    { id: 8, name: "Client 8", src: "/brand-customer2/b8.png" },
    { id: 9, name: "Client 9", src: "/brand-customer2/b9.png" },
    { id: 10, name: "Client 10", src: "/brand-customer2/b10.png" },
    { id: 11, name: "Client 11", src: "/brand-customer2/b11.png" },
    { id: 12, name: "Client 12", src: "/brand-customer2/b12.png" },
    { id: 13, name: "Client 13", src: "/brand-customer2/b13.png" },
    { id: 14, name: "Client 14", src: "/brand-customer2/b14.png" },
    { id: 15, name: "Client 15", src: "/brand-customer2/b15.png" },
    { id: 16, name: "Client 16", src: "/brand-customer2/b16.png" },
    { id: 17, name: "Client 17", src: "/brand-customer2/b17.png" },
    { id: 18, name: "Client 18", src: "/brand-customer2/b18.png" },
    { id: 19, name: "Client 19", src: "/brand-customer2/b19.png" },
    { id: 20, name: "Client 20", src: "/brand-customer2/b20.png" },
    { id: 21, name: "Client 21", src: "/brand-customer2/b21.png" },
    { id: 22, name: "Client 22", src: "/brand-customer2/b22.png" },
    { id: 23, name: "Client 23", src: "/brand-customer2/b23.png" },
    { id: 24, name: "Client 24", src: "/brand-customer2/b24.png" },
    { id: 25, name: "Client 25", src: "/brand-customer2/b25.png" },
    { id: 26, name: "Client 26", src: "/brand-customer2/b26.png" },
    { id: 27, name: "Client 27", src: "/brand-customer2/b27.png" },
    { id: 28, name: "Client 28", src: "/brand-customer2/b28.png" },
    { id: 29, name: "Client 29", src: "/brand-customer2/b29.png" },
  ];

  const row3Brands = [
    { id: 1, name: "Client 1", src: "/brand-customer3/b1.png" },
    { id: 2, name: "Client 2", src: "/brand-customer3/b2.png" },
    { id: 3, name: "Client 3", src: "/brand-customer3/b3.png" },
    { id: 4, name: "Client 4", src: "/brand-customer3/b4.png" },
    { id: 5, name: "Client 5", src: "/brand-customer3/b5.png" },
    { id: 6, name: "Client 6", src: "/brand-customer3/b6.png" },
    { id: 7, name: "Client 7", src: "/brand-customer3/b7.png" },
    { id: 8, name: "Client 8", src: "/brand-customer3/b8.png" },
    { id: 9, name: "Client 9", src: "/brand-customer3/b9.png" },
    { id: 10, name: "Client 10", src: "/brand-customer3/b10.png" },
    { id: 11, name: "Client 11", src: "/brand-customer3/b11.png" },
    { id: 12, name: "Client 12", src: "/brand-customer3/b12.png" },
    { id: 13, name: "Client 13", src: "/brand-customer3/b13.png" },
    { id: 14, name: "Client 14", src: "/brand-customer3/b14.png" },
    { id: 15, name: "Client 15", src: "/brand-customer3/b15.png" },
    { id: 16, name: "Client 16", src: "/brand-customer3/b16.png" },
    { id: 17, name: "Client 17", src: "/brand-customer3/b17.png" },
  ];


  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">


      <section className="px-6 md:px-12 pt-24 pb-10">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 opacity-80">
            {t("Est. 1968", "ก่อตั้ง 1968")}
          </p>
          <h1 className="mt-4 text-1xl md:text-3xl lg:text-4xl leading-[1.1] text-[#E64A19]">
            {t("50 Years of Architectural Products", "50 ปีแห่งผลิตภัณฑ์ทางสถาปัตยกรรม")}
          </h1>
        </div>
      </section >


      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">

            <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-4">
              <div className="relative overflow-hidden group rounded-3xl">
                <div className="aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <img
                    src="/our-company/01.png"
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

            <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between h-full pt-8 md:pt-12 gap-12">
              {/* ... Right Column Content ... */}
              <div className="max-w-md">
                <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-6">
                  {t("Our Story", "เรื่องราวของเรา")}
                </p>
                <h2 className="text-2xl md:text-3xl leading-snug text-stone-800 dark:text-stone-200">
                  {t("Evergreen By CHH", "สร้างอย่างเงียบเชียบ ออกแบบให้คงทน")}
                </h2>
                <p className="mt-6 text-sm md:text-base text-stone-500 dark:text-stone-400 leading-loose">
                  {t("We proudly trace our origins from a humble sawmill to a preeminent producer of construction materials.", "เราภาคภูมิใจที่ได้สืบย้อนต้นกำเนิดจากโรงเลื่อยไม้เล็กๆ สู่ผู้ผลิตวัสดุก่อสร้างชั้นนำ")}
                </p>
                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500">
                    — Evergreen
                  </p>
                </div>
              </div>

              <div className="relative pl-0 md:pl-12">
                <div className="aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900 group rounded-3xl">
                  <img
                    src="/our-company/02.png"
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


      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10 md:mb-14 text-center">
            <h2 className="text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-4">
              {t("Our Journey", "เส้นทางของเรา")}
            </h2>
            <div className="w-16 h-[1px] bg-stone-300 dark:bg-stone-700 mx-auto" />
          </div>

          <div className="relative">

            <div className="absolute top-[3.5rem] left-0 w-full h-[1px] bg-stone-200 dark:bg-stone-800 hidden md:block" />

            <div className="flex overflow-x-auto pb-8 gap-8 md:gap-0 snap-x scrollbar-hide">
              {history.map((item, idx) => (
                <div key={idx} className="min-w-[280px] md:min-w-[1] md:flex-1 snap-start flex flex-col items-start md:items-center relative group">
                  {/* Year */}
                  <div className="mb-8 md:mb-12 pl-4 md:pl-0">
                    <span className="text-4xl md:text-5xl text-stone-300 group-hover:text-stone-800 dark:group-hover:text-stone-100 transition-colors duration-500 block text-center font-semibold">
                      {item.year}
                    </span>
                  </div>

                  {/* Dot Indicator */}
                  <div className="hidden md:flex absolute top-[3.5rem] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-700 group-hover:bg-[#E64A19] border-4 border-white dark:border-stone-950 items-center justify-center transition-colors duration-500 z-10 -mt-2">
                  </div>

                  {/* Mobile Line & Dot */}
                  <div className="md:hidden w-full h-[1px] bg-stone-200 dark:bg-stone-800 absolute top-[3.5rem] left-0 right-0"></div>
                  <div className="md:hidden absolute top-[3.5rem] left-4 w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-700 group-hover:bg-[#E64A19] -translate-y-1/2 transition-colors duration-500"></div>

                  {/* Content */}
                  <div className="mt-4 md:mt-8 px-4 md:px-6 md:text-center w-full">
                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2 group-hover:text-[#E64A19] transition-colors duration-300">
                      {t(item.title, item.titleTH)}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                      {t(item.description, item.descriptionTH)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl text-stone-900 dark:text-stone-100">{t("Essentials", "สินค้าแนะนำ")}</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.map((item, idx) => (
              <Link key={idx} to={item.path} className="group cursor-pointer block">
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900 mb-4 rounded-2xl relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-image-reveal"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100 group-hover:text-brand-500 transition-colors">
                  {item.title}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">{item.subtitle}</p>
                  <p className="text-[11px] text-stone-900 dark:text-stone-200">฿{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-6xl border-t border-stone-200 dark:border-stone-800 pt-12">
          <h2 className="text-3xl md:text-5xl text-stone-900 dark:text-stone-100 mb-8 text-left">
            {t("B2B Services", "บริการ B2B")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-stone-900/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-lg transition-all duration-500 ease-out flex flex-col gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:text-white group-hover:bg-[#E64A19] transition-colors duration-500">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-stone-900 dark:text-stone-100 text-xl font-bold mb-3 tracking-wide group-hover:text-[#E64A19] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                    {t(service.description, service.descriptionTH)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-6xl border-t border-stone-200 dark:border-stone-800 pt-12">
          <h2 className="text-3xl md:text-5xl text-stone-900 dark:text-stone-100 mb-10 text-center">
            {t("Facility", "โรงงานของเรา")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800">
            {facilities.map((item, idx) => (
              <div key={idx} className="p-8 flex flex-col items-center justify-center gap-2 text-center group hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors duration-500 rounded-2xl">
                <h3 className="text-4xl md:text-5xl text-[#E64A19] font-bold mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  {idx === 0 ? "1" : idx === 1 ? "60+" : "9K"}
                </h3>
                <h3 className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-200">
                  {t(item.title, item.titleTH)}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 font-light text-sm md:text-base max-w-xs">
                  {t(item.subtitle, item.subtitleTH)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div className="container mx-auto max-w-7xl border-t border-stone-200 dark:border-stone-800 pt-12">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-3">{t("trusted by", "ได้รับความไว้วางใจจาก")}</span>
            <h2 className="text-2xl md:text-4xl font-medium tracking-widest text-stone-900 dark:text-stone-50">{t("Leading Companies", "บริษัทชั้นนำ")}</h2>
          </div>

          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scroll-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-scroll {
              animation: scroll 120s linear infinite;
            }
            .animate-scroll-reverse {
              animation: scroll-reverse 120s linear infinite;
            }
          `}</style>

          <div className="flex flex-col gap-8">
            {/* Row 1 - Our Clients Developer */}
            <div>
              <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-400 mb-4">{t("Our Clients Developer", "ลูกค้ากลุ่มผู้พัฒนาโครงการ")}</h3>
              <div className="relative overflow-hidden w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="flex gap-4 items-center animate-scroll w-max">
                  {[...row1Brands, ...row1Brands].map((brand, i) => (
                    <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 flex items-center justify-center p-6 border border-stone-100 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 mx-1">
                      <img src={brand.src} alt={brand.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2 - Main Contractor */}
            <div>
              <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-400 mb-4">{t("Main Contractor", "ผู้รับเหมาหลัก")}</h3>
              <div className="relative overflow-hidden w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="flex gap-4 items-center animate-scroll-reverse w-max">
                  {[...row2Brands, ...row2Brands].map((brand, i) => (
                    <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 flex items-center justify-center p-6 border border-stone-100 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 mx-1">
                      <img src={brand.src} alt={brand.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3 - Hotel & Service Apartment */}
            <div>
              <h3 className="text-center text-sm font-medium uppercase tracking-widest text-stone-400 mb-4">{t("Hotel & Service Apartment", "โรงแรมและเซอร์วิสอพาร์ตเมนต์")}</h3>
              <div className="relative overflow-hidden w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                <div className="flex gap-4 items-center animate-scroll w-max">
                  {[...row3Brands, ...row3Brands].map((brand, i) => (
                    <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 flex items-center justify-center p-6 border border-stone-100 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900 mx-1">
                      <img src={brand.src} alt={brand.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
