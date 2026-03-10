import { NextRequest, NextResponse } from 'next/server';
import { generateMockRoadmap } from '@/lib/mock-data';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profile, skills, targetRole, hoursPerDay, timelineMonths } = body;

    // Calculate total weeks
    const totalWeeks = Math.min(timelineMonths * 4, 48);

    // Try Gemini API first if key is available
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `You are CAREERLY's AI Career Mentor. Generate a detailed, personalized career roadmap as JSON. The roadmap must be actionable with real resources, specific projects, and week-by-week structure. Always return valid JSON.

Generate a personalized career roadmap for this student:

Profile: ${JSON.stringify(profile)}
Current Skills: ${JSON.stringify(skills)}
Target Role: ${targetRole}
Available Hours/Day: ${hoursPerDay}
Timeline: ${timelineMonths} months (${totalWeeks} weeks)

Return a JSON object with this exact structure:
{
  "careerPath": "${targetRole}",
  "totalWeeks": ${totalWeeks},
  "skillGaps": ["skill1", "skill2", ...],
  "weeks": [
    {
      "week": 1,
      "theme": "Week theme",
      "topics": ["topic1", "topic2", "topic3", "topic4"],
      "resources": [
        {"title": "Resource name", "url": "https://...", "type": "video|article|course|documentation", "duration": "Xhr"}
      ],
      "project": {
        "title": "Project name",
        "description": "Detailed description",
        "skills": ["skill1", "skill2"],
        "difficulty": "beginner|intermediate|advanced",
        "estimatedHours": 8
      },
      "hours": ${hoursPerDay * 5},
      "milestone": "What they can do after this week"
    }
  ],
  "projects": [top 5 portfolio projects],
  "interviewTopics": ["topic1", ...],
  "resumeTips": ["tip1", ...]
}

Generate exactly ${totalWeeks} weeks. Make resources real and specific. Projects should build real portfolio pieces. RESPOND ONLY WITH THE JSON, no other text.`;

        const result = await model.generateContent(prompt);
        const content = result.response.text();

        // Try to parse JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const roadmap = JSON.parse(jsonMatch[0]);
          return NextResponse.json(roadmap);
        }
      } catch (aiError) {
        console.error('Gemini API error, falling back to mock:', aiError);
      }
    }

    // Fallback to mock data
    const roadmap = generateMockRoadmap(targetRole, totalWeeks);
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Roadmap generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    );
  }
}
