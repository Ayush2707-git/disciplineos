'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Compass, Clock, ShieldAlert, GitMerge } from 'lucide-react';

// --- Subcomponents for Cinematic Effects ---

function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000000]">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.05 }} />
      
      {/* Moving Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, -50, 0, 50, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#0070F3]/15 rounded-full blur-[150px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [0, -60, 0, 60, 0],
          y: [0, 60, 0, -60, 0],
          scale: [1, 0.9, 1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-[#7928CA]/15 rounded-full blur-[150px] mix-blend-screen"
      />
    </div>
  );
}

function Dashboard3DPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-5xl mx-auto mt-24 rounded-t-3xl border border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,112,243,0.15)] overflow-hidden"
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Window Controls */}
      <div className="h-12 border-b border-white/[0.04] flex items-center px-6 gap-2">
        <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
        <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
        <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
      </div>

      {/* App Content Fake */}
      <div className="p-8 grid grid-cols-12 gap-8 h-[600px]" style={{ transform: "translateZ(30px)" }}>
        {/* Sidebar */}
        <div className="col-span-3 space-y-4">
          <div className="h-8 w-24 bg-white/[0.05] rounded-md mb-8" />
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-10 w-full bg-white/[0.03] rounded-lg" />
          ))}
        </div>
        
        {/* Main Content */}
        <div className="col-span-9 space-y-8">
          <div className="h-48 rounded-2xl bg-gradient-to-br from-[#0070F3]/10 to-[#7928CA]/5 border border-[#0070F3]/20 p-6 flex flex-col justify-end">
            <div className="text-xs text-[#0070F3] font-mono mb-2">FUTURE SELF SIMULATOR</div>
            <div className="h-8 w-64 bg-white/[0.1] rounded-md mb-4" />
            <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-gradient-to-r from-[#0070F3] to-[#7928CA] rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="h-64 rounded-2xl bg-[#12121A] border border-white/[0.04]" />
            <div className="h-64 rounded-2xl bg-[#12121A] border border-white/[0.04]" />
          </div>
        </div>
      </div>
      
      {/* Bottom fade out gradient */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#000000] to-transparent" />
    </motion.div>
  );
}

