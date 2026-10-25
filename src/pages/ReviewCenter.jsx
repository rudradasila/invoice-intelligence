import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight,
  ExternalLink,
  Ban,
  FileCheck,
  FileText,
  DollarSign
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { Modal } from '../components/ui/Modal';
import { reviewAlerts } from '../data/mockData';

export const ReviewCenter = () => {
  const navigate = useNavigate();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [alerts, setAlerts] = useState(reviewAlerts);
  const [selectedAlertForAction, setSelectedAlertForAction] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolvedStatus, setResolvedStatus] = useState(null);

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'high') return a.severity === 'high';
    if (filterSeverity === 'medium') return a.severity === 'medium';
    return true;
  });

  const handleResolve = (actionType) => {
    if (!selectedAlertForAction) return;

    setAlerts((prev) =>
      prev.map((a) =>
        a.id === selectedAlertForAction.id
          ? { ...a, status: `Resolved: ${actionType}` }
          : a
      )
    );
    setResolvedStatus(`Alert ${selectedAlertForAction.id} resolved via ${actionType}`);
    setSelectedAlertForAction(null);
    setResolutionNote('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B4F] uppercase tracking-widest font-bold">
            <ShieldAlert className="w-4 h-4 text-[#006B4F]" />
            Audit Exception Queue
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1F2522] mt-1">
            Review Center
          </h1>
          <p className="text-xs text-[#68716C] mt-0.5 font-mono">
            Triage, reconcile, or override automated discrepancy flags
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={filterSeverity === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilterSeverity('all')}
          >
            All Alerts ({alerts.length})
          </Button>
          <Button
            variant={filterSeverity === 'high' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilterSeverity('high')}
          >
            High Severity ({alerts.filter((a) => a.severity === 'high').length})
          </Button>
          <Button
            variant={filterSeverity === 'medium' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilterSeverity('medium')}
          >
            Medium ({alerts.filter((a) => a.severity === 'medium').length})
          </Button>
        </div>
      </div>

      {resolvedStatus && (
        <div className="p-3 bg-white border border-[#E5E3DB] rounded text-xs font-mono text-[#1F2522] flex items-center justify-between shadow-soft-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#006B4F]" />
            {resolvedStatus}
          </span>
          <button
            onClick={() => setResolvedStatus(null)}
            className="text-[#68716C] hover:text-[#1F2522]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card accent={true} className="p-4 border-[#E8C9B5] shadow-soft-sm">
          <span className="text-[10px] font-mono text-[#68716C] uppercase">
            FLAGGED AT RISK VALUE
          </span>
          <div className="text-2xl font-bold font-mono text-[#8A4B27] mt-1">
            ₹2,45,000
          </div>
          <div className="text-[11px] font-mono text-[#68716C] mt-1">
            Shortages & tax overcharges
          </div>
        </Card>

        <Card className="p-4 shadow-soft-sm">
          <span className="text-[10px] font-mono text-[#68716C] uppercase">
            PENDING TRIAGE
          </span>
          <div className="text-2xl font-bold font-mono text-[#1F2522] mt-1">
            {alerts.filter((a) => !a.status.startsWith('Resolved')).length} Items
          </div>
          <div className="text-[11px] font-mono text-[#68716C] mt-1">
            Assigned to Accounts Payable
          </div>
        </Card>

        <Card className="p-4 shadow-soft-sm">
          <span className="text-[10px] font-mono text-[#68716C] uppercase">
            MEAN RESOLUTION SPEED
          </span>
          <div className="text-2xl font-bold font-mono text-[#1F2522] mt-1">
            18.4 hrs
          </div>
          <div className="text-[11px] font-mono text-[#68716C] mt-1">
            Well within 48h SLA limit
          </div>
        </Card>
      </div>

      {/* Grid of Discrepancy Alert Cards matching Prompt Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlerts.map((alert) => {
          const isResolved = alert.status.startsWith('Resolved');

          return (
            <div
              key={alert.id}
              className={`
                rounded-xl bg-white border p-5 flex flex-col justify-between transition-all duration-200 relative overflow-hidden shadow-soft-sm
                ${isResolved ? 'border-[#E5E3DB] opacity-60' : 'border-[#E8C9B5] hover:border-[#006B4F]/50'}
              `}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#006B4F] to-transparent" />

              <div>
                {/* Alert Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#8A4B27] shrink-0" />
                    <span className="text-xs font-mono font-bold tracking-wider text-[#8A4B27] uppercase">
                      {alert.type}
                    </span>
                  </div>
                  <Badge variant={isResolved ? 'verified' : 'discrepancy'}>
                    {alert.status}
                  </Badge>
                </div>

                {/* Invoice Ref */}
                <div className="text-sm font-semibold text-[#1F2522] mb-1">
                  Invoice <span className="font-mono text-[#006B4F]">#{alert.invoiceId}</span>
                </div>
                <div className="text-[11px] font-mono text-[#68716C] mb-4 truncate">
                  {alert.vendor} &bull; {alert.date}
                </div>

                {/* Prompt Example: Metrics Table */}
                <div className="bg-[#F1EFE7] border border-[#E5E3DB] rounded p-3 mb-4 space-y-1.5 font-mono text-xs">
                  {Object.entries(alert.metrics).map(([key, val]) => {
                    const isKeyDiscrepancy =
                      key.toLowerCase().includes('missing') ||
                      key.toLowerCase().includes('variance') ||
                      key.toLowerCase().includes('delta') ||
                      key.toLowerCase().includes('difference');

                    return (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-[#68716C] capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span
                          className={`font-semibold ${
                            isKeyDiscrepancy ? 'text-[#8A4B27]' : 'text-[#1F2522]'
                          }`}
                        >
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Impact Statement */}
                <div className="text-xs font-mono mb-4">
                  <span className="text-[#68716C]">Financial Exposure: </span>
                  <span className="text-[#8A4B27] font-bold">{alert.impact}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#E5E3DB]">
                <Button
                  variant="outlineGreen"
                  size="sm"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate(`/documents/${alert.invoiceId}`)}
                >
                  Review Document
                </Button>

                {!isResolved && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedAlertForAction(alert)}
                      className="py-1.5 px-3 rounded bg-white hover:bg-[#F1EFE7] border border-[#E5E3DB] text-[#1F2522] text-xs font-mono font-medium transition-colors shadow-soft-sm"
                    >
                      Take Action
                    </button>
                    <button
                      onClick={() => navigate(`/compare?doc=${alert.invoiceId}`)}
                      className="py-1.5 px-3 rounded bg-white hover:bg-[#F1EFE7] border border-[#E5E3DB] text-[#68716C] hover:text-[#1F2522] text-xs font-mono font-medium transition-colors shadow-soft-sm"
                    >
                      Compare
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Modal */}
      <Modal
        isOpen={!!selectedAlertForAction}
        onClose={() => setSelectedAlertForAction(null)}
        title={`Resolve ${selectedAlertForAction?.type} (${selectedAlertForAction?.invoiceId})`}
      >
        <div className="space-y-5 font-mono text-xs">
          <div className="p-3 bg-[#F6E4D6] border border-[#E8C9B5] rounded space-y-1">
            <div className="text-[#68716C]">DISCREPANCY IMPACT</div>
            <div className="text-[#8A4B27] font-bold text-sm">
              {selectedAlertForAction?.impact}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#68716C] block uppercase tracking-wider">
              Resolution Audit Note (Logged to Immutable Trail)
            </label>
            <textarea
              rows={3}
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="e.g. Spoke with vendor, agreed on 50-unit credit note..."
              className="w-full bg-white border border-[#E5E3DB] rounded-md p-2.5 text-[#1F2522] placeholder:text-[#8A938E] focus:outline-none focus:border-[#006B4F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleResolve('Debit Note Issued')}
            >
              Issue Debit Note
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleResolve('Approved by CFO Override')}
            >
              Executive Override
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleResolve('Rejected & Returned')}
            >
              Reject Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
