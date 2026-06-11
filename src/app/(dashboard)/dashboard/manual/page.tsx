'use client';

import { motion } from 'framer-motion';
import { FileText, Sun, Moon, Zap, AlertTriangle, Coffee } from 'lucide-react';
import { DEMO_OPERATING_MANUAL } from '@/lib/demo-data';

export default function OperatingManualPage() {
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
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Personal Operating Manual</h1>
          <p className="text-slate-400">AI-generated rules for your peak performance, based on your data.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Peak Focus */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-[#0070F3]/20 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0070F3]/10 rounded-full blur-[30px] group-hover:bg-[#0070F3]/20 transition-colors" />
          <Sun className="w-8 h-8 text-[#0070F3] mb-4" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Peak Focus Window</div>
          <div className="text-2xl font-bold text-white">{DEMO_OPERATING_MANUAL.peakFocusWindow}</div>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            You are 2.4x more likely to enter deep work during this window. Protect it at all costs.
          </p>
        </motion.div>

        {/* Minimum Sleep */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-violet-500/20 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-[30px] group-hover:bg-violet-500/20 transition-colors" />
          <Moon className="w-8 h-8 text-violet-400 mb-4" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Minimum Viable Sleep</div>
          <div className="text-2xl font-bold text-white">{DEMO_OPERATING_MANUAL.minimumSleep}</div>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Dropping below this threshold guarantees a 30% drop in next-day output.
          </p>
        </motion.div>

        {/* Worst Trigger */}
        <motion.div variants={itemVariants} className="bg-[#150505] border border-rose-500/20 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-[30px] group-hover:bg-rose-500/20 transition-colors" />
          <AlertTriangle className="w-8 h-8 text-rose-500 mb-4" />
          <div className="text-xs font-bold text-rose-500/70 uppercase tracking-wider mb-1">Worst Trigger</div>
          <div className="text-lg font-bold text-white">{DEMO_OPERATING_MANUAL.worstTrigger}</div>
        </motion.div>

        {/* Distraction Threshold */}
        <motion.div variants={itemVariants} className="bg-[#111111] border border-amber-500/20 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-[30px] group-hover:bg-amber-500/20 transition-colors" />
          <Zap className="w-8 h-8 text-amber-500 mb-4" />
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Distraction Threshold</div>
          <div className="text-lg font-bold text-white">{DEMO_OPERATING_MANUAL.distractionThreshold}</div>
        </motion.div>

        {/* Best Recovery */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-[#051510] border border-emerald-500/20 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[40px] group-hover:bg-emerald-500/10 transition-colors" />
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Coffee className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Optimal Recovery Protocol</div>
            <div className="text-2xl font-bold text-white mb-2">{DEMO_OPERATING_MANUAL.bestRecovery}</div>
            <p className="text-sm text-emerald-100/70">
              When focus drops below 40%, do not attempt to "push through." Execute this protocol.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
