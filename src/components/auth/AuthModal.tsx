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
      
      // Successfully signed up, let's treat it as complete for now
      // In a real app, you might want to wait for email verification
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
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-black hover:bg-gray-100 transition-all font-medium disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>

                {!emailMode ? (
                  <button
                    onClick={() => setEmailMode(true)}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-border-glass hover:bg-white/10 transition-all font-medium text-text-primary"
                  >
                    <Mail className="w-5 h-5 text-text-muted" />
                    Continue with Email
                  </button>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleEmailSignUp}
                    className="space-y-3"
                  >
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-glass text-text-primary placeholder-text-muted focus:border-cyan/50 focus:outline-none transition-all"
                      required
                    />
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
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan/20 border border-cyan/50 text-cyan hover:bg-cyan/30 transition-all font-medium disabled:opacity-50 mt-2"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </motion.form>
                )}
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
