import React from 'react';
import { MessageCircle, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const productLinks = [
    { label: "Door", labelTH: "ประตู", path: "/door" },
    { label: "Doorframe", labelTH: "วงกบ", path: "/doorframe" },
    { label: "Service Shaft", labelTH: "ช่องชาร์ป", path: "/service-shaft" },
    { label: "Flooring", labelTH: "พื้นไม้", path: "/flooring" },
    { label: "Staircase", labelTH: "บันได", path: "/staircase" },
    { label: "Wall Panel", labelTH: "ผนังตกแต่ง", path: "/wall-panel" },
  ];

  const companyLinks = [
    { label: "About Us", labelTH: "เกี่ยวกับเรา", path: "/about-us" },
    { label: "Jobs", labelTH: "ร่วมงานกับเรา", path: "/jobs" },
    { label: "Contact Us", labelTH: "ติดต่อเรา", path: "/contact-us" },
    { label: "Our Certificate", labelTH: "ใบรับรองของเรา", path: "/certificates" },
  ];

  return (
    <footer className="bg-white dark:bg-stone-950  pb-12 px-6 md:px-12 mt-4 transition-colors duration-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">

        {/* Column 1: Logo */}
        <div className="flex flex-col items-start gap-2 -mt-10">
          <div className="flex items-center gap-0.5">

            <img
              src="/logo/logo-03.png"
              alt="Evergreen Logo"
              className="w-52 h-32 object-contain block dark:hidden"
            />

          </div>

          <div className="-mt-4 space-y-6">
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed max-w-xs">
              {language === 'TH' ? (
                <>
                  9/1 หมู่ 1 ถนนบางเลน-ลาดหลุมแก้ว<br />
                  ต.ขุนศรี อ.ไทรน้อย จ.นนทบุรี 11150<br />
                  โทร: 02 921 9979<br />
                  โทร: 062-539-9980 (การตลาดออนไลน์)
                </>
              ) : (
                <>
                  9/1 Moo 1, Bang Len-Lad Lum Kaeo Road,<br />
                  Khun Sri, Sai Noi District, Nonthaburi 11150<br />
                  Tel: 02 921 9979<br />
                  Tel: 062-539-9980 (MKT)
                </>
              )}
            </p>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/Evergreenchh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:scale-110 transition-transform"
              >
                <img src="/Social-contact/facebook.png" alt="Facebook" className="w-full h-full object-contain" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/evergreenchh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:scale-110 transition-transform"
              >
                <img src="/Social-contact/instagram.webp" alt="Instagram" className="w-full h-full object-contain" />
              </a>

              {/* LINE */}
              <a
                href="https://bit.ly/evergreenchh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:scale-110 transition-transform"
              >
                <img src="/Social-contact/line.png" alt="LINE" className="w-full h-full object-contain" />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@evergreen_chh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:scale-110 transition-transform"
              >
                <img src="/Social-contact/tiktok.png" alt="TikTok" className="w-full h-full object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Our Products */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-brand-900 dark:text-stone-100">
            {language === 'TH' ? "สินค้าของเรา" : "Our Products"}
          </h4>
          <div className="grid grid-cols-2 gap-4 text-left">
            <ul className="space-y-3">
              {productLinks.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-stone-600 dark:text-stone-400 text-sm hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                  >
                    {language === 'TH' ? link.labelTH : link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {productLinks.slice(3).map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-stone-600 dark:text-stone-400 text-sm hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                  >
                    {language === 'TH' ? link.labelTH : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: Our Company */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-brand-900 dark:text-stone-100">
            {language === 'TH' ? "บริษัทของเรา" : "Our Company"}
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-stone-600 dark:text-stone-400 text-sm hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              >
                {language === 'TH' ? link.labelTH : link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};