import React from 'react'
import { getEntries } from "@/lib/contentful";
import ImageSlider from '@/components/image-slider';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import FunLayout from './funLayout';

const SeriousLayout = async () => {

  const arms = await getEntries('section', { select: 'fields.title, fields.slug, fields.coverImage' });

  return (
    <div className="w-full bg-[var(--color-warm-bg)] min-h-screen">
      <Navbar />
      
      {/* HEADER IMAGE WITH OVERLAY TEXT */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden pt-16 md:pt-20">
        <ImageSlider />
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto space-y-6 bg-black/15 rounded-3xl shadow-sm backdrop-blur-sm md:backdrop-blur-0">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              Hearts Heartist
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-light max-w-2xl mx-auto leading-relaxed">
              A community space for wellness, creativity, and social change
            </p>
          </div>
        </div>
      </div>

      {/* INTRO TEXT */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 bg-[var(--color-honey-light)]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-[var(--color-pink)] mx-auto mb-6"></div>
          </div>
          <p 
            className="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-relaxed font-light tracking-tight"
            style={{ fontFamily: 'var(--font-fraunces)' }}
          >
            Hearts Heartist is a creative and social organization dedicated to fostering 
            holistic wellbeing, community development, and social change through wellness 
            programs, cultural and artistic initiatives.
          </p>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-light mt-8 leading-relaxed">
            Click on any one of our arms below to explore it
          </p>
        </div>
      </section>

      {/* ARMS GRID */}
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full min-h-[70vh] md:min-h-[85vh] gap-6 px-6 md:px-0 py-10 md:py-0 place-items-center md:place-items-stretch">
          {arms.map((arm, idx) => {
            const imageUrl = arm.fields.coverImage?.fields?.file?.url;
            const absoluteUrl = imageUrl?.startsWith('//') ? `https:${imageUrl}` : imageUrl;
            
            // Cycle through brand colors
            const brandColors = [
              'var(--color-turquoise-bright)',
              'var(--color-amber-soft)',
              'var(--color-aqua-calm)',
              'var(--color-lime-soft)',
              'var(--color-mint-soft)',
              'var(--color-lavender-warm)',
              'var(--color-sun-cream)',
              'var(--color-blush-clay)',
              'var(--color-sky-soft)',
              'var(--color-honey-light)',
            ];
            const bgColor = brandColors[idx % brandColors.length];
            
            return (
            <Link
              key={idx}
              href={`/${arm.fields.slug}/home`}
              className="relative w-full max-w-[260px] aspect-square mx-auto md:mx-0 md:max-w-none md:aspect-auto md:h-[85vh] group cursor-pointer overflow-hidden rounded-full md:rounded-none"
            >
              <div 
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundColor: bgColor }}
              >
                {absoluteUrl && (
                  <Image
                    src={absoluteUrl}
                    alt={arm.fields.title}
                    fill
                    className="object-cover p-3"
                  />
                )}
              </div>
              {/* Logo placeholder */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white/80 text-[var(--color-text-primary)] flex items-center justify-center text-xs font-semibold shadow-sm">
                  Logo
                </div>
              </div>
              {/* Title */}
              <div className="absolute inset-0 flex items-center justify-center text-center md:items-end md:justify-start md:text-left">
                <div className="w-full md:w-auto p-6 md:p-8 bg-black/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-0 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500">
                <h2 
                  className="text-white text-2xl md:text-3xl font-normal leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-fraunces)' }}
                >
                  {arm.fields.title}
                </h2>
                <div className="mt-3 h-0.5 w-12 bg-white/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <div className='py-16 px-64 md:px-32 max-md:p-0 bg-[var(--color-warm-bg-alt)]'>
        <FunLayout />
      </div>

      {/* FOOTER */}
      <footer className="w-full py-16 md:py-20 bg-[var(--color-sky-soft)] border-t border-[var(--color-border)]">
        <div className="max-w-6xl max-md:py-2 mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">

          {/* LOGO / NAME */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="h-14 w-14 rounded-full bg-white/80 text-[var(--color-text-primary)] flex items-center justify-center text-xs font-semibold shadow-sm">
              Logo
            </div>
            <p 
              className="text-3xl md:text-4xl text-[var(--color-text-primary)] font-normal tracking-wide"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              Hearts Heartist
            </p>
            <p className="text-sm text-[var(--color-text-tertiary)] font-light tracking-wide">
              Wellness • Art • Community
            </p>
          </div>

          {/* LINKS */}
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12 text-base text-[var(--color-text-secondary)]">
            <Link 
              href="/hearts-heartist/about-us" 
              className="hover:text-[var(--color-pink)] transition-colors duration-300 font-light relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-pink)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="hearts-heartist/our-projects" 
              className="hover:text-[var(--color-blue)] transition-colors duration-300 font-light relative group"
            >
              Programs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/hearts-wellness-studio/get-in-touch" 
              className="hover:text-[var(--color-pink)] transition-colors duration-300 font-light relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-pink)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/hearts-heartist/support-and-donations" 
              className="hover:text-[var(--color-blue)] transition-colors duration-300 font-light relative group"
            >
              Support Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-blue)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* LINE */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

          {/* COPYRIGHT */}
          <p className="text-sm">
            © {new Date().getFullYear()} Hearts Heartist. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  )
}

export default SeriousLayout