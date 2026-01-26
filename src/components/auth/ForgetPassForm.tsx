// components/ForgetPassForm.tsx
"use client";

import React, { useState, FormEvent } from 'react';
// import axios from 'axios';
import Link from 'next/link';

const ForgetPassForm = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // try {
    //   await axios.post('/api/auth/forget-password', { email });
    //   setMessage("Reset link sent to your email!");
    // } catch (err: any) {
    //   setMessage("User not found or something went wrong.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
          placeholder="name@example.com"
        />
      </div>

      {message && (
        <p className={`text-sm text-center ${message.includes('sent') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-wider text-sm"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <div className="text-center">
        <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ForgetPassForm;