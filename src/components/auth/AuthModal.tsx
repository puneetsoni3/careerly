'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github as Google, X, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onComplete, onClose }: AuthModalProps) {
  const [emailMode, setEmailMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Successfully signed up
      onComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass rounded-3xl p-8 max-w-md w-full relative overflow-hidden border border-border-glass shadow-2xl shadow-cyan/10"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan to-amber flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold font-display text-bg-primary">C</span>
                </div>
                <h2 className="text-2xl font-bold font-display mb-2">Save your career plan</h2>
                <p className="text-text-secondary text-sm">
                  Create an account to save your generated roadmap, track progress, and access your AI Mentor.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleEmailSignUp}
                    className="space-y-3"
                  >
                    <div className="relative">
                      <Mail className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all"
                      required
                      minLength={6}
                    />
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan/20 border border-cyan/50 text-cyan hover:bg-cyan/30 transition-all font-medium disabled:opacity-50 mt-4"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up / Sign In'}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </motion.form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-text-muted">
                  By continuing, you agree to CAREERLY's Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
