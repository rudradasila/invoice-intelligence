import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const Alert = ({
  title = 'QUANTITY DISCREPANCY',
  invoiceId,
  metrics,
  message,
  onReview,
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg bg-white border border-[#E8C9B5] p-5 shadow-soft-sm relative overflow-hidden ${className}`}
    >
      {/* Subtle accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8C9B5] to-transparent" />

      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-[#8A4B27] shrink-0" />
        <h4 className="text-xs font-mono font-bold tracking-wider text-[#8A4B27] uppercase">
          {title}
        </h4>
      </div>

      {invoiceId && (
        <div className="text-sm font-medium text-[#1F2522] mb-4">
          Invoice <span className="font-mono text-[#006B4F]">#{invoiceId}</span>
        </div>
      )}

      {metrics && (
        <div className="bg-[#F1EFE7] border border-[#E5E3DB] rounded p-3 mb-4 space-y-1.5 font-mono text-xs">
          {Object.entries(metrics).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-[#68716C] capitalize">{key}</span>
              <span className={`font-semibold ${key.toLowerCase().includes('missing') || key.toLowerCase().includes('variance') ? 'text-[#8A4B27]' : 'text-[#1F2522]'}`}>
                {val}
              </span>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p className="text-xs text-[#68716C] mb-4 font-mono">
          <span className="text-[#8A4B27] font-semibold">{message}</span>
        </p>
      )}

      {onReview && (
        <Button
          variant="outlineGreen"
          size="sm"
          onClick={onReview}
          className="w-full justify-between"
          icon={ChevronRight}
          iconPosition="right"
        >
          Review Document
        </Button>
      )}
    </div>
  );
};
