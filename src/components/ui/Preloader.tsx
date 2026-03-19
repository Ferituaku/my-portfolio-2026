'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-8"
            >
               {/* Aesthetic Loading Pulse */}
               <div className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                 {/* Outer ripple */}
                 <motion.div
                   className="absolute w-full h-full bg-white/30 rounded-full blur-md"
                   initial={{ scale: 0.5, opacity: 0 }}
                   animate={{ scale: 3, opacity: [0, 0.4, 0] }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                 />
                 {/* Inner ripple */}
                 <motion.div
                   className="absolute w-full h-full bg-white/50 rounded-full blur-sm"
                   initial={{ scale: 0.5, opacity: 0 }}
                   animate={{ scale: 2, opacity: [0, 0.6, 0] }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                 />
                 {/* Center Dot */}
                 <div className="w-2.5 h-2.5 bg-white rounded-full z-10 shadow-[0_0_20px_rgba(255,255,255,1)]" />
               </div>

               {/* Minimal Typography */}
               <motion.p 
                 className="text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-white/60 ml-[0.4em]"
                 animate={{ opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               >
                 Wait a sec
               </motion.p>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
