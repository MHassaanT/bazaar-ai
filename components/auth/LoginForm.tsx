'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/predict');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/predict');
    } catch (err: any) {
      setError(err.message || 'Google sign in failed.');
    }
  };

  const handleResetPassword = async () => {
    const email = getValues('email');
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    
    setIsResetting(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[440px] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to Bazaar AI to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('email')}
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-600 bg-transparent text-blue-500 focus:ring-blue-500" />
            <span>Remember me</span>
          </label>
          <button 
            type="button" 
            onClick={handleResetPassword}
            disabled={isResetting}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {resetSent ? 'Email sent!' : 'Forgot Password?'}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Sign In</span>}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="mt-6 w-full py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-medium transition-colors flex items-center justify-center space-x-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <span>Sign in with Google</span>
      </button>

      <p className="mt-8 text-center text-gray-400">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Sign Up
        </Link>
      </p>
    </motion.div>
  );
}
