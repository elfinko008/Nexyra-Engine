'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, Send, LogOut, Code, User, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
    };
    fetchUser();
  }, [router]);

  const handleGenerate = async () => {
    if (!prompt || profile?.credits <= 0) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
          const newCredits = profile.credits - 1;
          await supabase.from('profiles').update({ credits: newCredits }).eq('id', user.id);
          setProfile({...profile, credits: newCredits});
      }
    } catch (err) {
      setResult("-- Neural Sync Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <Zap size={40} className="text-orange-600 mb-4" fill="currentColor"/>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 italic">Initializing Interface...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white italic overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-80 border-r border-white/5 bg-[#050505] p-10 flex flex-col z-20">
        <div className="flex items-center gap-4 mb-16 group cursor-pointer">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.3)] group-hover:rotate-12 transition-transform duration-500"><Zap size={22} fill="white"/></div>
          <span className="font-black text-xl uppercase tracking-tighter italic">NEXYRA</span>
        </div>

        <nav className="flex-1 space-y-4">
           <div className="bg-white/5 p-5 rounded-[25px] flex items-center gap-4 text-orange-500 font-black uppercase text-[10px] tracking-[0.2em] border border-orange-500/20 shadow-lg">
              <Code size={20}/> Neural Studio
           </div>
           <div className="p-5 flex items-center gap-4 text-gray-700 font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition-all cursor-pointer group">
              <LayoutDashboard size={20} className="group-hover:rotate-6 transition-transform"/> Projects
           </div>
        </nav>

        <div className="mt-auto space-y-8">
          <div className="bg-[#0a0a0a] p-8 rounded-[40px] border border-white/5 shadow-inner">
            <p className="text-[9px] uppercase font-black text-gray-800 mb-3 tracking-[0.4em]">Remaining Credits</p>
            <p className="text-5xl font-black italic tracking-tighter">{profile.credits}</p>
            <div className="w-full h-1.5 bg-white/5 mt-6 rounded-full overflow-hidden">
               <div className="h-full bg-orange-600 shadow-[0_0_20px_#ea580c]" style={{width: `${(profile.credits/10)*100}%`}}></div>
            </div>
            <p className="text-[8px] text-gray-700 uppercase font-black tracking-widest mt-4 text-center italic">{profile.plan} Plan Active</p>
          </div>
          
          <div className="flex items-center justify-between group">
             <div className="flex items-center gap-4 cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all"><User size={20} className="text-gray-600 group-hover:text-white transition-colors"/></div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest group-hover:text-orange-500 transition-colors">Profile</p>
                  <p className="text-[8px] font-black uppercase text-gray-700 tracking-tighter italic">Settings & Identity</p>
                </div>
             </div>
             <button onClick={() => supabase.auth.signOut()} className="p-3 bg-white/5 rounded-2xl text-gray-700 hover:text-red-500 transition-all active:scale-90"><LogOut size={18}/></button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black">
        <div className="flex-1 p-16 overflow-y-auto custom-scrollbar">
          {result ? (
            <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-5 duration-700">
               <div className="bg-[#0d0d0f] border border-white/10 p-4 rounded-t-[30px] border-b-0 flex items-center justify-between px-8">
                  <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                     <div className="w-2 h-2 rounded-full bg-orange-500/50"></div>
                     <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Neural Luau Script v4.0</span>
               </div>
               <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 p-12 rounded-b-[40px] font-mono text-sm text-orange-100/90 leading-relaxed shadow-3xl">
                  <pre className="whitespace-pre-wrap">{result}</pre>
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-10 italic">
               <Zap size={80} className="mb-8" />
               <h2 className="text-3xl font-black uppercase tracking-[0.6em]">System Standby</h2>
               <p className="text-xs mt-4 uppercase font-black tracking-widest">Awaiting Neural Prompt for Synthesis</p>
            </div>
          )}
        </div>

        {/* FLOATING PROMPT INPUT */}
        <div className="p-16">
          <div className="max-w-4xl mx-auto relative group">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Create a round-based matchmaking system with data saving..."
              className="w-full bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[45px] p-10 pb-28 focus:border-orange-600/50 outline-none transition-all duration-500 resize-none text-xl font-bold italic shadow-2xl"
            />
            <div className="absolute bottom-8 right-8 flex items-center gap-6">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">{loading ? "Processing Neural Path..." : "Ready to Sync"}</span>
              <button 
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="bg-orange-600 p-6 rounded-[28px] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-600/30 disabled:opacity-20 disabled:grayscale"
              >
                {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : <Send size={26} fill="white" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}