import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const Quote: React.FC = () => {
    const { language, t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = (formData.get('fullName') as string) || '';
        const phoneNumber = (formData.get('phoneNumber') as string) || '';
        const emailAddress = (formData.get('emailAddress') as string) || '';
        const product = (formData.get('product') as string) || '';
        const documents = formData.getAll('documents').join(', ');
        const message = (formData.get('message') as string) || '';

        const subject = `ขอใบเสนอราคา - ${fullName || 'ลูกค้าใหม่'}`;
        const body = [
            `ชื่อ-นามสกุล: ${fullName}`,
            `เบอร์โทรศัพท์: ${phoneNumber}`,
            `อีเมล: ${emailAddress}`,
            `สินค้าที่สนใจ: ${product}`,
            `เอกสารที่ต้องการ: ${documents || '-'}`,
            '',
            'รายละเอียดเพิ่มเติม:',
            message || '-',
        ].join('\n');

        const mailtoUrl = `mailto:mkt.evergreenchh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;

        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    const labels = {
        title: language === 'EN' ? "Request a Quotation" : "ขอใบเสนอราคา",
        subtitle: language === 'EN' ? "Tell us about your project and we'll get back to you with a personalized quote." : "บอกรายละเอียดโครงการของคุณให้เราทราบ ทางเราจะติดต่อกลับพร้อมใบเสนอราคาโดยเร็วที่สุด",
        name: language === 'EN' ? "Full Name" : "ชื่อ-นามสกุล",
        phone: language === 'EN' ? "Phone Number" : "เบอร์โทรศัพท์",
        email: language === 'EN' ? "Email Address" : "อีเมล",
        product: language === 'EN' ? "Interested Product" : "สินค้าที่สนใจ",
        message: language === 'EN' ? "Additional Details" : "รายละเอียดเพิ่มเติม",
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
                    </div>

                    <div className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Phone aria-hidden="true" className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Phone</h3>
                                <p className="text-stone-600 dark:text-stone-400">02-921-9979 ({language === 'EN' ? 'Office' : 'ออฟฟิศ'})</p>
                                <p className="text-stone-600 dark:text-stone-400">062-539-9980 ({language === 'EN' ? 'Sales' : 'ฝ่ายขาย'})</p>
                                <p className="text-stone-500 text-sm">{language === 'EN' ? 'Mon-Fri 8:30am - 4:30pm' : 'จันทร์-ศุกร์ 8:30 - 16:30 น.'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Mail aria-hidden="true" className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Email</h3>
                                <p className="text-stone-600 dark:text-stone-400">mkt.evergreenchh@gmail.com</p>
                            </div>
                        </div>

                        <a
                            href="https://www.google.com/maps/dir//C.H.H.+Industry+Co.,Ltd.,+%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B8%99-%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%AB%E0%B8%A5%E0%B8%B8%E0%B8%A1%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7+Khun+Sri,+Sai+Noi+District,+Nonthaburi+11150/@14.0319444,100.2712406,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x30e28adec3a30e19:0x6326176a208413a1!2m2!1d100.2711857!2d14.0235876?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={language === 'EN' ? 'View office location on map' : 'ดูที่อยู่สำนักงานบนแผนที่'}
                            className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                        >
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <MapPin aria-hidden="true" className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Office</h3>
                                <p className="text-stone-600 dark:text-stone-400 max-w-xs">
                                    Bang Len-Lad Lum Kaeo Road,
                                    Khun Sri, Sai Noi District, Nonthaburi 11150
                                </p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right Col: Form */}
                <div className="bg-white dark:bg-stone-950 p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-800 animate-fade-in-up delay-100">
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 aria-hidden="true" className="w-8 h-8" />
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
                        <form onSubmit={handleSubmit} className="space-y-6" aria-label={labels.title}>
                            <div className="space-y-2">
                                <label htmlFor="quote-fullName" className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 block">
                                    {labels.name}
                                </label>
                                <input
                                    id="quote-fullName"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    name="fullName"
                                    placeholder={language === 'EN' ? "MILKY POP" : "ชื่อผู้ติดต่อ"}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="quote-phone" className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 block">
                                        {labels.phone}
                                    </label>
                                    <input
                                        id="quote-phone"
                                        type="tel"
                                        required
                                        autoComplete="tel"
                                        name="phoneNumber"
                                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        placeholder="08X-XXX-XXXX"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="quote-email" className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 block">
                                        {labels.email}
                                    </label>
                                    <input
                                        id="quote-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        name="emailAddress"
                                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="quote-product" className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 block">
                                    {labels.product}
                                </label>
                                <select
                                    id="quote-product"
                                    name="product"
                                    defaultValue=""
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                                    required
                                >
                                    <option value="" disabled>{language === 'EN' ? "Select a product..." : "เลือกสินค้า..."}</option>
                                    {labels.products.map(p => (
                                        <option key={p.en} value={p.en}>
                                            {language === 'EN' ? p.en : p.th}
                                        </option>
                                    ))}
                                    <option value="Other">{language === 'EN' ? "Other / Multiple" : "อื่นๆ / หลายรายการ"}</option>
                                </select>
                            </div>

                            <fieldset className="space-y-2">
                                <legend className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {language === 'EN' ? "Required Documents" : "เอกสารที่ต้องการ"}
                                </legend>
                                <div className="flex flex-wrap gap-6 pt-1">
                                    {[
                                        { en: "Catalog", th: "แคตตาล็อก" },
                                        { en: "Quotation", th: "ใบเสนอราคา" },
                                        { en: "Spec Sheet", th: "สเปคสินค้า" }
                                    ].map((item) => (
                                        <label key={item.en} className="flex items-center gap-2.5 cursor-pointer group select-none">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="documents"
                                                    value={item.en}
                                                    className="peer w-5 h-5 appearance-none border-2 border-stone-300 dark:border-stone-600 rounded checked:bg-brand-500 checked:border-brand-500 transition-all cursor-pointer"
                                                />
                                                <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                            </div>
                                            <span className="text-stone-600 dark:text-stone-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                                {language === 'EN' ? item.en : item.th}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div className="space-y-2">
                                <label htmlFor="quote-file" className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 block">
                                    {language === 'EN' ? "Attach File" : "แนบไฟล์"}
                                </label>
                                <input
                                    id="quote-file"
                                    name="attachment"
                                    type="file"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-stone-800 dark:file:text-stone-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="quote-message" className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 block">
                                    {labels.message}
                                </label>
                                <textarea
                                    id="quote-message"
                                    rows={4}
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
                                    name="message"
                                    placeholder={language === 'EN' ? "Please describe your requirements..." : "ระบุรายละเอียด ขนาด หรือจำนวนที่ต้องการ..."}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-900 dark:bg-stone-100 text-white dark:text-brand-900 font-bold py-4 rounded-lg hover:bg-brand-800 dark:hover:bg-white/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 group"
                            >
                                <span>{labels.send}</span>
                                <Send aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
