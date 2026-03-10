'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import type { Roadmap } from '@/lib/types';
import { getSkills } from '@/lib/store';
import { useEffect, useState } from 'react';

interface SkillRadarChartProps {
  roadmap: Roadmap;
}

export default function SkillRadarChart({ roadmap }: SkillRadarChartProps) {
  const [data, setData] = useState<{ skill: string; current: number; required: number }[]>([]);

  useEffect(() => {
    const userSkills = getSkills();
    const proficiencyMap: Record<string, number> = { beginner: 30, intermediate: 60, advanced: 90 };
    
    // Get top skill gaps + existing skills
    const skillSet = new Set<string>();
    roadmap.skillGaps.forEach(s => skillSet.add(s));
    userSkills.forEach(s => skillSet.add(s.skillName));
    
    const chartData = Array.from(skillSet).slice(0, 8).map(skill => {
      const userSkill = userSkills.find(s => s.skillName === skill);
      return {
        skill,
        current: userSkill ? proficiencyMap[userSkill.proficiency] : 10,
        required: roadmap.skillGaps.includes(skill) ? 85 : 70,
      };
    });

    setData(chartData);
  }, [roadmap]);

  if (data.length === 0) return null;

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: '#94A3B8', fontSize: 11 }} />
          <Radar name="Required" dataKey="required" stroke="#FFB347" fill="#FFB347" fillOpacity={0.1} strokeWidth={2} />
          <Radar name="Current" dataKey="current" stroke="#00D4FF" fill="#00D4FF" fillOpacity={0.15} strokeWidth={2} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#F8FAFC',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 -mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan" />
          <span className="text-xs text-text-secondary">Your Level</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber" />
          <span className="text-xs text-text-secondary">Required Level</span>
        </div>
      </div>
    </div>
  );
}
