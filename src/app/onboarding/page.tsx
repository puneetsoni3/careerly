'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  User, GraduationCap, Code, Target, Clock, ChevronRight, ChevronLeft, 
  Check, Sparkles, Loader2, Plus, X,
} from 'lucide-react';
import { saveProfile, saveSkills, saveOnboardingData, saveRoadmap } from '@/lib/store';
import type { UserSkill, OnboardingData } from '@/lib/types';

const CAREER_PATHS = [
  { id: 'AI/ML Engineer', icon: '🤖', label: 'AI/ML Engineer', desc: 'Build intelligent systems with machine learning' },
  { id: 'Data Analyst', icon: '📊', label: 'Data Analyst', desc: 'Turn data into actionable business insights' },
  { id: 'Full Stack Developer', icon: '💻', label: 'Full Stack Dev', desc: 'Build complete web applications end-to-end' },
  { id: 'Cybersecurity', icon: '🔒', label: 'Cybersecurity', desc: 'Protect systems from digital threats' },
  { id: 'Cloud/DevOps', icon: '☁️', label: 'Cloud/DevOps', desc: 'Build and manage cloud infrastructure' },
  { id: 'Mobile Developer', icon: '📱', label: 'Mobile Dev', desc: 'Create iOS and Android applications' },
  { id: 'UI/UX Designer', icon: '🎨', label: 'UI/UX Designer', desc: 'Design beautiful user experiences' },
  { id: 'Product Manager', icon: '📈', label: 'Product Manager', desc: 'Lead product strategy and execution' },
];

const SKILLS_LIST = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL', 'HTML/CSS',
  'React', 'Node.js', 'Express', 'Next.js', 'Django', 'Flask',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
  'Excel', 'Power BI', 'Tableau', 'R',
  'Docker', 'Kubernetes', 'AWS', 'Git',
  'MongoDB', 'PostgreSQL', 'Firebase',
  'Figma', 'Adobe XD',
];

const OBSTACLES = [
  'No clear direction', 'Limited time', 'Weak resume', 'Interview fear',
  'No mentorship', 'Too many options', 'Lack of projects', 'Imposter syndrome',
];

