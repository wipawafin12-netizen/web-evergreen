import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const navItems = [
  { label: "OUR COMPANY", labelTH: "เกี่ยวกับเรา", path: "/our-company" },
  { label: "DOOR", labelTH: "ประตู", path: "/door" },
  { label: "DOORFRAME", labelTH: "วงกบ", path: "/doorframe" },
  { label: "SERVICE SHAFT", labelTH: "ช่องชาร์ป", path: "/service-shaft" },
  { label: "FLOORING", labelTH: "พื้นไม้", path: "/flooring" },
  { label: "STAIRCASE", labelTH: "บันได", path: "/staircase" },
  { label: "WALL PANEL", labelTH: "ผนังตกแต่ง", path: "/wall-panel" },
  { label: "SERVICES", labelTH: "บริการ", path: "/services" },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleIconClick = (action: string) => {
    if (action === 'Search') {
      setIsSearchOpen(!isSearchOpen);
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-stone-950 pt-6 px-6 md:px-12 sticky top-0 z-50 shadow-sm transition-colors duration-300 relative">

      <div className="flex justify-between items-center mb-6">


        <div
          className="flex items-center gap-2 md:gap-4 cursor-pointer"
          onClick={() => navigate('/')}
        >

          <img
            src="public/โลโก้ส้ม2.png"
            alt="Evergreen Logo"
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />

          <div>
            <h1 className="text-2xl md:text-5xl font-serif tracking-tight text-brand-900 dark:text-stone-100 leading-none">
              EVERGREEN<span className="text-brand-500">.</span>
            </h1>
            <p className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-1 font-serif italic tracking-widest uppercase">
              Door Products
            </p>
          </div>
        </div>


        <div className="flex gap-4 md:gap-6 items-center">


          <button
            onClick={toggleLanguage}
            className="text-xs font-medium tracking-widest transition-colors hidden md:block"
          >
            <span className={language === 'EN' ? 'text-brand-500' : 'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300'}>EN</span>
            <span className="mx-1 text-stone-300">|</span>
            <span className={language === 'TH' ? 'text-brand-500' : 'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300'}>TH</span>
          </button>

          <div className="flex gap-2 items-center border-l border-stone-200 dark:border-stone-800 pl-4 md:pl-6">

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 md:p-2 hover:text-brand-500 text-stone-600 dark:text-stone-300 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            <button onClick={() => handleIconClick('Search')} className={`p-1 md:p-2 hover:text-brand-500 transition-colors ${isSearchOpen ? 'text-brand-500' : 'text-stone-600 dark:text-stone-300'}`}>
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 md:p-2 hover:text-brand-500 text-stone-600 dark:text-stone-300 transition-colors relative z-50 md:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>


      <div className={`absolute left-0 top-full w-full bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 transition-all duration-300 overflow-hidden ${isSearchOpen ? 'max-h-32 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-stone-50 dark:bg-stone-800 border-none rounded-full py-3 px-6 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-brand-500 placeholder-stone-400"
              autoFocus={isSearchOpen}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-brand-500">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>


      <div className="hidden md:flex flex-wrap justify-center gap-6 md:gap-12 mt-4 pb-4 border-t border-transparent">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="text-xs uppercase tracking-widest hover:text-brand-500 text-stone-600 dark:text-stone-400 dark:hover:text-brand-500 transition-colors py-2"
          >
            {language === 'EN' ? item.label : item.labelTH}
          </Link>
        ))}
      </div>


      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
        }`}>
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">

          <div className="flex gap-4 mb-4">
            <button onClick={() => toggleLanguage()} className={language === 'EN' ? 'text-brand-500 font-bold' : 'text-stone-400'}>EN</button>
            <span className="text-stone-300">|</span>
            <button onClick={() => toggleLanguage()} className={language === 'TH' ? 'text-brand-500 font-bold' : 'text-stone-400'}>TH</button>
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
        </div>
      </div>
    </nav>
  );
};
