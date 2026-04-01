import React from 'react';
import { Palette, Truck, Wrench, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ServicesPage: React.FC = () => {
    const { t } = useLanguage();
    const services = [
        {
            icon: Palette,
            title: t("Custom Design", "การออกแบบตามสั่ง"),
            desc: t("Work with our designers to create a door that is uniquely yours.", "ร่วมงานกับดีไซเนอร์ของเราเพื่อสร้างประตูที่เป็นเอกลักษณ์ของคุณ")
        },
        {
            icon: Truck,
            title: t("Delivery & Logistics", "การจัดส่งและโลจิสติกส์"),
            desc: t("Safe and timely delivery to your construction site or home.", "จัดส่งที่ปลอดภัยและตรงเวลาถึงไซต์ก่อสร้างหรือบ้านของคุณ")
        },
        {
            icon: Wrench,
            title: t("Professional Installation", "การติดตั้งแบบมืออาชีพ"),
            desc: t("Our expert team ensures your door is installed perfectly for longevity.", "ทีมงานผู้เชี่ยวชาญของเราตรวจสอบให้แน่ใจว่าประตูของคุณได้รับการติดตั้งอย่างสมบูรณ์แบบเพื่ออายุการใช้งานที่ยาวนาน")
        },
        {
            icon: ShieldCheck,
            title: t("Warranty & Support", "การรับประกันและสนับสนุน"),
            desc: t("Comprehensive warranty coverage and after-sales support.", "ความคุ้มครองการรับประกันที่ครอบคลุมและการสนับสนุนหลังการขาย")
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 py-24 px-6 md:px-12 transition-colors duration-300">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-20">
                    <h1 className="text-2xl md:text-4xl text-brand-900 dark:text-stone-100 mb-6">{t("Our Services", "บริการของเรา")}</h1>
                    <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
                        {t("Beyond manufacturing, we offer a full suite of services to ensure your project succeeds from concept to installation.", "นอกเหนือจากการผลิต เราขอนำเสนอบริการครบวงจรเพื่อให้แน่ใจว่าโครงการของคุณประสบความสำเร็จตั้งแต่แนวคิดจนถึงการติดตั้ง")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <div key={idx} className="bg-white dark:bg-stone-800 p-10 rounded-sm shadow-sm hover:shadow-md transition-shadow group border border-transparent hover:border-brand-100 dark:hover:border-stone-600">
                                <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-xl bg-brand-50 dark:bg-stone-700 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-7 h-7 text-brand-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl text-brand-900 dark:text-stone-100 mb-4">{service.title}</h3>
                                <p className="text-stone-500 dark:text-stone-400 leading-relaxed text-sm">{service.desc}</p>
                                <div className="mt-8">
                                    <button className="text-xs uppercase tracking-widest text-brand-900 dark:text-stone-100 border-b border-brand-200 dark:border-stone-600 pb-1 group-hover:border-brand-500 transition-colors">
                                        {t("Learn More", "เรียนรู้เพิ่มเติม")}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
