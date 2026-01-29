"use client"
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { login } from '@/store/slice/authSlice'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { authLoading } = useSelector((state: RootState) => state.auth)
    const router = useRouter()

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        type formData = {
            email: string,
            password: string
        }
        const data: formData = {
            email: (e.target as HTMLFormElement).email.value,
            password: (e.target as HTMLFormElement).password.value
        }

        try {
            await dispatch(login(data)).unwrap()
            toast.success('login successfully')
            const next = new URLSearchParams(window.location.search).get('next') || '/'
            router.replace(next)
            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <form className="mt-8 space-y-5" onSubmit={handleOnSubmit}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        name='email'
                        className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                        placeholder="name@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        name='password'
                        className="w-full px-4 py-3 bg-[#262626] border border-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 placeholder-gray-600"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        required
                        className="h-4 w-4 bg-[#262626] border-gray-700 rounded text-red-600 focus:ring-red-600 accent-red-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link href="/forgetPass" className="font-medium text-red-500 hover:text-red-400 transition-colors">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <button
                type="submit"
                disabled={!!authLoading}
                className="relative w-full cursor-pointer py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-95 transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center min-h-12"
            >
                {authLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Signing in...</span>
                    </div>
                ) : (
                    "Sign In"
                )}
            </button>
        </form>
    )
}

export default LoginForm