import React from 'react';
import { ButtonProps, ButtonVariant } from '../../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = ButtonVariant.PRIMARY, 
  className = '', 
  type = 'button',
  fullWidth = false
}) => {
  
  const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    [ButtonVariant.PRIMARY]: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 shadow-md hover:shadow-lg",
    [ButtonVariant.SECONDARY]: "bg-stone-100 text-stone-900 hover:bg-stone-200 focus:ring-stone-500",
    [ButtonVariant.OUTLINE]: "border border-stone-300 text-stone-700 hover:border-brand-500 hover:text-brand-500 bg-transparent",
    [ButtonVariant.GHOST]: "text-stone-600 hover:text-brand-500 hover:bg-brand-50 bg-transparent px-4"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};