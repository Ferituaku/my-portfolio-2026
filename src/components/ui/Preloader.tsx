'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function Preloader() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    let mounted = true
    const finish = () => { if (mounted) setLoading(false) }
    const timeout = window.setTimeout(finish, 2500)
    const hero = document.querySelector<HTMLVideoElement>('video[data-hero-background]')
    if (pathname === '/' && hero?.poster) {
      const poster = new Image()
      poster.src = hero.poster
      poster.decode().then(finish, finish)
    } else {
      finish()
    }
    return () => {
      mounted = false
      window.clearTimeout(timeout)
    }
  }, [pathname, loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          role="status"
          className="fixed inset-0 z-[10000] grid place-items-center bg-black text-white"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.32, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg className="liquid-orbit" aria-hidden="true" viewBox="0 0 120 64" width="120" height="64">
              <defs>
                <filter id="liquid-orbit" x="0" y="0" width="120" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feGaussianBlur stdDeviation="3.4" />
                  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1.8" />
                  <feGaussianBlur stdDeviation="1.15" />
                </filter>
              </defs>
              <g fill="#d8d8d8" filter="url(#liquid-orbit)">
                <circle className="liquid-left" cx="29" cy="32" r="11" />
                <circle className="liquid-center" cx="60" cy="32" r="13" />
                <circle className="liquid-right" cx="92" cy="32" r="8" />
              </g>
            </svg>
            <span className="font-sans text-sm font-normal tracking-wide text-white/50">please wait</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
