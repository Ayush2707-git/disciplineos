'use client';

import { DEMO_USER } from '@/lib/demo-data';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-slide-up max-w-2xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        <section className="glass rounded-2xl p-6 stagger-1">
          <h3 className="text-sm font-bold text-slate-300 mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input 
                type="text" 
                defaultValue={DEMO_USER.name}
                className="w-full bg-[#1A1A2E] border border-white/[0.08] rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" 
                defaultValue={DEMO_USER.email}
                disabled
                className="w-full bg-[#0A0A0F] border border-white/[0.04] rounded-xl px-4 py-2.5 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        <section className="glass rounded-2xl p-6 stagger-2">
          <h3 className="text-sm font-bold text-slate-300 mb-4">Subscription</h3>
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-indigo-400 capitalize">{DEMO_USER.tier} Plan</div>
              <div className="text-sm text-slate-400 mt-0.5">$12/mo, renews on Jul 15, 2026</div>
            </div>
            <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-400 transition-colors">
              Manage
            </button>
          </div>
        </section>

        <section className="glass rounded-2xl p-6 border-rose-500/10 stagger-3">
          <h3 className="text-sm font-bold text-rose-400 mb-2">Danger Zone</h3>
          <p className="text-sm text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-sm font-medium rounded-lg hover:bg-rose-500 hover:text-white transition-colors">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
