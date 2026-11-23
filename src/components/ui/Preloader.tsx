'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const orbitGraph = {
  seconds: 1.6,
  drops: [
    { radius: 12, horizontal: 23, vertical: 9, phase: 0 },
    { radius: 9, horizontal: 29, vertical: -8, phase: 0.32 },
    { radius: 6, horizontal: 34, vertical: 12, phase: 0.63 },
  ],
}

const samples = 48
const orbits = orbitGraph.drops.map(({ radius, horizontal, vertical, phase }) => {
  const points = Array.from({ length: samples + 1 }, (_, frame) => {
    const angle = 2 * Math.PI * ((frame % samples) / samples + phase)
    return [60 + horizontal * Math.cos(angle), 32 + vertical * Math.sin(angle)]
  })
  return {
    radius,
    name: 'liquid-drop-' + radius,
    keyframes: points.map(([x, y], index) =>
      (index * 100 / samples) + '%{transform:translate(' + x.toFixed(3) + 'px,' + y.toFixed(3) + 'px)}'
    ).join(''),
  }
})

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
          transition={{ duration: reducedMotion ? 0 : 0.24 }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg className="liquid-orbit" aria-hidden="true" viewBox="0 0 120 64" width="120" height="64">
              <style>{orbits.map(({ name, keyframes }) =>
                '@keyframes ' + name + '{' + keyframes + '}'
              ).join('')}</style>
              <defs>
                <filter id="liquid-orbit" x="0" y="0" width="120" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feGaussianBlur stdDeviation="2.4" />
                  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" />
                </filter>
              </defs>
              <g fill="currentColor" filter="url(#liquid-orbit)">
                {orbits.map(({ radius, name }) => (
                  <circle key={radius} r={radius} style={{
                    animation: name + ' ' + orbitGraph.seconds + 's linear infinite',

                  }} />
                ))}
              </g>
            </svg>
            <span className="font-sans text-base tracking-tight">please wait</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
