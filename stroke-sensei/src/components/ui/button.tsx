import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'small' | 'large';
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', children, ...props }) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    default: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    ghost: 'text-red-600 hover:bg-red-100',
  };
  const sizeStyles = {
    default: 'px-4 py-2',
    small: 'px-2 py-1 text-sm',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;