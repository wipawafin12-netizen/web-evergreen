import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const settings = useSettings();
  const productLinks = [
    { label: "Door", labelTH: "ประตู", path: "/door" },
    { label: "Doorframe", labelTH: "วงกบ", path: "/doorframe" },
    { label: "Service Shaft", labelTH: "ช่องชาร์ป", path: "/service-shaft" },
    { label: "Flooring", labelTH: "พื้นไม้", path: "/flooring" },
    { label: "Staircase", labelTH: "บันได", path: "/staircase" },
    { label: "Wall Panel", labelTH: "ผนังตกแต่ง", path: "/wall-panel" },
  ];


  return (
    <footer className="bg-white dark:bg-stone-950  pb-12 px-6 md:px-12 mt-4 transition-colors duration-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">

        {/* Column 1: Logo */}
        <div className="flex flex-col items-start gap-2 -mt-10">
          <div className="flex items-center gap-0.5">

            <img
              src="/logo/logo-03.webp"
              alt="Evergreen Logo"
              className="w-52 h-32 object-contain block dark:hidden"
            />

          </div>

          <div className="-mt-4 space-y-6">
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed max-w-xs">
              {language === 'TH' ? settings.address_th : settings.address_en}<br />
              {language === 'TH' ? 'โทร' : 'Tel'} : {settings.phone_office} ({language === 'TH' ? 'ออฟฟิศ' : 'Office'})<br />
              {language === 'TH' ? 'โทร' : 'Tel'} : {settings.phone_sales} ({language === 'TH' ? 'ฝ่ายขาย' : 'Sales'})
            </p>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:scale-110 transition-transform"
                >
                  <img src="/Social-contact/facebook.webp" alt="Facebook" className="w-full h-full object-contain" />
                </a>
              )}

              {/* Instagram */}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:scale-110 transition-transform"
                >
                  <img src="/Social-contact/instagram.webp" alt="Instagram" className="w-full h-full object-contain" />
                </a>
              )}

              {/* LINE */}
              {settings.line && (
                <a
                  href={settings.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:scale-110 transition-transform"
                >
                  <img src="/Social-contact/line.webp" alt="LINE" className="w-full h-full object-contain" />
                </a>
              )}

              {/* TikTok */}
              {settings.tiktok && (
                <a
                  href={settings.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:scale-110 transition-transform"
                >
                  <img src="/Social-contact/tiktok.webp" alt="TikTok" className="w-full h-full object-contain" />
                </a>
              )}
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


      </div>

      <div className="container mx-auto mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-400 dark:text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} Evergreen. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/news" className="hover:text-brand-500 transition-colors">
            {language === 'TH' ? "ข่าวสาร" : "News"}
          </Link>
          <Link to="/catalog" className="hover:text-brand-500 transition-colors">
            {language === 'TH' ? "แคตตาล็อก" : "Catalog"}
          </Link>
          <Link to="/login" className="hover:text-brand-500 transition-colors">
            {language === 'TH' ? "ผู้ดูแลระบบ" : "Admin"}
          </Link>
        </div>
      </div>
    </footer>
  );
};