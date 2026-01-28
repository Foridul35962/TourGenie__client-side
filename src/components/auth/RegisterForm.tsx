"use client";

import { signUpSchema } from "@/schemas/signUpSchema";
import { registration } from "@/store/slice/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type SignUpForm = z.infer<typeof signUpSchema>;

const RegisterForm = ({ setEmail }: { setEmail: React.Dispatch<React.SetStateAction<string>> }) => {
  const { authLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const passwordValue = watch("password", "");
  const alphabetValidate = /[a-zA-Z]/.test(passwordValue);
  const numberValidate = /\d/.test(passwordValue);
  const lengthValidate = passwordValue.length >= 8;

  const handleOnSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      await dispatch(registration(data)).unwrap()
      setEmail(data.email)
      reset()
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <div className="max-w-md w-full bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10 mx-4">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Tour <span className="text-red-600">Genie</span>
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Start your AI-powered journey today
        </p>
      </div>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
              placeholder="Foridul Ibne Qauser"
            />
            {errors.fullName?.message && (
              <div className="text-red-600">{errors.fullName.message}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
              placeholder="name@example.com"
            />
            {errors.email?.message && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password?.message && (
              <div className="text-red-600">{errors.password.message}</div>
            )}
          </div>

          {/* password validation */}
          <div className="flex gap-1 flex-col *:flex *:gap-1 *:items-center">
            <div className={alphabetValidate ? "text-green-600" : "text-gray-500"}>
              {alphabetValidate ? (
                <CircleCheckBig className="size-4" />
              ) : (
                <Circle className="size-4" />
              )}
              <p>At least one Alphabet</p>
            </div>

            <div className={numberValidate ? "text-green-600" : "text-gray-500"}>
              {numberValidate ? (
                <CircleCheckBig className="size-4" />
              ) : (
                <Circle className="size-4" />
              )}
              <p>At least one number</p>
            </div>

            <div className={lengthValidate ? "text-green-600" : "text-gray-500"}>
              {lengthValidate ? (
                <CircleCheckBig className="size-4" />
              ) : (
                <Circle className="size-4" />
              )}
              <p>Minimum length 8 characters</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!!authLoading}
          className="relative w-full py-3 px-4 cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-95 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center min-h-12"
        >
          {authLoading ? "Sending Otp..." : "Send Otp"}
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-red-500 hover:text-red-400 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;