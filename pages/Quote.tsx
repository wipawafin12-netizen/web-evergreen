import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const Quote: React.FC = () => {
    const { language } = useLanguage();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you would typically send the data to a backend
        setTimeout(() => setSubmitted(false), 5000);
    };

    const labels = {
        title: language === 'EN' ? "Request a Quotation" : "ขอใบเสนอราคา",
        subtitle: language === 'EN' ? "Tell us about your project and we'll get back to you with a personalized quote." : "บอกรายละเอียดโครงการของคุณให้เราทราบ ทางเราจะติดต่อกลับพร้อมใบเสนอราคาโดยเร็วที่สุด",
        name: language === 'EN' ? "Full Name" : "ชื่อ-นามสกุล",
        phone: language === 'EN' ? "Phone Number" : "เบอร์โทรศัพท์",
        email: language === 'EN' ? "Email Address" : "อีเมล",
        product: language === 'EN' ? "Interested Product" : "สินค้าที่สนใจ",
        message: language === 'EN' ? "Additional Details / Measurements" : "รายละเอียดเพิ่มเติม / ขนาดพื้นที่",
        send: language === 'EN' ? "Send Request" : "ส่งคำขอใบเสนอราคา",
        success: language === 'EN' ? "Thank you! We have received your request." : "ขอบคุณครับ เราได้รับข้อมูลของท่านแล้ว",
        products: [
            { en: "Door", th: "ประตู" },
            { en: "Doorframe", th: "วงกบ" },
            { en: "Flooring", th: "พื้นไม้" },
            { en: "Staircase", th: "บันได" },
            { en: "Wall Panel", th: "ผนังตกแต่ง" },
            { en: "Service Shaft", th: "ช่องชาร์ป" }
        ]
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-24 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Left Col: Info */}
                <div className="space-y-8 animate-fade-in-up">
                    <div>
                        <span className="text-brand-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
                            {language === 'EN' ? "Contact Us" : "ติดต่อเรา"}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-stone-100 leading-tight">
                            {labels.title}
                        </h1>
                        <p className="mt-6 text-stone-600 dark:text-stone-400 leading-relaxed text-sm max-w-lg">
                            {labels.subtitle}
                        </p>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Phone</h3>
                                <p className="text-stone-600 dark:text-stone-400">+66 2 123 4567</p>
                                <p className="text-stone-500 text-sm">Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Email</h3>
                                <p className="text-stone-600 dark:text-stone-400">sales@evergreen-doors.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Office</h3>
                                <p className="text-stone-600 dark:text-stone-400 max-w-xs">
                                    123 Woodwork Street, Bangna,<br />
                                    Bangkok 10260, Thailand
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Form */}
                <div className="bg-white dark:bg-stone-950 p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 animate-fade-in-up delay-100">
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-900 dark:text-stone-100">Success!</h3>
                            <p className="text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                                {labels.success}
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-8 text-sm text-brand-500 font-bold hover:underline"
                            >
                                Send another request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {labels.name}
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder={language === 'EN' ? "John Doe" : "ชื่อผู้ติดต่อ"}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                        {labels.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        placeholder="08X-XXX-XXXX"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                        {labels.email}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {labels.product}
                                </label>
                                <select
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                                    required
                                >
                                    <option value="" disabled selected>{language === 'EN' ? "Select a product..." : "เลือกสินค้า..."}</option>
                                    {labels.products.map(p => (
                                        <option key={p.en} value={p.en}>
                                            {language === 'EN' ? p.en : p.th}
                                        </option>
                                    ))}
                                    <option value="Other">{language === 'EN' ? "Other / Multiple" : "อื่นๆ / หลายรายการ"}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {language === 'EN' ? "Attach File" : "แนบไฟล์"}
                                </label>
                                <input
                                    type="file"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-stone-800 dark:file:text-stone-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {labels.message}
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
                                    placeholder={language === 'EN' ? "Please describe your requirements..." : "ระบุรายละเอียด ขนาด หรือจำนวนที่ต้องการ..."}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-900 dark:bg-stone-100 text-white dark:text-brand-900 font-bold py-4 rounded-lg hover:bg-brand-800 dark:hover:bg-white/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 group"
                            >
                                <span>{labels.send}</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
