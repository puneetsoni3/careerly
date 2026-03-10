'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, TrendingUp, Trophy, Target } from 'lucide-react';
import { getProgress, getStreak, getStudyLog, getRoadmap, logStudyHours, recordStudyDay } from '@/lib/store';
import type { ProgressEntry, Roadmap } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import ProgressRing from '@/components/ui/ProgressRing';
import confetti from 'canvas-confetti';

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [streak, setStreak] = useState({ current: 0, lastDate: null as string | null, studyDates: [] as string[] });
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [studyLog] = useState(getStudyLog());
  const [hoursToday, setHoursToday] = useState(0);

  useEffect(() => {
    setProgress(getProgress());
    setStreak(getStreak());
    setRoadmap(getRoadmap());
  }, []);

  const completedTopics = progress.filter(p => p.completed).length;
  const totalTopics = roadmap?.weeks.reduce((sum, w) => sum + w.topics.length, 0) || 1;
  const overallPct = Math.round((completedTopics / totalTopics) * 100);

  // Week completion data
  const weekCompletions = useMemo(() => {
    if (!roadmap) return [];
    return roadmap.weeks.map(w => {
      const done = w.topics.filter(t => progress.some(p => p.topic === t && p.completed)).length;
      return { week: w.week, theme: w.theme, done, total: w.topics.length, pct: Math.round((done / w.topics.length) * 100) };
    });
  }, [roadmap, progress]);

  // Calendar heatmap data (last 90 days)
  const heatmapData = useMemo(() => {
    const days: { date: string; count: number }[] = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const studyEntry = studyLog.find(e => e.date === dateStr);
      const isStudyDay = streak.studyDates.includes(dateStr);
      days.push({ date: dateStr, count: studyEntry?.hours || (isStudyDay ? 1 : 0) });
    }
    return days;
  }, [studyLog, streak.studyDates]);

  const handleLogHours = () => {
    if (hoursToday > 0) {
      logStudyHours(hoursToday);
      const newStreak = recordStudyDay();
      setStreak(newStreak);
      setHoursToday(0);

      // Celebration!
      if (newStreak.current >= 7 || overallPct >= 50) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const milestones = [
    { target: 25, label: '25% Complete', reached: overallPct >= 25 },
    { target: 50, label: 'Halfway There!', reached: overallPct >= 50 },
    { target: 75, label: '75% Complete', reached: overallPct >= 75 },
    { target: 100, label: 'Journey Complete! 🎉', reached: overallPct >= 100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Progress <span className="gradient-text">Tracker</span>
        </h1>
        <p className="text-text-secondary text-sm">Track your learning journey and stay motivated</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard hover={false} className="text-center">
          <ProgressRing progress={overallPct} size={80} stroke={6}>
            <span className="text-lg font-bold text-cyan">{overallPct}%</span>
          </ProgressRing>
          <p className="text-xs text-text-secondary mt-2">Overall Progress</p>
        </GlassCard>

        <GlassCard hover={false} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-amber/10 flex items-center justify-center mx-auto">
            <Flame className="w-7 h-7 text-amber" />
          </div>
          <p className="text-2xl font-bold text-amber mt-2">{streak.current}</p>
          <p className="text-xs text-text-secondary">Day Streak</p>
        </GlassCard>

        <GlassCard hover={false} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mx-auto">
            <Target className="w-7 h-7 text-success" />
          </div>
          <p className="text-2xl font-bold text-success mt-2">{completedTopics}</p>
          <p className="text-xs text-text-secondary">Topics Completed</p>
        </GlassCard>

        <GlassCard hover={false} className="flex flex-col items-center justify-center">
          <p className="text-xs text-text-secondary mb-2">Log study hours today</p>
          <div className="flex items-center gap-2">
            <input type="number" min={0} max={12} step={0.5} value={hoursToday} onChange={e => setHoursToday(Number(e.target.value))}
              className="w-16 px-3 py-2 rounded-lg bg-white/5 border border-border-glass text-center text-sm text-text-primary focus:outline-none focus:border-cyan/50" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogHours}
              className="px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan text-xs font-medium">Log</motion.button>
          </div>
        </GlassCard>
      </div>

      {/* Calendar Heatmap */}
      <GlassCard hover={false}>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan" /> Activity Heatmap (Last 90 Days)
        </h3>
        <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
          {heatmapData.map((day, i) => {
            const intensity = day.count > 3 ? 4 : day.count;
            const colors = ['rgba(255,255,255,0.03)', 'rgba(0,212,255,0.15)', 'rgba(0,212,255,0.3)', 'rgba(0,212,255,0.5)', 'rgba(0,212,255,0.7)'];
            return (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.005 }}
                className="aspect-square rounded-sm cursor-pointer hover:ring-1 hover:ring-cyan/50 transition-all"
                style={{ backgroundColor: colors[intensity] }}
                title={`${day.date}: ${day.count}h`} />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-1 mt-2 text-xs text-text-muted">
          <span>Less</span>
          {['rgba(255,255,255,0.03)', 'rgba(0,212,255,0.15)', 'rgba(0,212,255,0.3)', 'rgba(0,212,255,0.5)', 'rgba(0,212,255,0.7)'].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span>More</span>
        </div>
      </GlassCard>

      {/* Milestones */}
      <GlassCard hover={false}>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber" /> Milestones
        </h3>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${m.reached ? 'bg-success/10' : 'bg-white/5'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.reached ? 'bg-success' : 'bg-white/10'}`}>
                {m.reached ? <Trophy className="w-4 h-4 text-white" /> : <span className="text-xs text-text-muted">{m.target}%</span>}
              </div>
              <span className={`text-sm flex-1 ${m.reached ? 'text-success font-medium' : 'text-text-muted'}`}>{m.label}</span>
              {m.reached && <span className="text-xs text-success">✓ Achieved</span>}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Weekly Breakdown */}
      <GlassCard hover={false}>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan" /> Weekly Breakdown
        </h3>
        <div className="space-y-3">
          {weekCompletions.map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-12">Wk {w.week}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-secondary truncate max-w-[200px]">{w.theme}</span>
                  <span className="text-xs text-text-muted">{w.done}/{w.total}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${w.pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className={`h-full rounded-full ${w.pct === 100 ? 'bg-success' : w.pct > 0 ? 'bg-cyan' : 'bg-white/5'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
