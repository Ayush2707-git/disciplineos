'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Helper to generate fake heatmap data
function generateHeatmap() {
  const weeks = 13;
  const days = 7;
  const data = [];
  
  const today = new Date();
  
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      // Don't generate future days in the current week
      if (w === weeks - 1 && d > today.getDay()) break;
      
      const date = new Date(today);
      date.setDate(date.getDate() - ((weeks - 1 - w) * 7 + (today.getDay() - d)));
      
      // Random score weighted towards higher numbers for "Pro" user vibe
      const rand = Math.random();
      let score = 0;
      if (rand > 0.9) score = Math.floor(Math.random() * 20) + 20; // 20-40 (bad)
      else if (rand > 0.7) score = Math.floor(Math.random() * 20) + 40; // 40-60 (okay)
      else if (rand > 0.3) score = Math.floor(Math.random() * 20) + 60; // 60-80 (good)
      else score = Math.floor(Math.random() * 20) + 80; // 80-100 (great)
      
      data.push({
        date: date.toISOString().split('T')[0],
        score,
        week: w,
        day: d
      });
    }
  }
  return data;
}

export default function ProgressPage() {
  const [heatmap, setHeatmap] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHeatmap(generateHeatmap());
    setMounted(true);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-emerald-500/60';
    if (score >= 40) return 'bg-emerald-500/30';
    return 'bg-emerald-500/10';
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Progress</h2>
        <p className="text-sm text-slate-400 mt-1">Your discipline over time</p>
      </div>

      <section className="stagger-1">
        <h3 className="text-sm font-bold text-slate-300 mb-4">Last 90 Days</h3>
        <div className="glass rounded-2xl p-6 overflow-x-auto">
          {mounted && (
            <div className="min-w-[600px]">
              <div className="flex gap-1">
                {/* Y-axis labels (days) */}
                <div className="flex flex-col gap-1 pr-2 text-[10px] text-slate-500 justify-between py-1">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                
                {/* Heatmap Grid */}
                <div className="flex gap-1 flex-1">
                  {Array.from({ length: 13 }).map((_, weekIdx) => (
                    <div key={`w-${weekIdx}`} className="flex flex-col gap-1 flex-1">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const dayData = heatmap.find(d => d.week === weekIdx && d.day === dayIdx);
                        if (!dayData) return <div key={`empty-${weekIdx}-${dayIdx}`} className="w-full aspect-square rounded-sm bg-transparent" />;
                        
                        return (
                          <div 
                            key={dayData.date}
                            className={cn("w-full aspect-square rounded-sm transition-colors hover:ring-2 hover:ring-white", getScoreColor(dayData.score))}
                            title={`${dayData.date}: ${dayData.score}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end items-center gap-2 mt-4 text-xs text-slate-400">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-emerald-500/10"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500/30"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500/60"></div>
                  <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="stagger-2">
        <h3 className="text-sm font-bold text-slate-300 mb-4">Monday Reset</h3>
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 glow-indigo">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🔄</span>
            <div>
              <h4 className="font-bold text-white">Plan your week</h4>
              <p className="text-xs text-indigo-200 mt-1">Reflect on last week and set intentions</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">What went well last week?</label>
              <textarea 
                className="w-full bg-[#0A0A0F]/50 border border-white/[0.1] rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 outline-none min-h-[80px]"
                placeholder="I managed to do 3 deep work sessions..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">What is the ONE thing you must accomplish this week?</label>
              <input 
                type="text"
                className="w-full bg-[#0A0A0F]/50 border border-white/[0.1] rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
                placeholder="Finish the API integration..."
              />
            </div>
            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl transition-colors">
              Commit for the week
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
