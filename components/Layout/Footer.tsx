import React from 'react';
import { MessageCircle, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const productLinks = [
    { label: "Door", path: "/door" },
    { label: "Doorframe", path: "/doorframe" },
    { label: "Service Shaft", path: "/service-shaft" },
    { label: "Flooring", path: "/flooring" },
    { label: "Staircase", path: "/staircase" },
    { label: "Wall Panel", path: "/wall-panel" },
  ];

  const companyLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Our Certificate", path: "/certificates" },
    { label: "Jobs", path: "/jobs" },
  ];

  return (
    <footer className="bg-white pt-16 pb-12 px-6 md:px-12 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">

        {/* Column 1: Logo */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            {/* Logo Icon approximation */}
            <div className="bg-stone-800 text-white p-1 rounded-sm">
              <DoorOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-sans tracking-[0.2em] text-stone-800 font-bold uppercase">EVERGREEN</span>
          </div>
        </div>

        {/* Column 2: Our Products */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-brand-900">Our Products</h4>
          <ul className="space-y-3">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-stone-600 text-sm hover:text-brand-500 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Our Company */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-brand-900">Our Company</h4>
          <ul className="space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="text-stone-600 text-sm hover:text-brand-500 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Helper Text & Add Friend */}
        <div className="space-y-6">
          <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
            We'll help you select the perfect materials that meet your aesthetic preferences, budget, and timeline.
          </p>

          <div className="flex items-center gap-2">
            <button className="bg-[#00B900] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 hover:bg-[#009900] transition-colors shadow-sm">
              <MessageCircle className="w-4 h-4 fill-current" />
              Add friend
            </button>
            <div className="bg-stone-100 text-stone-500 text-[10px] px-2 py-1 rounded relative border border-stone-200">
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-stone-100 border-l border-b border-stone-200 transform rotate-45"></span>
              277
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};