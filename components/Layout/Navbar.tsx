import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const navItems = [
  { label: "OUR COMPANY", labelTH: "เกี่ยวกับเรา", path: "/our-company" },
];

const doorSubItems = [
  { label: "WPC-Door", labelTH: "WPC-Door", path: "/door", hash: "#wpc" },
  { label: "uPVC-Door", labelTH: "uPVC-Door", path: "/door", hash: "#upvc" },
  { label: "Melamine-Door", labelTH: "Melamine-Door", path: "/door", hash: "#melamine" },
];

const productItems = [
  { label: "DOOR", labelTH: "ประตู", path: "/door", hasSubmenu: true },
  { label: "DOORFRAME", labelTH: "วงกบ", path: "/doorframe" },
  { label: "FLOORING", labelTH: "พื้นไม้", path: "/flooring" },
  { label: "STAIRCASE", labelTH: "บันได", path: "/staircase" },
  { label: "WALL PANEL", labelTH: "ผนังตกแต่ง", path: "/wall-panel" },
  { label: "SERVICE SHAFT", labelTH: "ช่องชาร์ป", path: "/service-shaft" },
];

const serviceItems = [
  { label: "OEM", labelTH: "OEM", path: "/service-shaft" },
  { label: "ODM", labelTH: "ODM", path: "/service-shaft" },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleSearchClick = () => {
    setIsSearchOpen((v) => !v);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white dark:bg-stone-950 py-4 px-2 sm:px-4 md:px-8 sticky top-0 z-50 shadow-sm transition-colors duration-300 relative">

      <div className="flex items-center gap-3">

        <div
          className="flex items-center gap-0 cursor-pointer flex-shrink-0"
          onClick={() => navigate('/')}
        >
          <img
            src="/logo/logo-03.png"
            alt="Evergreen Logo"
            className="w-24 h-12 sm:w-32 sm:h-16 md:w-52 md:h-20 object-contain transition-all duration-300 -mt-1 md:-mt-2 ml-1 sm:ml-4 md:ml-8"
          />


        </div>



        <div className="hidden xl:flex items-center justify-center flex-1 min-w-0">
          <div className="flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm uppercase tracking-wide hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2 whitespace-nowrap"
              >
                {language === 'EN' ? item.label : item.labelTH}
              </Link>
            ))}

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm uppercase tracking-wide hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2 whitespace-nowrap">
                {language === 'EN' ? "PRODUCTS" : "สินค้า"}
                <ChevronDown className="w-3 h-3" />
              </button>

              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-100 dark:border-stone-800 p-2 min-w-[160px] flex flex-col gap-1">
                  {productItems.map((item) => (
                    item.hasSubmenu ? (
                      <div key={item.label} className="relative group/door">
                        <Link
                          to={item.path}
                          className="flex items-center justify-between text-xs uppercase tracking-wide px-4 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-400 hover:text-brand-500 transition-colors text-left"
                        >
                          {language === 'EN' ? item.label : item.labelTH}
                          <ChevronDown className="w-3 h-3 -rotate-90" />
                        </Link>
                        <div className="absolute left-full top-0 ml-1 opacity-0 invisible group-hover/door:opacity-100 group-hover/door:visible transition-all duration-200 z-50">
                          <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-100 dark:border-stone-800 p-2 min-w-[140px] flex flex-col gap-1">
                            {doorSubItems.map((subItem) => (
                              <Link
                                key={subItem.label}
                                to={`${subItem.path}${subItem.hash}`}
                                className="text-xs uppercase tracking-wide px-4 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-400 hover:text-brand-500 transition-colors text-left whitespace-nowrap"
                              >
                                {language === 'EN' ? subItem.label : subItem.labelTH}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="text-xs uppercase tracking-wide px-4 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-400 hover:text-brand-500 transition-colors text-left"
                      >
                        {language === 'EN' ? item.label : item.labelTH}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm uppercase tracking-wide hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2 whitespace-nowrap">
                {language === 'EN' ? "SERVICES" : "บริการ"}
                <ChevronDown className="w-3 h-3" />
              </button>

              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-100 dark:border-stone-800 p-2 min-w-[160px] flex flex-col gap-1">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="text-xs uppercase tracking-wide px-4 py-2 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-400 hover:text-brand-500 transition-colors text-left"
                    >
                      {language === 'EN' ? item.label : item.labelTH}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:gap-4 flex-shrink-0 mr-1 sm:mr-2 lg:mr-6">
          <Link
            to="/affiliate"
            className="flex items-center bg-[#FFAB40] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-wide hover:bg-[#FF9100] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <span>AFFILIATE</span>
          </Link>
          <Link
            to="/quote"
            className="flex items-center gap-1 sm:gap-2 bg-[#f37021] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-wide hover:bg-[#d65f17] transition-all duration-300 shadow-sm whitespace-nowrap"
          >
            <FileText className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
            <span className="hidden md:inline">{language === 'EN' ? 'Get Quote' : 'ขอใบเสนอราคา'}</span>
            <span className="md:hidden">{language === 'EN' ? 'Quote' : 'ขอราคา'}</span>
          </Link>
          <Link
            to="/b2b"
            className="flex items-center bg-[#78B833] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2 rounded-full text-[10px] sm:text-xs font-medium tracking-wide hover:bg-[#659e2b] transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <span>B2B</span>
          </Link>
          <button
            onClick={toggleLanguage}
            className="text-xs font-medium tracking-widest transition-colors hidden md:block"
          >
            <span className={language === 'EN' ? 'text-brand-500' : 'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300'}>
              EN
            </span>
            <span className="mx-1 text-stone-300">|</span>
            <span className={language === 'TH' ? 'text-brand-500' : 'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300'}>
              TH
            </span>
          </button>

          <div className="flex gap-2 items-center border-l border-stone-200 dark:border-stone-800 pl-4">

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:text-brand-500 text-stone-600 dark:text-stone-300 transition-colors relative z-50 xl:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>



      <div
        className={`xl:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[50vh] opacity-100 pb-8 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="flex gap-4 mb-4">
            <button onClick={toggleLanguage} className={language === 'EN' ? 'text-brand-500 font-bold' : 'text-stone-400'}>
              EN
            </button>
            <span className="text-stone-300">|</span>
            <button onClick={toggleLanguage} className={language === 'TH' ? 'text-brand-500 font-bold' : 'text-stone-400'}>
              TH
            </button>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-sm uppercase tracking-widest hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'EN' ? item.label : item.labelTH}
            </Link>
          ))}

          <div className="w-full h-px bg-stone-100 dark:bg-stone-800 my-2" />
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-2">{language === 'EN' ? "Products" : "สินค้า"}</p>

          {productItems.map((item) => (
            item.hasSubmenu ? (
              <div key={item.label} className="flex flex-col items-center">
                <Link
                  to={item.path}
                  className="text-sm uppercase tracking-widest hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'EN' ? item.label : item.labelTH}
                </Link>
                <div className="flex flex-col items-center gap-1 pl-4 border-l-2 border-brand-500/30 ml-2">
                  {doorSubItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={`${subItem.path}${subItem.hash}`}
                      className="text-xs uppercase tracking-widest hover:text-brand-500 text-stone-500 dark:text-stone-500 dark:hover:text-brand-500 transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {language === 'EN' ? subItem.label : subItem.labelTH}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm uppercase tracking-widest hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'EN' ? item.label : item.labelTH}
              </Link>
            )
          ))}
          <div className="w-full h-px bg-stone-100 dark:bg-stone-800 my-2" />
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-2">{language === 'EN' ? "Services" : "บริการ"}</p>

          {serviceItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-sm uppercase tracking-widest hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'EN' ? item.label : item.labelTH}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
