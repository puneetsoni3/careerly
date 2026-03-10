'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, MessageSquare, Target, FolderKanban,
  HelpCircle, FileText, TrendingUp, ChevronLeft, ChevronRight,
  Sparkles, LogOut, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Roadmap', href: '/roadmap', icon: Map },
  { label: 'AI Mentor', href: '/chat', icon: MessageSquare },
  { label: 'Skills', href: '/skills', icon: Target },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Interview', href: '/interview', icon: HelpCircle },
  { label: 'Resume', href: '/resume', icon: FileText },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
  { label: 'Upgrade ✦', href: '/pricing', icon: Zap },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col glass border-r border-border-glass"
      style={{ borderRadius: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border-glass">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-amber flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-bg-primary" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-[var(--font-display)] font-bold text-lg text-text-primary whitespace-nowrap overflow-hidden"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              CAREERLY
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group',
                  isActive
                    ? 'bg-cyan-dim text-cyan'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                )}
              >
                <Icon className={cn(
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  isActive && 'drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]'
                )} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-0.5 h-8 bg-cyan rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="px-2 pb-4 space-y-2">
        <Link href="/">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-muted hover:text-text-secondary hover:bg-white/5 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap"
                >
                  Back to Home
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-xl text-text-muted hover:text-text-secondary hover:bg-white/5 transition-all"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
