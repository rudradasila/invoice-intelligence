import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MonthlyTrendChart } from '../components/charts/MonthlyTrendChart';
import { DocumentTypeChart } from '../components/charts/DocumentTypeChart';
import {
  currentMetrics,
  monthlyTrends,
  documentTypesData,
  mockInvoices,
  reviewAlerts
} from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E5E3DB]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#006B4F] uppercase tracking-widest mb-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#006B4F] animate-pulse" />
            AI Document Engine Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2522]">
            Good morning, Rudra
          </h1>
          <p className="text-sm text-[#68716C] mt-1">
            Here's what's happening with your documents across your enterprise pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/documents')}
          >
            All Documents
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => navigate('/upload')}
          >
            Process Document
          </Button>
        </div>
      </div>

      {/* Primary Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Documents"
          value={currentMetrics.totalDocuments}
          subtext="+24 processed this week"
          icon={FileText}
          trend={{ value: '+10.8%', isPositive: true }}
        />
        <StatCard
          label="Total Value"
          value={currentMetrics.totalValue}
          subtext="Audited volume in Oct"
          icon={DollarSign}
          trend={{ value: '+14.2%', isPositive: true }}
        />
        {/* Important Metric with Soft Peach Highlight */}
        <StatCard
          label="Discrepancies"
          value={currentMetrics.activeAlerts}
          subtext="Requires executive review"
          icon={AlertTriangle}
          isHighlighted={true}
          trend={{ value: '12 active', isPositive: false }}
        />
        <StatCard
          label="Accuracy Rate"
          value={currentMetrics.accuracyRate}
          subtext="Avg latency: 1.4s"
          icon={TrendingUp}
          trend={{ value: 'Zero false-pos', isPositive: true }}
        />
      </div>

      {/* Critical Alert Banner (Soft peach card) */}
      <Card
        accent={true}
        className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-[#E8C9B5] bg-[#FDFBF9]"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded bg-[#F6E4D6] border border-[#E8C9B5] text-[#8A4B27] shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-[#8A4B27] tracking-wider">
                High Priority Discrepancy Detected
              </span>
              <Badge variant="discrepancy">Action Needed</Badge>
            </div>
            <h3 className="text-base font-semibold text-[#1F2522] mt-1">
              Invoice #INV-2847 from Apex Tech Solutions Pvt Ltd
            </h3>
            <p className="text-xs text-[#68716C] mt-0.5 font-mono">
              Short shipment of 50 units (GRN-4421) and GST overcharge of ₹3,000 detected by automated 3-way match.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outlineGreen"
            size="sm"
            onClick={() => navigate('/review-center')}
            className="w-full md:w-auto"
          >
            Review Discrepancy
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/documents/INV-2847')}
            className="w-full md:w-auto"
          >
            Inspect Document
          </Button>
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Area Chart */}
        <Card className="lg:col-span-2 p-6 shadow-soft-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#1F2522] tracking-tight">
                Document Value Trends (₹ Lakhs)
              </h2>
              <p className="text-xs text-[#68716C] font-mono mt-0.5">
                Monthly throughput across all processing pipelines
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#1F2522]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006B4F]" />
                Audited Value (₹)
              </span>
            </div>
          </div>
          <MonthlyTrendChart data={monthlyTrends} height={250} />
        </Card>

        {/* Document Classification Distribution */}
        <Card className="p-6 shadow-soft-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[#1F2522] tracking-tight">
              Classification Breakdown
            </h2>
            <p className="text-xs text-[#68716C] font-mono mt-0.5">
              Automated document categorization
            </p>
          </div>
          <DocumentTypeChart data={documentTypesData} height={250} />
        </Card>
      </div>

      {/* Recent Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1F2522] tracking-tight">
              Recent Documents
            </h2>
            <p className="text-xs text-[#68716C] font-mono mt-0.5">
              Live audit stream from intake nodes
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/documents')}
            icon={ChevronRight}
            iconPosition="right"
          >
            View Full Repository
          </Button>
        </div>

        {/* Documents Table */}
        <div className="border border-[#E5E3DB] rounded-lg overflow-hidden bg-white shadow-soft-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F1EFE7] border-b border-[#E5E3DB] text-[#68716C] font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-semibold">Document ID</th>
                  <th className="py-3 px-4 font-semibold">Vendor / Entity</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">PO Ref</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DB]">
                {mockInvoices.slice(0, 5).map((doc) => {
                  const isDiscrepant = doc.status === 'Discrepancy';
                  const isFlagged = doc.status === 'Flagged' || doc.status === 'Under Review';

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => navigate(`/documents/${doc.id}`)}
                      className={`hover:bg-[#F7F5EF] transition-colors cursor-pointer ${
                        isDiscrepant ? 'bg-[#FCF9F6]' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-medium">
                        <span className={isDiscrepant ? 'text-[#8A4B27] font-bold' : 'text-[#1F2522]'}>
                          {doc.id}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#1F2522] font-medium">
                        {doc.vendor}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#68716C]">
                        {doc.date}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#68716C]">
                        {doc.poNumber}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#1F2522]">
                        ₹{doc.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        {isDiscrepant ? (
                          <Badge variant="discrepancy" dot={true}>
                            {doc.status}
                          </Badge>
                        ) : isFlagged ? (
                          <Badge variant="warning" dot={true}>
                            {doc.status}
                          </Badge>
                        ) : (
                          <Badge variant="verified" dot={true}>
                            {doc.status}
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[#68716C] hover:text-[#006B4F] inline-flex items-center gap-1 font-mono transition-colors">
                          Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
