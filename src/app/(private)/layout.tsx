import PrivateProviders from '@/providers/PrivateProviders'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrivateProviders>
            {children}
        </PrivateProviders>
    )
}

export default layout