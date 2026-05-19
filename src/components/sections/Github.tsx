'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Github as GithubIcon, ArrowUpRight } from 'lucide-react'

export function Github() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1.5, // Smooth scrub for Lenis compatibility
        }
      })

      tl.fromTo(iconRef.current,
        { y: 50, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(textRef.current, 
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
        "-=0.8"
      )
      .fromTo(subtextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        "-=1"
      )
      .fromTo(buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        "-=0.8"
      )
      
      // Parallax effect on the background grid
      gsap.to('.bg-grid', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col items-center justify-center bg-background overflow-hidden border-t border-border/30">
      {/* Background grid or pattern */}
      <div className="bg-grid absolute -inset-[100%] opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <div ref={iconRef} className="mb-8 h-24 w-24 rounded-full bg-muted/50 border border-border flex items-center justify-center shadow-2xl backdrop-blur-sm will-change-transform">
          <GithubIcon size={40} className="text-foreground" />
        </div>
        
        <h2 ref={textRef} className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter uppercase mb-8 text-foreground will-change-transform leading-none">
          The Codebase
        </h2>
        
        <p ref={subtextRef} className="max-w-2xl text-muted-foreground text-lg md:text-xl font-light mb-12 will-change-transform leading-relaxed">
          Explore my open source contributions, repositories, and technical experiments. 
          Building in public and collaborating with the global developer community.
        </p>

        <Link 
          ref={buttonRef}
          href="https://github.com/Ferituaku" // Assuming standard username, can be changed
          target="_blank"
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-foreground text-background text-sm md:text-base font-sans uppercase tracking-widest overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] will-change-transform"
        >
          <span className="relative z-10 flex items-center gap-2">
            Visit GitHub Profile
            <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0" />
        </Link>
      </div>
    </section>
  )
}
