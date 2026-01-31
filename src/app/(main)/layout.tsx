import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import PrivateProviders from '@/providers/PrivateProviders'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrivateProviders>
            <Navbar />
            <div className='mt-14'>
                {children}
            </div>
            <Footer />
        </PrivateProviders>
    )
}

export default layout