import React from 'react';
import { Card } from './Card';

export const StatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  isHighlighted = false,
  trend,
  className = '',
}) => {
  return (
    <Card
      accent={isHighlighted}
      className={`p-5 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase font-mono tracking-wider text-[#68716C]">
          {label}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded ${isHighlighted ? 'bg-[#F6E4D6] text-[#8A4B27]' : 'bg-[#F1EFE7] text-[#68716C]'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-1">
        <div className={`text-2xl lg:text-3xl font-bold tracking-tight font-mono ${isHighlighted ? 'text-[#8A4B27]' : 'text-[#1F2522]'}`}>
          {value}
        </div>
      </div>

      {(subtext || trend) && (
        <div className="mt-2 pt-2 border-t border-[#E5E3DB] flex items-center justify-between text-xs text-[#68716C] font-mono">
          <span>{subtext}</span>
          {trend && (
            <span className={trend.isPositive ? 'text-[#006B4F] font-semibold' : 'text-[#8A4B27] font-semibold'}>
              {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
