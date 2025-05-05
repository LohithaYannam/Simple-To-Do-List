import React from 'react';

interface AnimatedButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  className = '',
  children,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
}) => {
  const baseStyles = "font-medium rounded-md transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white focus:ring-pink-400",
    secondary: "bg-gradient-to-r from-violet-500 to-purple-400 hover:from-violet-600 hover:to-purple-500 text-white focus:ring-violet-400",
    danger: "bg-gradient-to-r from-red-500 to-rose-400 hover:from-red-600 hover:to-rose-500 text-white focus:ring-red-400",
  };
  
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "shadow-md hover:shadow-lg";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${disabledStyles}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;