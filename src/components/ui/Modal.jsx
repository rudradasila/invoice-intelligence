import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full ${maxWidth} bg-white border border-[#E5E3DB] rounded-xl shadow-soft-lg overflow-hidden relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent bar at top */}
        <div className="h-[2px] w-full bg-[#006B4F]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E3DB]">
          <h3 className="text-base font-semibold text-[#1F2522] tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#68716C] hover:text-[#1F2522] hover:bg-[#F1EFE7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
