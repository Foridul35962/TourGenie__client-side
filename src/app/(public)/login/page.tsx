import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Soft Glows - Light Red */}
      <div className="absolute w-80 h-80 bg-red-50 rounded-full blur-[120px] top-[-10%] left-[-10%] pointer-events-none"></div>
      <div className="absolute w-80 h-80 bg-red-50 rounded-full blur-[120px] bottom-[-10%] right-[-10%] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(220,38,38,0.08)] z-10">
        <div>
          <h2 className="mt-6 text-center text-4xl font-black text-gray-900 tracking-tight">
            Tour <span className="text-red-600">Genie</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 font-medium">
            Welcome back! Please enter your details.
          </p>
        </div>
        <LoginForm />

        <div className="mt-6 text-center border-t border-gray-50 pt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link 
              href="/registration" 
              className="font-bold text-red-600 hover:text-red-700 transition-colors underline-offset-4 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;