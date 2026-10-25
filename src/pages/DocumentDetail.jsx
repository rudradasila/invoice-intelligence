import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Check,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  ShieldAlert,
  Edit2,
  GitCompare,
  CheckCircle2,
  Share2,
  CornerDownRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockInvoices } from '../data/mockData';

export const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isEditing, setIsEditing] = useState(false);
  const [actionDone, setActionDone] = useState(null);

  // Find document or fallback to INV-2847
  const doc = mockInvoices.find((d) => d.id === id) || mockInvoices[0];
  const hasDiscrepancy = doc.discrepancies.length > 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DB]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/documents')}
            className="p-2 rounded bg-white border border-[#E5E3DB] text-[#68716C] hover:text-[#1F2522] hover:border-[#D5D3CB] transition-colors shadow-soft-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#1F2522]">
                {doc.id}
              </h1>
              {hasDiscrepancy ? (
                <Badge variant="discrepancy" dot={true}>
                  {doc.discrepancies.length} Discrepancies
                </Badge>
              ) : (
                <Badge variant="verified" dot={true}>
                  Verified 100%
                </Badge>
              )}
            </div>
            <p className="text-xs font-mono text-[#68716C] mt-0.5">
              {doc.vendor} &bull; Uploaded {doc.date} &bull; PO Ref: {doc.poNumber}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={GitCompare}
            onClick={() => navigate(`/compare?doc=${doc.id}`)}
          >
            Compare with PO
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert(`Downloading signed verification pack for ${doc.id}...`)}
          >
            Export JSON
          </Button>

          {hasDiscrepancy ? (
            <Button
              variant="primary"
              size="sm"
              icon={AlertTriangle}
              onClick={() => navigate('/review-center')}
            >
              Resolve Discrepancy
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={Check}
              onClick={() => setActionDone('Invoice verified and approved for automated ERP sync.')}
            >
              Approve for ERP
            </Button>
          )}
        </div>
      </div>

      {actionDone && (
        <div className="p-3 bg-white border border-[#E5E3DB] rounded text-xs font-mono text-[#1F2522] flex items-center justify-between shadow-soft-sm">
          <span>{actionDone}</span>
          <button onClick={() => setActionDone(null)} className="text-[#006B4F] hover:underline font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDE: Original Document Preview (lg: 6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-[#68716C]">
            <span className="flex items-center gap-1.5 text-[#1F2522] font-medium">
              <FileText className="w-3.5 h-3.5 text-[#006B4F]" />
              ORIGINAL SOURCE DOCUMENT ({doc.fileType})
            </span>
            <div className="flex items-center gap-2 bg-white border border-[#E5E3DB] rounded px-2 py-1 shadow-soft-sm">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="hover:text-[#1F2522] text-[#68716C]"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-[#1F2522] w-9 text-center font-semibold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="hover:text-[#1F2522] text-[#68716C]"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Document Preview Surface */}
          <div className="bg-[#F1EFE7] border border-[#E5E3DB] rounded-xl p-4 sm:p-6 overflow-hidden min-h-[640px] relative shadow-soft-sm">
            {/* Document sheet representation */}
            <div
              className="bg-white border border-[#E5E3DB] rounded-lg p-6 sm:p-8 space-y-6 transition-transform duration-200 origin-top shadow-soft-sm text-[#1F2522]"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Document Header */}
              <div className="flex justify-between items-start border-b border-[#E5E3DB] pb-4">
                <div>
                  <div className="text-base font-extrabold text-[#1F2522] tracking-wide uppercase">
                    TAX INVOICE
                  </div>
                  <div className="text-xs font-mono text-[#1F2522] mt-1 font-semibold">
                    {doc.vendor}
                  </div>
                  <div className="text-[11px] font-mono text-[#68716C]">
                    GSTIN: {doc.gstin}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-[#006B4F] font-bold">
                    {doc.id}
                  </div>
                  <div className="text-[11px] font-mono text-[#68716C]">
                    Date: {doc.date}
                  </div>
                  <div className="text-[11px] font-mono text-[#68716C]">
                    PO Ref: {doc.poNumber}
                  </div>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4 text-[11px] font-mono border-b border-[#E5E3DB] pb-4">
                <div>
                  <div className="text-[#68716C] uppercase font-bold">Billed To</div>
                  <div className="text-[#1F2522] font-medium mt-0.5">{doc.buyer}</div>
                  <div className="text-[#68716C]">GSTIN: {doc.buyerGstin}</div>
                  <div className="text-[#68716C]">State: Maharashtra (27)</div>
                </div>
                <div>
                  <div className="text-[#68716C] uppercase font-bold">Dispatch Location</div>
                  <div className="text-[#1F2522] font-medium mt-0.5">Plot 44, MIDC Industrial Area</div>
                  <div className="text-[#68716C]">Pune - 411018</div>
                  <div className="text-[#68716C]">Place of Supply: 27</div>
                </div>
              </div>

              {/* Document Table Preview */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase text-[#68716C] tracking-wider">
                  Itemized Line Breakdown
                </div>
                <div className="border border-[#E5E3DB] rounded overflow-hidden">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead className="bg-[#F1EFE7] text-[#68716C] border-b border-[#E5E3DB]">
                      <tr>
                        <th className="py-1.5 px-2">Description</th>
                        <th className="py-1.5 px-2">HSN</th>
                        <th className="py-1.5 px-2 text-right">Qty</th>
                        <th className="py-1.5 px-2 text-right">Rate</th>
                        <th className="py-1.5 px-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E3DB] text-[#1F2522]">
                      {doc.lineItems.map((item) => (
                        <tr
                          key={item.id}
                          className={item.hasDiscrepancy ? 'bg-[#FDF7F2]' : ''}
                        >
                          <td className="py-2 px-2">{item.description}</td>
                          <td className="py-2 px-2 text-[#68716C]">{item.hsn}</td>
                          <td className="py-2 px-2 text-right">{item.qtyInvoiced}</td>
                          <td className="py-2 px-2 text-right">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-2 text-right font-semibold">
                            ₹{item.total.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Document Calculation Block */}
              <div className="border-t border-[#E5E3DB] pt-3 flex justify-end">
                <div className="w-56 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#68716C]">
                    <span>Subtotal:</span>
                    <span>₹{doc.subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Billed GST with highlight if mismatch */}
                  <div className={`flex justify-between ${doc.gstCalculated !== doc.gstCharged ? 'text-[#8A4B27] font-bold bg-[#F6E4D6] p-1 rounded' : 'text-[#68716C]'}`}>
                    <span>Billed GST:</span>
                    <span>₹{doc.gstCharged.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-[#1F2522] font-bold text-sm pt-2 border-t border-[#E5E3DB]">
                    <span>Grand Total:</span>
                    <span className="text-[#006B4F]">₹{doc.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Stamp / QR */}
              <div className="pt-4 border-t border-[#E5E3DB] flex items-center justify-between text-[10px] font-mono text-[#68716C]">
                <div>IRN: 8e5f299c1a003f441098de77b...</div>
                <div className="text-[#68716C]">Digitally Signed &bull; E-Way Bill Attached</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Extracted Information & Discrepancies (lg: 6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-[#68716C]">
            <span className="flex items-center gap-1.5 text-[#1F2522] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006B4F]" />
              AI EXTRACTED STRUCTURED ENTITIES
            </span>
            <span className="text-[#1F2522] font-semibold">
              Confidence: <span className="text-[#006B4F]">{doc.confidenceScore}%</span>
            </span>
          </div>

          {/* High Priority Discrepancy Alert Cards */}
          {doc.discrepancies.length > 0 && (
            <div className="space-y-3">
              {doc.discrepancies.map((disc) => (
                <div
                  key={disc.id}
                  className="rounded-lg bg-white border border-[#E8C9B5] p-4 shadow-soft-sm space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#8A4B27] shrink-0" />
                      <span className="text-xs font-mono font-bold uppercase text-[#8A4B27] tracking-wider">
                        {disc.title}
                      </span>
                    </div>
                    <Badge variant="discrepancy">{disc.severity}</Badge>
                  </div>

                  <p className="text-xs text-[#68716C] font-mono leading-relaxed">
                    {disc.detail}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs border-t border-[#E5E3DB]">
                    <div className="bg-[#F1EFE7] p-2 rounded border border-[#E5E3DB]">
                      <span className="text-[#68716C] text-[10px] block">EXPECTED VALUE</span>
                      <span className="text-[#1F2522] font-semibold">{disc.expected}</span>
                    </div>
                    <div className="bg-[#F6E4D6] p-2 rounded border border-[#E8C9B5]">
                      <span className="text-[#8A4B27] text-[10px] block font-bold">BILLED / DETECTED</span>
                      <span className="text-[#8A4B27] font-bold">{disc.actual}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Core Extracted Fields Grid */}
          <Card className="p-5 space-y-4 shadow-soft-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#68716C] pb-2 border-b border-[#E5E3DB]">
              Verified Entity Headers
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded">
                <span className="text-[#68716C] text-[10px] uppercase">Invoice Number</span>
                <div className="text-[#1F2522] font-bold text-sm mt-0.5">{doc.id}</div>
              </div>

              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded">
                <span className="text-[#68716C] text-[10px] uppercase">Purchase Order Ref</span>
                <div className="text-[#1F2522] font-bold text-sm mt-0.5">{doc.poNumber}</div>
              </div>

              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded">
                <span className="text-[#68716C] text-[10px] uppercase">Vendor Entity</span>
                <div className="text-[#1F2522] font-semibold truncate mt-0.5">{doc.vendor}</div>
                <div className="text-[#68716C] text-[10px] mt-0.5">{doc.gstin}</div>
              </div>

              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded">
                <span className="text-[#68716C] text-[10px] uppercase">Buyer Entity</span>
                <div className="text-[#1F2522] font-semibold truncate mt-0.5">{doc.buyer}</div>
                <div className="text-[#68716C] text-[10px] mt-0.5">{doc.buyerGstin}</div>
              </div>

              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded">
                <span className="text-[#68716C] text-[10px] uppercase">Invoice Date</span>
                <div className="text-[#1F2522] font-semibold mt-0.5">{doc.date}</div>
              </div>

              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded">
                <span className="text-[#68716C] text-[10px] uppercase">Payment Due Date</span>
                <div className="text-[#1F2522] font-semibold mt-0.5">{doc.dueDate}</div>
              </div>
            </div>

            {/* Financial Totals with Problematic Field Styling (Soft peach for warning) */}
            <div className="pt-2 space-y-3">
              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-3 rounded flex justify-between items-center text-xs font-mono">
                <span className="text-[#68716C]">Subtotal Amount</span>
                <span className="text-[#1F2522] font-bold text-sm">
                  ₹{doc.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* SPEC REQUIREMENT: Problematic field with soft peach background and border */}
              <div
                className={`p-3.5 rounded flex flex-col gap-1.5 font-mono text-xs ${
                  doc.gstCalculated !== doc.gstCharged
                    ? 'bg-[#F6E4D6] border border-[#E8C9B5] shadow-soft-sm'
                    : 'bg-[#F1EFE7] border border-[#E5E3DB]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 font-bold">
                    {doc.gstCalculated !== doc.gstCharged && (
                      <AlertTriangle className="w-4 h-4 text-[#8A4B27]" />
                    )}
                    <span className={doc.gstCalculated !== doc.gstCharged ? 'text-[#8A4B27]' : 'text-[#68716C]'}>
                      GST Calculation
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${doc.gstCalculated !== doc.gstCharged ? 'text-[#8A4B27]' : 'text-[#1F2522]'}`}>
                    ₹{doc.gstCharged.toLocaleString('en-IN')}
                  </span>
                </div>

                {doc.gstCalculated !== doc.gstCharged && (
                  <div className="text-[11px] text-[#68716C] pt-1 border-t border-[#E8C9B5] flex justify-between">
                    <span>Expected rule based on HSN:</span>
                    <span className="text-[#1F2522] font-semibold">₹{doc.gstCalculated.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Total Card */}
              <div className="bg-[#F1EFE7] border border-[#E5E3DB] p-4 rounded-lg flex justify-between items-center font-mono shadow-soft-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#68716C]">
                    Total Invoice Value
                  </span>
                  <div className="text-xs text-[#8A938E]">INR &bull; Three-way verified</div>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#006B4F]">
                  ₹{doc.total.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </Card>

          {/* Audit Trail */}
          <Card className="p-5 space-y-3 shadow-soft-sm">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#68716C] pb-2 border-b border-[#E5E3DB]">
              Immutable Audit Trail
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {doc.auditTrail.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[#68716C]">
                  <CornerDownRight className="w-3.5 h-3.5 text-[#006B4F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1F2522]">{item.action}</span>
                    <div className="text-[10px] text-[#8A938E]">{item.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
