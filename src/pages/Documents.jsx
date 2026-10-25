import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { mockInvoices } from '../data/mockData';

export const Documents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Documents', count: mockInvoices.length },
    {
      id: 'discrepancy',
      label: 'Discrepancies',
      count: mockInvoices.filter((d) => d.status === 'Discrepancy').length,
    },
    {
      id: 'flagged',
      label: 'Under Review',
      count: mockInvoices.filter((d) => d.status === 'Flagged' || d.status === 'Under Review').length,
    },
    {
      id: 'verified',
      label: 'Verified',
      count: mockInvoices.filter((d) => d.status === 'Verified').length,
    },
  ];

  const filteredDocs = mockInvoices.filter((doc) => {
    const matchesSearch =
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.gstin.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'discrepancy') return doc.status === 'Discrepancy';
    if (activeTab === 'flagged') return doc.status === 'Flagged' || doc.status === 'Under Review';
    if (activeTab === 'verified') return doc.status === 'Verified';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E3DB]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1F2522]">
            Document Repository
          </h1>
          <p className="text-xs text-[#68716C] mt-1 font-mono">
            Audited financial invoices &bull; 3-way reconciliation archive
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert('Exporting encrypted compliance archive...')}
          >
            Export Archive
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => navigate('/upload')}
          >
            Upload New
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs
        tabs={filterTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Search and Secondary Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938E]" />
          <input
            type="text"
            placeholder="Filter by Invoice #, Vendor, PO, or GSTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E3DB] rounded-md pl-9 pr-3 py-2 text-xs text-[#1F2522] placeholder:text-[#8A938E] focus:outline-none focus:border-[#006B4F] focus:ring-1 focus:ring-[#006B4F]"
          />
        </div>

        <div className="text-xs font-mono text-[#68716C] self-end sm:self-center">
          Showing <span className="text-[#1F2522] font-semibold">{filteredDocs.length}</span> of {mockInvoices.length} entries
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-[#E5E3DB] rounded-lg overflow-hidden bg-white shadow-soft-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F1EFE7] border-b border-[#E5E3DB] text-[#68716C] font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Invoice Ref</th>
                <th className="py-3 px-4 font-semibold">Vendor Entity</th>
                <th className="py-3 px-4 font-semibold">Vendor GSTIN</th>
                <th className="py-3 px-4 font-semibold">Issue Date</th>
                <th className="py-3 px-4 font-semibold">PO Ref</th>
                <th className="py-3 px-4 font-semibold">Total Amount</th>
                <th className="py-3 px-4 font-semibold">Audit Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DB]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#68716C] font-mono">
                    No documents matching query.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const isDiscrepant = doc.status === 'Discrepancy';
                  const isFlagged = doc.status === 'Flagged' || doc.status === 'Under Review';

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => navigate(`/documents/${doc.id}`)}
                      className={`hover:bg-[#F7F5EF] transition-colors cursor-pointer group ${
                        isDiscrepant ? 'bg-[#FCF9F6]' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span className={isDiscrepant ? 'text-[#8A4B27]' : 'text-[#1F2522]'}>
                          {doc.id}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#1F2522] font-medium max-w-[200px] truncate">
                        {doc.vendor}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#68716C] text-[11px]">
                        {doc.gstin}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#68716C]">
                        {doc.date}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#68716C]">
                        {doc.poNumber}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#1F2522]">
                        ₹{doc.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        {isDiscrepant ? (
                          <Badge variant="discrepancy" dot={true}>
                            {doc.discrepancies.length} Discrepancies
                          </Badge>
                        ) : isFlagged ? (
                          <Badge variant="warning" dot={true}>
                            {doc.status}
                          </Badge>
                        ) : (
                          <Badge variant="verified" dot={true}>
                            Verified 100%
                          </Badge>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/compare?doc=${doc.id}`);
                            }}
                            className="px-2 py-1 rounded bg-white border border-[#E5E3DB] text-[#68716C] hover:text-[#1F2522] hover:border-[#D5D3CB] font-mono text-[11px] transition-colors"
                          >
                            Compare
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/documents/${doc.id}`);
                            }}
                            className="px-2.5 py-1 rounded bg-[#006B4F] text-white hover:bg-[#004F3B] font-mono text-[11px] font-semibold transition-colors shadow-soft-sm"
                          >
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
