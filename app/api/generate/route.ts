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
        content: `You are a senior developer and open-source maintainer.

                  Generate a highly polished, modern, visually appealing GitHub README.md.

                  Follow these rules:
                  - Use clean markdown with proper sections
                  - Add emojis for better readability
                  - Include badges (shields.io style)
                  - Create tables if needed
                  - Add a catchy headline and tagline
                  - Structure sections clearly:
                    - Title + Tagline
                    - Badges
                    - Description
                    - Demo (if available)
                    - Features (bullet points with icons)
                    - Tech Stack (with icons or styled list)
                    - Installation
                    - Usage
                    - Project Structure (if given in Extra Instructions)
                    - Contributing
                    - License

                  - Make it look like top GitHub trending projects
                  - Avoid generic text, make content engaging and slightly creative`,
      },
      {
        role: "user",
        content: `Here are the project details:

                  - Project Name: ${projectName}
                  - Description: ${description}
                  - Tech Stack: ${techStack}
                  - Features: ${features}
                  - Repo URL: ${repoUrl}
                  - Live URL: ${liveUrl}
                  - License: ${license}
                  - Tone: ${tone}
                  - Extra Instructions: ${extraInstructions}

                  Now generate the README.md`,
      },
    ],
    temperature: 0.9,
    max_tokens: 5000,
  });

  const content = completion.choices[0].message.content ?? "";

  return NextResponse.json({ data: content }, { status: 200 });
}
