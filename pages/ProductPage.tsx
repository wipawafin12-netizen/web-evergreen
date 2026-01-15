import React from 'react';

export type PageTheme = 'minimal-white' | 'dark-split' | 'gallery-grid';

interface ProductPageProps {
    title: string;
    subtitle?: string;
    theme: PageTheme;
}

export const ProductPage: React.FC<ProductPageProps> = ({ title, subtitle, theme }) => {

    
    const RenderMinimalWhite = () => (
        <div className="bg-white min-h-screen text-brand-900 pt-12 pb-24">
          
            <div className="container mx-auto px-6 text-center mb-24">
                <h1 className="text-2xl md:text-4xl font-serif mb-6 tracking-tight text-brand-900">{title.toLowerCase()}.</h1>
                <div className="flex justify-center gap-8 text-sm uppercase tracking-widest text-stone-400">
                    <span>New</span>
                    <span>Best Sellers</span>
                    <span>Collection</span>
                </div>
            </div>

            
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="max-w-md mx-auto md:mx-0">
                    <h2 className="text-3xl font-serif mb-6 leading-tight">
                        Designed with a degree in <br /> <span className="italic text-stone-500">philosophy</span>
                    </h2>
                    <p className="text-stone-600 text-sm leading-relaxed mb-8">
                        Minimalism has become part of our philosophy. This is not a tribute to fashion, but a conscious decision.
                        We know that how a product looks is as important as how it feels.
                    </p>
                    <button className="bg-stone-100 text-brand-900 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-stone-200 transition-colors">
                        Discover
                    </button>
                </div>
                <div className="relative">
                    <div className="aspect-[4/5] bg-stone-50 rounded-lg overflow-hidden relative">
                        
                        <div className="absolute inset-0 flex items-center justify-center text-stone-200 font-serif text-9xl opacity-20">
                            {title[0]}
                        </div>
                        <img
                            src={`/api/placeholder/600/800`}
                            alt={title}
                            className="object-cover w-full h-full opacity-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                    </div>
                  
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl max-w-xs hidden md:block">
                        <p className="font-serif italic text-lg">"The perfect balance."</p>
                    </div>
                </div>
            </div>

          
            <div className="container mx-auto px-6">
                <h3 className="text-center font-serif text-2xl mb-12">Latest in {title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="bg-stone-50 aspect-square mb-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-stone-100 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-stone-300">Product {i}</div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-sm">Series {String.fromCharCode(64 + i)}</h4>
                                    <p className="text-xs text-stone-500 mt-1">Premium Grade</p>
                                </div>
                                <span className="text-sm font-serif">$890</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    
    const RenderDarkSplit = () => (
        <div className="min-h-screen bg-stone-50">
          
            <div className="flex flex-col md:flex-row h-screen max-h-[900px]">
              
                <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-white z-10">
                    <div>
                        <div className="w-8 h-8 border border-stone-800 mb-8"></div>
                        <h1 className="text-2xl md:text-4xl font-bold text-brand-900 mb-8 leading-[0.9]">
                            Talking about <br /> {title.toLowerCase()}.
                        </h1>
                        <p className="text-stone-500 max-w-sm mb-12 text-sm leading-relaxed">
                            It is a social lubricant or a dangerous stimulant? explore our collection of premium {title.toLowerCase()}s designed for modern living.
                        </p>
                        <a href="#collection" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors">
                            Show Collection
                        </a>

                        <div className="flex gap-8 mt-24 text-[10px] uppercase tracking-wider text-stone-400">
                            <span>Modern</span>
                            <span>Classic</span>
                            <span>Minimal</span>
                        </div>
                    </div>
                </div>

               
                <div className="w-full md:w-1/2 bg-stone-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#1a1a1a]"></div>
                   
                    <div className="w-64 h-64 border border-white/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="w-96 h-96 border border-white/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10 text-white/90 text-center">
                        <h2 className="text-9xl font-serif opacity-20">{title[0]}</h2>
                    </div>
                </div>
            </div>

           
            <div id="collection" className="bg-white py-32 px-6">
                <div className="container mx-auto">
                    <h3 className="text-brand-900 font-serif text-3xl mb-16">Signature Selection.</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-stone-50 p-12 group hover:shadow-lg transition-all duration-500 relative overflow-hidden text-center">
                                <div className="aspect-[3/4] bg-white mb-8 flex items-center justify-center relative z-10 shadow-sm group-hover:-translate-y-2 transition-transform duration-500">
                                    <span className="text-stone-300 text-6xl font-serif">{i}</span>
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-brand-900 font-mono text-lg mb-2">The {title} {i}</h4>
                                    <p className="text-stone-500 text-xs tracking-widest uppercase">Select Edition</p>
                                    <div className="mt-4 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1 h-1 bg-stone-800 rounded-full"></div>
                                        <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                        <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
            <div className="container mx-auto py-32 px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-4xl font-bold mb-6">The House Blend.</h3>
                        <p className="text-stone-500 mb-8 leading-relaxed text-sm">
                            Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum.
                            Specialized {title.toLowerCase()} construction ensures longevity and style.
                        </p>
                        <a href="#" className="text-xs font-bold uppercase underline">Read More</a>
                    </div>
                    <div className="w-full md:w-1/2 bg-white p-8 shadow-2xl relative">
                        <div className="aspect-square bg-stone-100 flex items-center justify-center">
                            <span className="text-brand-900 font-serif italic text-2xl">{title} Feature</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const RenderGalleryGrid = () => (
        <div className="min-h-screen bg-brand-50/30">
            <div className="pt-32 pb-12 px-6 md:px-12">
                <h1 className="text-9xl font-serif text-brand-900 opacity-10 -ml-4 pointer-events-none absolute top-20 select-none">
                    {title.toUpperCase()}
                </h1>
                <div className="flex justify-between items-end mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-medium">{title} Collection</h2>
                    <p className="text-stone-500 max-w-xs text-right hidden md:block">
                        Explore our curated selection of fine {title.toLowerCase()} materials.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    
                    <div className="md:col-span-2 md:row-span-2 bg-stone-200 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-stone-800/10 group-hover:bg-stone-800/0 transition-colors"></div>
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl font-serif text-brand-900">Premium Oak</h3>
                        </div>
                    </div>
                    <div className="bg-stone-300 relative group overflow-hidden">
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-lg font-medium">Teak</h3>
                        </div>
                    </div>
                    <div className="bg-stone-100 relative group overflow-hidden flex items-center justify-center p-6 text-center">
                        <div>
                            <h3 className="text-xl font-serif mb-2">Custom Dimensions</h3>
                            <p className="text-xs text-stone-500">Tailored to your needs</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-stone-900 text-white p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-serif italic mb-4">"Structure meets Art"</h3>
                        <p className="text-white/60 text-sm">Redefining spaces with our {title.toLowerCase()} panels.</p>
                    </div>
                    <div className="bg-stone-200 relative group overflow-hidden"></div>
                    <div className="bg-stone-300 relative group overflow-hidden"></div>
                </div>
            </div>
        </div>
    );

   
    switch (theme) {
        case 'minimal-white':
            return <RenderMinimalWhite />;
        case 'dark-split':
            return <RenderDarkSplit />;
        case 'gallery-grid':
            return <RenderGalleryGrid />;
        default:
            return <RenderMinimalWhite />;
    }
};
