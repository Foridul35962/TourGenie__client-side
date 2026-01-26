import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 top-10 left-10"></div>
      <div className="absolute w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-10 bottom-10 right-10"></div>

      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-white tracking-tight">
            Tour <span className="text-red-600">Genie</span>
          </h2>
        </div>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/registration" className="font-bold text-red-500 hover:text-red-400 underline underline-offset-4 decoration-red-900/50">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;