import React from 'react';

export const Card = ({
  children,
  className = '',
  accent = false,
  elevated = false,
  hover = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg border transition-all duration-200 bg-white
        ${accent ? 'border-[#006B4F]/30 bg-gradient-to-b from-[#FAFDFB] to-white shadow-soft-sm' : 'border-[#E5E3DB]'}
        ${elevated ? 'shadow-soft-sm' : ''}
        ${hover ? 'hover:border-[#D5D3CB]' : ''}
        ${accent && hover ? 'hover:border-[#006B4F]/60' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
