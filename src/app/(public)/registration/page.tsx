"use client"

import React, { useState } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import VerifyEmail from '@/components/auth/VerifyEmail';

const RegistrationPage = () => {
  const [email, setEmail] = useState<string>('')
  return (
    <div className="min-h-screen py-5 flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Red Glows */}
      <div className="absolute w-72 h-72 bg-red-600 rounded-full blur-[130px] opacity-20 -top-20 -right-20"></div>
      <div className="absolute w-72 h-72 bg-red-600 rounded-full blur-[130px] opacity-10 -bottom-20 -left-20"></div>
      {
        email ? <VerifyEmail email={email} type={'register'} /> :
        <RegisterForm setEmail={setEmail} />
      }
    </div>
  );
};

export default RegistrationPage;