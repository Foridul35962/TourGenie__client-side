"use client"

import FirstLoading from '@/components/common/FirstLoading'
import { RootState } from '@/store/store'
import { redirect } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const PrivateProviders = ({ children }: { children: React.ReactNode }) => {
    const { user, userLoading } = useSelector((state: RootState) => state.user)
    if (!user && !userLoading) {
        redirect('/login')
    }
    return (
        <>
            {userLoading? <FirstLoading /> :children}
        </>
    )
}

export default PrivateProviders