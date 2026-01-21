import React from "react";

interface CardProps{
    children :  React.ReactNode;
    className?: string;
    onClick?: () => void;   
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-dark-800 border border-dark-700 rounded-xl p-6 
        shadow-lg hover:border-brand-500/50 hover:shadow-brand-500/10 
        transition-all duration-200 cursor-pointer
        ${className}
      `}
    >
      {children}
    </div>
  );
};