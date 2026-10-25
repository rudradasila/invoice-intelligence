import React from 'react';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex border-b border-[#E5E3DB] space-x-1 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2
              ${isActive ? 'text-[#006B4F] font-semibold' : 'text-[#68716C] hover:text-[#1F2522]'}
            `}
          >
            {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#006B4F]' : 'text-inherit'}`} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${isActive ? 'bg-[#DCEFE7] text-[#006B4F] font-semibold' : 'bg-[#F1EFE7] text-[#68716C]'}`}>
                {tab.count}
              </span>
            )}
            {/* Active forest green indicator line */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#006B4F]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
