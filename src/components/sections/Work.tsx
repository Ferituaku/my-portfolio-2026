'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ScrambleText } from '@/components/ui/ScrambleText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WorkTimelineNode } from './work/WorkTimelineNode'
import { WorkExperienceCard, type ExperienceItem } from './work/WorkExperienceCard'

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ml-assistant',
    index: '01',
    role: 'Machine Learning Laboratory Assistant',
    company: 'Universitas Diponegoro',
    period: 'Sep – Nov 2025',
    location: 'Semarang, Indonesia',
    category: 'Akademik',
    isLatest: true,
    description:
      'Guided 20+ undergraduate computer science students through the end-to-end Machine Learning lifecycle, covering data engineering, algorithmic modeling, and evaluation metrics.',
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
    id: 'astra-intern',
    index: '02',
    role: 'CIST, Divisi HOTD Generative AI Intern',
    company: 'PT Astra International Tbk',
    period: 'Jan – Mar 2025',
    location: 'Jakarta, Indonesia',
    category: 'Industri',
    isFocalPoint: true,
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
    id: 'os-assistant',
    index: '03',
    role: 'Operating Systems Laboratory Assistant',
    company: 'Universitas Diponegoro',
    period: 'Sep – Nov 2024',
    location: 'Semarang, Indonesia',
    category: 'Akademik',
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
    category: 'Organisasi',
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

  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({})

  const handleCardToggle = (id: string, isExpanded: boolean) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: isExpanded,
    }))
  }

  // Calculate coordinates accurately from center of first dot to center of last dot
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
  }, [expandedMap, recalculateLine])

  useEffect(() => {
    window.addEventListener('resize', recalculateLine)
    return () => window.removeEventListener('resize', recalculateLine)
  }, [recalculateLine])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const lineProgress = lineProgressRef.current

    if (!container || !lineProgress) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      lineProgress.style.transform = 'scaleY(1)'
      cardsRef.current.forEach((card) => {
        if (card) {
          card.style.opacity = '1'
          card.style.transform = 'none'
          card.style.filter = 'none'
        }
      })
      return
    }

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
            once: true,
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
              const isExpanded = !!expandedMap[item.id]

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className="relative flex items-start gap-4 sm:gap-6 md:gap-8 group"
                >
                  {/* LEFT COLUMN: Dot on Thread (Strictly Outside Card) */}
                  <div
                    ref={(el) => {
                      dotsRef.current[index] = el
                    }}
                    className="relative z-10 flex flex-col items-center shrink-0 w-8 sm:w-10 pt-[22px] sm:pt-[24px]"
                  >
                    <WorkTimelineNode
                      isLatest={item.isLatest}
                      isFocalPoint={item.isFocalPoint}
                      isExpanded={isExpanded}
                    />
                  </div>

                  {/* RIGHT COLUMN: Minimalist Card Container with Native Details/Summary */}
                  <div className="flex-1 min-w-0">
                    <WorkExperienceCard
                      item={item}
                      onToggle={(nextExpanded) => handleCardToggle(item.id, nextExpanded)}
                    />
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
