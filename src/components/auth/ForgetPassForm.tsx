"use client";

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { forgetPass } from '@/store/slice/authSlice';
import { toast } from 'react-toastify';

type formPassInput = {
  email: string
}

const ForgetPassForm = ({ setEmail }: { setEmail: React.Dispatch<React.SetStateAction<string>> }) => {
  const { authLoading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formPassInput>({
    defaultValues: {
      email: ""
    }
  })

  const handleOnSubmit: SubmitHandler<formPassInput> = async (data) => {
    try {
      await dispatch(forgetPass(data)).unwrap()
      setEmail(data.email)
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden px-4">
      <div className="absolute w-80 h-80 bg-red-600 rounded-full blur-[140px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 rounded-full mb-4 border border-red-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email and we'll send you a OTP on your email to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              {
              ...register('email', {
                required: 'Email is required'
              })
              }
              className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
              placeholder="name@example.com"
            />
            {errors.email?.message && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!!authLoading}
            className="w-full py-3 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-wider text-sm"
          >
            {authLoading ? 'Sending...' : 'Send Otp'}
          </button>

          <div className="text-center">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassForm;