"use client"

import { resetPassSchema } from '@/schemas/resetPassSchema'
import { resetPass } from '@/store/slice/authSlice'
import { AppDispatch, RootState } from '@/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Circle, CircleCheckBig } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { z } from 'zod'

const ResetPass = ({ email }: { email: string }) => {
    const { authLoading } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    type verifiType = z.infer<typeof resetPassSchema>
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<verifiType>({
        resolver: zodResolver(resetPassSchema),
        defaultValues: {
            password: ''
        }
    })

    const passwordValue = watch("password", "");
    const alphabetValidate = /[a-zA-Z]/.test(passwordValue);
    const numberValidate = /\d/.test(passwordValue);
    const lengthValidate = passwordValue.length >= 8;

    const handleOnSubmit: SubmitHandler<verifiType> = async (data) => {
        try {
            await dispatch(resetPass({ email, password: data.password })).unwrap()
            reset()
            toast.success('password reset successfully')
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-[#0f0f0f] relative overflow-hidden px-4'>
            {/* Background Red Glows */}
            <div className="absolute w-80 h-80 bg-red-600 rounded-full blur-[140px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-md w-full bg-[#1a1a1a] p-10 rounded-2xl border border-red-900/30 shadow-2xl z-10 relative">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">
                        Update <span className="text-red-600">Access</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Secure your account with a new password
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                placeholder="••••••••"
                            />
                            {errors.password?.message && (
                                <div className="text-red-600 text-xs mt-1 ml-1">{errors.password.message}</div>
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
                        className="relative w-full py-3 px-4 cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-95 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center min-h-12 mt-6"
                    >
                        {authLoading ? "Updating..." : "Confirm New Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPass