import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition active:scale-95 disabled:opacity-50";
  const styles = variant === 'primary' 
    ? "bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20" 
    : "bg-dark-800 border border-dark-700 hover:bg-dark-700";

  return (
    <button className={`${base} ${styles} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};