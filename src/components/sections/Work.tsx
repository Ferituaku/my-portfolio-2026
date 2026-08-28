'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { Calendar, Building2, ChevronDown, Sparkles, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ExperienceItem {
  id: string
  index: string
  role: string
  company: string
  period: string
  location: string
  type: string
  description: string
  highlights: string[]
  skills: string[]
  logo: string
  image?: string
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'astra-intern',
    index: '01',
    role: 'CIST - Divisi HOTD Generative AI Intern',
    company: 'PT Astra International Tbk',
    period: 'Jan 2025 – Mar 2025',
    location: 'Jakarta, Indonesia',
    type: 'Corporate Internship',
    description:
      'Engineered an enterprise-grade full-stack monitoring system for generative AI initiatives and robotic process automation (RPA). Designed sleek UI wireframes and integrated real-time data feeds with Python Flask backend APIs.',
    highlights: [
      'Architected Next.js dashboard UI for AI project tracking and RPA health metrics',
      'Integrated RESTful APIs powered by Python Flask for real-time model telemetry',
      'Collaborated directly with enterprise IT stakeholders in production deployment',
    ],
    skills: ['Next.js', 'React', 'TypeScript', 'Python Flask', 'Generative AI', 'RPA Monitoring'],
    logo: '/work-logo/astra.png',
    image: '/work/astra-docum.jpeg',
  },
  {
    id: 'ml-assistant',
    index: '02',
    role: 'Machine Learning Laboratory Assistant',
    company: 'Universitas Diponegoro',
    period: 'Sep 2025 – Nov 2025',
    location: 'Semarang, Indonesia',
    type: 'Academic & Research',
    description:
      'Guided 50+ undergraduate computer science students through the end-to-end Machine Learning lifecycle, covering data engineering, algorithmic modeling, and evaluation metrics.',
    highlights: [
      'Facilitated hands-on labs in supervised/unsupervised learning and deep neural networks',
      'Demonstrated rigorous model validation using Accuracy, Precision, Recall, and F1-Scores',
      'Mentored student capstone implementations using PyTorch and Scikit-learn',
    ],
    skills: ['Machine Learning', 'Python', 'PyTorch', 'Scikit-learn', 'EDA', 'Model Evaluation'],
    logo: '/work-logo/Universitas-Diponegoro-Semarang-Logo.png',
    image: '/work/machine-learning-lab.jpeg',
  },
  {
    id: 'os-assistant',
    index: '03',
    role: 'Operating Systems Laboratory Assistant',
    company: 'Universitas Diponegoro',
    period: 'Sep 2024 – Nov 2024',
    location: 'Semarang, Indonesia',
    type: 'Academic',
    description:
      'Instructed undergraduate students on core operating system paradigms, low-level Linux systems programming, process concurrency, and memory management.',
    highlights: [
      'Taught Linux shell navigation, Bash scripting, and kernel process orchestration',
      'Mentored practical implementations of thread synchronization, deadlocks, and scheduling algorithms',
      'Managed laboratory grading rubrics and technical student evaluations',
    ],
    skills: ['Linux Kernel', 'Bash Scripting', 'Process Management', 'Memory Scheduling', 'C/C++'],
    logo: '/work-logo/Universitas-Diponegoro-Semarang-Logo.png',
  },
  {
    id: 'hmif-staff',
    index: '04',
    role: 'Staff of Arts & Sports',
    company: 'HMIF Universitas Diponegoro',
    period: '2023 – 2024',
    location: 'Semarang, Indonesia',
    type: 'Leadership & Organization',
    description:
      'Spearheaded faculty-wide sports competitions, creative festivals, and student association programs, coordinating cross-divisional operations and logistics.',
    highlights: [
      'Managed end-to-end event execution, sponsorships, and technical operations',
      'Coordinated between student governing bodies, faculty advisors, and external partners',
    ],
    skills: ['Event Production', 'Team Leadership', 'Cross-functional Collaboration', 'Creative Direction'],
    logo: '/work-logo/hmif-logo.png',
    image: '/work/hmif.jpeg',
  },
]

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineProgressRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const [lineCoords, setLineCoords] = useState<{ top: number; height: number }>({
    top: 32,
    height: 0,
  })

  // Collapsible Dropdown State (First item open by default)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'astra-intern': true,
  })

  const toggleDropdown = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Calculate exact coordinates from center of first dot to center of last dot
  const recalculateLine = useCallback(() => {
    const container = containerRef.current
    if (!container || dotsRef.current.length === 0) return

    const firstDot = dotsRef.current[0]
    const lastDot = dotsRef.current[dotsRef.current.length - 1]
    if (!firstDot || !lastDot) return

    const containerRect = container.getBoundingClientRect()
    const firstRect = firstDot.getBoundingClientRect()
    const lastRect = lastDot.getBoundingClientRect()

    const startY = firstRect.top - containerRect.top + firstRect.height / 2
    const endY = lastRect.top - containerRect.top + lastRect.height / 2

    setLineCoords({
      top: startY,
      height: Math.max(0, endY - startY),
    })
  }, [])

  useEffect(() => {
    recalculateLine()
    const timer = setTimeout(recalculateLine, 350)
    return () => clearTimeout(timer)
  }, [expandedIds, recalculateLine])

  useEffect(() => {
    window.addEventListener('resize', recalculateLine)
    return () => window.removeEventListener('resize', recalculateLine)
  }, [recalculateLine])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const lineProgress = lineProgressRef.current

    if (!container || !lineProgress) return

    // Thread line progress scale driven by GSAP ScrollTrigger
    const lineTrigger = gsap.fromTo(
      lineProgress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.5,
        },
      }
    )

    // Simultaneously trigger cards entrance animations with permanent retention
    const cardTriggers: ScrollTrigger[] = []

    cardsRef.current.forEach((card) => {
      if (!card) return

      const cardAnimation = gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true, // Permanent presence: cards will not vanish on slight scroll
          },
        }
      )

      if (cardAnimation.scrollTrigger) {
        cardTriggers.push(cardAnimation.scrollTrigger)
      }
    })

    return () => {
      lineTrigger.scrollTrigger?.kill()
      cardTriggers.forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="work"
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 border-b border-border/70 pb-8">
          <div>
            <div className="mb-3">
              <ScrambleText
                text="02 / Experience"
                className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground uppercase"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-foreground">
              Work Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono tracking-wider text-muted-foreground mt-4 md:mt-0 uppercase">
            Timeline • 2023 – 2025
          </p>
        </div>

        {/* Timeline Thread Container */}
        <div ref={containerRef} className="relative">
          {/* Hairline (1px) Vertical Track passing through exact dot center */}
          <div
            style={{
              top: `${lineCoords.top}px`,
              height: `${lineCoords.height}px`,
            }}
            className="absolute left-4 sm:left-5 -translate-x-1/2 w-[1px] bg-border/60 pointer-events-none transition-all duration-300 z-0"
          />

          {/* Hairline (1px) Active Animated Thread Line */}
          <div
            ref={lineProgressRef}
            style={{
              top: `${lineCoords.top}px`,
              height: `${lineCoords.height}px`,
              transformOrigin: 'top center',
            }}
            className="absolute left-4 sm:left-5 -translate-x-1/2 w-[1px] bg-foreground pointer-events-none transition-all duration-300 z-0 shadow-[0_0_4px_rgba(0,0,0,0.3)] dark:shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          />

          {/* Timeline Experience Cards in a 2-Column Row Layout */}
          <div className="space-y-8 sm:space-y-10">
            {EXPERIENCES.map((item, index) => {
              const isExpanded = !!expandedIds[item.id]

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className="relative flex items-start gap-4 sm:gap-6 md:gap-8 group"
                >
                  {/* LEFT COLUMN: Dot on Thread (Strictly Outside Card) */}
                  <div className="relative z-10 flex flex-col items-center shrink-0 w-8 sm:w-10 pt-[22px] sm:pt-[24px]">
                    <div
                      ref={(el) => {
                        dotsRef.current[index] = el
                      }}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background border-2 border-border/90 group-hover:border-foreground transition-all duration-300 flex items-center justify-center shadow-xs"
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isExpanded
                            ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-foreground scale-110'
                            : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground/60 group-hover:bg-foreground group-hover:scale-125'
                        }`}
                      />
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Minimalist Card Container */}
                  <div className="flex-1 min-w-0 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-foreground/25 hover:bg-card/70 shadow-xs overflow-hidden">
                    {/* Minimalist Card Header / Toggle Bar */}
                    <div
                      onClick={() => toggleDropdown(item.id)}
                      className="p-5 sm:p-6 cursor-pointer select-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                        {item.logo && (
                          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-border/80 bg-white p-1.5 shrink-0 overflow-hidden shadow-xs flex items-center justify-center">
                            <Image
                              src={item.logo}
                              alt={item.company}
                              fill
                              className="object-contain p-1 select-none"
                            />
                          </div>
                        )}

                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {item.company}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground/60">•</span>
                            <span className="text-[11px] font-mono text-muted-foreground/80">
                              {item.location}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-foreground tracking-tight truncate sm:whitespace-normal">
                            {item.role}
                          </h3>
                        </div>
                      </div>

                      {/* Right Period Badge & Dropdown Chevron */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                        <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-full border border-border bg-muted/30 text-foreground flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {item.period}
                        </span>

                        <button
                          type="button"
                          aria-label="Toggle details"
                          className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-lg border border-border/80 bg-background/80 hover:bg-muted text-foreground transition-all duration-200"
                        >
                          <span className="hidden sm:inline text-[11px]">
                            {isExpanded ? 'Hide' : 'Details'}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-foreground' : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Dropdown Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-t border-border/50 bg-muted/10"
                        >
                          <div className="p-5 sm:p-6 md:p-8 space-y-6">
                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between items-start">
                              {/* Left Details */}
                              <div className="flex-1 space-y-5">
                                {/* Description */}
                                <p className="text-sm sm:text-base font-sans font-light leading-relaxed text-muted-foreground">
                                  {item.description}
                                </p>

                                {/* Highlights */}
                                <div className="space-y-2 pt-1 border-t border-border/40">
                                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                                    Key Responsibilities & Deliverables
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

                                {/* Skills / Tech Stack */}
                                <div className="pt-2">
                                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                                    Technologies & Domains
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

                              {/* Right Documentation Photo Preview (if available) */}
                              {item.image && (
                                <div className="w-full lg:w-4/12 shrink-0">
                                  <div className="group/img relative rounded-xl overflow-hidden border border-border aspect-[4/3] bg-muted/20 shadow-xs">
                                    <Image
                                      src={item.image}
                                      alt={`${item.role} documentation`}
                                      fill
                                      sizes="(max-width: 1024px) 100vw, 360px"
                                      className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-mono tracking-wider">
                                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                                        <Sparkles className="w-2.5 h-2.5" />
                                        Doc Preview
                                      </span>
                                      <span className="opacity-75">#{item.index}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
