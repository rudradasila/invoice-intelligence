import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export const DropZone = ({
  onFileSelect,
  acceptedTypes = ['application/pdf', 'image/png', 'image/jpeg'],
  maxSizeMB = 25,
  isProcessing = false,
  className = '',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300
        ${isDragOver
          ? 'border-[#006B4F] bg-[#DCEFE7]/40 shadow-soft-sm scale-[1.005]'
          : 'border-[#E5E3DB] bg-white hover:border-[#006B4F]/60 hover:bg-[#FDFCF9]'
        }
        ${className}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-4">
        {/* Upload Icon */}
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
            ${isDragOver ? 'bg-[#DCEFE7] text-[#006B4F]' : 'bg-[#F1EFE7] text-[#68716C]'}
          `}
        >
          <UploadCloud className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-[#1F2522] tracking-tight">
            Drop your document here
          </h3>
          <p className="text-xs font-mono text-[#68716C]">
            Supports PDF, JPG, PNG up to {maxSizeMB}MB
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
          >
            Browse Files
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-3 text-[11px] font-mono text-[#68716C]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" /> E-Invoices
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" /> Scanned Bills
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" /> Purchase Orders
          </span>
        </div>
      </div>
    </div>
  );
};
