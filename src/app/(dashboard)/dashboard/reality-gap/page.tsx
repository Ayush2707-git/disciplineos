'use client';

import { motion } from 'framer-motion';
import { GitMerge, ArrowRight, ShieldAlert, Zap } from 'lucide-react';
import { DEMO_IDENTITY } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export default function RealityGapPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Reality Gap Engine</h1>
          <p className="text-slate-400">Mathematical proof of who you are actually becoming.</p>
        </div>
      </motion.div>

      {/* Identity Comparison Core */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Connection line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#000000] p-4 rounded-full border border-white/[0.05]">
          <GitMerge className="w-8 h-8 text-slate-500" />
        </div>

        {/* Target Identity */}
        <div className="bg-[#050A15] border border-[#0070F3]/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,112,243,0.05)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0070F3]/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
          
          <div className="text-xs font-bold text-[#0070F3] tracking-widest mb-2 uppercase">Who you want to be</div>
          <h2 className="text-3xl font-bold text-white mb-8">{DEMO_IDENTITY.targetIdentity}</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">Required Daily Actions</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                  4 Hours Deep Work
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                  No Social Media before 12 PM
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                  7.5 Hours Sleep
                </li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-white/[0.05]">
              <div className="text-sm text-slate-400 mb-2">Projected Outcome</div>
              <div className="text-lg font-bold text-emerald-400">Financial Independence by 2028</div>
            </div>
          </div>
        </div>

        {/* Actual Identity */}
        <div className="bg-[#150505] border border-rose-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.05)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
          
          <div className="text-xs font-bold text-rose-500 tracking-widest mb-2 uppercase">Who your actions say you are</div>
          <h2 className="text-3xl font-bold text-white mb-8">{DEMO_IDENTITY.currentDerivedIdentity}</h2>

          <div className="space-y-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">Observed Daily Actions (Last 30 Days)</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  1.2 Hours Deep Work (Avg)
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Phone use in bed: 42 mins/day
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Inconsistent sleep schedule
                </li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-white/[0.05]">
              <div className="text-sm text-slate-400 mb-2">Projected Outcome</div>
              <div className="text-lg font-bold text-rose-400">Burnout & Delayed Goals</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The Fix */}
      <motion.div variants={itemVariants} className="bg-[#111111] border border-white/[0.05] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/[0.05]">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">How to close the gap</h3>
            <p className="text-sm text-slate-400">You are 1 action away from shifting trajectory.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0A0A0A] rounded-2xl p-5 border border-white/[0.05]">
            <div className="text-xs text-slate-500 font-bold mb-1">STEP 1</div>
            <div className="font-semibold text-white">Clear your Deep Work Debt</div>
          </div>
          <div className="flex items-center justify-center hidden sm:flex">
            <ArrowRight className="w-6 h-6 text-slate-600" />
          </div>
          <div className="bg-[#0A0A0A] rounded-2xl p-5 border border-white/[0.05]">
            <div className="text-xs text-[#0070F3] font-bold mb-1">RESULT</div>
            <div className="font-semibold text-[#0070F3]">ETA shrinks by 2 months</div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
