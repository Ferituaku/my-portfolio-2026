'use client'

import { useRef, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Mouse position for parallax
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth spring animation
  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { innerWidth, innerHeight } = window
      const { clientX, clientY } = e
      
      // Calculate normalized position (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2
      const yPos = (clientY / innerHeight - 0.5) * 2
      
      x.set(xPos * 50) // Move 50px max
      y.set(yPos * 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <footer 
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full h-[50vh] z-0 flex flex-col justify-end overflow-hidden bg-black text-white"
    >
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[190dvh] object-cover opacity-90 filter blur-xs scale-150"
        >
          <source src="https://ry74leabzi38ngqg.public.blob.vercel-storage.com/public/bg-footer.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Back to Top Button (Inside Footer) */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-12 right-6 md:right-12 z-50 flex items-center gap-2 group cursor-pointer"
      >
        <span className="text-sm font-mono uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity hidden md:block">
          Back to top
        </span>
        <div className="group-hover:bg-black/20 backdrop-blur-md transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="group-hover:-translate-y-1 transition-transform"
          >
             <path d="m18 15-6-6-6 6"/>
          </svg>
        </div>
      </button>

      {/* Running Text Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
           {[...Array(10)].map((_, i) => (
             <span key={i} className="text-sm md:text-base font-mono uppercase tracking-widest px-8 opacity-70">
               Let's Work Together • Contact Me • Open for Collaborations • 
             </span>
           ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end">
        
        {/* Links Row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-8 md:gap-0">
             {/* Left - Location */}
            <div className="text-xs font-mono opacity-50 uppercase hidden md:block">
               <span>Semarang, Indonesia</span> <br/>
               <span>© 2026 Al Ferro.</span>
            </div>

            {/* Right - Menu */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 md:flex md:gap-8 text-sm font-medium uppercase tracking-widest text-white/70 w-full md:w-auto text-center md:text-right">
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                <a href="mailto:contact@alferro.com" className="hover:text-white transition-colors">Email</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
        </div>

        {/* Big Text */}
        <div className="w-full overflow-hidden border-t border-white/20 pt-2">
            <h1 className="text-[25vw] md:text-[18vw] leading-[0.8] font-bold tracking-tighter text-center mix-blend-overlay opacity-90 select-none">
              HIERRO
            </h1>
        </div>
        
      </div>
    </footer>
  )
}
