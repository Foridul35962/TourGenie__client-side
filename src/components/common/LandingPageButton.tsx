"use client"

import { RootState } from '@/store/store'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const LandingPageButton = () => {
    const { user } = useSelector((state: RootState) => state.user)
    return (
        <>
            {
                !user && <Link
                    href="/registration"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
                >
                    Create Account Now
                </Link>
            }
        </>
    )
}

export default LandingPageButton