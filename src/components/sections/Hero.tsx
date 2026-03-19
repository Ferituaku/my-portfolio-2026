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
        <h1 className="text-6xl md:text-[12vw] font-serif font-normal tracking-tight mb-2 animate-in fade-in slide-in-from-bottom-10 duration-1000 leading-none">
          Ferro Putra
        </h1>
        <p className="text-sm md:text-base font-sans tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300 opacity-80">
          Full Stack Developer • AI Engineer
        </p>
      </div>

      {/* Floating Contact Button */}
      <motion.a
        href="/contact"
        className="absolute bottom-8 right-6 md:right-12 z-50 w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/30 flex items-center justify-center overflow-hidden transition-colors duration-500 hover:bg-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        whileHover="hover"
      >
        {/* Slanted Arrow */}
        <motion.span 
          className="z-10 text-xl md:text-2xl"
          variants={{
             hover: { rotate: 0, scale: 1.2, color: "#000000" }
          }}
          initial={{ rotate: -45, color: "#ffffff" }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          →
        </motion.span>

        {/* Rotating Circular Text */}
        <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
          <motion.svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
            variants={{
               hover: { color: "rgba(0,0,0,0.8)" }
            }}
            initial={{ color: "rgba(255,255,255,0.5)" }}
            transition={{ duration: 0.4 }}
          >
            <path
              id="circlePath"
              d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
              fill="transparent"
            />
            <text className="text-[10px] font-mono tracking-widest uppercase" fill="currentColor">
              <textPath href="#circlePath" startOffset="0%">
                Contact Me • Contact Me •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </motion.a>
    </motion.section>
  )
}
