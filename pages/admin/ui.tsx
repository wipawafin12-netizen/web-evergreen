import React from 'react';

export const inputClass =
    'w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all';

export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">{label}</label>
        {children}
        {hint && <p className="text-[11px] text-stone-400">{hint}</p>}
    </div>
);

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className={`${inputClass} ${props.className || ''}`} />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea {...props} className={`${inputClass} resize-y ${props.className || ''}`} />
);

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-center gap-3 text-sm text-stone-700 dark:text-stone-200"
    >
        <span
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                checked ? 'bg-brand-500' : 'bg-stone-300 dark:bg-stone-700'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    checked ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </span>
        {label}
    </button>
);

export const PageHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
    <div className="flex items-start justify-between gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-brand-900 dark:text-stone-100">{title}</h1>
            {subtitle && <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{subtitle}</p>}
        </div>
        {action}
    </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl ${className || ''}`}>
        {children}
    </div>
);

export const Spinner: React.FC = () => (
    <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
);
