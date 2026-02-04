'use client'



import { useScroll, useTransform, motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function Hero() {
  const ref = useRef(null)
  const [vh, setVh] = useState(0)
  
  // Mouse motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for fluid movement
  const springConfig = { damping: 30, stiffness: 100 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  useEffect(() => {
    setVh(window.innerHeight)
  }, [])

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [vh * 0.8, vh], [1, 0])
  const pointerEvents = useTransform(scrollY, (y) => y > vh ? 'none' : 'auto')

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    
    // Calculate position relative to center (-1 to 1)
    const xPct = (clientX / innerWidth - 0.5) * 2
    const yPct = (clientY / innerHeight - 0.5) * 2
    
    // Move slightly in opposite direction for parallax (max 20px)
    mouseX.set(xPct * -40)
    mouseY.set(yPct * -40)
  }

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, pointerEvents }}
      onMouseMove={handleMouseMove}
      className="fixed top-0 left-0 w-full h-[100dvh] z-[1] overflow-hidden flex items-center justify-center bg-black"
    >
      <motion.div
        style={{ x, y, scale: 1.1 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          {/* Vercel Blob URL */}
          <source src="https://ry74leabzi38ngqg.public.blob.vercel-storage.com/public/bg-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />


      <div className="relative z-10 text-center text-white mix-blend-difference select-none pointer-events-none">
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
