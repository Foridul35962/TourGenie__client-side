"use client"
import Link from 'next/link'

const LoginForm = () => {

    const handleOnSubmit = (e: any)=>{
        e.preventDefault()
        type formData = {
            email: string,
            password: string
        }
        const data:formData ={
            email: e.target.email.value,
            password: e.target.password.value
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
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transform active:scale-95 transition-all duration-200 uppercase tracking-wider text-sm"
            >
                Sign In
            </button>
        </form>
    )
}

export default LoginForm