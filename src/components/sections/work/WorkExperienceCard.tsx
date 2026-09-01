'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Calendar, Building2, ChevronDown, ChevronRight, Sparkles, MapPin } from 'lucide-react'

export interface ExperienceItem {
  id: string
  index: string
  role: string
  company: string
  period: string
  location: string
  category: 'Akademik' | 'Industri' | 'Organisasi'
  isLatest?: boolean
  isFocalPoint?: boolean
  description: string
  highlights: string[]
  skills: string[]
  logo: string
  image?: string
}

interface WorkExperienceCardProps {
  item: ExperienceItem
  onToggle?: (isExpanded: boolean) => void
}

/**
 * Interactive Parallax & Smooth Presence Image Preview with Exit Shrink
 */
function ExperienceImagePreview({
  src,
  alt,
  index,
}: {
  src: string
  alt: string
  index: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth fluid cursor parallax
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const imgX = useTransform(x, [-0.5, 0.5], ['-10px', '10px'])
  const imgY = useTransform(y, [-0.5, 0.5], ['-10px', '10px'])
  const rotateX = useTransform(y, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(x, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.90,
        transition: { duration: 0.28, ease: [0.33, 1, 0.68, 1] },
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      className="w-full lg:w-4/12 shrink-0 [perspective:900px] origin-top"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/img relative rounded-2xl overflow-hidden border border-border/80 aspect-[4/3] bg-muted/20 shadow-md shadow-black/5 dark:shadow-black/25 cursor-pointer transition-shadow duration-500 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40"
      >
        {/* Parallax Image Layer with slight offset buffer */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="absolute -inset-3.5 w-[calc(100%+28px)] h-[calc(100%+28px)]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover object-center scale-[1.08] transition-transform duration-700 ease-out group-hover/img:scale-[1.14] select-none"
          />
        </motion.div>

        {/* Ambient Dark Gradient Vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none z-10" />

        {/* Floating Bottom Metadata Badge (3D translated) */}
        <div
          style={{ transform: 'translateZ(26px)' }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono tracking-wider z-20 pointer-events-none"
        >
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 shadow-xs">
            <Sparkles className="w-3 h-3 text-white/90" />
            Activity Doc
          </span>
          <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/10 opacity-80">
            #{index}
          </span>
        </div>

        {/* Subtle Shine Sweep on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
      </motion.div>
    </motion.div>
  )
}

export function WorkExperienceCard({ item, onToggle }: WorkExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    onToggle?.(nextState)
  }

  return (
    <div className="group/card w-full rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm hover:border-foreground/25 hover:bg-card/70 shadow-xs transition-all duration-300 overflow-hidden">
      {/* Interactive Header Button with Full WAI-ARIA Keyboard & Screen-reader Support */}
      <button
        type="button"
        id={`header-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={`content-${item.id}`}
        onClick={toggleOpen}
        className="w-full text-left p-5 sm:p-6 cursor-pointer select-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-inset"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Company Logo & Role Info */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
            {/* Logo Container with Depth & Clean Monochromatic Framing */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-2 shrink-0 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover/card:scale-105 bg-white dark:bg-zinc-900/90 border border-border/80 shadow-xs ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src={item.logo}
                alt={`${item.company} logo`}
                fill
                sizes="48px"
                className="object-contain p-1.5 select-none"
              />
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              {/* Category & Location Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-muted-foreground/80" />
                  {item.company}
                </span>

                <span className="text-[10px] font-mono text-muted-foreground/40">•</span>

                <span className="text-[11px] font-mono text-muted-foreground/80 flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-muted-foreground/60" />
                  {item.location}
                </span>

                {/* Category Tag */}
                {item.category && (
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-border/80 bg-muted/40 text-muted-foreground font-medium">
                    {item.category}
                  </span>
                )}

                {/* Latest Tag */}
                {item.isLatest && (
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-foreground/20 bg-foreground/10 text-foreground font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                    Latest
                  </span>
                )}
              </div>

              {/* Editorial Serif Job Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-foreground tracking-tight group-hover/card:text-foreground">
                {item.role}
              </h3>
            </div>
          </div>

          {/* Right Column: Period Badge & Toggle Trigger */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
            {/* Consolidated Date Period */}
            <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full border border-border bg-muted/30 text-foreground flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              {item.period}
            </span>

            {/* Visual Toggle Badge */}
            <div
              className={`flex items-center gap-1 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                isOpen
                  ? 'border-foreground bg-foreground text-background font-medium'
                  : 'border-border/80 bg-background/80 hover:bg-muted text-foreground'
              }`}
            >
              <span className="text-[11px]">{isOpen ? 'Hide' : 'Details'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-background' : 'text-muted-foreground'
                }`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Expandable Body Panel with Silky Smooth Shrink & Ease-Out Collapse Animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details-body"
            id={`content-${item.id}`}
            role="region"
            aria-labelledby={`header-${item.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: {
                height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.35, ease: 'easeOut', delay: 0.05 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.38, ease: [0.33, 1, 0.68, 1] }, // Smooth ease-out slide up
                opacity: { duration: 0.25, ease: 'easeOut' },
              },
            }}
            className="overflow-hidden border-t border-border/50 bg-muted/10 origin-top"
          >
            {/* Inner Content with Synchronized Shrink & Lift Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                opacity: 0,
                scale: 0.95, // Graceful shrink effect when closing
                y: -12,      // Smooth upward pull into the header
                transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
              }}
              className="p-5 sm:p-6 md:p-8 space-y-6 origin-top"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between items-start">
                {/* Left Details Content */}
                <div className="flex-1 space-y-5">
                  {/* Overview Description */}
                  <p className="text-sm sm:text-base font-sans font-light leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Highlights / Responsibilities */}
                  <div className="space-y-2 pt-2 border-t border-border/40">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2 font-medium">
                      Key Deliverables & Responsibilities
                    </span>
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 font-sans"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-foreground/50 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills (Unified Monochromatic) */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2 font-medium">
                      Tech Stack & Focus Areas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border border-border/70 bg-background text-foreground/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Documentation Photo with Parallax & Presence Animation */}
                {item.image && (
                  <ExperienceImagePreview
                    src={item.image}
                    alt={`${item.role} documentation`}
                    index={item.index}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
