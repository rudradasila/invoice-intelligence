import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  Cloud,
  Check,
  ExternalLink,
  Settings as SettingsIcon
} from 'lucide-react';
import { DropZone } from '../components/ui/DropZone';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { uploadToCloudinary, getCloudinaryConfig } from '../services/cloudinary';

export const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState(0); // 0: idle, 1: uploading to cloudinary, 2: ocr, 3: matching, 4: done
  const [extractedDoc, setExtractedDoc] = useState(null);
  const [cloudinaryResult, setCloudinaryResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [cloudConfig, setCloudConfig] = useState(getCloudinaryConfig());

  useEffect(() => {
    setCloudConfig(getCloudinaryConfig());
  }, []);

  const stages = [
    { label: 'Cloudinary Encrypted Asset Ingestion', icon: Cloud },
    { label: 'OCR & Multimodal Vision Entity Parsing', icon: Cpu },
    { label: 'Automated 3-Way Reconciliation Engine', icon: Sparkles },
    { label: 'Discrepancy Audit Completed', icon: CheckCircle2 },
  ];

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setUploadProgress(0);
    setUploadError(null);
    setProcessingStage(1); // Uploading

    try {
      // Direct Cloudinary Upload with live progress
      const result = await uploadToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });

      setCloudinaryResult(result);

      // Transition to AI pipelines
      setProcessingStage(2); // OCR

      setTimeout(() => {
        setProcessingStage(3); // Matching
      }, 1000);

      setTimeout(() => {
        setProcessingStage(4); // Done
        setExtractedDoc({
          id: 'INV-2847',
          vendor: 'Apex Tech Solutions Pvt Ltd',
          amount: '₹18,88,000',
          discrepanciesCount: 2,
          confidence: 98.2,
          cloudinaryUrl: result.secure_url,
          cloudinaryPublicId: result.public_id,
          isMock: result.isMock,
        });
      }, 2000);
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadError(err.message || 'Failed to upload document to Cloudinary');
      setProcessingStage(0);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setProcessingStage(0);
    setExtractedDoc(null);
    setCloudinaryResult(null);
    setUploadError(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="text-center space-y-2 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCEFE7] border border-[#BCE2D3] text-[#006B4F] text-xs font-mono uppercase tracking-widest font-bold">
          <Cloud className="w-3.5 h-3.5 text-[#006B4F]" />
          Cloudinary Vault &bull; High-Throughput Ingestion Node
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2522]">
          Document Intake & AI Audit
        </h1>
        <p className="text-xs sm:text-sm text-[#68716C] max-w-xl mx-auto">
          Upload PDF invoices, scans, or receipts directly into Cloudinary document storage. The AI pipeline extracts line items, verifies GST compliance, and cross-checks purchase orders.
        </p>

        {/* Cloudinary Integration Status Pill */}
        <div className="pt-2">
          {cloudConfig.isConfigured ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#E5E3DB] text-[11px] font-mono text-[#68716C] shadow-soft-sm">
              <span className="w-2 h-2 rounded-full bg-[#006B4F]" />
              Cloudinary Active: <span className="text-[#1F2522] font-bold">{cloudConfig.cloudName}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F6E4D6] border border-[#E8C9B5] text-[11px] font-mono text-[#8A4B27]">
              <span className="font-bold">Cloudinary Preset Unset:</span>
              <span>Running in Sandbox Mode.</span>
              <button
                onClick={() => navigate('/settings')}
                className="text-[#1F2522] hover:text-[#006B4F] underline font-semibold ml-1 flex items-center gap-1"
              >
                Configure in Settings <SettingsIcon className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-4 bg-[#F6E4D6] border border-[#E8C9B5] rounded-lg text-xs font-mono text-[#8A4B27] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {uploadError}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setUploadError(null)}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Main Upload Area */}
      {processingStage === 0 && (
        <div className="space-y-6">
          <DropZone onFileSelect={handleFileSelect} />

          {/* Quick Demo Pre-load buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white border border-[#E5E3DB] rounded-lg shadow-soft-sm">
            <div className="text-xs text-[#68716C] font-mono">
              Want to test instantly? Try a sample document:
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const blob = new Blob(['Sample Discrepancy Invoice INV-2847'], { type: 'application/pdf' });
                  const file = new File([blob], 'ApexTech_INV-2847_Discrepancy.pdf', { type: 'application/pdf' });
                  handleFileSelect(file);
                }}
              >
                Sample Discrepancy Doc (INV-2847)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const blob = new Blob(['Sample Clean Invoice INV-2846'], { type: 'application/pdf' });
                  const file = new File([blob], 'Zenith_INV-2846_Clean.pdf', { type: 'application/pdf' });
                  handleFileSelect(file);
                }}
              >
                Sample Clean Doc (INV-2846)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Active Upload & Processing State */}
      {processingStage > 0 && processingStage < 4 && (
        <Card accent={true} className="p-8 space-y-6 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-[#DCEFE7] text-[#006B4F]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1F2522]">
                  {selectedFile?.name || 'Document.pdf'}
                </div>
                <div className="text-xs font-mono text-[#68716C]">
                  {(selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) : '1.8')} MB &bull; Ingestion via Cloudinary
                </div>
              </div>
            </div>
            <Badge variant="primary">Processing</Badge>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            progress={uploadProgress}
            label={uploadProgress < 100 ? 'Uploading encrypted binary to Cloudinary...' : 'Cloudinary stored. Running neural vision pipelines...'}
          />

          {/* Stepper Breakdown */}
          <div className="space-y-3 pt-2">
            {stages.map((stage, idx) => {
              const stageNum = idx + 1;
              const isDone = processingStage > stageNum;
              const isCurrent = processingStage === stageNum;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.label}
                  className={`
                    flex items-center justify-between p-3 rounded border text-xs font-mono transition-all duration-300
                    ${isCurrent ? 'bg-[#DCEFE7]/40 border-[#006B4F]/40 text-[#1F2522]' : ''}
                    ${isDone ? 'bg-white border-[#E5E3DB] text-[#68716C]' : ''}
                    ${!isDone && !isCurrent ? 'bg-[#F1EFE7]/50 border-[#E5E3DB] text-[#8A938E]' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded ${
                        isCurrent
                          ? 'bg-[#006B4F] text-white shadow-soft-sm'
                          : isDone
                          ? 'bg-[#DCEFE7] text-[#006B4F]'
                          : 'bg-[#F1EFE7] text-[#8A938E]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{stage.label}</span>
                  </div>

                  {isCurrent && (
                    <span className="text-[#006B4F] flex items-center gap-1.5 font-semibold">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[#006B4F] flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Finished State */}
      {processingStage === 4 && extractedDoc && (
        <Card accent={true} className="p-8 space-y-6 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DCEFE7] border border-[#006B4F]/30 flex items-center justify-center text-[#006B4F] shadow-soft-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2522] tracking-tight">
                  Cloudinary Upload & Extraction Complete
                </h3>
                <p className="text-xs font-mono text-[#68716C]">
                  All entities extracted with {extractedDoc.confidence}% confidence
                </p>
              </div>
            </div>
            <Badge variant="discrepancy">2 Discrepancies Flagged</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded">
              <div className="text-[#68716C]">DETECTED INVOICE ID</div>
              <div className="text-[#1F2522] font-bold text-sm mt-1">{extractedDoc.id}</div>
            </div>
            <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded">
              <div className="text-[#68716C]">VENDOR</div>
              <div className="text-[#1F2522] font-bold text-sm mt-1 truncate">{extractedDoc.vendor}</div>
            </div>
            <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded">
              <div className="text-[#68716C]">INVOICE TOTAL</div>
              <div className="text-[#1F2522] font-bold text-sm mt-1">{extractedDoc.amount}</div>
            </div>
            <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded">
              <div className="text-[#68716C]">CLOUDINARY STORAGE</div>
              <div className="text-[#006B4F] font-bold text-sm mt-1 truncate flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5" />
                {extractedDoc.isMock ? 'Local Blob' : 'Cloudinary Vault'}
              </div>
            </div>
          </div>

          {/* Attention Banner */}
          <div className="p-4 rounded bg-[#F6E4D6] border border-[#E8C9B5] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#8A4B27] shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-[#8A4B27]">
                Attention Required: 2 Discrepancies Detected
              </div>
              <div className="text-[#68716C] mt-1 font-mono">
                Mismatch found in GST line calculation (₹21,000 vs ₹18,000) and delivery goods receipt (350 vs 400 ordered).
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button variant="ghost" size="md" onClick={handleReset}>
              Upload Another Document
            </Button>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {extractedDoc.cloudinaryUrl && (
                <a
                  href={extractedDoc.cloudinaryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-md bg-white hover:bg-[#F1EFE7] border border-[#E5E3DB] text-[#1F2522] text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors shadow-soft-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#006B4F]" />
                  Open Asset URL
                </a>
              )}
              <Button
                variant="primary"
                size="md"
                icon={Eye}
                onClick={() => navigate(`/documents/${extractedDoc.id}`)}
              >
                Open Document Viewer
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
