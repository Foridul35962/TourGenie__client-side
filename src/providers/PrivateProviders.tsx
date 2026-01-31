"use client"

import FirstLoading from '@/components/common/FirstLoading'
import { RootState } from '@/store/store'
import { redirect, usePathname } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const PrivateProviders = ({ children }: { children: React.ReactNode }) => {
    const { user, userLoading } = useSelector((state: RootState) => state.user)
    const pathname = usePathname()
    const publicPath = ['/', '/view-plan', '/contact']
    const isPathAllow = publicPath.find(path => path === pathname)
    if (!user && !userLoading && !isPathAllow) {
        redirect('/login')
    }
    return (
        <>
            {userLoading ? <FirstLoading /> : children}
        </>
    )
}

export default PrivateProviders