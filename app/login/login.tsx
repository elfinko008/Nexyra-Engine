"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === "login") {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
      } else {
        router.push("/dashboard");
      }
    } else {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(
          "Account created! Check your email to confirm, then sign in."
        );
        setMode("login");
      }
    }

    setLoading(false);
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  return (
    <div className="grain min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.3) 0%, rgba(76,29,149,0.12) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed"
        style={{
          width: "400px",
          height: "400px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Nav */}
      <div className="relative z-10 w-full max-w-sm mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            Nexyra<span className="text-purple-400"> Engine</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          ← Back to home
        </Link>
      </div>

      {/* Auth card */}
      <div className="auth-card relative z-10 w-full max-w-sm p-8">
        {/* Tab switcher */}
        <div
          className="flex mb-8 rounded-xl p-1"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setError(null);
                setSuccess(null);
              }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={
                mode === m
                  ? {
                      background:
                        "linear-gradient(135deg, #7c3aed, #6d28d9)",
                      color: "#fff",
                      boxShadow: "0 0 15px rgba(124,58,237,0.3)",
                    }
                  : { color: "rgba(255,255,255,0.3)", background: "transparent" }
              }
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <h1 className="font-black italic text-2xl text-white mb-1">
          {mode === "login" ? "Welcome back." : "Join Nexyra."}
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>
          {mode === "login"
            ? "Sign in to access your Neural Studio."
            : "Create an account and start generating."}
        </p>

        {/* Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "rgba(196,181,253,0.6)" }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(139,92,246,0.5)" }}
              />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input pl-10"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "rgba(196,181,253,0.6)" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(139,92,246,0.5)" }}
              />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input pl-10 pr-10"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(139,92,246,0.5)", background: "none", border: "none", cursor: "pointer" }}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div
            className="mb-4 rounded-lg px-4 py-3 text-sm"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="mb-4 rounded-lg px-4 py-3 text-sm"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#86efac",
            }}
          >
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          className="glow-btn w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-sm text-white transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
            opacity: loading || !email || !password ? 0.5 : 1,
            cursor: loading || !email || !password ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <div
                className="w-4 h-4 rounded-full border-2"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  animation: "spin-slow 0.8s linear infinite",
                }}
              />
              Processing...
            </>
          ) : (
            <>
              {mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="divider-purple flex-1" />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            or continue with
          </span>
          <div className="divider-purple flex-1" />
        </div>

        {/* OAuth */}
        <div className="grid grid-cols-2 gap-3">
          {(["google", "github"] as const).map((provider) => (
            <button
              key={provider}
              onClick={() => handleOAuth(provider)}
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(139,92,246,0.3)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(196,181,253,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.6)";
              }}
            >
              {provider === "google" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
              <span className="capitalize">{provider}</span>
            </button>
          ))}
        </div>
      </div>

      <p
        className="relative z-10 mt-6 text-xs"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        By signing up, you agree to our{" "}
        <a href="#" style={{ color: "rgba(168,85,247,0.6)" }}>
          Terms
        </a>{" "}
        and{" "}
        <a href="#" style={{ color: "rgba(168,85,247,0.6)" }}>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
