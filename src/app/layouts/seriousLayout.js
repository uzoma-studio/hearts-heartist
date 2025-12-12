import React from 'react'
import Image from 'next/image'
import Footer from '@/components/footer'
import { getEntries } from "@/lib/contentful";
import ImageSlider from '@/components/image-slider';
import Link from 'next/link';

const SeriousLayout = async () => {

    const arms = await getEntries('section', { select: 'fields.title, fields.slug, fields.coverImage' });

    console.log(arms[0].fields.coverImage);
    

    const images = [
      '/images/slider/slider1.jpg',
      '/images/slider/slider2.jpg',
      '/images/slider/slider3.jpg',
      '/images/slider/slider4.jpg',
    ];

  return (
    <div className="w-full">
        <div className='px-4 h-12 flex items-center'>
            <p>Logo</p>
        </div>
      {/* HEADER IMAGE */}
      <div className="relative w-full h-[80vh]">
        <ImageSlider images={images} />
      </div>

      {/* INTRO TEXT */}
      <div className="px-8 py-1 text-center m-8">
        <p className="text-4xl p-24">
          Hearts Heartist is a creative and social organization dedicated to fostering 
          holistic wellbeing, community development, and social change through wellness 
          programs, cultural and artistic initiatives.
        </p>

        <p className="text-lg mt-4 font-medium">
          Click on any one of our arms below to explore it
        </p>
      </div>

      {/* ARMS GRID */}
      <div className={`grid grid-cols-1 md:grid-cols-4 w-full h-[80vh]`}>
        {arms.map((arm, idx) => (
          <Link
            key={idx}
            href={`/${arm.fields.slug}/home`}
            className="relative h-[80vh] group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${arm.fields.coverImage?.fields?.file?.url})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />

            {/* Title */}
            <div className="absolute bottom-5 left-5 text-white text-xl font-semibold text-center">
              {arm.fields.title}
            </div>
          </Link>
        ))}
      </div>

      <footer className="w-full py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-6">

        {/* LOGO / NAME */}
        <p className="text-xl font-semibold tracking-wide">
          Hearts Heartist
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
          <Link href="/about" className="hover:opacity-100 transition-opacity">
            About
          </Link>
          <Link href="/programs" className="hover:opacity-100 transition-opacity">
            Programs
          </Link>
          <Link href="/contact" className="hover:opacity-100 transition-opacity">
            Contact
          </Link>
          <Link href="/support" className="hover:opacity-100 transition-opacity">
            Support Us
          </Link>
        </div>

        {/* LINE */}
        <div className="w-full h-px bg-white/10" />

        {/* COPYRIGHT */}
        <p className="text-xs opacity-60">
          © {new Date().getFullYear()} Hearts Heartist. All rights reserved.
        </p>

      </div>
    </footer>
    </div>
  )
}

export default SeriousLayout