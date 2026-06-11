'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Clock, ShieldAlert, Target, ArrowRight, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { completeLeverageAction } from '@/app/actions/user';
import { 
  DEMO_IDENTITY, 
  DEMO_FUTURE_SELF, 
  DEMO_DEBT, 
  DEMO_BOTTLENECK, 
  DEMO_LEVERAGE_ACTION 
} from '@/lib/demo-data';

export default function CompassDashboard() {
  const [actionCompleted, setActionCompleted] = useState(DEMO_LEVERAGE_ACTION.completed);
  const [isPending, startTransition] = useTransition();

  const handleActionToggle = () => {
    if (isPending) return;
    
    // Optimistic UI update
    const previousState = actionCompleted;
    setActionCompleted(!previousState);

    startTransition(async () => {
      const result = await completeLeverageAction(DEMO_LEVERAGE_ACTION.id, previousState);
      if (!result.success) {
        // Revert on failure
        setActionCompleted(previousState);
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">The Compass</h1>
          <p className="text-slate-400">Your current trajectory and highest leverage action.</p>
        </div>
        <div className="text-sm font-mono text-slate-500 bg-[#111111] px-4 py-2 rounded-lg border border-white/[0.05]">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Simulator & Action */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Future Self Simulator */}
          <motion.section variants={itemVariants} className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-[#0070F3]/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070F3]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 flex items-center justify-center border border-[#0070F3]/20">
                <Compass className="w-5 h-5 text-[#0070F3]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Future Self Simulator</h2>
                <div className="text-sm font-mono text-[#0070F3] uppercase tracking-wider mt-0.5">Engine Active</div>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              {/* Target Identity */}
              <div className="bg-[#111111] border border-white/[0.05] rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-500 font-bold tracking-wider mb-1 uppercase">Target Identity</div>
                  <div className="text-2xl font-bold text-white">{DEMO_IDENTITY.targetIdentity}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-bold tracking-wider mb-1 uppercase">Deadline</div>
                  <div className="text-lg font-mono text-slate-300">Dec 2027</div>
                </div>
              </div>

              {/* Trajectory */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Current Trajectory</div>
                  <div className="text-3xl font-mono font-bold text-white">{DEMO_FUTURE_SELF.currentETA}</div>
                </div>
                
                <div className="relative h-3 w-full bg-[#111111] rounded-full overflow-hidden border border-white/[0.05]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${DEMO_FUTURE_SELF.progressPercentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" as const }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0070F3] to-[#7928CA] rounded-full"
                  />
                  {/* Target marker */}
                  <div className="absolute top-0 left-[80%] w-0.5 h-full bg-white shadow-[0_0_8px_white]" />
                </div>
                
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Progress: {DEMO_FUTURE_SELF.progressPercentage}%</span>
                  <span className="text-rose-400">Delayed by 3 months (Debt)</span>
                </div>
              </div>

              {/* "If" Scenario */}
              <div className="bg-[#0070F3]/5 border border-[#0070F3]/20 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0070F3] animate-pulse" />
                  <span className="text-sm font-medium text-slate-300">
                    If <strong className="text-white">{DEMO_FUTURE_SELF.ifCondition}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className="text-lg font-mono font-bold text-[#0070F3]">{DEMO_FUTURE_SELF.ifETA}</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Highest Leverage Action */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-white tracking-tight">Today's Leverage Action</h2>
            </div>
            
            <motion.div 
              layout
              onClick={handleActionToggle}
              className={cn(
                "group relative p-6 rounded-3xl border transition-all duration-300 overflow-hidden",
                isPending ? "cursor-wait opacity-80" : "cursor-pointer",
                actionCompleted 
                  ? "bg-[#051510] border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                  : "bg-[#0A0A0A] border-white/[0.08] hover:border-[#0070F3]/40 shadow-lg shadow-black/40"
              )}
            >
              {actionCompleted && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none"
                />
              )}
              
              <div className="flex items-start gap-5 relative z-10">
                <button className="mt-1 shrink-0" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="w-8 h-8 text-[#0070F3] animate-spin" />
                  ) : actionCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </motion.div>
                  ) : (
                    <Circle className="w-8 h-8 text-slate-600 group-hover:text-[#0070F3] transition-colors" />
                  )}
                </button>
                
                <div>
                  <h3 className={cn(
                    "text-xl font-bold transition-colors duration-300",
                    actionCompleted ? "text-emerald-50" : "text-white"
                  )}>
                    {DEMO_LEVERAGE_ACTION.title}
                  </h3>
                  <p className={cn(
                    "text-sm mt-2 transition-colors duration-300",
                    actionCompleted ? "text-emerald-500/70" : "text-slate-400"
                  )}>
                    {DEMO_LEVERAGE_ACTION.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>

        </div>

        {/* RIGHT COLUMN: Debt & Bottleneck */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Discipline Debt */}
          <motion.div variants={itemVariants} className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-white">Discipline Debt</h3>
              </div>
              <div className="text-xl font-mono font-bold text-amber-500">{totalDebt}h</div>
            </div>

            <div className="space-y-4">
              {DEMO_DEBT.map((debt) => (
                <div key={debt.id} className="bg-[#111111] rounded-xl p-4 border border-white/[0.04]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-200">{debt.category}</span>
                    <span className="text-sm font-mono text-amber-500">{debt.accumulatedHours}h</span>
                  </div>
                  <div className="text-xs text-rose-400">
                    Cost: Delays goal by {debt.opportunityCostDays} days
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/dashboard/debt" className="block mt-4 text-center text-sm font-semibold text-slate-400 hover:text-white transition-colors py-2 bg-white/[0.03] rounded-lg">
              View Amortization Schedule
            </Link>
          </motion.div>

          {/* Primary Bottleneck */}
          <motion.div variants={itemVariants} className="bg-[#110505] border border-rose-500/20 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6 relative z-10">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-rose-50">Primary Bottleneck</h3>
            </div>

            <div className="relative z-10">
              <div className="text-sm font-bold text-rose-500 tracking-wider mb-1 uppercase">The Leak</div>
              <div className="text-xl font-bold text-white mb-2">{DEMO_BOTTLENECK.primaryIssue}</div>
              <div className="text-sm text-rose-400/80 mb-6 border-l-2 border-rose-500/30 pl-3">
                Costing you {DEMO_BOTTLENECK.hoursLostPerMonth} productive hours/month.
              </div>

              <div className="text-sm font-bold text-emerald-500 tracking-wider mb-1 uppercase">The Fix</div>
              <div className="text-sm text-white mb-2">{DEMO_BOTTLENECK.suggestedFix}</div>
              <div className="text-sm font-mono text-emerald-400 bg-emerald-500/10 inline-block px-2 py-1 rounded">
                +{DEMO_BOTTLENECK.expectedGainHours} hours
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
