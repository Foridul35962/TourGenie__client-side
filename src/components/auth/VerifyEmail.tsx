"use client";

import React, { useState, useRef, KeyboardEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { toast } from 'react-toastify';
import { resendOTP, verifyRegi } from '@/store/slice/authSlice';

const VerifyEmail = ({ email, type }: { email: string, type: 'register' | 'forgetPass' }) => {
    const router = useRouter();
    const { authLoading } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length < 6) {
            toast.warning("Please enter all 6 digits.")
            return;
        }
        try {
            await dispatch(verifyRegi({ email, otp: otpCode })).unwrap()
            toast.success('Registration successful')
            router.push('/login')
        } catch (err: any) {
            toast.error(err.message || "Invalid OTP")
        }
    };

    const handleResendOtp = async () => {
        if (!canResend) return;

        try {
            await dispatch(resendOTP({ email, type })).unwrap()
            toast.success('OTP resend successfully')
            setTimeLeft(60);
            setCanResend(false);
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden px-4">
            <div className="absolute w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-md w-full bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 rounded-full mb-6 border border-red-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">Verify Email</h2>
                <p className="mt-3 text-sm text-gray-400">
                    Enter the 6-digit code sent to <br />
                    <span className="text-white font-medium">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all duration-200"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={!!authLoading}
                        className="w-full py-3 bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50 uppercase tracking-wider text-sm"
                    >
                        {authLoading ? 'Verifying...' : 'Verify & Proceed'}
                    </button>

                    <div className="text-sm text-gray-500">
                        {canResend ? (
                            <p>
                                Didn't receive code?{" "}
                                <button
                                    type="button"
                                    className="text-red-500 font-bold cursor-pointer hover:text-red-400 transition-colors"
                                    onClick={handleResendOtp}
                                >
                                    Resend Code
                                </button>
                            </p>
                        ) : (
                            <p>
                                Resend code in <span className="text-red-500 font-mono font-bold">{timeLeft}s</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;