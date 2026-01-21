import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote, ArrowUpRight, Plus, Facebook, Instagram, Phone, Leaf, Users, ShieldCheck } from 'lucide-react';

export const B2B: React.FC = () => {
    const { t } = useLanguage();
    const [activeSpot, setActiveSpot] = useState<number | null>(null);

    const testimonials = [
        {
            text: "Lyght Living provided modern, ergonomic solutions that perfectly matched our office needs.",
            name: "Michael Thompson",
            location: "London, UK",
            initials: "MT",
            color: "bg-blue-100 text-blue-800"
        },
        {
            text: "Renting allowed us to furnish beautifully without long-term commitments.",
            name: "Elena Rossi",
            location: "Milan, Italy",
            initials: "ER",
            color: "bg-orange-100 text-orange-800"
        },
        {
            text: "The entire process from selection to delivery was smooth. I recommend Lyght Living to anyone",
            name: "Sofia Martinez",
            location: "Madrid, Spain",
            initials: "SM",
            color: "bg-green-100 text-green-800"
        }
    ];


    const row1Brands = [
        { id: 1, name: "Client 1", src: "public/Brand Customer/b1.png" },
        { id: 2, name: "Client 2", src: "public/Brand Customer/b2.png" },
        { id: 3, name: "Client 3", src: "public/Brand Customer/b3.png" },
        { id: 4, name: "Client 4", src: "public/Brand Customer/b4.png" },
        { id: 5, name: "Client 5", src: "public/Brand Customer/b5.png" },
        { id: 6, name: "Client 6", src: "public/Brand Customer/b6.png" },
        { id: 7, name: "Client 7", src: "public/Brand Customer/b7.png" },
        { id: 8, name: "Client 8", src: "public/Brand Customer/b8.png" },
        { id: 9, name: "Client 9", src: "public/Brand Customer/b9.png" },
        { id: 10, name: "Client 10", src: "public/Brand Customer/b10.png" },
        { id: 11, name: "Client 11", src: "public/Brand Customer/b11.png" },
        { id: 12, name: "Client 12", src: "public/Brand Customer/b12.png" },
        { id: 13, name: "Client 13", src: "public/Brand Customer/b13.png" },
        { id: 14, name: "Client 14", src: "public/Brand Customer/b14.png" },
        { id: 15, name: "Client 15", src: "public/Brand Customer/b15.png" },
        { id: 16, name: "Client 16", src: "public/Brand Customer/b16.png" },
        { id: 17, name: "Client 17", src: "public/Brand Customer/b17.png" },
        { id: 18, name: "Client 18", src: "public/Brand Customer/b18.png" },
        { id: 19, name: "Client 19", src: "public/Brand Customer/b19.png" },
        { id: 20, name: "Client 20", src: "public/Brand Customer/b20.png" },
        { id: 21, name: "Client 21", src: "public/Brand Customer/b21.png" },
        { id: 22, name: "Client 22", src: "public/Brand Customer/b22.png" },
        { id: 23, name: "Client 23", src: "public/Brand Customer/b23.png" },
        { id: 24, name: "Client 24", src: "public/Brand Customer/b24.png" },
        { id: 25, name: "Client 25", src: "public/Brand Customer/b25.png" },
        { id: 26, name: "Client 26", src: "public/Brand Customer/b26.png" },
        { id: 27, name: "Client 27", src: "public/Brand Customer/b27.png" },
    ];

    const row2Brands = [
        { id: 1, name: "Client 1", src: "public/Brand Customer2/b1.png" },
        { id: 2, name: "Client 2", src: "public/Brand Customer2/b2.png" },
        { id: 3, name: "Client 3", src: "public/Brand Customer2/b3.png" },
        { id: 4, name: "Client 4", src: "public/Brand Customer2/b4.png" },
        { id: 5, name: "Client 5", src: "public/Brand Customer2/b5.png" },
        { id: 6, name: "Client 6", src: "public/Brand Customer2/b6.png" },
        { id: 7, name: "Client 7", src: "public/Brand Customer2/b7.png" },
        { id: 8, name: "Client 8", src: "public/Brand Customer2/b8.png" },
        { id: 9, name: "Client 9", src: "public/Brand Customer2/b9.png" },
        { id: 10, name: "Client 10", src: "public/Brand Customer2/b10.png" },
        { id: 11, name: "Client 11", src: "public/Brand Customer2/b11.png" },
        { id: 12, name: "Client 12", src: "public/Brand Customer2/b12.png" },
        { id: 13, name: "Client 13", src: "public/Brand Customer2/b13.png" },
        { id: 14, name: "Client 14", src: "public/Brand Customer2/b14.png" },
        { id: 15, name: "Client 15", src: "public/Brand Customer2/b15.png" },
        { id: 16, name: "Client 16", src: "public/Brand Customer2/b16.png" },
        { id: 17, name: "Client 17", src: "public/Brand Customer2/b17.png" },
        { id: 18, name: "Client 18", src: "public/Brand Customer2/b18.png" },
        { id: 19, name: "Client 19", src: "public/Brand Customer2/b19.png" },
        { id: 20, name: "Client 20", src: "public/Brand Customer2/b20.png" },
        { id: 21, name: "Client 21", src: "public/Brand Customer2/b21.png" },
        { id: 22, name: "Client 22", src: "public/Brand Customer2/b22.png" },
        { id: 23, name: "Client 23", src: "public/Brand Customer2/b23.png" },
        { id: 24, name: "Client 24", src: "public/Brand Customer2/b24.png" },
        { id: 25, name: "Client 25", src: "public/Brand Customer2/b25.png" },
        { id: 26, name: "Client 26", src: "public/Brand Customer2/b26.png" },
        { id: 27, name: "Client 27", src: "public/Brand Customer2/b27.png" },
        { id: 28, name: "Client 28", src: "public/Brand Customer2/b28.png" },
        { id: 29, name: "Client 29", src: "public/Brand Customer2/b29.png" },

    ];

    const row3Brands = [
        { id: 1, name: "Client 1", src: "public/Brand Costomer3/b1.png" },
        { id: 2, name: "Client 2", src: "public/Brand Costomer3/b2.png" },
        { id: 3, name: "Client 3", src: "public/Brand Costomer3/b3.png" },
        { id: 4, name: "Client 4", src: "public/Brand Costomer3/b4.png" },
        { id: 5, name: "Client 5", src: "public/Brand Costomer3/b5.png" },
        { id: 6, name: "Client 6", src: "public/Brand Costomer3/b6.png" },
        { id: 7, name: "Client 7", src: "public/Brand Costomer3/b7.png" },
        { id: 8, name: "Client 8", src: "public/Brand Costomer3/b8.png" },
        { id: 9, name: "Client 9", src: "public/Brand Costomer3/b9.png" },
        { id: 10, name: "Client 10", src: "public/Brand Costomer3/b10.png" },
        { id: 11, name: "Client 11", src: "public/Brand Costomer3/b11.png" },
        { id: 12, name: "Client 12", src: "public/Brand Costomer3/b12.png" },
        { id: 13, name: "Client 13", src: "public/Brand Costomer3/b13.png" },
        { id: 14, name: "Client 14", src: "public/Brand Costomer3/b14.png" },
        { id: 15, name: "Client 15", src: "public/Brand Costomer3/b15.png" },
        { id: 16, name: "Client 16", src: "public/Brand Costomer3/b16.png" },
        { id: 17, name: "Client 17", src: "public/Brand Costomer3/b17.png" },

    ];


    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">


                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm font-medium text-stone-400 uppercase tracking-widest">Testimonial</span>
                            <div className="h-px w-12 bg-stone-300"></div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-sans font-bold uppercase tracking-widest text-stone-900 dark:text-stone-50 leading-tight">
                            B2B<br />
                        </h1>
                    </div>


                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-stone-900 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${item.color}`}>
                                    {item.initials}
                                </div>
                                <Quote className="w-8 h-8 text-[#E64A19] opacity-20 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8 min-h-[100px]">
                                "{item.text}"
                            </p>

                            <div className="border-t border-stone-100 dark:border-stone-800 pt-6">
                                <h4 className="font-bold text-stone-900 dark:text-stone-100">{item.name}</h4>
                                <p className="text-sm text-stone-400">{item.location}</p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mb-24 h-[600px] group">
                    <img
                        src="public/Ins1.png"
                        alt="Interior Showcase"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />


                    <div className="absolute top-8 right-8 flex gap-3">
                        <span className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/20">
                            Living Room Sets
                        </span>
                        <span className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/20">
                            Timeless Design
                        </span>
                        <span className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/20">
                            Interior
                        </span>
                    </div>


                    <button
                        className="absolute top-[60%] left-[30%] w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all transform hover:scale-110"
                        onClick={() => setActiveSpot(activeSpot === 1 ? null : 1)}
                    >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {activeSpot === 1 && (
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-stone-900 text-xs py-1 px-3 rounded-lg shadow-lg whitespace-nowrap animate-pulse">
                                Comfort Armchair
                            </div>
                        )}
                    </button>

                    <button
                        className="absolute top-[40%] right-[40%] w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all transform hover:scale-110"
                        onClick={() => setActiveSpot(activeSpot === 2 ? null : 2)}
                    >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        {activeSpot === 2 && (
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-stone-900 text-xs py-1 px-3 rounded-lg shadow-lg whitespace-nowrap animate-pulse">
                                Minimalist Lamp
                            </div>
                        )}
                    </button>
                </div>

                {/* ESG Section */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-4">Sustainability</span>
                        <h2 className="text-2xl md:text-4xl font-sans font-bold uppercase tracking-widest text-stone-900 dark:text-stone-50">ESG Strategy</h2>
                        <p className="mt-4 text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-lg">
                            We are committed to sustainable growth through responsible environmental practices, social awareness, and strong governance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Environment */}
                        <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-emerald-500 group">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-6">Environment</h3>
                            <ul className="space-y-4">
                                {["Climate Change Strategy", "Green Building Standards", "Reduced Carbon Emissions", "Biodiversity Protection"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-orange-400 group">
                            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-8 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-6">Social</h3>
                            <ul className="space-y-4">
                                {["Diversity & Inclusion", "Human Rights", "Health & Safety", "Community Engagement"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Governance */}
                        <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 group">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-6">Governance</h3>
                            <ul className="space-y-4">
                                {["Risk Mitigation", "Board Independence", "Anti-Bribery & Corruption", "Data Privacy & Security"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Client Brands Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="text-sm font-medium text-stone-400 uppercase tracking-widest block mb-4">Trusted By</span>
                        <h2 className="text-2xl md:text-4xl font-sans font-bold uppercase tracking-widest text-stone-900 dark:text-stone-50">Leading Companies</h2>
                    </div>

                    {/* Scrolling Logos */}
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

                    <div className="flex flex-col gap-16">
                        {/* Row 1 - Our Clients Developer */}
                        <div>
                            <h3 className="text-center text-lg md:text-xl font-sans font-bold uppercase tracking-widest text-stone-600 dark:text-stone-300 mb-6">Our Clients Developer</h3>
                            <div className="relative overflow-hidden w-full">
                                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="flex gap-8 items-center animate-scroll w-max">
                                    {[...row1Brands, ...row1Brands].map((brand, i) => (
                                        <div key={i} className="flex-shrink-0 w-72 h-48 flex items-center justify-center p-8 border border-stone-100 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 mx-2 hover:shadow-md transition-all">
                                            <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Row 2 - Main Contractor */}
                        <div>
                            <h3 className="text-center text-lg md:text-xl font-sans font-bold uppercase tracking-widest text-stone-600 dark:text-stone-300 mb-6">Main Contractor</h3>
                            <div className="relative overflow-hidden w-full">
                                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="flex gap-8 items-center animate-scroll-reverse w-max">
                                    {[...row2Brands, ...row2Brands].map((brand, i) => (
                                        <div key={i} className="flex-shrink-0 w-72 h-48 flex items-center justify-center p-8 border border-stone-100 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 mx-2 hover:shadow-md transition-all">
                                            <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Row 3 - Hotel & Service Apartment */}
                        <div>
                            <h3 className="text-center text-lg md:text-xl font-sans font-bold uppercase tracking-widest text-stone-600 dark:text-stone-300 mb-6">Hotel & Service Apartment</h3>
                            <div className="relative overflow-hidden w-full">
                                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#FDFBF7] dark:from-stone-950 to-transparent z-10"></div>
                                <div className="flex gap-8 items-center animate-scroll w-max">
                                    {[...row3Brands, ...row3Brands].map((brand, i) => (
                                        <div key={i} className="flex-shrink-0 w-72 h-48 flex items-center justify-center p-8 border border-stone-100 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 mx-2 hover:shadow-md transition-all">
                                            <img src={brand.src} alt={brand.name} className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    );
};
