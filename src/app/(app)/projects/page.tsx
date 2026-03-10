'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Clock, ExternalLink, Filter, Search, Plus } from 'lucide-react';
import { projectSuggestions } from '@/lib/mock-data';
import GlassCard from '@/components/ui/GlassCard';

const careerFilters = ['All', 'Full Stack Developer', 'AI/ML Engineer', 'Data Analyst', 'Cloud/DevOps'];
const difficultyFilters = ['All', 'beginner', 'intermediate', 'advanced'];

export default function ProjectsPage() {
  const [careerFilter, setCareerFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return projectSuggestions.filter(p => {
      if (careerFilter !== 'All' && p.careerPath !== careerFilter) return false;
      if (difficultyFilter !== 'All' && p.difficulty !== difficultyFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
          !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [careerFilter, difficultyFilter, search]);

  const diffColors: Record<string, string> = { beginner: '#22C55E', intermediate: '#FFB347', advanced: '#EF4444' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Projects <span className="gradient-text">Lab</span>
        </h1>
        <p className="text-text-secondary text-sm">Build portfolio-worthy projects matched to your career path</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border-glass text-sm text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 glass rounded-xl p-1">
            <Filter className="w-4 h-4 text-text-muted ml-2" />
            {careerFilters.map(f => (
              <button key={f} onClick={() => setCareerFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  careerFilter === f ? 'bg-cyan/10 text-cyan' : 'text-text-secondary hover:text-text-primary'
                }`}>{f === 'All' ? 'All Paths' : f.split(' ').slice(0, 2).join(' ')}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {difficultyFilters.map(f => (
          <button key={f} onClick={() => setDifficultyFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize ${
              difficultyFilter === f ? 'bg-white/10 border-white/20 text-text-primary' : 'border-border-glass text-text-muted hover:text-text-secondary'
            }`}>{f === 'All' ? 'All Levels' : f}</button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((project, i) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}>
            <GlassCard className="h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-cyan" />
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{
                    backgroundColor: `${diffColors[project.difficulty]}15`,
                    color: diffColors[project.difficulty],
                  }}>{project.difficulty}</span>
                </div>
                <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{project.estimatedHours}hrs</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{project.title}</h3>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded text-xs bg-white/5 text-text-muted">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">{project.careerPath}</span>
                <div className="flex-1" />
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-cyan flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3 h-3" /> Starter Template
                  </a>
                )}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan text-xs hover:bg-cyan/20 transition-all flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add to Roadmap
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FolderKanban className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">No projects match your filters. Try adjusting them.</p>
        </div>
      )}
    </div>
  );
}
