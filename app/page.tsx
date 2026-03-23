'use client';

import React from 'react';
import { ChevronRight, Check, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white italic">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(234,88,12,0.4)]">
            <Zap size={22} fill="white" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">NEXYRA</span>
        </div>
        <div className="flex gap-8 items-center">
          <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Sign In</Link>
          <Link href="/login" className="bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl">Get Started</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-40 text-center px-6">
        <h1 className="text-[90px] md:text-[130px] font-black leading-[0.8] tracking-[-0.07em] mb-12 uppercase italic">
          CODE <span className="text-orange-600">FASTER.</span><br />BUILD BETTER.
        </h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-16 font-bold uppercase tracking-tight italic">
          Nexyra Engine automates the boring parts of Roblox development. 
          The most powerful AI tool for creators is here.
        </p>
        <Link href="/login" className="orange-btn text-white px-12 py-6 rounded-full font-black text-xl uppercase tracking-widest inline-flex items-center gap-4 shadow-2xl active:scale-95">
          Start for Free <ArrowRight size={24} />
        </Link>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-32 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-20 uppercase italic tracking-tighter">Choose your <span className="text-orange-600">Plan</span></h2>
          
          <div className="space-y-6">
            {/* HOBBY PLAN */}
            <div className="rebirth-card p-10 flex justify-between items-center group cursor-pointer hover:bg-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-orange-500/50 transition-all">
                   <div className="w-4 h-4 rounded-full border-2 border-white/20"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic">Hobby</h3>
                  <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest italic">100 prompts / month</p>
                </div>
              </div>
              <div className="text-right italic">
                <span className="text-4xl font-black">$8.99</span>
                <span className="text-gray-600 text-sm font-bold uppercase tracking-widest ml-1">/mo</span>
              </div>
            </div>

            {/* PRO PLAN */}
            <div className="relative group">
              <div className="absolute -top-4 right-10 bg-orange-600 text-[10px] font-black uppercase px-5 py-1.5 rounded-full z-10 tracking-[0.2em] shadow-xl italic">Best Value</div>
              <div className="rebirth-card p-10 border-orange-600/50 flex justify-between items-center cursor-pointer shadow-[0_0_60px_rgba(234,88,12,0.1)] hover:bg-white/[0.02]">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
                     <Check size={28} color="white" strokeWidth={4} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase italic">Pro</h3>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest italic">300 prompts / month <span className="text-orange-600 ml-2">3X VALUE</span></p>
                  </div>
                </div>
                <div className="text-right italic">
                  <span className="text-4xl font-black">$15.99</span>
                  <span className="text-gray-600 text-sm font-bold uppercase tracking-widest ml-1">/mo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-5">
             {[
               "Catches and fixes bugs automatically",
               "Direct support from founders",
               "Private Discord access",
               "Cancel anytime"
             ].map((text, i) => (
               <div key={i} className="flex items-center gap-4 text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] italic">
                 <Check size={16} className="text-orange-600" strokeWidth={3}/> {text}
               </div>
             ))}
          </div>

          <button className="w-full mt-12 orange-btn text-white py-7 rounded-[30px] font-black text-xl uppercase tracking-[0.2em] shadow-2xl active:scale-95">
            Upgrade to Pro
          </button>
        </div>
      </section>
    </div>
  );
}