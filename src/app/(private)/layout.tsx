import Navbar from '@/components/common/Navbar'
import PrivateProviders from '@/providers/PrivateProviders'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrivateProviders>
            <Navbar />
            {children}
        </PrivateProviders>
    )
}

export default layout