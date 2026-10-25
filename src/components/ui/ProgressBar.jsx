import React from 'react';

export const ProgressBar = ({
  progress = 0,
  label,
  showPercentage = true,
  className = '',
  statusText,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || statusText) && (
        <div className="flex justify-between items-center text-xs font-mono mb-1.5">
          <span className="text-[#68716C]">{label || statusText}</span>
          {showPercentage && (
            <span className="text-[#006B4F] font-semibold">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-1.5 bg-[#F1EFE7] rounded-full overflow-hidden border border-[#E5E3DB]">
        <div
          className="h-full bg-gradient-to-r from-[#004F3B] to-[#006B4F] transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
