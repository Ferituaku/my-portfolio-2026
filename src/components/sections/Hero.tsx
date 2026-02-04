'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function Hero() {
  const ref = useRef(null)
  const [vh, setVh] = useState(0)
  
  useEffect(() => {
    setVh(window.innerHeight)
  }, [])

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [vh * 0.8, vh], [1, 0])
  const pointerEvents = useTransform(scrollY, (y) => y > vh ? 'none' : 'auto')

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, pointerEvents }}
      className="fixed top-0 left-0 w-full h-[100dvh] z-[1] overflow-hidden flex items-center justify-center bg-black"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
      >
        {/* Assuming the file was moved to public/designInspo/BG-HERO.mp4 */}
        <source src="/designInspo/BG-HERO.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 text-center text-white mix-blend-difference select-none">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          Ferro Putra
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
          Full Stack Developer • AI Engineer
        </p>
      </div>
    </motion.section>
  )
}
