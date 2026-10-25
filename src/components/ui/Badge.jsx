import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    // Soft peach for discrepancies / warnings
    discrepancy: 'bg-[#F6E4D6] text-[#8A4B27] border border-[#E8C9B5] font-semibold',
    warning: 'bg-[#F6E4D6] text-[#8A4B27] border border-[#E8C9B5]',
    // Soft green for verified / success
    verified: 'bg-[#DCEFE7] text-[#004F3B] border border-[#BCE2D3]',
    // Neutral soft secondary surface
    neutral: 'bg-[#F1EFE7] text-[#68716C] border border-[#E5E3DB]',
    // Primary active soft green
    primary: 'bg-[#DCEFE7] text-[#006B4F] border border-[#006B4F]/30',
    // Soft blue for informational
    info: 'bg-[#DCE7F5] text-[#1D4B75] border border-[#C2D6EE]',
  };

  const dotColors = {
    discrepancy: 'bg-[#8A4B27]',
    warning: 'bg-[#8A4B27]',
    verified: 'bg-[#006B4F]',
    neutral: 'bg-[#68716C]',
    primary: 'bg-[#006B4F]',
    info: 'bg-[#1D4B75]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono uppercase tracking-wider ${variantStyles[variant] || variantStyles.neutral} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-current'}`} />}
      {children}
    </span>
  );
};
