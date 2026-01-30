import PublicProviders from '@/providers/PublicProviders'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PublicProviders>
      {children}
    </PublicProviders>
  )
}

export default layout