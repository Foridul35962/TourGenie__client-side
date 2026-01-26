"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    // try {
    //   const res = await axios.post('/api/register', formData);
    //   console.log(res.data);
    //   alert("Registration Successful!");
    // } catch (err: any) {
    //   console.error(err.response?.data || err.message);
    //   alert("Something went wrong!");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Full Name</label>
          <input
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
            placeholder="Foridul Ibne Qauser"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-95 transition-all uppercase tracking-wider text-sm disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;