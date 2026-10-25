import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-mono uppercase tracking-wider text-[#68716C]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A938E]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`
            w-full bg-white border text-[#1F2522] text-sm rounded-md px-3 py-2 transition-all duration-200
            placeholder:text-[#8A938E] font-sans
            ${Icon ? 'pl-9' : ''}
            ${error ? 'border-[#8A4B27] focus:border-[#8A4B27] focus:ring-1 focus:ring-[#8A4B27]' : 'border-[#E5E3DB] focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]'}
            focus:outline-none focus:bg-white
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-[#8A4B27] font-mono mt-1">{error}</p>
      )}
    </div>
  );
};
