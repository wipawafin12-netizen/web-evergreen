import React from 'react';
import { Button } from '../UI/Button';
import { ButtonVariant } from '../../types';

export const ProductGridSection: React.FC = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 py-20 bg-stone-50/50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Image Grid */}
        <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-8">
          <div className="flex flex-col gap-4 mt-12">
             <div className="aspect-[3/4] bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img 
                  src="https://picsum.photos/seed/doorwood/400/600" 
                  alt="Oak Timber Door" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <div className="flex flex-col gap-4">
             <div className="aspect-[3/4] bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img 
                  src="https://picsum.photos/seed/smartlock/400/600" 
                  alt="Modern Entryway" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:col-span-5 md:pl-12 space-y-8 text-center md:text-right">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-900 leading-tight">
            New products <br />
            for the <span className="text-brand-500">modern home</span>
          </h2>
          
          <p className="text-stone-500 text-xs md:text-sm leading-relaxed max-w-md ml-auto">
            EVERGREEN Series 04 is a new product line from our sustainable timber collection. 
            A care ritual filled with the strength and warmth of ancient traditions, 
            crafted for contemporary security needs.
            <br /><br />
            Silence / 45dB rating. Moments free from outside noise. An opportunity to find 
            calm within your home in the hustle and bustle of everyday life.
          </p>

          <div className="pt-4 flex justify-center md:justify-end">
            <Button 
              variant={ButtonVariant.PRIMARY} // Orange button here as requested in prompt "clean, minimal, orange/white"
              onClick={() => alert("Opening Shop Page")}
            >
              Shop now
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};