import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'EN' | 'TH';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (en: string, th: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('TH');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'EN' ? 'TH' : 'EN'));
    };

    const t = (en: string, th: string) => {
        return language === 'EN' ? en : th;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
