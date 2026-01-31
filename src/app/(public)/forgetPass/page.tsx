"use client"

import ForgetPassForm from '@/components/auth/ForgetPassForm';
import ResetPass from '@/components/auth/ResetPass';
import VerifyEmail from '@/components/auth/VerifyEmail';
import { useState } from 'react';

const FogetPassPage = () => {
  const [email, setEmail] = useState<string>('')
  const [verified, setVerified] = useState<boolean>(false)
  return (
    <div className="min-h-screen py-5 flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Red Glows */}
      <div className="absolute w-72 h-72 bg-red-600 rounded-full blur-[130px] opacity-5 -top-20 -right-20"></div>
      <div className="absolute w-72 h-72 bg-red-600 rounded-full blur-[130px] opacity-5 -bottom-20 -left-20"></div>
      <div className="relative z-10">
        {
        !email ? <ForgetPassForm setEmail={setEmail} /> : !verified ?
          <VerifyEmail email={email} type='forgetPass' setVerified={setVerified} /> :
          <ResetPass email={email} />
        }
      </div>
    </div>
  );
};

export default FogetPassPage;