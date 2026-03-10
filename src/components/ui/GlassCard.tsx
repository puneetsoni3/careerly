'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, type ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  glow?: 'cyan' | 'amber' | 'none';
  hover?: boolean;
  className?: string;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, glow = 'none', hover = true, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
        className={cn(
          'glass rounded-2xl p-6',
          hover && 'glass-hover cursor-pointer',
          glow === 'cyan' && 'glow-cyan',
          glow === 'amber' && 'glow-amber',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
export default GlassCard;
