import React from 'react';

interface GenericPageProps {
    title: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title }) => {
    return (
        <div className="container mx-auto px-6 py-12 min-h-[50vh] flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-900 dark:text-stone-100 mb-6">{title}</h1>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl text-center">
                Information about {title.toLowerCase()} will appear here. This section is currently under development.
            </p>
        </div>
    );
};
