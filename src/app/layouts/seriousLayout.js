import React from 'react'
import { getEntries } from "@/lib/contentful";
import ImageSlider from '@/components/image-slider';
import Link from 'next/link';
import Navbar from '@/components/navbar';

const SeriousLayout = async () => {

    const arms = await getEntries('section', { select: 'fields.title, fields.slug, fields.coverImage' });

    const images = [
      '/images/slider/slider1.jpg',
      '/images/slider/slider2.jpg',
      '/images/slider/slider3.jpg',
      '/images/slider/slider4.jpg',
    ];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      <Navbar />
      
      {/* HEADER IMAGE WITH OVERLAY TEXT */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden pt-16 md:pt-20">
        <ImageSlider images={images} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto space-y-6">
            <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-tight tracking-tight">
              Hearts Heartist
            </h1>
            <p className="text-lg md:text-xl text-white/95 font-light max-w-2xl mx-auto leading-relaxed">
              A community space for wellness, creativity, and social change
            </p>
          </div>
        </div>
      </div>

      {/* INTRO TEXT */}
      <section className="relative py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-[#E8B4B8] mx-auto mb-6"></div>
          </div>
          <p className="font-[var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-[#3A3A3A] leading-relaxed font-light tracking-tight">
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
          {arms.map((arm, idx) => (
            <Link
              key={idx}
              href={`/${arm.fields.slug}/home`}
              className="relative h-[60vh] md:h-[85vh] group cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${arm.fields.coverImage?.fields?.file?.url})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />

              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E8B4B8] via-[#B8D4E3] to-[#E8B4B8] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500">
                <h2 className="font-[var(--font-playfair)] text-white text-2xl md:text-3xl font-normal leading-tight tracking-tight">
                  {arm.fields.title}
                </h2>
                <div className="mt-3 h-0.5 w-12 bg-white/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-16 md:py-20 mt-20 bg-[#F5F1EB] border-t border-[#E8DED0]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">

          {/* LOGO / NAME */}
          <div className="space-y-2">
            <p className="font-[var(--font-playfair)] text-3xl md:text-4xl text-[#3A3A3A] font-normal tracking-wide">
              Hearts Heartist
            </p>
            <p className="text-sm text-[#8B8B8B] font-light tracking-wide">
              Wellness • Art • Community
            </p>
          </div>

          {/* LINKS */}
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12 text-base text-[#6B6B6B]">
            <Link 
              href="/about" 
              className="hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/programs" 
              className="hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group"
            >
              Programs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-[#E8B4B8] transition-colors duration-300 font-light relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/support" 
              className="hover:text-[#B8D4E3] transition-colors duration-300 font-light relative group"
            >
              Support Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8D4E3] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* LINE */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#E8DED0] to-transparent" />

          {/* COPYRIGHT */}
          <p className="text-sm text-[#9B9B9B] font-light">
            © {new Date().getFullYear()} Hearts Heartist. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  )
}

export default SeriousLayout