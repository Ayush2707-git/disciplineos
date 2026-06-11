'use client';

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { DEMO_WEEKLY_AUDIT } from '@/lib/demo-data';
import { cn } from '@/lib/utils';
import { submitLifeAudit } from '@/app/actions/user';

export default function LifeReplayPage() {
  const [isPending, startTransition] = useTransition();
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleAudit = (wouldRepeat: boolean) => {
    if (isPending) return;
    startTransition(async () => {
      const result = await submitLifeAudit(DEMO_WEEKLY_AUDIT.weekStart, wouldRepeat);
      setAuditResult(result.message);
    });
  };
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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Life Replay</h1>
          <p className="text-slate-400">Weekly board meeting with your future self.</p>
        </div>
      </motion.div>

      {/* The Big Question */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#050508] to-[#0A0A0A] border border-white/[0.08] rounded-3xl p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-1 bg-gradient-to-r from-transparent via-[#0070F3]/50 to-transparent" />
        
        <PlayCircle className="w-16 h-16 text-[#0070F3] mx-auto mb-6 opacity-80" />
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
          If you repeated this exact week for the next 5 years, would you achieve your goals?
        </h2>
        
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          {auditResult ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0070F3]/10 border border-[#0070F3]/30 text-[#0070F3] px-6 py-3 rounded-xl font-bold"
            >
              {auditResult}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => handleAudit(true)}
                disabled={isPending}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0A0A0A] border border-white/[0.08] text-white hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-50 transition-all group"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                <span className="font-bold">YES</span>
              </button>
              <button 
                onClick={() => handleAudit(false)}
                disabled={isPending}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0A0A0A] border border-white/[0.08] text-white hover:border-rose-500 hover:text-rose-400 disabled:opacity-50 transition-all group"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                <span className="font-bold">NO</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Time Allocation */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-white/[0.05] rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="w-5 h-5 text-slate-400" />
            <h3 className="text-xl font-bold text-white">Time Allocation</h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-emerald-500 uppercase tracking-wider">Invested</span>
                <span className="text-xl font-mono text-white">{DEMO_WEEKLY_AUDIT.totalInvestedHours}h</span>
              </div>
              <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-emerald-500 rounded-full" />
              </div>
              <p className="text-xs text-slate-500 mt-2">Deep work, learning, exercise</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-rose-500 uppercase tracking-wider">Wasted</span>
                <span className="text-xl font-mono text-white">{DEMO_WEEKLY_AUDIT.totalWastedHours}h</span>
              </div>
              <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-rose-500 rounded-full" />
              </div>
              <p className="text-xs text-slate-500 mt-2">Endless scrolling, snoozing, low-leverage tasks</p>
            </div>
          </div>
        </motion.div>

        {/* AI Analysis */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-white/[0.05] rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">AI Diagnostics</h3>
            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-white/[0.05] p-4 rounded-2xl">
                <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">What went right</div>
                <div className="text-sm text-slate-300">You maintained a consistent 7.5h sleep schedule for 5 days.</div>
              </div>
              <div className="bg-[#150505] border border-rose-500/20 p-4 rounded-2xl">
                <div className="text-xs text-rose-500/70 font-bold mb-1 uppercase tracking-wider">What went wrong</div>
                <div className="text-sm text-rose-200">The primary bottleneck was <strong className="text-rose-400">{DEMO_WEEKLY_AUDIT.primaryBottleneck}</strong>. It cost you approximately 6 hours of high-focus time.</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
