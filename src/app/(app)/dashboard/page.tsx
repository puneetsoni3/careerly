'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Rocket, TrendingUp, BookOpen, Flame, CheckCircle2,
  Map, MessageSquare, ArrowRight, Calendar,
} from 'lucide-react';
import { getProfile, getRoadmap, getProgress, getStreak } from '@/lib/store';
import type { UserProfile, Roadmap, ProgressEntry } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import ProgressRing from '@/components/ui/ProgressRing';
import SkillRadarChart from '@/components/dashboard/SkillRadarChart';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [streak, setStreak] = useState({ current: 0, lastDate: null as string | null, studyDates: [] as string[] });

  useEffect(() => {
    setProfile(getProfile());
    setRoadmap(getRoadmap());
    setProgress(getProgress());
    setStreak(getStreak());
  }, []);

  const completedTopics = progress.filter(p => p.completed).length;
  const totalTopics = roadmap?.weeks.reduce((sum, w) => sum + w.topics.length, 0) || 1;
  const overallProgress = Math.round((completedTopics / totalTopics) * 100);
  
  const currentWeek = Math.max(1, Math.ceil(completedTopics / 4) + 1);
  const currentWeekData = roadmap?.weeks.find(w => w.week === currentWeek) || roadmap?.weeks[0];

  const quickActions = [
    { label: 'View Roadmap', icon: Map, href: '/roadmap', color: '#00D4FF' },
    { label: 'Chat with AI', icon: MessageSquare, href: '/chat', color: '#FFB347' },
    { label: 'Track Progress', icon: TrendingUp, href: '/progress', color: '#22C55E' },
  ];

  if (!profile || !roadmap) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Rocket className="w-16 h-16 text-cyan mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Welcome to CAREERLY</h2>
          <p className="text-text-secondary mb-6">Complete the onboarding to get your personalized dashboard.</p>
          <Link href="/onboarding">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan font-medium flex items-center gap-2 mx-auto">
              Start Onboarding <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-amber/5" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Hey {profile.name.split(' ')[0]}, <span className="gradient-text">Week {currentWeek}</span> of your{' '}
            {roadmap.careerPath} Journey 🚀
          </h1>
          <p className="text-text-secondary">Keep going — you&apos;re making great progress!</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Progress', value: `${overallProgress}%`, icon: TrendingUp, color: '#00D4FF', ring: true },
          { label: 'Current Week', value: `Week ${currentWeek}`, icon: Calendar, color: '#FFB347' },
          { label: 'Skills Mastered', value: `${Math.floor(completedTopics / 3)}`, icon: BookOpen, color: '#22C55E' },
          { label: 'Day Streak', value: `${streak.current}`, icon: Flame, color: '#F472B6' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}>
            <GlassCard className="flex items-center gap-4">
              {stat.ring ? (
                <ProgressRing progress={overallProgress} size={56} stroke={5} color={stat.color}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </ProgressRing>
              ) : (
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              )}
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-secondary">{stat.label}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* This Week's Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="lg:col-span-2">
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                This Week&apos;s Plan — {currentWeekData?.theme || 'Getting Started'}
              </h3>
              <span className="text-xs text-text-muted">{currentWeekData?.hours || 10}hrs estimated</span>
            </div>
            <div className="space-y-3">
              {(currentWeekData?.topics || ['Start your journey']).map((topic, i) => {
                const isCompleted = progress.some(p => p.topic === topic && p.completed);
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isCompleted ? 'bg-success/10' : 'bg-white/5'
                    }`}>
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isCompleted ? 'text-success' : 'text-text-muted'}`} />
                    <span className={`text-sm ${isCompleted ? 'text-success line-through' : 'text-text-primary'}`}>{topic}</span>
                  </motion.div>
                );
              })}
            </div>
            {currentWeekData?.project && (
              <div className="mt-4 p-4 rounded-xl bg-amber/5 border border-amber/20">
                <p className="text-xs text-amber font-medium mb-1">📦 Project This Week</p>
                <p className="text-sm text-text-primary font-medium">{currentWeekData.project.title}</p>
                <p className="text-xs text-text-secondary mt-1">{currentWeekData.project.description.substring(0, 100)}...</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          <GlassCard hover={false}>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href}>
                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                      <action.icon className="w-5 h-5" style={{ color: action.color }} />
                    </div>
                    <span className="text-sm text-text-primary flex-1">{action.label}</span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Skill Radar Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <GlassCard hover={false}>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Skill Gap Analysis</h3>
          <SkillRadarChart roadmap={roadmap} />
        </GlassCard>
      </motion.div>
    </div>
  );
}
