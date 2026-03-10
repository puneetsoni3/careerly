'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If Supabase keys aren't configured, bypass auth for demo purposes
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // If no session and trying to access protected route
        if (!session && !['/', '/onboarding'].includes(pathname)) {
          router.push('/');
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && !['/', '/onboarding'].includes(pathname)) {
        router.push('/');
      } else if (event === 'SIGNED_IN' && ['/', '/onboarding'].includes(pathname)) {
        router.push('/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-cyan animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
