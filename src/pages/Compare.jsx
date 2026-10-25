import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  GitCompare,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ArrowLeft,
  Download,
  Check,
  Ban
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockInvoices } from '../data/mockData';

export const Compare = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const docId = searchParams.get('doc') || 'INV-2847';
  const doc = mockInvoices.find((d) => d.id === docId) || mockInvoices[0];

  const [decision, setDecision] = useState(null);

  // 3-Way Match Data
  const poData = {
    id: doc.poNumber,
    date: '2026-10-10',
    vendor: doc.vendor,
    item: 'Industrial IoT Telemetry Hubs v3',
    orderedQty: 400,
    unitPrice: 3200,
    expectedGSTRate: '18%',
    expectedGSTAmount: 18000,
    poTotal: 1850000,
  };

  const grnData = {
    id: 'GRN-4421',
    date: '2026-10-21',
    receivedBy: 'Warehouse Dock #4 (Pune)',
    receivedQty: 350,
    acceptedQty: 350,
    rejectedQty: 0,
    discrepancyQty: -50,
    condition: 'Verified intact, 50 units short-shipped',
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DB]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded bg-white border border-[#E5E3DB] text-[#68716C] hover:text-[#1F2522] transition-colors shadow-soft-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#006B4F] tracking-widest font-bold">
                Automated 3-Way Reconciliation
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2522]">
              Comparing {doc.id} vs {poData.id} vs {grnData.id}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert('Downloading side-by-side reconciliation matrix...')}
          >
            Export Diff
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/documents/${doc.id}`)}
          >
            Inspect Invoice
          </Button>
        </div>
      </div>

      {decision && (
        <div className="p-4 bg-white border border-[#E5E3DB] rounded-lg text-xs font-mono text-[#1F2522] flex items-center justify-between shadow-soft-sm">
          <span>Decision recorded: <strong className="text-[#006B4F]">{decision}</strong></span>
          <button onClick={() => setDecision(null)} className="text-[#68716C] hover:underline">
            Reset
          </button>
        </div>
      )}

      {/* Discrepancy Highlight Banner (Soft peach) */}
      <div className="bg-[#F6E4D6] border border-[#E8C9B5] rounded-xl p-5 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#8A4B27] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#8A4B27] uppercase font-mono tracking-wide">
              3-Way Match Mismatch: 50 Units Unaccounted + ₹3,000 Tax Variance
            </h4>
            <p className="text-xs font-mono text-[#1F2522]">
              Vendor invoiced for 400 units, but warehouse physically received 350. Billed tax exceeds statutory 18% HSN rate.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDecision('Issue Debit Note for ₹1,63,000')}
          >
            Issue Debit Note
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDecision('Invoice Held Pending Vendor Credit Note')}
          >
            Hold Payment
          </Button>
        </div>
      </div>

      {/* 3 Pillars Comparison: PO vs GRN vs Invoice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Purchase Order */}
        <Card className="p-5 space-y-4 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#68716C]">SOURCE 1: ERP</span>
              <h3 className="text-sm font-bold text-[#1F2522] font-mono">Purchase Order</h3>
            </div>
            <Badge variant="verified">Agreed</Badge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-[#68716C] text-[10px]">PO IDENTIFIER</span>
              <div className="text-[#1F2522] font-semibold">{poData.id}</div>
            </div>
            <div>
              <span className="text-[#68716C] text-[10px]">ORDERED QUANTITY</span>
              <div className="text-[#1F2522] font-bold text-base">{poData.orderedQty} units</div>
            </div>
            <div>
              <span className="text-[#68716C] text-[10px]">CONTRACT UNIT RATE</span>
              <div className="text-[#1F2522] font-semibold">₹{poData.unitPrice.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-[#68716C] text-[10px]">STATUTORY TAX RULE</span>
              <div className="text-[#1F2522] font-semibold">18% (₹{poData.expectedGSTAmount.toLocaleString('en-IN')})</div>
            </div>
            <div className="pt-2 border-t border-[#E5E3DB]">
              <span className="text-[#68716C] text-[10px]">TOTAL COMMITMENT</span>
              <div className="text-[#1F2522] font-bold">₹{poData.poTotal.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </Card>

        {/* Pillar 2: Goods Receipt Note (GRN) */}
        <Card className="p-5 space-y-4 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#68716C]">SOURCE 2: WAREHOUSE</span>
              <h3 className="text-sm font-bold text-[#1F2522] font-mono">Goods Receipt (GRN)</h3>
            </div>
            <Badge variant="discrepancy">Shortfall</Badge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-[#68716C] text-[10px]">RECEIPT DOCK TICKET</span>
              <div className="text-[#1F2522] font-semibold">{grnData.id}</div>
            </div>
            <div className="p-2 rounded bg-[#F6E4D6] border border-[#E8C9B5]">
              <span className="text-[#8A4B27] text-[10px] font-bold">PHYSICALLY RECEIVED</span>
              <div className="text-[#8A4B27] font-bold text-base">{grnData.receivedQty} units</div>
              <div className="text-[10px] text-[#68716C] mt-0.5 font-sans">{grnData.condition}</div>
            </div>
            <div>
              <span className="text-[#68716C] text-[10px]">INSPECTION STATUS</span>
              <div className="text-[#1F2522] font-semibold">Passed QA &bull; Missing 50 pkgs</div>
            </div>
            <div>
              <span className="text-[#68716C] text-[10px]">WAREHOUSE RECEIVER</span>
              <div className="text-[#1F2522] font-semibold">{grnData.receivedBy}</div>
            </div>
            <div className="pt-2 border-t border-[#E5E3DB]">
              <span className="text-[#68716C] text-[10px]">ACTUAL GOODS VALUE RECEIVED</span>
              <div className="text-[#1F2522] font-bold">₹{(grnData.receivedQty * poData.unitPrice).toLocaleString('en-IN')}</div>
            </div>
          </div>
        </Card>

        {/* Pillar 3: Vendor Tax Invoice */}
        <Card accent={true} className="p-5 space-y-4 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-[#E5E3DB] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#68716C]">SOURCE 3: BILLED</span>
              <h3 className="text-sm font-bold text-[#1F2522] font-mono">Vendor Invoice</h3>
            </div>
            <Badge variant="discrepancy">Overcharge</Badge>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-[#68716C] text-[10px]">INVOICE IDENTIFIER</span>
              <div className="text-[#1F2522] font-semibold">{doc.id}</div>
            </div>
            <div className="p-2 rounded bg-[#F6E4D6] border border-[#E8C9B5]">
              <span className="text-[#8A4B27] text-[10px] font-bold">INVOICED QUANTITY</span>
              <div className="text-[#8A4B27] font-bold text-base">400 units (50 unreceived)</div>
            </div>
            <div>
              <span className="text-[#68716C] text-[10px]">BILLED UNIT RATE</span>
              <div className="text-[#1F2522] font-semibold">₹{poData.unitPrice.toLocaleString('en-IN')} (Matches PO)</div>
            </div>
            <div className="p-2 rounded bg-[#F6E4D6] border border-[#E8C9B5]">
              <span className="text-[#8A4B27] text-[10px] font-bold">CHARGED GST</span>
              <div className="text-[#8A4B27] font-bold">₹{doc.gstCharged.toLocaleString('en-IN')} (+₹3,000)</div>
            </div>
            <div className="pt-2 border-t border-[#E5E3DB]">
              <span className="text-[#68716C] text-[10px]">CLAIMED INVOICE TOTAL</span>
              <div className="text-[#006B4F] font-bold text-base">₹{doc.total.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Field-by-Field Matrix Table */}
      <Card className="p-6 space-y-4 shadow-soft-sm">
        <h3 className="text-sm font-bold text-[#1F2522] tracking-tight">
          Reconciliation Matrix & Discrepancy Vectors
        </h3>

        <div className="border border-[#E5E3DB] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F1EFE7] border-b border-[#E5E3DB] text-[#68716C] uppercase">
              <tr>
                <th className="py-3 px-4">Verification Check</th>
                <th className="py-3 px-4">Purchase Order</th>
                <th className="py-3 px-4">Goods Receipt Note</th>
                <th className="py-3 px-4">Billed Invoice</th>
                <th className="py-3 px-4 text-center">Variance / Match</th>
                <th className="py-3 px-4 text-right">Fiscal Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DB]">
              {/* Check 1: Quantity */}
              <tr className="bg-[#FCF9F6]">
                <td className="py-3 px-4 text-[#1F2522] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A4B27]" />
                  Line Item Quantity
                </td>
                <td className="py-3 px-4 text-[#68716C]">400 units</td>
                <td className="py-3 px-4 text-[#8A4B27] font-bold">350 units</td>
                <td className="py-3 px-4 text-[#1F2522]">400 units</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F6E4D6] text-[#8A4B27] border border-[#E8C9B5]">
                    -50 SHORT
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#8A4B27]">
                  ₹1,60,000
                </td>
              </tr>

              {/* Check 2: Unit Price */}
              <tr className="hover:bg-[#F7F5EF]">
                <td className="py-3 px-4 text-[#1F2522] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" />
                  Unit Pricing Rate
                </td>
                <td className="py-3 px-4 text-[#68716C]">₹3,200</td>
                <td className="py-3 px-4 text-[#68716C]">N/A</td>
                <td className="py-3 px-4 text-[#1F2522]">₹3,200</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-[#006B4F] font-semibold">EXACT MATCH</span>
                </td>
                <td className="py-3 px-4 text-right text-[#68716C]">
                  ₹0
                </td>
              </tr>

              {/* Check 3: Tax Calculation */}
              <tr className="bg-[#FCF9F6]">
                <td className="py-3 px-4 text-[#1F2522] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A4B27]" />
                  Tax Surcharge / GST
                </td>
                <td className="py-3 px-4 text-[#68716C]">₹18,000 (18%)</td>
                <td className="py-3 px-4 text-[#68716C]">N/A</td>
                <td className="py-3 px-4 text-[#8A4B27] font-bold">₹21,000 (Billed)</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F6E4D6] text-[#8A4B27] border border-[#E8C9B5]">
                    +₹3,000 OVER
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#8A4B27]">
                  ₹3,000
                </td>
              </tr>

              {/* Check 4: Vendor GSTIN */}
              <tr className="hover:bg-[#F7F5EF]">
                <td className="py-3 px-4 text-[#1F2522] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" />
                  GSTIN & Legal Name
                </td>
                <td className="py-3 px-4 text-[#68716C]">{doc.gstin}</td>
                <td className="py-3 px-4 text-[#68716C]">Vendor Validated</td>
                <td className="py-3 px-4 text-[#1F2522]">{doc.gstin}</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-[#006B4F] font-semibold">VALIDATED</span>
                </td>
                <td className="py-3 px-4 text-right text-[#68716C]">
                  ₹0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
