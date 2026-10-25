import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, Search, Bell, Plus, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';
import { currentMetrics } from '../../data/mockData';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#1F2522] flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="h-16 border-b border-[#E5E3DB] bg-white/85 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-soft-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-[#68716C] hover:text-[#1F2522] hover:bg-[#F1EFE7]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Search */}
            <div className="relative hidden sm:block w-64 md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938E]" />
              <input
                type="text"
                placeholder="Search invoices, vendors, GSTIN..."
                className="w-full bg-[#F1EFE7] border border-[#E5E3DB] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#1F2522] placeholder:text-[#8A938E] focus:outline-none focus:border-[#006B4F] focus:bg-white focus:ring-1 focus:ring-[#006B4F] transition-colors"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Discrepancies Notification Pill (Soft peach) */}
            <button
              onClick={() => navigate('/review-center')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F6E4D6] border border-[#E8C9B5] text-xs font-mono text-[#8A4B27] hover:bg-[#F0DAC9] transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="font-semibold">{currentMetrics.activeAlerts} Discrepancies</span>
            </button>

            {/* Upload Action */}
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/upload')}
            >
              Process Document
            </Button>
          </div>
        </header>

        {/* Page View Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
