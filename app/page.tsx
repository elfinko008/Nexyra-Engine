'use client';

import React, { useState } from 'react';
import { 
  Zap, ChevronRight, Plus, Cpu, Shield, Globe, 
  Code2, Sparkles, Rocket, Check, Minus, ShoppingCart,
  Layers, Terminal, MousePointer2, Star
} from 'lucide-react';
import Link from 'next/link';

export default function NexyraHome() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen italic selection:bg-purple-500/30">
      
      {/* 🌌 NAVIGATION */}
      <nav className="flex items-center justify-between px-12 py-8 border-b border-white/5 backdrop-blur-xl sticky top-0 z-50 bg-[#050506]/80">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#8b5cf6] rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-transform group-hover:scale-110">
            <Zap size={22} fill="white" color="white" />
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase italic">NEXYRA</span>
        </div>
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <a href="#tutorial" className="hover:text-purple-400 transition-colors">Tutorial</a>
          <a href="#features" className="hover:text-purple-400 transition-colors">Technology</a>
          <a href="#shop" className="hover:text-purple-400 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-purple-400 transition-colors">Help</a>
        </div>
        <div className="flex gap-6">
          <Link href="/dashboard" className="bg-white text-black px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#8b5cf6] hover:text-white transition-all shadow-lg active:scale-95">
            Initialize Engine
          </Link>
        </div>
      </nav>

      {/* 🚀 HERO SECTION */}
      <section className="pt-40 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10"></div>
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
           Next-Gen AI Protocol v4.0 Platinum
        </div>
        <h1 className="text-[120px] font-black leading-[0.8] tracking-[-0.07em] mb-16 uppercase italic">
          BUILD <span className="text-[#8b5cf6]">BETTER</span><br />GAMES FAST.
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-20 font-medium leading-relaxed italic">
          Nexyra Engine is the premier neural interface for Roblox developers. 
          Turn complex ideas into high-performance Luau code in milliseconds.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Link href="/dashboard" className="bg-[#8b5cf6] text-white px-14 py-7 rounded-[35px] font-black text-2xl shadow-[0_30px_70px_rgba(139,92,246,0.4)] hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(139,92,246,0.5)] transition-all flex items-center gap-4 uppercase">
            Start Coding <Rocket size={28} />
          </Link>
          <div className="flex -space-x-4">
             {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#050506] bg-gray-800" />)}
             <div className="pl-8 text-left">
                <p className="text-white font-black text-sm uppercase">Join 75,000+</p>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Developers worldwide</p>
             </div>
          </div>
        </div>
      </section>

      {/* 📖 DETAILED TUTORIAL */}
      <section id="tutorial" className="py-40 px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-24">
           <h2 className="text-6xl font-black mb-6 uppercase tracking-tighter italic">How to <span className="text-[#8b5cf6]">Command</span></h2>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Mastering the Neural Interface</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "01", icon: <Terminal size={32}/>, title: "Initialize", desc: "Open the Nexyra Dashboard and describe your vision in plain English." },
            { step: "02", icon: <Layers size={32}/>, title: "Specify Logic", desc: "Define variables like 'Damage: 50' or 'Cooldown: 2s' for precision." },
            { step: "03", icon: <Sparkles size={32}/>, title: "Neural Sync", desc: "Our Claude 3.5 Platinum Engine processes and optimizes your script." },
            { step: "04", icon: <MousePointer2 size={32}/>, title: "Inject Code", desc: "Copy the output and paste it directly into your Roblox Studio project." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d0f] p-12 rounded-[45px] border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
              <div className="text-purple-500 mb-8 transition-transform group-hover:scale-110 duration-500">{item.icon}</div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed italic text-sm">{item.desc}</p>
              <div className="absolute bottom-6 right-8 text-4xl font-black text-white/5">{item.step}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 LIVE STATISTICS (Numbers) */}
      <section className="py-32 px-12 bg-gradient-to-b from-[#08080a] to-[#050506]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center italic">
          {[
            { label: "AI-Generated Roblox Games", val: "75,000+", sub: "Globally Active" },
            { label: "Neural Scripts Daily", val: "5,000+", sub: "Real-time Processing" },
            { label: "Robux Earned by Users", val: "3.2M+", sub: "Monetized Content" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <h3 className="text-8xl font-black mb-4 tracking-tighter text-white uppercase transition-colors group-hover:text-purple-500">{stat.val}</h3>
              <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[11px] mb-2">{stat.label}</p>
              <p className="text-purple-500/50 font-bold uppercase tracking-[0.1em] text-[9px]">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 WHY NEXYRA? TECHNOLOGY SECTION */}
      <section id="features" className="py-40 px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20 items-center">
           <div className="md:w-1/2">
              <h2 className="text-7xl font-black mb-10 uppercase tracking-tighter italic leading-[0.9]">Why <span className="text-purple-500">Nexyra</span> Labs?</h2>
              <div className="space-y-10">
                 {[
                   { t: "Neural Processing", d: "Powered by Claude 3.5 Sonnet for unparalleled Luau logic.", i: <Cpu/> },
                   { t: "Backdoor Shield", d: "Every script is audited for security risks and malicious code.", i: <Shield/> },
                   { t: "Universal Sync", d: "Works seamlessly across all Roblox Studio versions and APIs.", i: <Globe/> }
                 ].map((f, i) => (
                   <div key={i} className="flex gap-8">
                      <div className="w-16 h-16 rounded-[20px] bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">{f.i}</div>
                      <div>
                         <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight">{f.t}</h4>
                         <p className="text-gray-500 text-sm font-medium italic">{f.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="md:w-1/2 relative">
              <div className="absolute -inset-10 bg-purple-500/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-[#0d0d0f] border border-white/10 p-12 rounded-[50px] shadow-2xl overflow-hidden">
                 <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <pre className="font-mono text-xs text-purple-300/70 leading-relaxed">
                    <code>{`-- Nexyra Engine v4.0.2
local Players = game:GetService("Players")
local NexyraEngine = {}

function NexyraEngine.Initialize(user)
    print("User Sync: " .. user.Name)
    -- Neural Combat System Loading...
    return true
end`}</code>
                 </pre>
              </div>
           </div>
        </div>
      </section>

      {/* 🛒 PRO SHOP / PRICING */}
      <section id="shop" className="py-40 px-12 bg-[#08080a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full"></div>
        <h2 className="text-6xl font-black mb-24 text-center uppercase tracking-tighter italic">Engine <span className="text-[#8b5cf6]">Plans</span></h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { plan: "Standard", price: "$0", feats: ["5 Daily Credits", "Standard API Speed", "Community Support", "Basic Logic Gen"], color: "bg-white/5", text: "text-white" },
            { plan: "Platinum", price: "$19", feats: ["100 Daily Credits", "Turbo Engine Speed", "Priority Neural Sync", "Advanced Combat AI", "Discord Role"], color: "bg-[#8b5cf6]", text: "text-white", hot: true },
            { plan: "Enterprise", price: "$59", feats: ["Unlimited Credits", "Instant Generation", "Custom Model Training", "Private Support Channel", "Beta Access"], color: "bg-white/5", text: "text-white" }
          ].map((item, i) => (
            <div key={i} className={`${item.color} p-14 rounded-[50px] border border-white/5 flex flex-col items-center hover:-translate-y-4 transition-all duration-500 relative`}>
              {item.hot && <div className="absolute -top-5 bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest italic shadow-xl">Most Popular</div>}
              <h3 className="text-2xl font-black uppercase mb-4 italic tracking-widest opacity-60">{item.plan}</h3>
              <div className="text-7xl font-black mb-16 tracking-tighter italic">{item.price}<span className="text-sm opacity-40">/mo</span></div>
              <ul className="space-y-6 w-full mb-20">
                {item.feats.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-xs font-black uppercase tracking-tight italic opacity-80"><Check size={18} className="text-inherit" /> {f}</li>
                ))}
              </ul>
              <button className="w-full py-6 bg-white text-black rounded-[25px] font-black uppercase italic tracking-[0.2em] text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                <ShoppingCart size={18}/> Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ EXPANDABLE FAQ */}
      <section id="faq" className="py-40 px-12 max-w-4xl mx-auto">
        <div className="text-center mb-24">
           <h2 className="text-7xl font-black uppercase tracking-tighter italic text-[#8b5cf6]">Support</h2>
           <p className="text-gray-600 font-bold uppercase tracking-widest text-xs mt-4 italic">Frequently Asked Questions</p>
        </div>
        <div className="space-y-6">
          {[
            { q: "Do I need coding skills to use Nexyra?", a: "Absolutely not. Nexyra is designed to translate your creative ideas into fully functional Luau code without you typing a single line of script." },
            { q: "How do credits work in the Engine?", a: "Every time you generate a complex system, 1 credit is consumed. Free users get 5 daily, while Platinum users enjoy up to 100 per day." },
            { q: "Is the generated code optimized for mobile?", a: "Yes. Our neural models prioritize efficiency, ensuring your scripts run smoothly on PC, Mobile, and Console." },
            { q: "Can I cancel my Platinum subscription?", a: "Of course. You can manage your subscription at any time through the dashboard settings with no hidden fees." }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d0f] border border-white/5 p-10 rounded-[35px] cursor-pointer group hover:border-purple-500/30 transition-all" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex justify-between items-center">
                <span className="font-black uppercase text-xl group-hover:text-purple-400 italic tracking-tighter transition-colors">{item.q}</span>
                {openFaq === i ? <Minus size={24} className="text-purple-500"/> : <Plus size={24} className="text-gray-700 group-hover:text-white"/>}
              </div>
              {openFaq === i && (
                <div className="mt-8 text-gray-500 font-medium leading-relaxed italic animate-in fade-in slide-in-from-top-2 border-t border-white/5 pt-8">
                   {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🌑 FOOTER */}
      <footer className="border-t border-white/5 py-40 px-12 bg-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-32">
          <div className="space-y-10 max-w-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#8b5cf6] rounded-xl flex items-center justify-center font-black">N</div>
              <span className="font-black italic tracking-tighter text-2xl uppercase italic">NEXYRA LABS</span>
            </div>
            <p className="text-gray-700 font-bold text-xs uppercase leading-relaxed tracking-[0.2em] italic">
              Empowering the next generation of Roblox developers through neural code synthesis. 
            </p>
            <div className="flex gap-6 text-gray-700">
               <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:text-white hover:border-purple-500 transition-all cursor-pointer"><Star size={20}/></div>
               <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:text-white hover:border-purple-500 transition-all cursor-pointer"><Rocket size={20}/></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
            <div className="space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800">System</p>
              <a href="#" className="block text-sm font-bold text-gray-600 hover:text-purple-400 italic transition-colors">Neural Core</a>
              <a href="#" className="block text-sm font-bold text-gray-600 hover:text-purple-400 italic transition-colors">API Status</a>
              <a href="#" className="block text-sm font-bold text-gray-600 hover:text-purple-400 italic transition-colors">Patch Notes</a>
            </div>
            <div className="space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800">Company</p>
              <a href="#" className="block text-sm font-bold text-gray-600 hover:text-purple-400 italic transition-colors">Terms of Service</a>
              <a href="#" className="block text-sm font-bold text-gray-600 hover:text-purple-400 italic transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm font-bold text-gray-600 hover:text-purple-400 italic transition-colors">Contact</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-20 border-t border-white/5 flex flex-col md:row justify-between gap-10">
           <p className="text-[9px] font-black uppercase tracking-[0.8em] text-gray-800">
             © 2026 NEXYRA LABS — ALL RIGHTS RESERVED
           </p>
           <div className="flex gap-10 text-gray-800 text-[9px] font-black uppercase tracking-widest italic">
              <span>Latency: 14ms</span>
              <span>Region: US-EAST-1</span>
              <span>Build: v4.0.2-PLATINUM</span>
           </div>
        </div>
      </footer>
    </div>
  );
}