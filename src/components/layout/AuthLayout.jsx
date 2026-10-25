import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#1F2522] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DCEFE7]/60 rounded-full blur-[140px] pointer-events-none" />

      {/* Header with Logo */}
      <header className="flex items-center justify-between max-w-6xl mx-auto w-full z-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white border border-[#E5E3DB] flex items-center justify-center relative shadow-soft-sm">
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
        </Link>
        <span className="text-xs font-mono text-[#68716C] hidden sm:block">
          Enterprise Financial Intelligence System
        </span>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center my-8 z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs font-mono text-[#8A938E] z-10">
        Strict Cryptographic Verification &bull; SOC2 Type II Certified &bull; ISO 27001
      </footer>
    </div>
  );
};
