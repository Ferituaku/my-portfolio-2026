'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Page Content Transition Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier for premium feel
          delay: 0.1,
        }}
        className="w-full"
      >
        {children}
      </motion.div>

      {/* Swipe Curtain Overlay (Slides from bottom to top on load) */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-[9999] bg-[#0c0c0c] pointer-events-none"
        style={{
          height: '120vh',
          borderTopLeftRadius: '100px',
          borderTopRightRadius: '100px',
          boxShadow: '0 -30px 100px rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(30px)',
        }}
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1], // Smooth easeInOut curve
        }}
      />
    </>
  )
}
