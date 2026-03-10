import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetRole } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && resumeText) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction: 'You are a resume analysis expert. Analyze the resume and return ONLY a JSON object with no other text.'});

        const prompt = `Analyze this resume for a ${targetRole || 'software developer'} position.

Resume text:
${resumeText}

Return JSON:
{
  "atsScore": <0-100>,
  "strengths": ["strength1", "strength2", ...],
  "improvements": ["improvement1", "improvement2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...],
  "formatFeedback": "feedback about the format",
  "overallFeedback": "2-3 sentence overall assessment"
}`;

        const result = await model.generateContent(prompt);
        const content = result.response.text();
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          return NextResponse.json(JSON.parse(jsonMatch[0]));
        }
      } catch (err) {
        console.error('Gemini resume analysis error:', err);
      }
    }

    // Mock response
    return NextResponse.json({
      atsScore: 72,
      strengths: [
        'Good use of action verbs in experience descriptions',
        'Relevant technical skills are listed',
        'Education section is well formatted',
        'Project descriptions show real impact',
      ],
      improvements: [
        'Add quantifiable metrics to achievements (numbers, percentages)',
        'Include a professional summary at the top',
        'Add more keywords related to ' + (targetRole || 'your target role'),
        'Use consistent date formatting throughout',
        'Include links to live projects and GitHub profile',
        'Add relevant certifications section',
      ],
      missingKeywords: [
        'Agile', 'CI/CD', 'REST API', 'Test-driven development',
        'Performance optimization', 'Code review', 'Technical documentation',
      ],
      formatFeedback: 'The resume could benefit from better visual hierarchy. Use consistent heading styles, add more whitespace between sections, and ensure the most important information is above the fold.',
      overallFeedback: `Your resume shows good potential for a ${targetRole || 'tech'} role. With some targeted improvements — especially adding metrics, relevant keywords, and project links — you could significantly improve your chances of passing ATS screening and catching recruiter attention.`,
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
