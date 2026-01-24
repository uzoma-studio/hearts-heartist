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
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      <Navbar />
      
      {/* HEADER IMAGE WITH OVERLAY TEXT */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden pt-16 md:pt-20">
        <ImageSlider />
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto space-y-6">
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
            <div className="h-1 w-16 bg-[#E8B4B8] mx-auto mb-6"></div>
          </div>
          <p 
            className="text-3xl md:text-4xl lg:text-5xl text-[#3A3A3A] leading-relaxed font-light tracking-tight"
            style={{ fontFamily: 'var(--font-fraunces)' }}
          >
            Hearts Heartist is a creative and social organization dedicated to fostering 
            holistic wellbeing, community development, and social change through wellness 
            programs, cultural and artistic initiatives.
          </p>
          <p className="text-lg md:text-xl text-[#6B6B6B] font-light mt-8 leading-relaxed">
            Click on any one of our arms below to explore it
          </p>
        </div>
      </section>

      {/* ARMS GRID */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full min-h-[70vh] md:min-h-[85vh]">
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
              className="relative h-[60vh] md:h-[85vh] group cursor-pointer overflow-hidden"
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
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500">
                <h2 
                  className="text-white text-2xl md:text-3xl font-normal leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-fraunces)' }}
                >
                  {arm.fields.title}
                </h2>
                <div className="mt-3 h-0.5 w-12 bg-white/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <div className='py-16 px-64 md:px-32 bg-[var(--color-warm-bg-alt)]'>
        <FunLayout />
      </div>

      {/* FOOTER */}
      <footer className="w-full py-16 md:py-20 bg-[var(--color-sky-soft)] border-t border-[#E8DED0]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">

          {/* LOGO / NAME */}
          <div className="space-y-2">
            <p 
              className="text-3xl md:text-4xl text-[#3A3A3A] font-normal tracking-wide"
              style={{ fontFamily: 'var(--font-fraunces)' }}
            >
              Hearts Heartist
            </p>
            <p className="text-sm text-[#8B8B8B] font-light tracking-wide">
              Wellness • Art • Community
            </p>
          </div>

          {/* LINKS */}
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12 text-base text-[#6B6B6B]">
            <Link 
              href="/hearts-heartist/about-us" 
              className="hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="hearts-heartist/our-projects" 
              className="hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group"
            >
              Programs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/hearts-wellness-studio/get-in-touch" 
              className="hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/hearts-heartist/support-and-donations" 
              className="hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group"
            >
              Support Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* LINE */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#E8DED0] to-transparent" />

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