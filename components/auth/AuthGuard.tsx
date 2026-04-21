'use client';
import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/', '/auth/login', '/auth/signup'];
  const isPublic = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      router.push('/auth/login');
    }
  }, [user, loading, router, isPublic]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#060b18]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400">Loading your profile...</p>
      </div>
    );
  }

  if (!user && !isPublic) {
    return null;
  }

  return <>{children}</>;
}
