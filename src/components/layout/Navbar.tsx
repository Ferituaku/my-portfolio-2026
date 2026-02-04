'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '@/store/useStore'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const MENU_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
]

export function Navbar() {
  const pathname = usePathname()
  const { isMenuOpen, toggleMenu } = useStore()
  const overlayRef = useRef<HTMLDivElement>(null)
  const navListRef = useRef<HTMLUListElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true })
        .to(overlayRef.current, {
          height: '100vh',
          duration: 0.8,
          ease: 'power4.inOut',
        })
        .from(navListRef.current?.children || [], {
          y: 60,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.4')
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (timeline.current) {
      if (isMenuOpen) {
        timeline.current.play()
      } else {
        timeline.current.reverse()
      }
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] mix-blend-difference text-white p-2 hover:scale-110 transition-transform duration-300"
        aria-label="Toggle Menu"
      >
        <span className="sr-only">Toggle Menu</span>
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Full Screen Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-x-0 top-0 h-0 bg-foreground z-[55] overflow-hidden flex flex-col justify-center items-center text-background"
      >
        <nav>
          <ul
            ref={navListRef}
            className="flex flex-col items-center gap-8 space-y-4"
          >
            {MENU_ITEMS.map((item, idx) => {
              // Logic: If on home page, use anchor. If not, use /#anchor.
              // Exception: Contact is /contact, Home is /.
              let href = item.href
              if (pathname !== '/' && item.href.startsWith('#')) {
                href = '/' + item.href
              }

              return (
              <li key={idx} className="overflow-hidden">
                {item.label === 'Home' ? (
                  <a
                    href={item.href}
                    onClick={toggleMenu}
                    className="text-6xl md:text-8xl font-bold tracking-tighter hover:text-muted-foreground transition-colors block"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    onClick={toggleMenu}
                    className="text-6xl md:text-8xl font-bold tracking-tighter hover:text-muted-foreground transition-colors block"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-10 text-sm opacity-50 font-mono">
          Al Ferro Portfolio (v2026)
        </div>
      </div>
    </>
  )
}
