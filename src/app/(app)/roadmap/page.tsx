'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReactFlow, Background, Controls, MiniMap,
  type Node, type Edge, Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  ChevronDown, ChevronUp, ExternalLink, Clock, CheckCircle2, Lock,
  LayoutGrid, List, X,
} from 'lucide-react';
import { getRoadmap, getProgress, toggleTopicComplete } from '@/lib/store';
import type { Roadmap, RoadmapWeek, ProgressEntry } from '@/lib/types';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [view, setView] = useState<'graph' | 'timeline'>('graph');
  const [selectedWeek, setSelectedWeek] = useState<RoadmapWeek | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  useEffect(() => {
    setRoadmap(getRoadmap());
    setProgress(getProgress());
  }, []);

  const getWeekStatus = useCallback((week: RoadmapWeek): 'completed' | 'in-progress' | 'locked' => {
    const weekTopics = week.topics;
    const completedCount = weekTopics.filter(t => progress.some(p => p.topic === t && p.completed)).length;
    if (completedCount === weekTopics.length) return 'completed';
    if (completedCount > 0) return 'in-progress';
    // First week or previous completed
    if (week.week === 1) return 'in-progress';
    const prevWeek = roadmap?.weeks.find(w => w.week === week.week - 1);
    if (prevWeek) {
      const prevCompleted = prevWeek.topics.filter(t => progress.some(p => p.topic === t && p.completed)).length;
      if (prevCompleted > 0) return 'in-progress';
    }
    return 'locked';
  }, [progress, roadmap]);

  const handleToggleTopic = (weekNumber: number, topic: string) => {
    const updated = toggleTopicComplete(weekNumber, topic);
    setProgress(updated);
  };

  // React Flow nodes and edges
  const { nodes, edges } = useMemo(() => {
    if (!roadmap) return { nodes: [], edges: [] };

    const nodeList: Node[] = roadmap.weeks.map((week, i) => {
      const status = getWeekStatus(week);
      const col = i % 3;
      const row = Math.floor(i / 3);
      const xOffset = row % 2 === 1 ? (2 - col) : col; // zigzag pattern

      return {
        id: `week-${week.week}`,
        position: { x: xOffset * 350 + 100, y: row * 200 + 50 },
        data: { label: week.theme, week, status },
        type: 'default',
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: {
          background: status === 'completed' ? 'rgba(0,212,255,0.12)' :
                     status === 'in-progress' ? 'rgba(255,179,71,0.12)' :
                     'rgba(255,255,255,0.03)',
          border: `1.5px solid ${
            status === 'completed' ? 'rgba(0,212,255,0.5)' :
            status === 'in-progress' ? 'rgba(255,179,71,0.5)' :
            'rgba(255,255,255,0.08)'
          }`,
          borderRadius: '16px',
          padding: '16px 20px',
          color: status === 'completed' ? '#00D4FF' :
                 status === 'in-progress' ? '#FFB347' :
                 '#64748B',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'var(--font-body)',
          width: 240,
          boxShadow: status === 'completed' ? '0 0 20px rgba(0,212,255,0.15)' :
                     status === 'in-progress' ? '0 0 20px rgba(255,179,71,0.1)' :
                     'none',
          cursor: 'pointer',
        },
      };
    });

    const edgeList: Edge[] = roadmap.weeks.slice(0, -1).map((week, i) => ({
      id: `e-${week.week}-${week.week + 1}`,
      source: `week-${week.week}`,
      target: `week-${week.week + 1}`,
      animated: getWeekStatus(roadmap.weeks[i]) === 'in-progress',
      style: {
        stroke: getWeekStatus(roadmap.weeks[i]) === 'completed' ? '#00D4FF' :
               getWeekStatus(roadmap.weeks[i]) === 'in-progress' ? '#FFB347' :
               'rgba(255,255,255,0.08)',
        strokeWidth: 2,
      },
    }));

    return { nodes: nodeList, edges: edgeList };
  }, [roadmap, getWeekStatus]);

  if (!roadmap) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No roadmap yet</h2>
          <p className="text-text-secondary mb-4">Complete onboarding to get your personalized roadmap.</p>
          <Link href="/onboarding" className="text-cyan hover:underline">Go to Onboarding →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Your <span className="gradient-text">{roadmap.careerPath}</span> Roadmap
          </h1>
          <p className="text-text-secondary text-sm">{roadmap.totalWeeks} weeks • Click nodes for details</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl p-1">
          <button
            onClick={() => setView('graph')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'graph' ? 'bg-cyan/10 text-cyan' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Graph
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              view === 'timeline' ? 'bg-cyan/10 text-cyan' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <List className="w-4 h-4" /> Timeline
          </button>
        </div>
      </div>

      {/* Graph View */}
      {view === 'graph' && (
        <div className="glass rounded-2xl overflow-hidden" style={{ height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(_, node) => {
              const weekData = (node.data as { week: RoadmapWeek }).week;
              setSelectedWeek(weekData);
            }}
            fitView
            minZoom={0.3}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="rgba(255,255,255,0.03)" gap={30} />
            <Controls
              style={{ 
                background: 'rgba(17,24,39,0.9)', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
            <MiniMap
              style={{ 
                background: 'rgba(17,24,39,0.9)', 
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              maskColor="rgba(0,0,0,0.5)"
              nodeColor={(node) => {
                const status = (node.data as { status: string })?.status;
                return status === 'completed' ? '#00D4FF' : status === 'in-progress' ? '#FFB347' : '#1E293B';
              }}
            />
          </ReactFlow>
        </div>
      )}

      {/* Timeline View */}
      {view === 'timeline' && (
        <div className="space-y-3">
          {roadmap.weeks.map((week) => {
            const status = getWeekStatus(week);
            const isExpanded = expandedWeek === week.week;
            const completedCount = week.topics.filter(t => progress.some(p => p.topic === t && p.completed)).length;
            return (
              <motion.div key={week.week} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: week.week * 0.03 }}>
                <GlassCard hover={false} className={`${
                  status === 'completed' ? 'border-cyan/20' : status === 'in-progress' ? 'border-amber/20' : ''
                }`}>
                  <button onClick={() => setExpandedWeek(isExpanded ? null : week.week)} className="w-full text-left">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        status === 'completed' ? 'bg-cyan/15 text-cyan' :
                        status === 'in-progress' ? 'bg-amber/15 text-amber' :
                        'bg-white/5 text-text-muted'
                      }`}>
                        {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                         status === 'locked' ? <Lock className="w-5 h-5" /> :
                         <span className="font-bold text-sm">{week.week}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-muted">Week {week.week}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            status === 'completed' ? 'bg-cyan/10 text-cyan' :
                            status === 'in-progress' ? 'bg-amber/10 text-amber' :
                            'bg-white/5 text-text-muted'
                          }`}>
                            {status === 'completed' ? 'Done' : status === 'in-progress' ? 'In Progress' : 'Locked'}
                          </span>
                        </div>
                        <h4 className="font-semibold text-text-primary">{week.theme}</h4>
                        <p className="text-xs text-text-secondary">{completedCount}/{week.topics.length} topics • {week.hours}hrs</p>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-4 pt-4 border-t border-border-glass space-y-4">
                          {/* Topics with checkboxes */}
                          <div>
                            <h5 className="text-xs font-medium text-text-muted mb-2">Topics</h5>
                            <div className="space-y-2">
                              {week.topics.map((topic, i) => {
                                const done = progress.some(p => p.topic === topic && p.completed);
                                return (
                                  <button key={i} onClick={() => handleToggleTopic(week.week, topic)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left ${done ? 'bg-success/10' : 'hover:bg-white/5'}`}>
                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${done ? 'text-success' : 'text-text-muted'}`} />
                                    <span className={`text-sm ${done ? 'text-success line-through' : 'text-text-primary'}`}>{topic}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          {/* Resources */}
                          <div>
                            <h5 className="text-xs font-medium text-text-muted mb-2">Resources</h5>
                            <div className="space-y-2">
                              {week.resources.map((res, i) => (
                                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all group">
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    res.type === 'video' ? 'bg-danger/10 text-danger' :
                                    res.type === 'course' ? 'bg-cyan/10 text-cyan' :
                                    'bg-amber/10 text-amber'
                                  }`}>{res.type}</span>
                                  <span className="text-sm text-text-secondary group-hover:text-text-primary flex-1">{res.title}</span>
                                  {res.duration && <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{res.duration}</span>}
                                  <ExternalLink className="w-3 h-3 text-text-muted" />
                                </a>
                              ))}
                            </div>
                          </div>
                          {/* Project */}
                          <div className="p-3 rounded-xl bg-amber/5 border border-amber/20">
                            <p className="text-xs text-amber font-medium mb-1">📦 Project</p>
                            <p className="font-medium text-sm text-text-primary">{week.project.title}</p>
                            <p className="text-xs text-text-secondary mt-1">{week.project.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{week.project.estimatedHours}hrs</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                week.project.difficulty === 'beginner' ? 'bg-success/10 text-success' :
                                week.project.difficulty === 'intermediate' ? 'bg-amber/10 text-amber' :
                                'bg-danger/10 text-danger'
                              }`}>{week.project.difficulty}</span>
                            </div>
                          </div>
                          {/* Milestone */}
                          <div className="text-xs text-text-muted">
                            🎯 Milestone: <span className="text-text-secondary">{week.milestone}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Node Detail Panel (for graph view) */}
      <AnimatePresence>
        {selectedWeek && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-screen w-[400px] glass border-l border-border-glass z-50 overflow-y-auto p-6"
            style={{ borderRadius: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>Week {selectedWeek.week}</h3>
              <button onClick={() => setSelectedWeek(null)} className="p-2 rounded-lg hover:bg-white/10 text-text-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">{selectedWeek.theme}</h4>
            <p className="text-sm text-text-secondary mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> {selectedWeek.hours} hours estimated
            </p>

            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-medium text-text-muted mb-2 uppercase">Topics</h5>
                {selectedWeek.topics.map((topic, i) => {
                  const done = progress.some(p => p.topic === topic && p.completed);
                  return (
                    <button key={i} onClick={() => handleToggleTopic(selectedWeek.week, topic)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left ${done ? 'bg-success/10' : 'hover:bg-white/5'}`}>
                      <CheckCircle2 className={`w-4 h-4 ${done ? 'text-success' : 'text-text-muted'}`} />
                      <span className={`text-sm ${done ? 'text-success line-through' : 'text-text-primary'}`}>{topic}</span>
                    </button>
                  );
                })}
              </div>

              <div>
                <h5 className="text-xs font-medium text-text-muted mb-2 uppercase">Resources</h5>
                {selectedWeek.resources.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 transition-all">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      res.type === 'video' ? 'bg-danger/10 text-danger' : 'bg-cyan/10 text-cyan'
                    }`}>{res.type}</span>
                    <span className="text-sm text-text-secondary flex-1">{res.title}</span>
                    <ExternalLink className="w-3 h-3 text-text-muted" />
                  </a>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber/5 border border-amber/20">
                <p className="text-xs text-amber font-medium mb-1">📦 Project</p>
                <p className="font-semibold text-text-primary">{selectedWeek.project.title}</p>
                <p className="text-xs text-text-secondary mt-1">{selectedWeek.project.description}</p>
              </div>

              <div className="text-sm text-text-muted">
                🎯 <span className="text-text-secondary">{selectedWeek.milestone}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
