'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Eye, EyeOff, Filter, Brain } from 'lucide-react';
import { interviewQuestions } from '@/lib/mock-data';
import GlassCard from '@/components/ui/GlassCard';

const categories = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'technical', label: 'Technical', icon: '💻' },
  { id: 'hr', label: 'Behavioral', icon: '🤝' },
  { id: 'dsa', label: 'DSA', icon: '🧮' },
  { id: 'system-design', label: 'System Design', icon: '🏗️' },
];

export default function InterviewPage() {
  const [category, setCategory] = useState('all');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [difficulty, setDifficulty] = useState('all');

  const filtered = useMemo(() => {
    return interviewQuestions.filter(q => {
      if (category !== 'all' && q.category !== category) return false;
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
      return true;
    });
  }, [category, difficulty]);

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const diffColors: Record<string, string> = { easy: '#22C55E', medium: '#FFB347', hard: '#EF4444' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Interview <span className="gradient-text">Prep</span>
          </h1>
          <p className="text-text-secondary text-sm">Practice questions by category and difficulty</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setRevealedIds(new Set())}
          className="px-4 py-2 rounded-xl bg-white/5 border border-border-glass text-xs text-text-secondary hover:text-text-primary transition-all flex items-center gap-2">
          <EyeOff className="w-3 h-3" /> Hide All Answers
        </motion.button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all whitespace-nowrap flex items-center gap-2 ${
              category === cat.id
                ? 'bg-cyan/10 border-cyan/30 text-cyan'
                : 'border-border-glass text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}>
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-text-muted" />
        {['all', 'easy', 'medium', 'hard'].map(d => (
          <button key={d} onClick={() => setDifficulty(d)}
            className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${
              difficulty === d ? 'bg-white/10 text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}>{d === 'all' ? 'All Levels' : d}</button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filtered.map((q, i) => (
          <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}>
            <GlassCard hover={false} className="!p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 text-text-muted" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded capitalize"
                      style={{ backgroundColor: `${diffColors[q.difficulty]}15`, color: diffColors[q.difficulty] }}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-text-muted capitalize">{q.category.replace('-', ' ')}</span>
                  </div>
                  <h3 className="font-medium text-text-primary mb-3">{q.question}</h3>
                  <button onClick={() => toggleReveal(q.id)}
                    className="flex items-center gap-2 text-sm text-cyan hover:underline transition-all">
                    {revealedIds.has(q.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {revealedIds.has(q.id) ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <AnimatePresence>
                    {revealedIds.has(q.id) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-3 p-4 rounded-xl bg-white/5 border border-border-glass">
                          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{q.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Brain className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">No questions match your filters.</p>
        </div>
      )}

      {/* Mock Interview CTA */}
      <GlassCard hover={false} className="text-center">
        <Brain className="w-10 h-10 text-cyan mx-auto mb-3" />
        <h3 className="font-semibold mb-2">Want a mock interview?</h3>
        <p className="text-sm text-text-secondary mb-4">Our AI mentor can ask you questions and evaluate your answers in real-time.</p>
        <a href="/chat">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan text-sm font-medium hover:bg-cyan/20 transition-all">
            Start Mock Interview →
          </motion.button>
        </a>
      </GlassCard>
    </div>
  );
}
