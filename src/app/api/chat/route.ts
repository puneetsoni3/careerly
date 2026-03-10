import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPTS } from '@/lib/ai-prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { messages, profile } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return a helpful mock response
      const lastMessage = messages[messages.length - 1]?.content || '';
      const mockResponse = generateMockResponse(lastMessage, profile);
      return NextResponse.json({ content: mockResponse });
    }

    const systemPrompt = `${SYSTEM_PROMPTS.chat}

Student Profile:
- Name: ${profile?.name || 'Student'}
- Target Role: ${profile?.targetRole || 'Not specified'}
- Hours/Day: ${profile?.hoursPerDay || 'Not specified'}
- Timeline: ${profile?.timelineMonths || 'Not specified'} months`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt 
    });

    // Convert OpenAI/Anthropic message format to Gemini format
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const text = result.response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { content: "I'm having trouble connecting right now. Please try again in a moment. In the meantime, check out your roadmap and progress pages for guidance!" },
      { status: 200 }
    );
  }
}

function generateMockResponse(message: string, profile: { name?: string; targetRole?: string } | undefined): string {
  const name = profile?.name || 'there';
  const role = profile?.targetRole || 'your target role';
  const lower = message.toLowerCase();

  if (lower.includes('resume') || lower.includes('cv')) {
    return `Great question about resumes, ${name}! Here are my top tips for a ${role} resume:\n\n**Structure:**\n- Keep it to 1 page (2 max for experienced)\n- Use a clean, ATS-friendly format\n- Lead with a strong summary\n\n**Must-haves:**\n- Quantify your achievements (use numbers!)\n- Include relevant technical skills prominently\n- List projects with live demo links\n- Add relevant coursework or certifications\n\n**Pro tip:** Use the Resume Analyzer in CAREERLY to get your ATS score and specific improvements!\n\nWant me to review your resume? Upload it in the Resume section and I'll provide detailed feedback.`;
  }

  if (lower.includes('interview') || lower.includes('prepare')) {
    return `Let's get you interview-ready for ${role}, ${name}! 🎯\n\n**Preparation Strategy:**\n\n1. **Technical Skills** (60% of prep time)\n   - Practice coding/technical problems daily\n   - Review fundamental concepts\n   - Build and explain your projects\n\n2. **Behavioral Questions** (20% of prep time)\n   - Use the STAR method (Situation, Task, Action, Result)\n   - Prepare 5-7 stories covering teamwork, challenges, leadership\n\n3. **Company Research** (10% of prep time)\n   - Know the company's products, culture, recent news\n   - Prepare thoughtful questions to ask\n\n4. **Mock Interviews** (10% of prep time)\n   - Practice with peers or use our Interview Prep section\n   - Record yourself and review\n\nWant me to do a mock interview? I can ask you questions one at a time! 💪`;
  }

  if (lower.includes('learn') || lower.includes('next') || lower.includes('what should')) {
    return `Based on your journey to become a ${role}, ${name}, here's what I'd recommend focusing on next:\n\n**Immediate Priority:**\nCheck your Roadmap page — it shows your current week's topics and resources. Focus on completing those first!\n\n**General Learning Tips:**\n- 📚 Spend 70% on practical projects, 30% on theory\n- 🎯 Focus on one topic at a time — avoid tutorial hell\n- 📝 Document everything you learn (blog/notes)\n- 🤝 Join communities (Discord, Reddit, Twitter)\n- 💻 Code every day, even if just 30 minutes\n\n**Resources I Recommend:**\n- YouTube tutorials for visual learning\n- Official documentation for depth\n- Build projects to solidify concepts\n\nCheck your Dashboard for this week's specific tasks! 🚀`;
  }

  return `Hey ${name}! 👋 I'm your AI career mentor. I'm here to help you on your journey to becoming a ${role}.\n\nHere are some things I can help you with:\n\n- 📋 **Career advice** — Ask me about your learning path\n- 📝 **Resume review** — Get feedback on your resume\n- 🎯 **Interview prep** — Practice with mock interviews\n- 💡 **What to learn next** — Get personalized recommendations\n- 🔧 **Project ideas** — Get suggestions for portfolio projects\n\nWhat would you like to discuss? Feel free to ask anything about your career journey!`;
}
