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
      <div className="absolute inset-0 transition-opacity duration-500">
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
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded"
      >
        ›
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}