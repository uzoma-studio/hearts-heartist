'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ImageSlider({ images, intervalMs = 4000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [images.length, intervalMs])

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)
  const goTo = (i) => setIndex(i)

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <Image
          src={images[index]}
          alt={`slide-${index}`}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </div>

      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <span className="text-2xl md:text-3xl font-light">‹</span>
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <span className="text-2xl md:text-3xl font-light">›</span>
      </button>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === index 
                ? 'w-8 md:w-10 h-2 md:h-2.5 bg-white' 
                : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}