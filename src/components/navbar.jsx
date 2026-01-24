import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 md:h-20 flex justify-between items-center w-full bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8DED0]/50'>
            <Link href="/" className="font-[var(--font-playfair)] text-xl md:text-2xl text-[#3A3A3A] font-normal tracking-tight hover:text-[#E8B4B8] transition-colors duration-300">
                Hearts Heartist
            </Link>
            <div className="flex space-x-4 md:space-x-8 text-sm md:text-base">
                <Link href="/about" className="text-[#6B6B6B] hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/programs" className="text-[#6B6B6B] hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group">
                    Program
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/support" className="text-[#6B6B6B] hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group">
                    Support Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/contact" className="text-[#6B6B6B] hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar