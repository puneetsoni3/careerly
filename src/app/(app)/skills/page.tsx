'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, X, TrendingUp, AlertTriangle } from 'lucide-react';
import { getSkills, saveSkills, getRoadmap } from '@/lib/store';
import type { UserSkill, Roadmap } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';

export default function SkillsPage() {
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setSkills(getSkills());
    setRoadmap(getRoadmap());
  }, []);

  const proficiencyMap: Record<string, number> = { beginner: 33, intermediate: 66, advanced: 100 };
  const proficiencyColors: Record<string, string> = { beginner: '#FFB347', intermediate: '#00D4FF', advanced: '#22C55E' };

  const addSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.skillName === newSkill.trim())) {
      const updated = [...skills, { skillName: newSkill.trim(), proficiency: 'beginner' as const }];
      setSkills(updated);
      saveSkills(updated);
      setNewSkill('');
    }
  };

  const removeSkill = (name: string) => {
    const updated = skills.filter(s => s.skillName !== name);
    setSkills(updated);
    saveSkills(updated);
  };

  const updateProficiency = (name: string, proficiency: UserSkill['proficiency']) => {
    const updated = skills.map(s => s.skillName === name ? { ...s, proficiency } : s);
    setSkills(updated);
    saveSkills(updated);
  };

  const missingSkills = roadmap?.skillGaps.filter(sg => !skills.find(s => s.skillName === sg)) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Skills & <span className="gradient-text">Gap Analysis</span>
        </h1>
        <p className="text-text-secondary text-sm">Track your skills and identify what you need to learn</p>
      </div>

      {/* Missing Skills Alert */}
      {missingSkills.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 border-amber/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber mb-2">Skill Gaps Identified</h3>
              <p className="text-sm text-text-secondary mb-3">
                These skills are required for{' '}
                <span className="text-text-primary">{roadmap?.careerPath}</span> but missing from your profile:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map(skill => (
                  <motion.button key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const updated = [...skills, { skillName: skill, proficiency: 'beginner' as const }];
                      setSkills(updated);
                      saveSkills(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber/10 border border-amber/20 text-amber text-xs hover:bg-amber/20 transition-all flex items-center gap-1">
                    <Plus className="w-3 h-3" /> {skill}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Skill */}
      <div className="flex gap-2">
        <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()}
          placeholder="Add a new skill..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all text-sm" />
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addSkill}
          className="px-5 py-3 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan text-sm font-medium hover:bg-cyan/20 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add
        </motion.button>
      </div>

      {/* Skills List */}
      <div className="grid gap-3">
        {skills.map((skill, i) => (
          <motion.div key={skill.skillName} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}>
            <GlassCard hover={false} className="!p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${proficiencyColors[skill.proficiency]}15` }}>
                  {skill.proficiency === 'advanced' ? <TrendingUp className="w-5 h-5 text-success" /> : <Target className="w-5 h-5" style={{ color: proficiencyColors[skill.proficiency] }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-text-primary text-sm">{skill.skillName}</span>
                    <span className="text-xs capitalize" style={{ color: proficiencyColors[skill.proficiency] }}>{skill.proficiency}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${proficiencyMap[skill.proficiency]}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full" style={{ backgroundColor: proficiencyColors[skill.proficiency] }} />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                    <button key={level} onClick={() => updateProficiency(skill.skillName, level)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${skill.proficiency === level ? '' : 'opacity-30 hover:opacity-60'}`}
                      style={{ backgroundColor: proficiencyColors[level] }}
                      title={level} />
                  ))}
                </div>
                <button onClick={() => removeSkill(skill.skillName)} className="text-text-muted hover:text-danger transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-16">
          <Target className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">No skills added yet. Start by adding your current skills above.</p>
        </div>
      )}
    </div>
  );
}