// --- Main Page Component ---

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yNavBg = useTransform(scrollYProgress, [0, 0.1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const borderNav = useTransform(scrollYProgress, [0, 0.1], ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]);

  const [couponCode, setCouponCode] = useState('');
  const isCouponValid = couponCode.trim().toUpperCase() === 'AYUSHGRAVITY27';

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 selection:bg-[#0070F3]/30 selection:text-[#0070F3]">
      <AuroraBackground />

      {/* Premium Navbar */}
      <motion.nav 
        style={{ backgroundColor: yNavBg, borderBottomColor: borderNav }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span className="font-mono font-bold text-sm text-black">D</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">DisciplineOS</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/onboarding" className="group relative px-5 py-2.5 text-sm font-semibold text-white overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md transition-all hover:bg-white hover:text-black">
              <span className="relative z-10 flex items-center gap-2">
                Start Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-48 pb-20 px-6 flex flex-col items-center justify-center text-center perspective-[2000px]">
          <motion.div 
            initial="hidden" animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-5xl mx-auto w-full"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 mb-8 text-xs font-mono text-[#0070F3] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0070F3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0070F3]"></span>
              </span>
              INTRODUCING V2: THE LIFE DIRECTION ENGINE
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#888888]">
                Is your behavior moving<br className="hidden md:block"/> you toward the life you want?
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              We killed the habit tracker. DisciplineOS mathematically proves the cost of your inaction and projects your future self based on your daily decisions.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link href="/onboarding" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Launch Simulator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-20"
          >
            <Dashboard3DPreview />
          </motion.div>
        </section>

        {/* BENTO GRID: FEATURES */}
        <section className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-24 md:w-2/3"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                Intelligence, <br/><span className="text-slate-500">not data entry.</span>
              </h2>
              <p className="text-xl text-slate-400 font-light">
                Every generic productivity feature has been replaced with a system that creates emotional leverage and behavior change.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
              
              {/* Feature 1: Future Self */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#111111] to-[#050505] border border-white/[0.05] rounded-[2rem] p-10 relative overflow-hidden group hover:border-[#0070F3]/30 transition-colors"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070F3]/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#0070F3]/25 transition-colors" />
                <Compass className="w-10 h-10 text-[#0070F3] mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Future Self Simulator</h3>
                <p className="text-lg text-slate-400 mb-10 max-w-md">
                  Stop looking at what you did. Look at where you are going. The engine constantly calculates your ETA to your goal identity.
                </p>
                {/* Mock UI */}
                <div className="bg-[#000000] border border-white/[0.05] rounded-2xl p-6 relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-sm text-slate-500 font-mono">ETA: AI ENGINEER</div>
                    <div className="text-2xl font-bold text-white">18 months</div>
                  </div>
                  <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} whileInView={{ width: "65%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#0070F3] to-[#7928CA] rounded-full" 
                    />
                  </div>
                  <div className="mt-4 text-xs text-emerald-400 font-mono">
                    ↳ If study +1h/day = 13 months
                  </div>
                </div>
              </motion.div>

              {/* Feature 2: Reality Gap */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-[#111111] border border-white/[0.05] rounded-[2rem] p-8 flex flex-col justify-between group hover:border-white/[0.1] transition-colors overflow-hidden relative"
              >
                <div className="relative z-10">
                  <GitMerge className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Reality Gap</h3>
                  <p className="text-slate-400 text-sm">A brutal side-by-side comparison of who you claim to be vs. who your actions prove you are.</p>
                </div>
                <div className="mt-8 flex gap-2 relative z-10">
                  <div className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 text-center">
                    <div className="text-[10px] text-slate-500 mb-1">TARGET</div>
                    <div className="text-xs font-bold text-white">Builder</div>
                  </div>
                  <div className="flex-1 bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 text-center">
                    <div className="text-[10px] text-rose-500/50 mb-1">ACTUAL</div>
                    <div className="text-xs font-bold text-rose-400">Consumer</div>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3: Discipline Debt */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="bg-[#111111] border border-white/[0.05] rounded-[2rem] p-8 flex flex-col justify-between group hover:border-white/[0.1] transition-colors"
              >
                <div>
                  <Clock className="w-8 h-8 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Discipline Debt</h3>
                  <p className="text-slate-400 text-sm">Every missed commitment accumulates debt. See the exact cost in lost opportunities.</p>
                </div>
                <div className="mt-8">
                  <div className="text-3xl font-mono font-bold text-amber-500">18h</div>
                  <div className="text-xs text-amber-500/70 uppercase">Study Debt</div>
                </div>
              </motion.div>

              {/* Feature 4: Bottlenecks */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="md:col-span-3 bg-[#111111] border border-white/[0.05] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 hover:border-white/[0.1] transition-colors"
              >
                <div className="md:w-1/2">
                  <ShieldAlert className="w-10 h-10 text-rose-500 mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4">Bottleneck Detection</h3>
                  <p className="text-slate-400 text-lg">The AI identifies the single highest-impact behavior ruining your trajectory, and suggests the exact fix.</p>
                </div>
                <div className="md:w-1/2 w-full bg-[#000000] rounded-2xl border border-white/[0.05] p-6">
                  <div className="text-xs font-bold text-rose-500 tracking-wider mb-2">PRIMARY BOTTLENECK</div>
                  <div className="text-xl font-bold text-white mb-1">Phone Usage</div>
                  <div className="text-sm text-slate-400 mb-6">-47 productive hours/month</div>
                  
                  <div className="text-xs font-bold text-[#0070F3] tracking-wider mb-2">SUGGESTED FIX</div>
                  <div className="text-sm text-white mb-1">Block social media after 9 PM</div>
                  <div className="text-sm text-[#0070F3]">+29 study hours/month expected</div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-40 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Access the Engine.</h2>
              <p className="text-xl text-slate-400 font-light">
                Do not pay for tracking. Pay for a system that forces transformation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Foundation Tier */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-[#0A0A0A] border border-white/[0.05] p-10 rounded-[2rem] flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2 text-white">Foundation</h3>
                <div className="text-5xl font-bold text-white mb-8">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                <ul className="space-y-5 mb-10 flex-1">
                  {['Daily Logging', 'Highest Leverage Action', 'Basic Identity Progression', 'Discipline Debt Tracking'].map(item => (
                    <li key={item} className="flex gap-4 text-slate-400 items-start text-sm">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/onboarding" className="w-full py-4 text-center border border-white/[0.1] hover:bg-white text-white hover:text-black rounded-full font-bold transition-colors">
                  Start Free
                </Link>
              </motion.div>

              {/* Operating System Tier */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-white p-10 rounded-[2rem] flex flex-col relative overflow-hidden shadow-2xl shadow-white/5"
              >
                <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">PRO</div>
                <h3 className="text-xl font-bold mb-2 text-black">Operating System</h3>
                <div className="text-5xl font-bold text-black mb-8">
                  {isCouponValid ? '$0' : '$15'}
                  <span className="text-lg text-slate-500 font-normal">/mo</span>
                </div>
                <ul className="space-y-5 mb-8 flex-1">
                  {['Future Self Simulator', 'Reality Gap Engine', 'Personal Operating Manual', 'Weekly Life Audits', 'Bottleneck Detection'].map((item, i) => (
                    <li key={item} className="flex gap-4 text-slate-700 items-start text-sm font-medium">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl text-black bg-slate-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                  {isCouponValid && (
                    <p className="text-xs text-emerald-600 mt-2 font-bold flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      100% discount applied!
                    </p>
                  )}
                </div>
                <Link href="/onboarding" className="w-full py-4 text-center bg-black hover:bg-slate-800 text-white rounded-full font-bold transition-colors shadow-lg shadow-black/10">
                  {isCouponValid ? 'Start Free Pro' : 'Get Pro'}
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Cinematic Footer */}
        <footer className="py-20 text-center border-t border-white/[0.05] relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
              <span className="font-mono font-bold text-[10px] text-black">D</span>
            </div>
            <span className="font-bold tracking-tight text-white">DisciplineOS</span>
          </div>
          <p className="text-sm text-slate-500 font-mono tracking-wider">SYSTEM v2.0.0</p>
        </footer>
      </main>
    </div>
  );
}
