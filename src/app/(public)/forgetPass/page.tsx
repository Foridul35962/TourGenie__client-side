import ForgetPassForm from '@/components/auth/ForgetPassForm';

const FogetPassPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden px-4">
      {/* Background Red Glow */}
      <div className="absolute w-80 h-80 bg-red-600 rounded-full blur-[140px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 rounded-full mb-4 border border-red-600/20">
             {/* Simple Lock Icon or Key Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email and we'll send you a OTP on your email to reset your password.
          </p>
        </div>

        <ForgetPassForm />
      </div>
    </div>
  );
};

export default FogetPassPage;