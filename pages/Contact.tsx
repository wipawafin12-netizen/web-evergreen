import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
    const { language, t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log("Contact form submitted (Mock)");
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-24 pb-20 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Left Col: Contact Info */}
                <div className="space-y-8 animate-fade-in-up">
                    <div>
                        <span className="text-brand-500 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
                            {t("Contact", "ติดต่อเรา")}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-stone-100 leading-tight">
                            {t("Get in Touch", "ติดต่อ Evergreen")}
                        </h1>
                        <p className="mt-6 text-stone-600 dark:text-stone-400 leading-relaxed text-sm max-w-lg">
                            {t(
                                "Whether you have questions about our products, need a quotation, or want to discuss a project — our team is ready to help.",
                                "ไม่ว่าจะสอบถามเกี่ยวกับสินค้า ขอใบเสนอราคา หรือปรึกษาโครงการ ทีมงานของเราพร้อมให้บริการ"
                            )}
                        </p>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">
                                    {t("Phone", "Phone")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400">02-921-9979 ({t("Office", "ออฟฟิศ")})</p>
                                <p className="text-stone-600 dark:text-stone-400">062-539-9980 ({t("Sales", "ฝ่ายขาย")})</p>
                                <p className="text-stone-500 text-sm">
                                    {t("Mon-Fri 8:30am - 4:30pm", "จันทร์-ศุกร์ 8:30 - 16:30 น.")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Email</h3>
                                <p className="text-stone-600 dark:text-stone-400">mkt.evergreenchh@gmail.com</p>
                            </div>
                        </div>

                        <a
                            href="https://maps.google.com/?q=9/1+หมู่+2+ถนนบางเลน-ลาดหลุมแก้ว+ต.ขุนศรี+อ.ไทรน้อย+จ.นนทบุรี+11150"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                        >
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">
                                    {t("Address", "ที่อยู่")}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 max-w-xs">
                                    {language === 'TH'
                                        ? "9/1 หมู่ 2 ถนนบางเลน-ลาดหลุมแก้ว ต.ขุนศรี อ.ไทรน้อย จ.นนทบุรี 11150"
                                        : "9/1 Moo 2, Bang Len – Lat Lum Kaew Road, Khun Si, Sai Noi District, Nonthaburi 11150"
                                    }
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
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-900 dark:text-stone-100">
                                {t("Message Sent!", "ส่งข้อความแล้ว!")}
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                                {t("Thank you! We'll get back to you shortly.", "ขอบคุณครับ เราจะติดต่อกลับโดยเร็วที่สุด")}
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-8 text-sm text-brand-500 font-bold hover:underline"
                            >
                                {t("Send another message", "ส่งข้อความอีกครั้ง")}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {t("Full Name", "ชื่อ-นามสกุล")}
                                </label>
                                <input
                                    type="text"
                                    required
                                    name="fullName"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder={t("Your name", "ชื่อผู้ติดต่อ")}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                        {t("Phone Number", "เบอร์โทรศัพท์")}
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        name="phoneNumber"
                                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        placeholder="08X-XXX-XXXX"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                        {t("Email", "อีเมล")}
                                    </label>
                                    <input
                                        type="email"
                                        name="emailAddress"
                                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {t("Subject", "เรื่องที่ต้องการติดต่อ")}
                                </label>
                                <select
                                    name="subject"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                                    required
                                >
                                    <option value="" disabled selected>{t("Select a topic...", "เลือกหัวข้อ...")}</option>
                                    <option value="product">{t("Product Inquiry", "สอบถามสินค้า")}</option>
                                    <option value="quote">{t("Request Quotation", "ขอใบเสนอราคา")}</option>
                                    <option value="project">{t("Project Consultation", "ปรึกษาโครงการ")}</option>
                                    <option value="aftersales">{t("After-Sales Service", "บริการหลังการขาย")}</option>
                                    <option value="other">{t("Other", "อื่นๆ")}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1">
                                    {t("Message", "ข้อความ")}
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
                                    name="message"
                                    placeholder={t("How can we help you?", "ต้องการสอบถามเรื่องอะไร...")}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-900 dark:bg-stone-100 text-white dark:text-brand-900 font-bold py-4 rounded-lg hover:bg-brand-800 dark:hover:bg-white/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 group"
                            >
                                <span>{t("Send Message", "ส่งข้อความ")}</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
