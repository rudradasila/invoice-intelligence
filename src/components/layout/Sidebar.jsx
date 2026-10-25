import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  GitCompare,
  AlertOctagon,
  Settings,
  ShieldCheck,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { currentMetrics } from '../../data/mockData';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Documents', path: '/documents', icon: FileText, badge: currentMetrics.totalDocuments },
    { name: 'Upload', path: '/upload', icon: UploadCloud },
    { name: 'Compare', path: '/compare', icon: GitCompare },
    { name: 'Review Center', path: '/review-center', icon: AlertOctagon, alertBadge: currentMetrics.activeAlerts },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#F1EFE7] border-r border-[#E5E3DB] flex flex-col justify-between
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Logo Section */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#E5E3DB]">
            <NavLink to="/" className="flex items-center gap-3 group">
              {/* Forest Green Mark beside Logo */}
              <div className="w-8 h-8 rounded bg-white border border-[#E5E3DB] flex items-center justify-center relative overflow-hidden shadow-soft-sm group-hover:border-[#006B4F] transition-all">
                <div className="w-2.5 h-2.5 bg-[#006B4F] rounded-sm rotate-45 transform" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-wider text-[#1F2522] leading-tight">
                  INVOICE
                </span>
                <span className="text-[11px] font-mono tracking-widest text-[#68716C] leading-tight">
                  INTELLIGENCE
                </span>
              </div>
            </NavLink>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded text-[#68716C] hover:text-[#1F2522] hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* System Status Pill */}
          <div className="px-5 pt-5 pb-3">
            <div className="bg-white border border-[#E5E3DB] rounded px-3 py-2 flex items-center justify-between font-mono text-[11px] shadow-soft-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006B4F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006B4F]"></span>
                </span>
                <span className="text-[#68716C]">AI Engine v4.2</span>
              </div>
              <span className="text-[#006B4F] font-semibold">ONLINE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    group flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-[#DCEFE7] text-[#006B4F] border-l-2 border-[#006B4F] font-semibold'
                      : 'text-[#68716C] hover:text-[#1F2522] hover:bg-white/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#006B4F]' : 'text-[#68716C] group-hover:text-[#1F2522]'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.alertBadge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F6E4D6] text-[#8A4B27] border border-[#E8C9B5]">
                      {item.alertBadge}
                    </span>
                  )}

                  {item.badge && !item.alertBadge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#68716C] bg-white border border-[#E5E3DB]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User / Session Footer */}
        <div className="p-4 border-t border-[#E5E3DB]">
          <div className="bg-white border border-[#E5E3DB] rounded-lg p-3 flex items-center justify-between shadow-soft-sm">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded bg-[#DCEFE7] border border-[#BCE2D3] text-[#006B4F] font-mono text-xs flex items-center justify-center font-bold shrink-0">
                RD
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-[#1F2522] truncate">Rudra</div>
                <div className="text-[10px] font-mono text-[#68716C] truncate">CFO / Admin</div>
              </div>
            </div>
            <NavLink
              to="/login"
              title="Logout"
              className="p-1.5 rounded text-[#68716C] hover:text-[#006B4F] hover:bg-[#DCEFE7] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