const steps = [
  { id: 1, icon: User, label: 'Personal Info' },
  { id: 2, icon: Code, label: 'Skills' },
  { id: 3, icon: Target, label: 'Career Goal' },
  { id: 4, icon: Clock, label: 'Commitment' },
  { id: 5, icon: Sparkles, label: 'Generate' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form state
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState(3);
  const [cgpa, setCgpa] = useState('');
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [timelineMonths, setTimelineMonths] = useState(6);
  const [obstacles, setObstacles] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);

  const genSteps = [
    'Analyzing your profile...',
    'Identifying skill gaps...',
    'Generating your roadmap...',
    'Preparing resources...',
    'Finalizing your plan...',
  ];

  const toggleSkill = (skillName: string) => {
    setSkills(prev => {
      const exists = prev.find(s => s.skillName === skillName);
      if (exists) return prev.filter(s => s.skillName !== skillName);
      return [...prev, { skillName, proficiency: 'beginner' }];
    });
  };

  const updateProficiency = (skillName: string, proficiency: UserSkill['proficiency']) => {
    setSkills(prev => prev.map(s => s.skillName === skillName ? { ...s, proficiency } : s));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !skills.find(s => s.skillName === customSkill.trim())) {
      setSkills(prev => [...prev, { skillName: customSkill.trim(), proficiency: 'beginner' }]);
      setCustomSkill('');
    }
  };

  const toggleObstacle = (o: string) => {
    setObstacles(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]);
  };

  const nextStep = () => { setDirection(1); setStep(s => Math.min(s + 1, 5)); };
  const prevStep = () => { setDirection(-1); setStep(s => Math.max(s - 1, 1)); };

  const handleGenerate = async () => {
    setGenerating(true);

    // Animate through generation steps
    for (let i = 0; i < genSteps.length; i++) {
      setGenStep(i);
      await new Promise(r => setTimeout(r, 1200));
    }

    const onboardingData: OnboardingData = {
      personalInfo: { name, college, branch, year, cgpa: cgpa ? parseFloat(cgpa) : undefined },
      skills,
      targetRole,
      hoursPerDay,
      timelineMonths,
      obstacles,
    };

    saveOnboardingData(onboardingData);
    saveProfile({
      name, college, branch, year,
      cgpa: cgpa ? parseFloat(cgpa) : undefined,
      targetRole, hoursPerDay, timelineMonths, obstacles,
    });
    saveSkills(skills);

    // Generate roadmap
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: onboardingData.personalInfo,
          skills,
          targetRole,
          hoursPerDay,
          timelineMonths,
        }),
      });
      const roadmap = await res.json();
      saveRoadmap(roadmap);
    } catch {
      // Fallback handled by API
      const { generateMockRoadmap } = await import('@/lib/mock-data');
      saveRoadmap(generateMockRoadmap(targetRole, timelineMonths * 4));
    }

    router.push('/dashboard');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return name.trim().length > 0;
      case 2: return skills.length > 0;
      case 3: return targetRole.length > 0;
      case 4: return true;
      default: return true;
    }
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <motion.div
                animate={{
                  scale: step === s.id ? 1.1 : 1,
                  backgroundColor: step > s.id ? '#00D4FF' : step === s.id ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)',
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  step >= s.id ? 'border-cyan/30' : 'border-border-glass'
                }`}
              >
                {step > s.id ? (
                  <Check className="w-4 h-4 text-bg-primary" />
                ) : (
                  <s.icon className={`w-4 h-4 ${step === s.id ? 'text-cyan' : 'text-text-muted'}`} />
                )}
              </motion.div>
              {i < steps.length - 1 && (
                <div className={`w-8 md:w-12 h-0.5 mx-1 rounded transition-all ${
                  step > s.id ? 'bg-cyan' : 'bg-border-glass'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="glass rounded-2xl p-6 md:p-8 min-h-[450px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Tell us about yourself</h2>
                      <p className="text-sm text-text-secondary">This helps us personalize your roadmap</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-text-secondary block mb-1.5">Full Name *</label>
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary block mb-1.5">College</label>
                      <input value={college} onChange={e => setCollege(e.target.value)} placeholder="Your college/university"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary block mb-1.5">Branch/Major</label>
                      <input value={branch} onChange={e => setBranch(e.target.value)} placeholder="e.g., Computer Science"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary block mb-1.5">Year</label>
                      <select value={year} onChange={e => setYear(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary focus:border-cyan/50 focus:outline-none transition-all appearance-none">
                        {[1, 2, 3, 4].map(y => <option key={y} value={y} className="bg-bg-secondary">Year {y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary block mb-1.5">CGPA (optional)</label>
                      <input value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="e.g., 8.5" type="number" step="0.1" min="0" max="10"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Skills */}
              {step === 2 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                      <Code className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>What skills do you have?</h2>
                      <p className="text-sm text-text-secondary">Select your current skills and set proficiency levels</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {SKILLS_LIST.map(skill => {
                      const selected = skills.find(s => s.skillName === skill);
                      return (
                        <motion.button
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                            selected
                              ? 'bg-cyan/15 border-cyan/30 text-cyan'
                              : 'bg-white/5 border-border-glass text-text-secondary hover:text-text-primary hover:bg-white/10'
                          }`}
                        >
                          {skill}
                        </motion.button>
                      );
                    })}
                  </div>
                  {/* Custom skill */}
                  <div className="flex gap-2 mb-4">
                    <input value={customSkill} onChange={e => setCustomSkill(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCustomSkill()}
                      placeholder="Add custom skill..."
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none text-sm" />
                    <button onClick={addCustomSkill} className="px-3 py-2 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan hover:bg-cyan/20 transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Selected skills with proficiency */}
                  {skills.length > 0 && (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      <p className="text-xs text-text-muted">Set proficiency:</p>
                      {skills.map(skill => (
                        <div key={skill.skillName} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                          <span className="text-sm text-text-primary flex-1">{skill.skillName}</span>
                          <div className="flex gap-1">
                            {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                              <button
                                key={level}
                                onClick={() => updateProficiency(skill.skillName, level)}
                                className={`px-2 py-1 rounded text-xs transition-all ${
                                  skill.proficiency === level
                                    ? 'bg-cyan/20 text-cyan border border-cyan/30'
                                    : 'text-text-muted hover:text-text-secondary'
                                }`}
                              >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </button>
                            ))}
                          </div>
                          <button onClick={() => toggleSkill(skill.skillName)} className="text-text-muted hover:text-danger">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Career Goal */}
              {step === 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Choose your career path</h2>
                      <p className="text-sm text-text-secondary">Select the role you want to prepare for</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CAREER_PATHS.map(path => (
                      <motion.button
                        key={path.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setTargetRole(path.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          targetRole === path.id
                            ? 'bg-cyan/10 border-cyan/40 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                            : 'bg-white/5 border-border-glass hover:bg-white/8 hover:border-white/15'
                        }`}
                      >
                        <span className="text-2xl block mb-2">{path.icon}</span>
                        <span className={`text-sm font-medium block ${targetRole === path.id ? 'text-cyan' : 'text-text-primary'}`}>
                          {path.label}
                        </span>
                        <span className="text-xs text-text-muted mt-1 block">{path.desc}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Time & Commitment */}
              {step === 4 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-cyan" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Time & commitment</h2>
                      <p className="text-sm text-text-secondary">Help us create a realistic plan for you</p>
                    </div>
                  </div>
                  {/* Hours per day */}
                  <div className="mb-6">
                    <label className="text-sm text-text-secondary block mb-3">
                      Hours available per day: <span className="text-cyan font-bold text-lg">{hoursPerDay}h</span>
                    </label>
                    <input type="range" min={1} max={8} value={hoursPerDay} onChange={e => setHoursPerDay(Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none bg-white/10 accent-[#00D4FF] cursor-pointer" />
                    <div className="flex justify-between text-xs text-text-muted mt-1">
                      <span>1hr</span><span>4hr</span><span>8hr</span>
                    </div>
                  </div>
                  {/* Timeline */}
                  <div className="mb-6">
                    <label className="text-sm text-text-secondary block mb-3">Timeline to placement</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 6, 9, 12].map(m => (
                        <motion.button
                          key={m}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTimelineMonths(m)}
                          className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                            timelineMonths === m
                              ? 'bg-cyan/10 border-cyan/40 text-cyan'
                              : 'bg-white/5 border-border-glass text-text-secondary hover:bg-white/10'
                          }`}
                        >
                          {m} months
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  {/* Obstacles */}
                  <div>
                    <label className="text-sm text-text-secondary block mb-3">Current obstacles (select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {OBSTACLES.map(o => (
                        <motion.button
                          key={o}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleObstacle(o)}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                            obstacles.includes(o)
                              ? 'bg-amber/10 border-amber/30 text-amber'
                              : 'bg-white/5 border-border-glass text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {o}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Generating */}
              {step === 5 && (
                <div className="flex flex-col items-center justify-center min-h-[350px]">
                  {!generating ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-amber flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-8 h-8 text-bg-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Ready to generate your roadmap?</h2>
                      <p className="text-text-secondary mb-2">Target: <span className="text-cyan">{targetRole}</span></p>
                      <p className="text-text-secondary mb-2">Timeline: <span className="text-amber">{timelineMonths} months</span></p>
                      <p className="text-text-secondary mb-6">Skills: <span className="text-text-primary">{skills.length} selected</span></p>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGenerate}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan/20 to-cyan/10 border border-cyan/40 text-cyan text-lg font-semibold flex items-center gap-3 mx-auto"
                      >
                        <Sparkles className="w-5 h-5" />
                        Generate My Roadmap
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-amber flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <Sparkles className="w-8 h-8 text-bg-primary" />
                      </div>
                      <div className="space-y-4">
                        {genSteps.map((gs, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: genStep >= i ? 1 : 0.3, x: 0 }}
                            transition={{ delay: i * 0.3, duration: 0.3 }}
                            className="flex items-center gap-3"
                          >
                            {genStep > i ? (
                              <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            ) : genStep === i ? (
                              <Loader2 className="w-6 h-6 text-cyan animate-spin flex-shrink-0" />
                            ) : (
                              <div className="w-6 h-6 rounded-full border border-border-glass flex-shrink-0" />
                            )}
                            <span className={`text-sm ${genStep >= i ? 'text-text-primary' : 'text-text-muted'}`}>
                              {gs}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium border transition-all ${
                step === 1
                  ? 'opacity-30 cursor-not-allowed border-border-glass text-text-muted'
                  : 'border-border-glass text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </motion.button>
            <motion.button
              whileHover={canProceed() ? { scale: 1.02 } : undefined}
              whileTap={canProceed() ? { scale: 0.98 } : undefined}
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium border transition-all ${
                canProceed()
                  ? 'bg-cyan/10 border-cyan/30 text-cyan hover:bg-cyan/20 hover:border-cyan/50'
                  : 'opacity-30 cursor-not-allowed border-border-glass text-text-muted'
              }`}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
