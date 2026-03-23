import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── Types ───────────────────────────────────────────────
interface GenerateRequestBody {
  prompt: string;
}

// ─── Helpers ─────────────────────────────────────────────
function buildSystemPrompt(): string {
  return `You are Nexyra Engine, an elite AI code generation system built by Nexyra Labs.

Your role: Transform natural-language prompts into clean, production-ready scripts.

Rules:
- Output ONLY the code. No markdown fences, no explanations, no preamble.
- Include inline comments for non-obvious logic.
- Follow idiomatic patterns for the target language.
- Optimize for readability, performance, and edge-case safety.
- Default to TypeScript if no language is specified.
- Never include placeholder values — make the code immediately usable.`;
}

// ─── Route Handler ────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Auth check via Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") ?? "";

  // Attempt to verify the user from the session cookie or header
  const {
    data: { user },
  } = token
    ? await supabase.auth.getUser(token)
    : await supabase.auth.getUser();

  // 2. Parse body
  let body: GenerateRequestBody;
  try {
    body = (await req.json()) as GenerateRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { prompt } = body;

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return NextResponse.json(
      { message: "Prompt is required and must be a non-empty string." },
      { status: 400 }
    );
  }

  if (prompt.length > 4000) {
    return NextResponse.json(
      { message: "Prompt exceeds maximum length of 4000 characters." },
      { status: 400 }
    );
  }

  // 3. Credit check (if user is authenticated)
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits, plan")
      .eq("id", user.id)
      .single();

    if (profile && profile.credits !== null && profile.credits <= 0) {
      return NextResponse.json(
        {
          message:
            "Insufficient credits. Please upgrade your plan or wait for your credits to reset.",
        },
        { status: 402 }
      );
    }
  }

  // 4. Call the AI provider
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey) {
    return NextResponse.json(
      { message: "AI provider is not configured. Contact support." },
      { status: 503 }
    );
  }

  let result: string;

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 2048,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(),
          },
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errData = (await aiResponse.json()) as { error?: { message?: string } };
      console.error("[nexyra/generate] OpenAI error:", errData);
      return NextResponse.json(
        {
          message:
            errData?.error?.message ?? "AI provider returned an error.",
        },
        { status: 502 }
      );
    }

    const aiData = (await aiResponse.json()) as {
      choices: Array<{
        message: { content: string | null };
        finish_reason: string;
      }>;
    };

    result = aiData.choices?.[0]?.message?.content?.trim() ?? "";

    if (!result) {
      return NextResponse.json(
        { message: "AI returned an empty response. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[nexyra/generate] Fetch error:", err);
    return NextResponse.json(
      { message: "Failed to reach AI provider. Please try again." },
      { status: 503 }
    );
  }

  // 5. Decrement credits (fire and forget — don't block the response)
  if (user) {
    supabase.rpc("decrement_credits", { user_id: user.id }).then(({ error }) => {
      if (error) {
        console.warn("[nexyra/generate] Failed to decrement credits:", error.message);
      }
    });
  }

  // 6. Return result
  return NextResponse.json({ result }, { status: 200 });
}