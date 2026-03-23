"use client";

import Link from "next/link";
import { Check, Zap, Code2, Cpu, Shield, ArrowRight, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap size={20} />,
    title: "Instant Generation",
    desc: "From prompt to production-ready script in under 3 seconds. No waiting, no bottlenecks.",
  },
  {
    icon: <Code2 size={20} />,
    title: "Multi-Language Output",
    desc: "Python, TypeScript, Bash, SQL — Nexyra understands your stack and outputs accordingly.",
  },
  {
    icon: <Cpu size={20} />,
    title: "Neural Optimization",
    desc: "Every output is automatically optimized for performance, readability, and edge-cases.",
  },
  {
    icon: <Shield size={20} />,
    title: "Secure by Default",
    desc: "Your prompts are never stored. Zero-knowledge architecture. Enterprise-grade privacy.",
  },
];

const PLANS = [
  {
    name: "Hobby",
    price: "$8.99",
    period: "/month",
    description: "Perfect for solo builders and side projects.",
    credits: "500 credits / mo",
    features: [
      "500 generation credits",
      "5 languages supported",
      "Standard output quality",
      "Community support",
      "API access (100 req/day)",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$15.99",
    period: "/month",
    description: "For teams shipping production software at scale.",
    credits: "Unlimited credits",
    features: [
      "Unlimited generation credits",
      "All 20+ languages",
      "Neural optimization enabled",
      "Priority queue access",
      "Unlimited API access",
      "Team workspace (up to 5)",
      "Custom system prompts",
    ],
    cta: "Get Started — Pro",
    popular: true,
  },
];

const STATS = [
  { value: "2.4M+", label: "Scripts Generated" },
  { value: "< 2.8s", label: "Avg. Generation" },
  { value: "99.97%", label: "Uptime SLA" },
  { value: "150+", label: "Countries" },
];

export default function LandingPage() {
  return (
    <div className="grain min-h-screen bg-black relative overflow-hidden">
      {/* Background glows */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% -5%, rgba(109,40,217,0.28) 0%, rgba(76,29,149,0.12) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed"
        style={{
          width: "600px",
          height: "600px",
          left: "-200px",
          top: "30%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none fixed"
        style={{
          width: "500px",
          height: "500px",
          right: "-150px",
          top: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ─── Nav ─── */}
      <nav
        className="relative z-50 flex items-center justify-between px-8 py-5"
        style={{
          borderBottom: "1px solid rgba(139,92,246,0.08)",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight">
            Nexyra<span className="text-purple-400"> Engine</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#" className="nav-link">Docs</a>
          <a href="#" className="nav-link">Blog</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="nav-link text-sm font-medium"
            style={{ color: "rgba(196,181,253,0.7)" }}
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="glow-btn rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-20">
        <div className="tag animate-fade-up mb-6">
          ✦ Neural Script Engine v2.0 — Now Live
        </div>

        <h1
          className="animate-fade-up-delay-1 font-black italic leading-none tracking-tighter"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", maxWidth: "900px" }}
        >
          <span className="text-white">Write Less.</span>
          <br />
          <span className="gradient-text-bright">Ship More.</span>
        </h1>

        <p
          className="animate-fade-up-delay-2 mt-6 text-lg leading-relaxed"
          style={{ maxWidth: "580px", color: "rgba(255,255,255,0.45)" }}
        >
          Nexyra Engine transforms raw intent into production-ready scripts.
          Paste a prompt. Watch the machine work.{" "}
          <em style={{ color: "rgba(196,181,253,0.7)" }}>Zero compromise.</em>
        </p>

        <div className="animate-fade-up-delay-3 mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/login"
            className="glow-btn animate-pulse-glow flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white"
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6d28d9 100%)",
            }}
          >
            Get Started Free
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            See how it works
          </Link>
        </div>

        {/* Mock terminal */}
        <div
          className="animate-fade-up-delay-4 animate-float mt-16 w-full max-w-2xl rounded-2xl overflow-hidden text-left"
          style={{
            background: "rgba(8,0,20,0.9)",
            border: "1px solid rgba(139,92,246,0.2)",
            boxShadow:
              "0 0 60px rgba(124,58,237,0.15), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="flex items-center gap-2 px-5 py-4"
            style={{ borderBottom: "1px solid rgba(139,92,246,0.1)" }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
            <span
              className="ml-3 text-xs font-mono"
              style={{ color: "rgba(139,92,246,0.6)" }}
            >
              nexyra-engine — neural-studio
            </span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed">
            <p style={{ color: "rgba(139,92,246,0.5)" }}>
              {">"} Prompt:{" "}
              <span style={{ color: "rgba(196,181,253,0.9)" }}>
                &quot;build a rate limiter in TypeScript with Redis&quot;
              </span>
            </p>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
              ⠿ Analyzing intent...
            </p>
            <p style={{ color: "rgba(255,255,255,0.25)" }}>
              ⠿ Neural optimization pass 1/3...
            </p>
            <p style={{ color: "rgba(168,85,247,0.8)" }}>✓ Generated in 2.1s</p>
            <pre
              className="mt-4 overflow-x-auto"
              style={{ color: "rgba(196,181,253,0.85)", fontSize: "0.78rem" }}
            >
{`import Redis from 'ioredis';

export async function rateLimit(
  key: string,
  limit: number = 100,
  window: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  const redis = new Redis(process.env.REDIS_URL!);
  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, window);
  return { allowed: current <= limit, remaining: Math.max(0, limit - current) };
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="relative z-10 px-6 py-16">
        <div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: "rgba(139,92,246,0.15)", borderRadius: "16px" }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-10 px-6"
              style={{ background: "#000" }}
            >
              <span className="font-black italic text-3xl gradient-text-bright">
                {s.value}
              </span>
              <span
                className="mt-1 text-xs font-medium tracking-wider uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-block mb-4">Capabilities</div>
            <h2 className="font-black italic text-4xl md:text-5xl text-white tracking-tight">
              Built for engineers who{" "}
              <span className="gradient-text">don&apos;t compromise</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="card-glass rounded-2xl p-8 group transition-all duration-300"
                style={{ cursor: "default" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(139,92,246,0.3)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(124,58,237,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.02)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(139,92,246,0.15)", color: "#a855f7" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-block mb-4">Pricing</div>
            <h2 className="font-black italic text-4xl md:text-5xl text-white tracking-tight">
              Simple, honest{" "}
              <span className="gradient-text">pricing</span>
            </h2>
            <p
              className="mt-4 text-base"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              No hidden fees. No surprise overages. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={plan.popular ? "card-purple-active rounded-2xl p-8" : "card-glass rounded-2xl p-8"}
                style={{ position: "relative" }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-8">
                    <span className="badge-popular">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-black text-5xl tracking-tight gradient-text-bright">
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs font-semibold mb-8" style={{ color: "rgba(168,85,247,0.8)" }}>
                  {plan.credits}
                </p>

                <ul className="space-y-3 mb-10">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm">
                      <Check size={15} style={{ color: "#a855f7", flexShrink: 0 }} />
                      <span style={{ color: "rgba(255,255,255,0.65)" }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`block text-center rounded-xl py-3.5 text-sm font-bold transition-all duration-200 ${
                    plan.popular ? "glow-btn" : ""
                  }`}
                  style={
                    plan.popular
                      ? {
                          background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
                          color: "#fff",
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.7)",
                        }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="relative z-10 px-6 py-24">
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl p-16"
          style={{
            background: "linear-gradient(135deg, rgba(109,40,217,0.2) 0%, rgba(76,29,149,0.1) 100%)",
            border: "1px solid rgba(139,92,246,0.25)",
            boxShadow: "0 0 80px rgba(124,58,237,0.12)",
          }}
        >
          <h2 className="font-black italic text-4xl text-white tracking-tight mb-4">
            Ready to move at{" "}
            <span className="gradient-text-bright">machine speed?</span>
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Join thousands of engineers already using Nexyra Engine to ship faster.
          </p>
          <Link
            href="/login"
            className="glow-btn inline-flex items-center gap-2 rounded-xl px-10 py-4 font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6d28d9 100%)",
            }}
          >
            Get Started Free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="relative z-10 px-8 py-8"
        style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            >
              <Sparkles size={10} className="text-white" />
            </div>
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
              © 2025 Nexyra Labs. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Docs", "Status"].map((item) => (
              <a key={item} href="#" className="nav-link text-xs">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}