import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string;
}


export const  Input : React.FC<InputProps> =({ label, className = '', ...props })=> (
  <div className="space-y-1 w-full">
    {label && <label className="text-xs font-bold text-gray-400 uppercase">{label}</label>}
    <input className={`w-full p-2.5 rounded-lg bg-dark-800 border border-dark-700 focus:border-brand-500 focus:outline-none transition ${className}`} {...props} />
  </div>
);