import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.20))] py-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
          Invest in your <span className="text-cyan">Future</span>
        </h1>
        <p className="text-lg text-text-secondary">
          Get the unfair advantage in your job search with CAREERLY Pro. Unlock unlimited AI mentorship and deep-dive roadmaps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl relative">
        {/* Glow effect behind cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-cyan/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

        {/* Free Tier */}
        <div className="glass rounded-3xl p-8 border border-border-glass flex flex-col h-full hover:border-cyan/30 transition-all group">
          <div className="mb-8">
            <h3 className="text-2xl font-bold font-display mb-2">Basic</h3>
            <p className="text-text-secondary mb-6">For getting started smoothly</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-display">$0</span>
              <span className="text-text-muted">/forever</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-text-secondary group-hover:text-text-primary transition-colors">
              <Check className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>1 Active Roadmap (Up to 3 months)</span>
            </li>
            <li className="flex items-start gap-3 text-text-secondary group-hover:text-text-primary transition-colors">
              <Check className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>10 AI Mentor Messages / day</span>
            </li>
            <li className="flex items-start gap-3 text-text-secondary group-hover:text-text-primary transition-colors">
              <Check className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>1 Basic ATS Resume Scan</span>
            </li>
            <li className="flex items-start gap-3 text-text-secondary group-hover:text-text-primary transition-colors">
              <Check className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Curated Projects & Resources</span>
            </li>
            <li className="flex items-start gap-3 text-text-secondary group-hover:text-text-primary transition-colors">
              <Check className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Basic Progress Tracking</span>
            </li>
          </ul>

          <Link
            href="/dashboard"
            className="w-full py-4 rounded-xl border border-border-glass text-center font-semibold text-text-primary hover:bg-white/5 transition-all"
          >
            Current Plan
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="glass rounded-3xl p-8 border border-cyan/50 relative flex flex-col h-full transform md:-translate-y-4 shadow-2xl shadow-cyan/20">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan to-amber text-bg-primary font-bold px-4 py-1 rounded-full text-sm inline-flex items-center gap-1 shadow-lg">
            <Sparkles className="w-4 h-4" /> Recommended
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold font-display mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white">PRO</h3>
            <p className="text-text-secondary mb-6">The unfair advantage in tech</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-display">$9</span>
              <span className="text-text-muted">/month</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-text-primary">
              <Zap className="w-5 h-5 text-amber shrink-0 mt-0.5" />
              <span><strong className="text-white">Unlimited</strong> Deep-Dive Roadmaps (12+ months)</span>
            </li>
            <li className="flex items-start gap-3 text-text-primary">
              <FilterIcon className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span><strong className="text-white">Unlimited</strong> 24/7 AI Mentor Chat</span>
            </li>
            <li className="flex items-start gap-3 text-text-primary">
              <Shield className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Deep Resume Rewrites & Exact Suggestions</span>
            </li>
            <li className="flex items-start gap-3 text-text-primary">
              <TrophyIcon className="w-5 h-5 text-amber shrink-0 mt-0.5" />
              <span>Live AI Mock Interviews (Role Specific)</span>
            </li>
            <li className="flex items-start gap-3 text-text-primary">
              <BriefcaseIcon className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Custom Niche Portfolio Project Generator</span>
            </li>
            <li className="flex items-start gap-3 text-text-primary">
              <FileIcon className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
              <span>Tailored Cover Letter Generator</span>
            </li>
          </ul>

          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan to-amber text-bg-primary font-bold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-cyan/20">
            Upgrade to PRO <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-center text-xs text-text-muted mt-4">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple icons to keep imports clean
function FilterIcon(props: any) {
  return <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}
function TrophyIcon(props: any) {
  return <path d="M8 21h8M12 17v4M7 4h10M17 4v8a5 5 0 0 1-10 0V4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}
function BriefcaseIcon(props: any) {
  return <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 10h20M6 10v10M18 10v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}
function FileIcon(props: any) {
  return <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}
