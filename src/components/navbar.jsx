import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 md:h-20 flex justify-between items-center w-full bg-[var(--color-honey-light)] backdrop-blur-sm">
            <Link 
              href="/" 
              className="text-xl md:text-2xl text-[#3A3A3A] font-normal tracking-tight hover:text-[#E8B4B8] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              Hearts Heartist
            </Link>
            <div className="flex space-x-4 md:space-x-8 text-sm md:text-base">
                <Link href="/hearts-heartist/about-us" className="text-[#6B6B6B] hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/hearts-heartist/our-projects" className="text-[#6B6B6B] hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group">
                    Program
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/hearts-heartist/support-and-donations" className="text-[#6B6B6B] hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group">
                    Support Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="hearts-wellness-studio/get-in-touch" className="text-[#6B6B6B] hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar