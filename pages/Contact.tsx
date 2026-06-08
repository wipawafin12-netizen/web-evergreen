import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { pb, LEADS } from '../lib/pb';
import { Send, CheckCircle2, Phone, Mail, MapPin, Calendar, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const VISIT_TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
];

const FACTORY_HOLIDAYS: Record<string, { th: string; en: string }> = {
    '2026-01-01': { th: 'วันขึ้นปีใหม่', en: "New Year's Day" },
    '2026-01-02': { th: 'ชดเชยวันขึ้นปีใหม่', en: "New Year's Day (substitute)" },
    '2026-01-03': { th: 'ชดเชยวันขึ้นปีใหม่', en: "New Year's Day (substitute)" },
    '2026-02-17': { th: 'วันตรุษจีน', en: 'Chinese New Year' },
    '2026-04-13': { th: 'วันสงกรานต์', en: 'Songkran' },
    '2026-04-14': { th: 'วันสงกรานต์', en: 'Songkran' },
    '2026-04-15': { th: 'วันสงกรานต์', en: 'Songkran' },
    '2026-05-01': { th: 'วันแรงงาน', en: 'Labour Day' },
    '2026-07-28': { th: 'วันพ่อ (ร.10)', en: "King Rama X's Birthday" },
    '2026-08-12': { th: 'วันแม่ (ร.9)', en: "Queen Sirikit's Birthday" },
    '2026-10-13': { th: 'วันคล้ายวันสวรรคต (ร.9)', en: 'King Rama IX Memorial Day' },
    '2026-12-05': { th: 'วันพ่อ (ร.9)', en: "King Rama IX's Birthday" },
    '2026-12-31': { th: 'วันสิ้นปี', en: "New Year's Eve" },
};

const formatISODate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

// Parse a YYYY-MM-DD string as a local date. `new Date('YYYY-MM-DD')` parses as
// UTC midnight, which can shift the displayed day depending on timezone.
const parseLocalDate = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
};

const isFactoryHoliday = (d: Date) => Boolean(FACTORY_HOLIDAYS[formatISODate(d)]);

const isSelectableVisitDate = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return false;
    const dow = d.getDay();
    if (dow === 0 || dow === 6) return false;
    if (isFactoryHoliday(d)) return false;
    return true;
};

