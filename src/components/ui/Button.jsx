import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded gap-1.5',
    md: 'text-sm px-4 py-2 rounded-md gap-2',
    lg: 'text-base px-6 py-2.5 rounded-md gap-2.5',
    icon: 'p-2 rounded-md aspect-square',
  };

  const variantStyles = {
    primary: 'bg-[#006B4F] hover:bg-[#004F3B] text-white shadow-soft-sm active:translate-y-[1px]',
    secondary: 'bg-white hover:bg-[#F1EFE7] text-[#1F2522] border border-[#E5E3DB] hover:border-[#D5D3CB]',
    danger: 'bg-[#F6E4D6] hover:bg-[#EDD5C4] text-[#8A4B27] border border-[#E8C9B5]',
    ghost: 'bg-transparent hover:bg-[#F1EFE7] text-[#68716C] hover:text-[#1F2522]',
    outlineRed: 'bg-transparent hover:bg-[#DCEFE7] text-[#006B4F] border border-[#006B4F]/40 hover:border-[#006B4F]',
    outlineGreen: 'bg-transparent hover:bg-[#DCEFE7] text-[#006B4F] border border-[#006B4F]/40 hover:border-[#006B4F]',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};
