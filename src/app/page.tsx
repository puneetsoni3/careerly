'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles, ArrowRight, Map, MessageSquare, Target, FolderKanban,
  TrendingUp, FileText, ChevronLeft, ChevronRight, Star, Zap,
  Shield, Users, Brain, Rocket,
} from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const features = [
  { icon: Map, title: 'Personalized Roadmaps', desc: 'AI-generated week-by-week learning paths tailored to your skills, time, and career goals.', color: '#00D4FF' },
  { icon: Brain, title: 'AI Career Mentor', desc: 'Chat with your personal AI mentor for guidance, resume reviews, and mock interviews.', color: '#FFB347' },
  { icon: Target, title: 'Skill Gap Analysis', desc: 'Identify exactly what skills you need and get a prioritized learning plan.', color: '#22C55E' },
  { icon: FolderKanban, title: 'Project Suggestions', desc: 'Build portfolio-worthy projects matched to your career path and skill level.', color: '#A78BFA' },
  { icon: TrendingUp, title: 'Progress Tracking', desc: 'Track streaks, milestones, and daily progress with beautiful visualizations.', color: '#F472B6' },
  { icon: FileText, title: 'Resume Analyzer', desc: 'Get ATS scores, missing keywords, and actionable improvement suggestions.', color: '#FB923C' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Data Analyst at Flipkart', text: 'CAREERLY gave me a clear 12-week roadmap that took me from confused student to a job offer. The AI mentor was like having a senior friend in the industry.', rating: 5, avatar: 'PS' },
  { name: 'Rahul Kumar', role: 'Full Stack Dev at Razorpay', text: 'The interactive roadmap is incredible. I could see exactly where I was, what I needed to learn next, and the projects built my portfolio.', rating: 5, avatar: 'RK' },
  { name: 'Ananya Singh', role: 'ML Engineer at Google', text: "The skill gap analysis was eye-opening. CAREERLY identified blind spots I didn't even know I had. Best career tool I've used.", rating: 5, avatar: 'AS' },
  { name: 'Vikram Patel', role: 'DevOps at AWS', text: 'From zero DevOps knowledge to an AWS offer in 6 months. The weekly structure kept me accountable and the project suggestions were spot on.', rating: 5, avatar: 'VP' },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Students Guided' },
  { value: 50, suffix: '+', label: 'Career Paths' },
  { value: 95, suffix: '%', label: 'Placement Rate' },
  { value: 500, suffix: '+', label: 'Projects Built' },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-glass"
        style={{ borderRadius: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-amber flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-bg-primary" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>CAREERLY</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-text-primary transition-colors">Testimonials</a>
            <a href="#stats" className="hover:text-text-primary transition-colors">Results</a>
          </div>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan text-sm font-medium hover:bg-cyan/20 hover:border-cyan/50 transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-screen flex items-center justify-center pt-16 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/5 border border-cyan/20 text-cyan text-sm mb-8"
            >
              <Zap className="w-4 h-4" />
              <span>Powered by AI — Personalized for you</span>
            </motion.div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your AI{' '}
              <span className="gradient-text">Career</span>
              <br />
              <TypewriterText />
            </h1>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop guessing. Start building. CAREERLY analyzes your skills, creates a personalized
              roadmap, and guides you week-by-week to your dream tech career.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan/20 to-cyan/10 border border-cyan/40 text-cyan text-lg font-semibold flex items-center gap-3 transition-all"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-border-glass text-text-secondary text-lg font-medium hover:text-text-primary hover:bg-white/10 transition-all"
                >
                  View Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating badges */}
          <div className="relative mt-16 hidden lg:block">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-10 top-10 glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm"
            >
              <Shield className="w-4 h-4 text-success" />
              <span className="text-text-secondary">AI-Powered Analysis</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -right-10 top-0 glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm"
            >
              <Rocket className="w-4 h-4 text-amber" />
              <span className="text-text-secondary">Week-by-Week Plans</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
              className="absolute left-1/4 -top-5 glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm"
            >
              <Users className="w-4 h-4 text-cyan" />
              <span className="text-text-secondary">10K+ Students</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold gradient-text block"
                />
                <p className="text-text-secondary text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Everything you need to{' '}
              <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From skill analysis to interview prep, CAREERLY is your complete career toolkit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass glass-hover rounded-2xl p-6 group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Loved by <span className="gradient-text">students</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="glass rounded-2xl p-8 md:p-12 text-center min-h-[250px] flex flex-col items-center justify-center">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber text-amber" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-6 max-w-2xl italic">
                  &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-amber flex items-center justify-center text-sm font-bold text-bg-primary">
                    {testimonials[testimonialIdx].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-text-primary">{testimonials[testimonialIdx].name}</p>
                    <p className="text-sm text-text-secondary">{testimonials[testimonialIdx].role}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === testimonialIdx ? 'bg-cyan w-6' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-amber/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Ready to start your{' '}
                <span className="gradient-text">career journey</span>?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Join 10,000+ students who&apos;ve transformed their careers with CAREERLY.
                It takes just 5 minutes to get your personalized roadmap.
              </p>
              <Link href="/onboarding">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,212,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan to-cyan/80 text-bg-primary text-lg font-bold flex items-center gap-3 mx-auto transition-all"
                >
                  Start Your Journey — Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-glass py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-amber flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-bg-primary" />
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>CAREERLY</span>
              </div>
              <p className="text-text-secondary text-sm">Your AI-powered career mentor for the modern tech landscape.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-text-primary">Product</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <Link href="/onboarding" className="block hover:text-text-primary transition-colors">Get Started</Link>
                <Link href="/dashboard" className="block hover:text-text-primary transition-colors">Dashboard</Link>
                <Link href="/roadmap" className="block hover:text-text-primary transition-colors">Roadmap</Link>
                <Link href="/chat" className="block hover:text-text-primary transition-colors">AI Mentor</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-text-primary">Resources</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <Link href="/projects" className="block hover:text-text-primary transition-colors">Projects</Link>
                <Link href="/interview" className="block hover:text-text-primary transition-colors">Interview Prep</Link>
                <Link href="/resume" className="block hover:text-text-primary transition-colors">Resume Analyzer</Link>
                <Link href="/skills" className="block hover:text-text-primary transition-colors">Skills</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-text-primary">Career Paths</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>Full Stack Developer</p>
                <p>Data Analyst</p>
                <p>AI/ML Engineer</p>
                <p>Cloud/DevOps</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border-glass pt-6 text-center text-text-muted text-sm">
            © 2025 CAREERLY. All rights reserved. Built with AI for the next generation of tech talent.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Typewriter effect component
function TypewriterText() {
  const words = ['Mentor', 'Roadmap', 'Guide', 'Coach'];
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(word.substring(0, text.length + 1));
        if (text === word) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(word.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIdx((wordIdx + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, wordIdx]);

  return (
    <span className="gradient-text">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.85em] bg-cyan ml-1 align-baseline"
      />
    </span>
  );
}
