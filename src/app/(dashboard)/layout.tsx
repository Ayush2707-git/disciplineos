'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Compass, GitMerge, Clock, FileText, PlayCircle, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEMO_USER } from '@/lib/demo-data';

const NAV_ITEMS = [
  { name: 'Compass', href: '/dashboard', icon: Compass },
  { name: 'Reality Gap', href: '/dashboard/reality-gap', icon: GitMerge },
  { name: 'Debt', href: '/dashboard/debt', icon: Clock },
  { name: 'Audit', href: '/dashboard/audit', icon: PlayCircle },
  { name: 'Manual', href: '/dashboard/manual', icon: FileText },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-[#0070F3]/30 selection:text-[#0070F3]">
      
      {/* DESKTOP SIDEBAR NAVIGATION */}
      <nav className="hidden md:flex w-64 border-r border-white/[0.05] bg-[#000000] flex-col z-20 shrink-0 h-screen sticky top-0">
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/[0.05]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span className="font-mono font-bold text-sm text-black">D</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">DisciplineOS</span>
          </Link>
        </div>

        {/* User Profile Snippet */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 bg-[#111111] border border-white/[0.05] rounded-xl p-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0070F3] to-[#7928CA] flex items-center justify-center font-bold text-white shadow-inner">
              {DEMO_USER.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{DEMO_USER.name}</div>
              <div className="text-[10px] font-mono text-[#0070F3] uppercase tracking-wider">PRO OS</div>
            </div>
          </div>
        </div>

        {/* Main Nav Links */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "text-white" 
                    : "text-slate-400 hover:bg-[#111111] hover:text-slate-200"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="desktopNavIndicator"
                    className="absolute inset-0 bg-[#0070F3]/10 border border-[#0070F3]/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10 transition-colors", isActive ? "text-[#0070F3]" : "group-hover:text-slate-300")} />
                <span className={cn("text-sm font-semibold relative z-10", isActive && "text-white")}>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/[0.05] space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#111111] hover:text-slate-200 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#111111] hover:text-rose-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </nav>

      {/* MOBILE TOP HEADER */}
      <div className="md:hidden flex items-center justify-between px-6 h-16 border-b border-white/[0.05] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <span className="font-mono font-bold text-sm text-black">D</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">DisciplineOS</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0070F3] to-[#7928CA] flex items-center justify-center font-bold text-white text-xs">
          {DEMO_USER.name.charAt(0)}
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#050505]/90 backdrop-blur-xl border-t border-white/[0.1] z-50 pb-safe">
        <div className="flex items-center justify-around px-2 py-2 h-16">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex flex-col items-center justify-center w-full h-full text-slate-400"
              >
                {isActive && (
                  <motion.div 
                    layoutId="mobileNavIndicator"
                    className="absolute -top-2 w-8 h-1 rounded-b-full bg-[#0070F3] shadow-[0_0_10px_rgba(0,112,243,0.5)]"
                    initial={false}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={cn("w-6 h-6 mb-1 transition-colors", isActive ? "text-[#0070F3]" : "text-slate-500")} />
                <span className={cn("text-[10px] font-bold tracking-tight transition-colors", isActive ? "text-white" : "text-slate-500")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col md:h-screen">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0070F3]/5 rounded-full blur-[120px] mix-blend-screen" />
        </div>
        {/* Added pb-24 to account for mobile bottom nav */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-10">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
