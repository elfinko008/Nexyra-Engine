"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Code2,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  id: string;
  email: string;
  credits: number;
  plan: string;
}

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={16} />, label: "Overview", id: "overview" },
  { icon: <Code2 size={16} />, label: "Neural Studio", id: "studio" },
  { icon: <History size={16} />, label: "History", id: "history" },
  { icon: <Settings size={16} />, label: "Settings", id: "settings" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("studio");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const loadProfile = useCallback(async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, credits, plan")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      setProfile({
        id: user.id,
        email: user.email ?? "—",
        credits: 0,
        plan: "Hobby",
      });
    } else {
      setProfile(data as Profile);
    }

    setLoadingProfile(false);
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const err = await res.json();
        setOutput(`// Error: ${err.message ?? "Generation failed."}`);
        return;
      }

      const data = await res.json();
      setOutput(data.result ?? "// No output returned.");

      if (profile) {
        setProfile((prev) =>
          prev ? { ...prev, credits: Math.max(0, prev.credits - 1) } : prev
        );
      }
    } catch {
      setOutput("// Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailDisplay = profile?.email
    ? profile.email.length > 22
      ? profile.email.slice(0, 20) + "…"
      : profile.email
    : "—";

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* ─── Sidebar ─── */}
      <aside
        className="sidebar-bg flex flex-col w-60 flex-shrink-0 py-6"
        style={{ minWidth: "240px" }}
      >
        {/* Logo */}
        <div className="px-5 mb-8 flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            Nexyra<span className="text-purple-400"> Engine</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-item w-full text-left ${activeTab === item.id ? "active" : ""}`}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <span>{item.label}</span>
              {activeTab === item.id && (
                <ChevronRight
                  size={12}
                  className="ml-auto"
                  style={{ color: "rgba(168,85,247,0.6)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="divider-purple mx-5 my-4" />

        {/* Profile block */}
        <div className="px-3">
          {loadingProfile ? (
            <div className="px-4 py-3 flex items-center gap-2">
              <Loader2
                size={14}
                className="animate-spin"
                style={{ color: "rgba(139,92,246,0.5)" }}
              />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                Loading profile…
              </span>
            </div>
          ) : (
            <div
              className="rounded-xl p-3"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              {/* Avatar + email */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
                    color: "#e9d5ff",
                  }}
                >
                  {profile?.email?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div className="overflow-hidden">
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {emailDisplay}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(168,85,247,0.7)" }}>
                    {profile?.plan ?? "Hobby"}
                  </p>
                </div>
              </div>

              {/* Credits */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Credits
                </span>
                <span className="credit-pill">
                  <Zap size={10} className="inline mr-1 -mt-px" />
                  {profile?.credits ?? 0}
                </span>
              </div>

              {/* Credit bar */}
              <div
                className="rounded-full h-1 w-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((profile?.credits ?? 0) / 500) * 100)}%`,
                    background: "linear-gradient(90deg, #6d28d9, #a855f7)",
                  }}
                />
              </div>
            </div>
          )}

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="sidebar-item w-full mt-2 text-left"
            style={{ color: "rgba(239,68,68,0.5)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#fca5a5";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(239,68,68,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(239,68,68,0.5)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <main className="flex-1 overflow-y-auto grid-bg relative">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(109,40,217,0.07) 0%, transparent 60%)",
          }}
        />

        {activeTab === "studio" && (
          <StudioPanel
            prompt={prompt}
            setPrompt={setPrompt}
            output={output}
            generating={generating}
            copied={copied}
            onGenerate={handleGenerate}
            onCopy={handleCopy}
          />
        )}

        {activeTab === "overview" && (
          <OverviewPanel profile={profile} loadingProfile={loadingProfile} />
        )}

        {activeTab === "history" && <PlaceholderPanel label="Generation History" />}
        {activeTab === "settings" && <PlaceholderPanel label="Settings" />}
      </main>
    </div>
  );
}

/* ─── Studio Panel ─── */
function StudioPanel({
  prompt,
  setPrompt,
  output,
  generating,
  copied,
  onGenerate,
  onCopy,
}: {
  prompt: string;
  setPrompt: (v: string) => void;
  output: string;
  generating: boolean;
  copied: boolean;
  onGenerate: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="relative z-10 p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-black italic text-3xl text-white tracking-tight">
          Neural <span className="gradient-text">Studio</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          Describe what you need. The engine does the rest.
        </p>
      </div>

      {/* Prompt area */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "rgba(196,181,253,0.5)" }}
          >
            Prompt
          </label>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            {prompt.length} chars
          </span>
        </div>
        <textarea
          className="studio-textarea"
          rows={10}
          placeholder={`Describe what you want to generate...\n\nExamples:\n→ "Build a Redis-backed rate limiter in TypeScript"\n→ "Write a Python script to parse and validate JSON schemas"\n→ "Create a bash deployment script for a Node.js app"`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onGenerate();
          }}
        />
        <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.15)" }}>
          Tip: Press{" "}
          <kbd
            className="px-1.5 py-0.5 rounded text-xs"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            ⌘ Enter
          </kbd>{" "}
          to generate
        </p>
      </div>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        disabled={generating || !prompt.trim()}
        className="glow-btn flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-bold text-sm text-white mb-8"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6d28d9 100%)",
          opacity: generating || !prompt.trim() ? 0.5 : 1,
          cursor: generating || !prompt.trim() ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {generating ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Zap size={15} />
            Sync & Generate
          </>
        )}
      </button>

      {/* Output */}
      {(output || generating) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(196,181,253,0.5)" }}
            >
              Output
            </label>
            {output && (
              <button
                onClick={onCopy}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: copied ? "rgba(34,197,94,0.1)" : "rgba(139,92,246,0.1)",
                  border: copied ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(139,92,246,0.2)",
                  color: copied ? "#86efac" : "rgba(196,181,253,0.7)",
                  cursor: "pointer",
                }}
              >
                {copied ? (
                  <><Check size={12} /> Copied</>
                ) : (
                  <><Copy size={12} /> Copy</>
                )}
              </button>
            )}
          </div>

          <div className="output-block">
            {generating && !output ? (
              <div className="flex items-center gap-2" style={{ color: "rgba(139,92,246,0.6)" }}>
                <Loader2 size={14} className="animate-spin" />
                Neural engine is thinking…
              </div>
            ) : (
              output
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Overview Panel ─── */
function OverviewPanel({
  profile,
  loadingProfile,
}: {
  profile: Profile | null;
  loadingProfile: boolean;
}) {
  return (
    <div className="relative z-10 p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-black italic text-3xl text-white tracking-tight">
          Overview
        </h1>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
          Your Nexyra Engine at a glance.
        </p>
      </div>

      {loadingProfile ? (
        <div className="flex items-center gap-2" style={{ color: "rgba(139,92,246,0.5)" }}>
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Credits Remaining",
              value: profile?.credits ?? 0,
              sub: "this billing cycle",
              accent: "#a855f7",
            },
            {
              label: "Current Plan",
              value: profile?.plan ?? "Hobby",
              sub: "active subscription",
              accent: "#8b5cf6",
            },
            {
              label: "Account Email",
              value: profile?.email ?? "—",
              sub: "verified",
              accent: "#7c3aed",
              truncate: true,
            },
          ].map((stat) => (
            <div key={stat.label} className="card-glass rounded-2xl p-6">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {stat.label}
              </p>
              <p
                className="font-black italic text-2xl mb-1"
                style={{
                  color: stat.accent,
                  overflow: stat.truncate ? "hidden" : undefined,
                  textOverflow: stat.truncate ? "ellipsis" : undefined,
                  whiteSpace: stat.truncate ? "nowrap" : undefined,
                }}
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      )}

      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(124,58,237,0.07)",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
          <Zap size={16} style={{ color: "#a855f7" }} />
          Quick Start
        </h3>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Head to <strong style={{ color: "#c4b5fd" }}>Neural Studio</strong> to
          generate your first script. Paste a prompt, hit{" "}
          <strong style={{ color: "#c4b5fd" }}>Sync & Generate</strong>, and
          watch the engine work.
        </p>
      </div>
    </div>
  );
}

/* ─── Placeholder Panel ─── */
function PlaceholderPanel({ label }: { label: string }) {
  return (
    <div className="relative z-10 p-8 max-w-4xl mx-auto">
      <h1 className="font-black italic text-3xl text-white tracking-tight mb-2">
        {label}
      </h1>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
        Coming soon — this section is under construction.
      </p>
      <div
        className="mt-8 rounded-2xl p-12 text-center"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(139,92,246,0.2)",
        }}
      >
        <Sparkles
          size={32}
          style={{ color: "rgba(139,92,246,0.3)", margin: "0 auto 12px" }}
        />
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
          Nothing here yet.
        </p>
      </div>
    </div>
  );
}