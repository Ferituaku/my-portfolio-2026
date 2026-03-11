'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Motion values for instant tracking
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 100) // 100 is half the width to center it
      cursorY.set(e.clientY - 100)
      
      // Calculate if we've scrolled past the hero section (approx 100vh)
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.9

      if (scrolledPastHero) {
        setIsVisible(true)
      } else {
        setIsVisible(false) // Hide on the dark header
      }
    }
    
    // Also listen to scroll to update visibility without moving mouse
    const handleScroll = () => {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.9
      setIsVisible(scrolledPastHero)
    }
    
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-[100] mix-blend-multiply overflow-hidden transition-opacity duration-300"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 0.6 : 0, 
      }}
    >
      {/* Bright Pastel Gradient Radial Background with ultra-smooth edges */}
      <div 
         className="w-full h-full rounded-full"
         style={{
            background: 'radial-gradient(circle, rgba(255,182,193,0.5) 0%, rgba(173,216,230,0.3) 15%, rgba(255,255,255,0) 45%)',
            filter: 'blur(40px)',
            transform: 'scale(1.8)'
         }}
      />
    </motion.div>
  )
}
