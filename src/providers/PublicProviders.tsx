"use client"

import { RootState } from '@/store/store'
import { redirect } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

const PublicProviders = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.user)
  if (user) {
    redirect('/')
  }
  return (
    <>
      {children}
    </>
  )
}

export default PublicProviders