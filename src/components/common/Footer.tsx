import React from 'react'

const Footer = () => {
    return (
        <footer className="py-10 text-center border-t border-gray-100 text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Tour Genie AI. All rights reserved.</p>
        </footer>
    )
}

export default Footer