export const Contact: React.FC = () => {
    const { language, t } = useLanguage();
    const settings = useSettings();
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [visitTime, setVisitTime] = useState('');
    const [visitors, setVisitors] = useState('');
    const [calendarMonth, setCalendarMonth] = useState(() => {
        const d = new Date();
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    });

    const isVisit = selectedSubject === 'visit';

    const calendarDays = useMemo(() => {
        const first = new Date(calendarMonth);
        const startOffset = first.getDay();
        const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
        const cells: (Date | null)[] = [];
        for (let i = 0; i < startOffset; i++) cells.push(null);
        for (let day = 1; day <= daysInMonth; day++) {
            cells.push(new Date(first.getFullYear(), first.getMonth(), day));
        }
        return cells;
    }, [calendarMonth]);

    const monthLabel = useMemo(() => {
        return calendarMonth.toLocaleDateString(language === 'TH' ? 'th-TH' : 'en-US', {
            month: 'long',
            year: 'numeric',
        });
    }, [calendarMonth, language]);

    const weekdayLabels = language === 'TH'
        ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isVisit && (!visitDate || !visitTime)) {
            alert(t('Please select a date and time for your factory visit.', 'กรุณาเลือกวันและเวลาที่ต้องการเข้าชมโรงงาน'));
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = (formData.get('fullName') as string) || '';
        const companyName = ((formData.get('companyName') as string) || '').trim();
        const phoneNumber = (formData.get('phoneNumber') as string) || '';
        const emailAddress = (formData.get('emailAddress') as string) || '';
        const subject = (formData.get('subject') as string) || '';
        const message = (formData.get('message') as string) || '';
        const honeypot = (formData.get('companyWebsite') as string) || '';

        const subjectLabels: Record<string, string> = {
            product: 'สอบถามสินค้า',
            quote: 'ขอใบเสนอราคา',
            project: 'ปรึกษาโครงการ',
            aftersales: 'บริการหลังการขาย',
            visit: 'นัดเข้าชมโรงงาน',
            other: 'อื่นๆ',
        };
        const subjectText = subjectLabels[subject] || subject;

        setSending(true);
        setSendError('');

        // Save a copy of the enquiry to the back-office inbox (best-effort — a DB
        // failure must never block the LINE notification or the user's success).
        // Skip obvious bots that tripped the honeypot.
        if (!honeypot) {
            try {
                await pb.collection(LEADS).create({
                    name: fullName,
                    company: companyName,
                    phone: phoneNumber,
                    email: emailAddress,
                    subject: subjectText,
                    message,
                    visit_date: isVisit ? visitDate : '',
                    visit_time: isVisit ? visitTime : '',
                    visitors: isVisit ? visitors : '',
                    status: 'new',
                });
            } catch {
                /* ignore — the LINE push below is the primary delivery path */
            }
        }

        try {
            const res = await fetch('/api/contact-line', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName,
                    companyName,
                    phoneNumber,
                    emailAddress,
                    subjectText,
                    message,
                    honeypot,
                    visit: isVisit
                        ? { date: visitDate, time: visitTime, visitors }
                        : null,
                }),
            });

            if (!res.ok) {
                throw new Error(`Request failed (${res.status})`);
            }

            setSubmitted(true);
            form.reset();
            setSelectedSubject('');
            setVisitDate('');
            setVisitTime('');
            setVisitors('');
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error(err);
            setSendError(t(
                'Could not send your message. Please try again or call us directly.',
                'ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือโทรหาเราโดยตรง'
            ));
        } finally {
            setSending(false);
        }
    };

    const goPrevMonth = () => {
        setCalendarMonth((prev: Date) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() - 1);
            return d;
        });
    };
    const goNextMonth = () => {
        setCalendarMonth((prev: Date) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + 1);
            return d;
        });
    };

    const todayMonth = new Date();
    todayMonth.setDate(1);
    todayMonth.setHours(0, 0, 0, 0);
    const isAtCurrentMonth = calendarMonth.getTime() <= todayMonth.getTime();

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
                                <p className="text-stone-600 dark:text-stone-400">{settings.phone_office} ({t("Office", "ออฟฟิศ")})</p>
                                <p className="text-stone-600 dark:text-stone-400">{settings.phone_sales} ({t("Sales", "ฝ่ายขาย")})</p>
                                <p className="text-stone-500 text-sm">
                                    {language === 'TH' ? settings.hours_th : settings.hours_en}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-stone-800 rounded-full shadow-sm text-brand-500">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-900 dark:text-stone-100">Email</h3>
                                <p className="text-stone-600 dark:text-stone-400">{settings.email}</p>
                            </div>
                        </div>

                        <a
                            href={settings.map_link}
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
                                    {language === 'TH' ? settings.address_th : settings.address_en}
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
                            {/* Honeypot: hidden from real users, bots tend to fill it. */}
                            <input
                                type="text"
                                name="companyWebsite"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="hidden"
                            />
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

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-brand-900 dark:text-stone-200 uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <span>{t("Company", "บริษัท")}</span>
                                    <span className="text-[10px] font-normal normal-case tracking-normal text-stone-400 dark:text-stone-500">
                                        {t("(optional)", "(ถ้ามี)")}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder={t("Your company name", "ชื่อบริษัท / หน่วยงาน")}
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
                                    value={selectedSubject}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSubject(e.target.value)}
                                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none"
                                    required
                                >
                                    <option value="" disabled>{t("Select a topic...", "เลือกหัวข้อ...")}</option>
                                    <option value="product">{t("Product Inquiry", "สอบถามสินค้า")}</option>
                                    <option value="quote">{t("Request Quotation", "ขอใบเสนอราคา")}</option>
                                    <option value="project">{t("Project Consultation", "ปรึกษาโครงการ")}</option>
                                    <option value="aftersales">{t("After-Sales Service", "บริการหลังการขาย")}</option>
                                    <option value="visit">{t("Schedule a Factory Visit", "นัดเข้าชมโรงงาน")}</option>
                                    <option value="other">{t("Other", "อื่นๆ")}</option>
                                </select>
                            </div>

                            {isVisit && (
                                <div className="space-y-5 p-5 rounded-xl bg-brand-50/60 dark:bg-stone-900/60 border border-brand-100 dark:border-stone-800 animate-fade-in-up">
                                    <div className="flex items-center gap-2 text-brand-900 dark:text-stone-100">
                                        <Calendar className="w-5 h-5 text-brand-500" />
                                        <h4 className="font-bold">
                                            {t("Pick a visit date", "เลือกวันที่ต้องการเข้าชม")}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-stone-500 dark:text-stone-400 -mt-2">
                                        {t(
                                            "Visits available Mon–Fri only. Our team will confirm by email or phone.",
                                            "เข้าชมได้เฉพาะวันจันทร์–ศุกร์ ทีมงานจะยืนยันนัดหมายอีกครั้งทางอีเมลหรือโทรศัพท์"
                                        )}
                                    </p>

                                    <div className="bg-white dark:bg-stone-950 rounded-lg p-4 border border-stone-200 dark:border-stone-800">
                                        <div className="flex items-center justify-between mb-3">
                                            <button
                                                type="button"
                                                onClick={goPrevMonth}
                                                disabled={isAtCurrentMonth}
                                                className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed text-brand-900 dark:text-stone-200"
                                                aria-label="Previous month"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-bold text-brand-900 dark:text-stone-100 capitalize">
                                                {monthLabel}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={goNextMonth}
                                                className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 text-brand-900 dark:text-stone-200"
                                                aria-label="Next month"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 mb-1">
                                            {weekdayLabels.map((w) => (
                                                <div key={w} className="text-center text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase py-1">
                                                    {w}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-1">
                                            {calendarDays.map((d: Date | null, idx: number) => {
                                                if (!d) return <div key={idx} />;
                                                const iso = formatISODate(d);
                                                const holiday = FACTORY_HOLIDAYS[iso];
                                                const selectable = isSelectableVisitDate(d);
                                                const isSelected = visitDate === iso;
                                                const today = new Date();
                                                const isToday = formatISODate(today) === iso;
                                                return (
                                                    <button
                                                        key={iso}
                                                        type="button"
                                                        disabled={!selectable}
                                                        onClick={() => setVisitDate(iso)}
                                                        title={holiday ? (language === 'TH' ? holiday.th : holiday.en) : undefined}
                                                        className={`aspect-square text-sm rounded-md transition-all flex items-center justify-center
                                                            ${isSelected
                                                                ? 'bg-brand-500 text-white font-bold shadow-md'
                                                                : holiday
                                                                    ? 'bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-500/70 line-through cursor-not-allowed'
                                                                    : selectable
                                                                        ? 'hover:bg-brand-100 dark:hover:bg-stone-800 text-brand-900 dark:text-stone-200'
                                                                        : 'text-stone-300 dark:text-stone-700 cursor-not-allowed'
                                                            }
                                                            ${isToday && !isSelected ? 'ring-1 ring-brand-400' : ''}
                                                        `}
                                                    >
                                                        {d.getDate()}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                                        <span className="inline-block w-3 h-3 rounded-sm bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50" />
                                        <span>{t('Red = factory holiday (not bookable)', 'สีแดง = วันหยุดโรงงาน (จองไม่ได้)')}</span>
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-brand-900 dark:text-stone-100">
                                            <Clock className="w-4 h-4 text-brand-500" />
                                            <span className="text-sm font-bold">
                                                {t("Time slot", "ช่วงเวลา")}
                                            </span>
                                        </div>
                                        <select
                                            value={visitTime}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVisitTime(e.target.value)}
                                            disabled={!visitDate}
                                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-brand-900 dark:text-stone-200 disabled:opacity-40 disabled:cursor-not-allowed appearance-none"
                                        >
                                            <option value="" disabled>
                                                {t('Select a time...', 'เลือกเวลา...')}
                                            </option>
                                            {VISIT_TIME_SLOTS.map((slot) => (
                                                <option key={slot} value={slot}>
                                                    {slot} {t('hrs', 'น.')}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                            {t('Available every 30 min, 09:00–16:00 (closed 12:00–13:00)', 'จองได้ทุก 30 นาที ตั้งแต่ 09:00–16:00 (พักเที่ยง 12:00–13:00)')}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-brand-900 dark:text-stone-200 flex items-center gap-2">
                                            <Users className="w-4 h-4 text-brand-500" />
                                            {t("Number of visitors", "จำนวนผู้เข้าชม")}
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={50}
                                            value={visitors}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVisitors(e.target.value)}
                                            className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all dark:text-white"
                                            placeholder={t("e.g. 3", "เช่น 3")}
                                        />
                                    </div>

                                    {visitDate && visitTime && (
                                        <div className="text-xs text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-950 rounded-md p-3 border border-stone-200 dark:border-stone-800">
                                            <span className="font-bold text-brand-900 dark:text-stone-100">
                                                {t("Selected: ", "นัดหมาย: ")}
                                            </span>
                                            {parseLocalDate(visitDate).toLocaleDateString(language === 'TH' ? 'th-TH' : 'en-US', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })} — {visitTime} {t("hrs", "น.")}
                                        </div>
                                    )}
                                </div>
                            )}

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

                            {sendError && (
                                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg px-4 py-3">
                                    {sendError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full bg-brand-900 dark:bg-stone-100 text-white dark:text-brand-900 font-bold py-4 rounded-lg hover:bg-brand-800 dark:hover:bg-white/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                <span>
                                    {sending
                                        ? t("Sending...", "กำลังส่ง...")
                                        : t("Send Message", "ส่งข้อความ")}
                                </span>
                                {!sending && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
