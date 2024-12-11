import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors';
  
  const variantStyles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700',
    secondary: 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50',
    danger: 'text-white bg-red-600 hover:bg-red-700',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};