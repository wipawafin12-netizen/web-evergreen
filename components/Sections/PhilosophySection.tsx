import React from 'react';
import { Button } from '../UI/Button';
import { ButtonVariant } from '../../types';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="container mx-auto px-6 md:px-12 py-20">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        
        {/* Text Content */}
        <div className="md:w-1/3 space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-900 leading-tight">
            Security with a degree in <span className="italic text-brand-500">design.</span>
          </h2>
          
          <div className="space-y-6 text-stone-600 text-sm leading-relaxed">
            <p className="font-medium text-stone-900">
              Minimalism has become part of The Evergreen philosophy.
            </p>
            <p>
              This is not just a tribute to fashion, but a conscious decision. 
              We know that how a door feels when you open it is just as important 
              as how it looks. Solid wood cores meeting brushed aluminum details.
            </p>
          </div>

          <div className="pt-4">
            <Button 
              variant={ButtonVariant.SECONDARY}
              onClick={() => alert("Navigating to Philosophy Page")}
            >
              Discover
            </Button>
          </div>
        </div>

        {/* Image Content */}
        <div className="md:w-2/3 relative flex justify-center">
             {/* Abstract minimalist product shot */}
             <div className="relative">
                <img 
                  src="https://picsum.photos/seed/doorhandle/600/600" 
                  alt="Minimalist Door Handle Detail" 
                  className="object-cover w-full max-w-md grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
                />
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-50 rounded-full -z-10 blur-xl opacity-70"></div>
             </div>
        </div>
      </div>
    </section>
  );
};