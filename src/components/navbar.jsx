import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 md:h-20 flex justify-between items-center w-full bg-[var(--color-honey-light)] backdrop-blur-sm border-b border-[var(--color-border)]">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-xl md:text-2xl text-[var(--color-text-primary)] font-normal tracking-tight hover:text-[var(--color-pink)] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              <span className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/80 text-[var(--color-text-primary)] flex items-center justify-center text-[10px] md:text-xs font-semibold shadow-sm">
                Logo
              </span>
              <span className="hidden md:inline">Hearts Heartist</span>
            </Link>
            <div className="flex space-x-4 md:space-x-8 text-sm md:text-base">
                <Link href="/hearts-heartist/about-us" className="text-[var(--color-text-secondary)] hover:text-[var(--color-pink)] transition-colors duration-300 font-light relative group">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-pink)] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/hearts-heartist/our-projects" className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors duration-300 font-light relative group">
                    Program
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-blue)] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/hearts-heartist/support-and-donations" className="text-[var(--color-text-secondary)] hover:text-[var(--color-pink)] transition-colors duration-300 font-light relative group">
                    Support Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-pink)] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="hearts-wellness-studio/get-in-touch" className="text-[var(--color-text-secondary)] hover:text-[var(--color-blue)] transition-colors duration-300 font-light relative group">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-blue)] group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar