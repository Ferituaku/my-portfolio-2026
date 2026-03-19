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
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.5

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
      className="fixed top-0 left-0 w-[200px] h-[200px] pointer-events-none z-[100] transition-opacity duration-300 flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0, 
      }}
    >
      {/* Smooth gradient cursor matching background fade */}
      <div 
         className="w-[200px] h-[200px] rounded-full mix-blend-multiply shrink-0"
         style={{
            background: 'radial-gradient(circle, rgba(147,197,253,0.4) 0%, rgba(196,181,253,0.15) 45%, rgba(255,255,255,0) 70%)',
            filter: 'blur(55px)',
         }}
      />
    </motion.div>
  )
}
