"use client"

import ForgetPassForm from '@/components/auth/ForgetPassForm';
import ResetPass from '@/components/auth/ResetPass';
import VerifyEmail from '@/components/auth/VerifyEmail';
import { useState } from 'react';

const FogetPassPage = () => {
  const [email, setEmail] = useState<string>('')
  const [verified, setVerified] = useState<boolean>(false)
  return (
    <>
      {
        !email ? <ForgetPassForm setEmail={setEmail} /> : !verified ?
          <VerifyEmail email={email} type='forgetPass' setVerified={setVerified} /> :
          <ResetPass email={email} />
      }
    </>
  );
};

export default FogetPassPage;