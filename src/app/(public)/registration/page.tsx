// app/register/page.js
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Red Glows */}
      <div className="absolute w-72 h-72 bg-red-600 rounded-full blur-[130px] opacity-20 -top-20 -right-20"></div>
      <div className="absolute w-72 h-72 bg-red-600 rounded-full blur-[130px] opacity-10 -bottom-20 -left-20"></div>

      <div className="max-w-md w-full bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10 mx-4">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Tour <span className="text-red-600">Genie</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Start your AI-powered journey today
          </p>
        </div>

        <RegisterForm />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-red-500 hover:text-red-400 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;