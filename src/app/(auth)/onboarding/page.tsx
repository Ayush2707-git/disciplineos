'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Brain, ShieldCheck, Rocket, BookOpen, GraduationCap, Coins, Book, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { setupIdentity } from '@/app/actions/user';

const IDENTITY_TEMPLATES = [
  { id: 'builder', icon: Rocket, title: 'Creator & Builder', description: 'Ship projects and products consistently' },
  { id: 'athlete', icon: ShieldCheck, title: 'Athlete', description: 'Train consistently and peak physical health' },
  { id: 'expert', icon: Brain, title: 'Domain Expert', description: 'Deep, uninterrupted focus and mastery' },
  { id: 'scholar', icon: GraduationCap, title: 'Scholar', description: 'Ace a competitive exam or certification' },
  { id: 'investor', icon: Coins, title: 'Wealth Builder', description: 'Master financial discipline and investing' },
  { id: 'polymath', icon: Book, title: 'Polymath', description: 'Read, learn, and synthesize multiple fields' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedIdentity, setSelectedIdentity] = useState<string | null>(null);
  const [customIdentity, setCustomIdentity] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleContinue = () => {
    if (step === 1 && (selectedIdentity || customIdentity)) {
      setStep(2);
    } else if (step === 2) {
      const identity = selectedIdentity || customIdentity;
      startTransition(async () => {
        await setupIdentity(identity, "New User");
        window.location.href = '/dashboard';
      });
    }
  };

  const fadeVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col items-center justify-center px-6 relative overflow-hidden selection:bg-[#0070F3]/30 selection:text-[#0070F3]">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0070F3]/10 rounded-full blur-[128px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#7928CA]/5 rounded-full blur-[128px] mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl z-10"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <span className="font-mono font-bold text-sm text-black">D</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">DisciplineOS</span>
            </div>
          </Link>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="relative w-16 h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#0070F3]" 
              initial={{ width: "0%" }}
              animate={{ width: step >= 1 ? "100%" : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="relative w-16 h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#0070F3]" 
              initial={{ width: "0%" }}
              animate={{ width: step >= 2 ? "100%" : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="text-center mb-10">
                  <div className="text-xs font-mono font-bold text-[#0070F3] mb-2 uppercase tracking-wider">Step 1</div>
                  <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Who do you want to become?</h1>
                  <p className="text-slate-400 font-light">
                    The engine calculates your trajectory based on a specific target identity. Pick yours.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {IDENTITY_TEMPLATES.map((identity) => {
                    const isSelected = selectedIdentity === identity.id;
                    const Icon = identity.icon;
                    return (
                      <motion.button
                        key={identity.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedIdentity(identity.id);
                          setCustomIdentity('');
                        }}
                        className={cn(
                          "p-5 rounded-2xl border text-left transition-colors duration-300 relative overflow-hidden",
                          isSelected
                            ? "bg-[#0070F3]/10 border-[#0070F3]/50"
                            : "bg-[#111111] border-white/[0.06] hover:bg-white/[0.04]"
                        )}
                      >
                        {isSelected && (
                          <motion.div layoutId="selection-glow" className="absolute inset-0 bg-[#0070F3]/5" />
                        )}
                        <Icon className={cn("w-6 h-6 mb-3", isSelected ? "text-[#0070F3]" : "text-slate-500")} />
                        <span className={cn("block text-sm font-bold mb-1", isSelected ? "text-white" : "text-slate-200")}>{identity.title}</span>
                        <span className="block text-xs text-slate-500 leading-relaxed">{identity.description}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mb-8 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/[0.06]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#0A0A0A] text-xs text-slate-600 uppercase tracking-wider font-semibold">Or</span>
                  </div>
                </div>

                <div className="mb-8">
                  <input
                    type="text"
                    value={customIdentity}
                    onChange={(e) => {
                      setCustomIdentity(e.target.value);
                      setSelectedIdentity(null);
                    }}
                    placeholder="Enter custom identity (e.g. Founder)"
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-5 py-4 text-slate-100 placeholder:text-slate-600 focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] outline-none transition-all text-sm font-medium"
                  />
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!selectedIdentity && !customIdentity}
                  className="w-full bg-white hover:bg-slate-200 text-black disabled:bg-white/10 disabled:text-white/30 rounded-xl px-6 py-4 font-bold transition-all flex items-center justify-center gap-2 group"
                >
                  Configure Engine
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="text-center mb-10">
                  <div className="text-xs font-mono font-bold text-[#0070F3] mb-2 uppercase tracking-wider">Step 2</div>
                  <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">System Initialization.</h1>
                  <p className="text-slate-400 font-light">
                    The engine is ready. Here is what happens next.
                  </p>
                </div>

                <div className="space-y-4 mb-10">
                  {[
                    {
                      title: 'Future Self Simulator',
                      description: 'We calculate the mathematical trajectory to your target identity based on today\'s actions.',
                    },
                    {
                      title: 'Reality Gap Engine',
                      description: 'We expose the brutal difference between who you want to be, and who you actually are.',
                    },
                    {
                      title: 'Discipline Debt',
                      description: 'Missed commitments are logged as debt. You will pay for them in delayed success.',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/[0.04]"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0 border border-white/[0.05]">
                        <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{item.title}</h3>
                        <p className="text-sm text-slate-400 mt-1 font-light leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={handleContinue}
                  disabled={isPending}
                  className="w-full bg-[#0070F3] hover:bg-[#0070F3]/80 disabled:opacity-50 text-white rounded-xl px-6 py-4 font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0070F3]/20"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booting Pro OS...
                    </span>
                  ) : (
                    <>
                      Launch Pro OS
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep(1)}
                  disabled={isPending}
                  className="w-full text-slate-500 hover:text-slate-300 text-sm mt-6 font-medium transition-colors"
                >
                  ← Back to Identity Selection
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
