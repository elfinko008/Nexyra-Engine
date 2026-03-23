'use client';

import React, { useState } from 'react';
import { 
  Home, History, Plus, Settings, Zap, Send, Copy, 
  CheckCircle2, Terminal, ChevronRight, LayoutDashboard,
  Cpu, Sparkles, BookOpen, LogOut
} from 'lucide-react';
import Link from 'next/link';

export default function NexyraDashboard() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt || prompt.length < 5) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || "-- Processing Error. Please check your prompt.");
    } catch (err) {
      setResult("-- Critical Engine Failure. Re-sync required.");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#050506] text-white italic overflow-hidden">
      
      {/* 🚀 SIDEBAR */}
      <aside className="w-80 border-r border-white/5 bg-[#08080a] flex flex-col p-8 z-20">
        <div className="flex items-center gap-4 mb-14 group cursor-pointer">
          <div className="w-10 h-10 bg-[#8b5cf6] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:rotate-12 transition-transform">
            <Zap size={22} fill="white" color="white" />
          </div>
          <span className="font-black italic tracking-tighter text-xl uppercase italic">Nexyra</span>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="pb-4 px-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">Main Interface</div>
          <button onClick={() => {setResult(''); setPrompt('');}} className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:bg-white/5 hover:text-white rounded-2xl text-xs font-black transition-all uppercase tracking-widest">
            <Plus size={18} /> New Generation
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 bg-white/5 text-white rounded-2xl text-xs font-black uppercase tracking-widest">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
            <History size={18} /> Script Vault
          </button>

          <div className="pt-10 pb-4 px-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">Knowledge Base</div>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest italic transition-all"><BookOpen size={18} /> Documentation</button>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest italic transition-all"><Cpu size={18} /> Engine Status</button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="bg-[#8b5cf6]/10 border border-purple-500/20 p-5 rounded-[25px] mb-6">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#8b5cf6]">Neural Credits</span>
                <span className="text-[9px] font-black uppercase text-white">85% Left</span>
             </div>
             <div className="w-full h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-[#8b5cf6] shadow-[0_0_10px_#8b5cf6]"></div>
             </div>
             <p className="text-[8px] font-bold text-gray-600 uppercase mt-3 tracking-wider italic text-center">Platinum Plan Active</p>
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-[20px] transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black italic uppercase">JO</div>
              <div className="text-left">
                 <p className="text-xs font-black uppercase italic group-hover:text-purple-400 transition-colors">Jonah</p>
                 <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Admin</p>
              </div>
            </div>
            <Settings size={16} className="text-gray-600 group-hover:rotate-90 transition-transform" />
          </div>
        </div>
      </aside>

      {/* 🔮 MAIN STAGE */}
      <main className="flex-1 flex flex-col items-center justify-center relative p-12 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050506] to-[#050506] overflow-y-auto">
        {!result ? (
          <div className="text-center mb-20 animate-in fade-in zoom-in duration-1000">
            <div className="w-24 h-24 bg-[#8b5cf6] rounded-[32px] mx-auto mb-10 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.3)] border border-white/10">
              <Sparkles size={45} fill="white" color="white" className="animate-pulse" />
            </div>
            <h1 className="text-5xl font-black mb-6 italic tracking-tighter uppercase leading-none">Initialize<br/><span className="text-[#8b5cf6]">Neural Protocol</span></h1>
            <p className="text-gray-600 max-w-sm mx-auto text-sm font-black uppercase tracking-widest leading-relaxed opacity-60">Define your system requirements below to begin the synthesis process.</p>
          </div>
        ) : (
          <div className="w-full max-w-5xl mb-48 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center justify-between p-6 bg-[#0d0d0f] border border-white/10 rounded-t-[35px] shadow-2xl">
              <div className="flex items-center gap-4">
                 <Terminal size={18} className="text-purple-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Synthesized Luau Output</span>
              </div>
              <button onClick={copyCode} className="text-[9px] font-black uppercase bg-white/5 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95 border border-white/5">
                {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />} {copied ? 'Code Stored' : 'Copy System'}
              </button>
            </div>
            <pre className="bg-[#050506]/80 backdrop-blur-3xl p-10 rounded-b-[35px] text-[13px] font-mono overflow-x-auto border-x border-b border-white/10 text-purple-100/90 leading-relaxed shadow-2xl">
              <code>{result}</code>
            </pre>
          </div>
        )}

        {/* ⌨️ FLOATING PROMPT BOX */}
        <div className="absolute bottom-12 w-full max-w-3xl px-8">
          <div className="bg-[#0d0d0f]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] focus-within:border-purple-500/40 transition-all duration-700 group">
            <div className="flex items-center gap-4 mb-4 px-2">
               <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 italic">Neural Engine Standby...</span>
            </div>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. Build a combat system with 3 sword combos, custom trails, and cooldown management..."
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-gray-800 resize-none h-24 font-bold text-lg italic leading-relaxed px-2"
            />
            <div className="flex justify-between items-center mt-4 pt-5 border-t border-white/5">
              <div className="flex gap-4">
                 <button className="p-3 text-gray-700 hover:text-white transition-all"><Settings size={20} /></button>
                 <button className="p-3 text-gray-700 hover:text-white transition-all"><Sparkles size={20} /></button>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl ${loading ? 'bg-gray-800 animate-pulse text-gray-500' : 'bg-[#8b5cf6] text-white hover:bg-white hover:text-black hover:-translate-y-1'}`}
              >
                {loading ? 'Processing...' : 'Sync Engine'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}