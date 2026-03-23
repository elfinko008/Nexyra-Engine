import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: "Neural Prompt Invalid" }, { status: 400 });
    }

    const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 2000,
        messages: [{ 
          role: 'user', 
          content: `Act as Nexyra Engine v4. Create a high-quality, optimized Roblox Luau script for: ${prompt}. Output ONLY the code blocks. Add comments to explain the system.` 
        }]
      })
    });

    const data = await apiResponse.json();
    
    if (!data.content || !data.content[0]) {
       return NextResponse.json({ result: "-- Neural Processing Failed. Engine returned empty data." });
    }

    return NextResponse.json({ result: data.content[0].text });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Protocol Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}