import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── 1. TYPES DEFINITION (WICHTIG GEGEN FEHLER) ────────────────
interface GenerateRequestBody {
  prompt: string;
}

interface AnthropicResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string | null;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

// ─── 2. SYSTEM PROMPT ───────────────────────────────────────────
function buildSystemPrompt(): string {
  return `You are Nexyra Engine, an elite AI code generation system built by Nexyra Labs.
Your role: Transform natural-language prompts into clean, production-ready Luau scripts for Roblox.

Rules:
- Output ONLY the pure Luau code.
- NO markdown fences, NO talking, NO explanations.
- Include inline comments for complex logic.
- Follow idiomatic Roblox patterns (Task library, Type checking).
- Ensure the code is immediately usable in Roblox Studio.`;
}

// ─── 3. ROUTE HANDLER ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    console.log("[nexyra/generate] Incoming request...");

    // Supabase Setup
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Auth Check
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") ?? "";
    
    const { data: { user } } = token 
      ? await supabase.auth.getUser(token) 
      : await supabase.auth.getUser();

    // Body Parsing
    const body = (await req.json()) as GenerateRequestBody;
    const { prompt } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ message: "Prompt is required." }, { status: 400 });
    }

    // Credit Check
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      if (profile && profile.credits <= 0) {
        return NextResponse.json({ message: "Insufficient credits." }, { status: 402 });
      }
    }

    // Anthropic API Key Check
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      return NextResponse.json({ message: "API Key missing." }, { status: 503 });
    }

    // Claude API Call
    const aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 2048,
        temperature: 0.3,
        system: buildSystemPrompt(),
        messages: [{ role: "user", content: prompt.trim() }],
      }),
    });

    if (!aiResponse.ok) {
      const errData = await aiResponse.json();
      return NextResponse.json({ message: "Claude API Error" }, { status: 502 });
    }

    const aiData = (await aiResponse.json()) as AnthropicResponse;
    const result = aiData.content[0]?.text.trim() ?? "";

    // Credits abziehen
    if (user && result) {
      await supabase.rpc("decrement_credits", { user_id: user.id });
    }

    return NextResponse.json({ result }, { status: 200 });

  } catch (err: any) {
    console.error("[nexyra/generate] Error:", err.message);
    return NextResponse.json({ message: "Fatal Engine Error" }, { status: 500 });
  }
}