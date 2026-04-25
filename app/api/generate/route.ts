import { auth } from "@/lib/auth";
import { groq } from "@/lib/groq";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    projectName,
    description,
    techStack,
    features,
    repoUrl,
    liveUrl,
    license,
    tone,
    extraInstructions,
  } = await request.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an expert technical writter. Generate a next level morden design of Github README.md in markdown format. Tone: ${tone}, Return ONLY the raw markdown. No explanation, no backticks.`,
      },
      {
        role: "user",
        content: `Project Name: ${projectName}, Description: ${description}, TechStack: ${techStack}, Key Features: ${features}, Repository URL: ${repoUrl}, Live Demo: ${liveUrl}, License: ${license}, Extra Instructions: ${extraInstructions}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2500,
  });

  const content = completion.choices[0].message.content ?? "";

  return NextResponse.json({ data: content }, { status: 200 });
}
