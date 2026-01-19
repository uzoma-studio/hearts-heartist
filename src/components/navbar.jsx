import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='px-4 h-12 flex justify-between items-center w-full'>
            <Link href="/" className="text-xl font-semibold">
                Logo
            </Link>
            <div className="flex space-x-6">
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                    About Us
                </Link>
                <Link href="/programs" className="hover:opacity-80 transition-opacity">
                    Program
                </Link>
                <Link href="/support" className="hover:opacity-80 transition-opacity">
                    Support Us
                </Link>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                    Contact
                </Link>
            </div>
        </nav>
    )
}

export default Navbar