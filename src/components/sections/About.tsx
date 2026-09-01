'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { InteractiveDotGrid } from '@/components/ui/InteractiveDotGrid'
import { Sparkles, Briefcase, GraduationCap, Code2, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export function About() {
  const cardRef = useRef<HTMLDivElement>(null)

  // Cursor 3D Tilt Values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
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

  // Animation variants for smooth presence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-24 md:py-36 px-6 md:px-12 bg-background overflow-hidden">
      {/* Interactive Dot Grid Background with cursor repulsion physics */}
      <InteractiveDotGrid
        dotSpacing={28}
        dotRadius={1.1}
        repelRadius={65}
        repelStrength={15}
        returnSpeed={0.1}
        damping={0.8}
      />

      {/* Top smooth gradient blend transition */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none z-[1]" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-10%' }}
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16"
        >
          {/* LEFT: 3D Floating Profile Picture Frame */}
          <motion.div variants={itemVariants} className="w-full lg:w-5/12 flex flex-col items-center lg:items-start">
            <div className="mb-6 w-full flex justify-between items-center">
              <ScrambleText
                text="01 / About Me"
                className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground uppercase"
              />
              <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-full border border-border/80 bg-muted/40 text-muted-foreground">
                PRO • 2026
              </span>
            </div>

            {/* 3D Floating Perspective Wrapper */}
            <div
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] [perspective:1200px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              ref={cardRef}
            >
              {/* Perpetual Float Animation Layer */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="w-full h-full relative rounded-3xl p-2 bg-card/60 backdrop-blur-sm border border-border shadow-xl shadow-black/10 dark:shadow-black/40"
              >
                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted/20">
                  <Image
                    src="/me-picture.png"
                    alt="Al Ferro Putra Yusanda"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                    className="object-cover object-center scale-[1.01] select-none pointer-events-none"
                  />

                  {/* Floating Glassmorphism Badge inside 3D frame */}
                  <div
                    style={{ transform: 'translateZ(30px)' }}
                    className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-background/85 backdrop-blur-md border border-border/80 shadow-md flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground leading-none">Al Ferro Putra</p>
                        <p className="text-[10px] font-sans text-muted-foreground mt-0.5">Full-Stack & AI Engineer</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-foreground/5 border border-border/50">
                      IDN 📍
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Streamlined Personal Introduction & Experience Highlights */}
          <div className="w-full lg:w-6/12 space-y-6">
            {/* Intro Greeting */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-lg sm:text-xl lg:text-2xl font-sans font-light leading-relaxed text-foreground/90">
                I am a <span className="text-foreground font-medium">Cum Laude Informatics graduate</span> from Universitas Diponegoro specializing in high-performance full-stack web applications and machine intelligence.
              </p>
              <p className="text-sm sm:text-base font-sans font-light leading-relaxed text-muted-foreground">
                With real-world experience shipping production GenAI & automation dashboards at <span className="text-foreground font-medium">PT Astra International</span>, I bridge complex backend logic, machine learning models, and polished user experiences into unified digital products.
              </p>
            </motion.div>

            {/* Key Highlights Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Highlight Card 1: Experience */}
              <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 backdrop-blur-sm space-y-1.5 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/40 group">
                <div className="flex items-center gap-2 text-foreground">
                  <Briefcase className="w-4 h-4 text-foreground/80 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Production Impact</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Engineered enterprise GenAI tools & RPA monitoring at <span className="text-foreground">PT Astra International</span>.
                </p>
              </div>

              {/* Highlight Card 2: Research & AI */}
              <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 backdrop-blur-sm space-y-1.5 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/40 group">
                <div className="flex items-center gap-2 text-foreground">
                  <Sparkles className="w-4 h-4 text-foreground/80 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">AI / NLP Research</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Published multi-document summarizer (S-BERT & MMR) & LangChain healthcare chatbots.
                </p>
              </div>

              {/* Highlight Card 3: Education */}
              <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 backdrop-blur-sm space-y-1.5 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/40 group">
                <div className="flex items-center gap-2 text-foreground">
                  <GraduationCap className="w-4 h-4 text-foreground/80 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Education</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  B.Sc. in Informatics • <span className="text-foreground font-medium">GPA 3.60 / 4.00</span> (Cum Laude).
                </p>
              </div>

              {/* Highlight Card 4: Core Stack */}
              <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 backdrop-blur-sm space-y-1.5 transition-all duration-300 hover:border-foreground/20 hover:bg-muted/40 group">
                <div className="flex items-center gap-2 text-foreground">
                  <Code2 className="w-4 h-4 text-foreground/80 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Core Stack</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Next.js, React, TypeScript, Python Flask, Prisma, PyTorch.
                </p>
              </div>
            </motion.div>

            {/* Action / View Experience CTA */}
            <motion.div variants={itemVariants} className="pt-2 flex items-center">
              <Link href="/work" className="group inline-block">
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="relative inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-widest overflow-hidden shadow-md shadow-foreground/5 hover:shadow-xl hover:shadow-foreground/15 transition-shadow duration-500"
                >
                  {/* Interactive status pulse dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-40 group-hover:opacity-75 duration-1000" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-background/80 group-hover:bg-background transition-colors" />
                  </span>

                  <span className="font-medium tracking-[0.18em]">View Experience</span>

                  {/* Icon Circle with animated sliding arrow */}
                  <div className="relative w-5 h-5 rounded-full bg-background/15 flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-background/25">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Ambient sheen sweep reflection on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-background/15 to-transparent pointer-events-none" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

