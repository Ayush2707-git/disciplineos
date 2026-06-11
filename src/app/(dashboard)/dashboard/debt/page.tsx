'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingDown, AlertCircle } from 'lucide-react';
import { DEMO_DEBT } from '@/lib/demo-data';

export default function DebtPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const totalDebt = DEMO_DEBT.reduce((acc, curr) => acc + curr.accumulatedHours, 0);

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Discipline Debt</h1>
          <p className="text-slate-400">The accumulated cost of your missed commitments.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-[#150505] border border-rose-500/20 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none" />
          <div className="text-sm font-bold text-rose-500 mb-1 tracking-wider uppercase">Total Outstanding</div>
          <div className="text-4xl font-mono font-bold text-white">{totalDebt}h</div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="md:col-span-2 bg-[#111111] border border-white/[0.05] rounded-3xl p-6 flex flex-col justify-center">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Amortization Required</h3>
              <p className="text-sm text-slate-400">
                To clear this debt before the end of the quarter, you must execute an additional <strong className="text-white">45 minutes</strong> of high-leverage action per day.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Debt Ledger</h3>
        <div className="space-y-4">
          {DEMO_DEBT.map((debt) => (
            <div key={debt.id} className="bg-[#111111] border border-white/[0.04] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/[0.1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <div>
                  <div className="font-bold text-lg text-white">{debt.category}</div>
                  <div className="text-sm text-slate-500">Currently delaying goals by {debt.opportunityCostDays} days</div>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <div>
                  <div className="text-sm text-slate-500 font-bold tracking-wider mb-1 uppercase">Principal</div>
                  <div className="text-2xl font-mono font-bold text-rose-400">{debt.accumulatedHours}h</div>
                </div>
                <button className="h-10 px-4 bg-white/[0.05] hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 rounded-lg text-sm font-bold border border-transparent hover:border-emerald-500/30 transition-all flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Pay Down
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
