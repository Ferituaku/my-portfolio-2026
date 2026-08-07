'use client'

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { projectsData } from "@/lib/projects"

export function Projects() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [xRange, setXRange] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (isMobile) return

    const updateRange = () => {
      if (trackRef.current) {
        setXRange(trackRef.current.scrollWidth - window.innerWidth)
      }
    }
    
    // Slight delay to ensure content layout is fully rendered
    const timer = setTimeout(updateRange, 100)
    
    window.addEventListener("resize", updateRange)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateRange)
    }
  }, [isMobile])
  
  // We use scrollYProgress on the whole section wrapper (which is 400vh tall).
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Map progress (0 to 1) to horizontal translation mathematically
  const x = useTransform(scrollYProgress, [0, 1], [0, -xRange])

  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <section id="projects" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col mb-12">
          <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-2">03 / Projects</span>
          <h2 className="text-4xl font-serif font-normal tracking-tight text-foreground">Selected Works</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
          {projectsData.map((project, i) => (
            <div 
              key={i} 
              className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square bg-[#111111] border border-border flex flex-col justify-end p-6 group"
            >
              {/* Background Cover Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 ease-out group-active:scale-105"
                style={{ 
                  backgroundImage: `url("${project.image}")`, 
                }} 
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />

              {/* Active Text Info */}
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[10px] font-sans text-white/50 uppercase tracking-widest">{project.year}</span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-1">{project.title}</h3>
                  {project.company && (
                    <div className="text-xs font-medium text-white/40 tracking-wide uppercase mt-1">{project.company}</div>
                  )}
                </div>

                <p className="text-white/70 font-light text-sm leading-relaxed line-clamp-3">{project.desc}</p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, index) => (
                     <span key={index} className="text-[10px] font-sans uppercase tracking-wider text-black bg-white/95 px-2.5 py-1 rounded-sm">{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-6 pt-3 border-t border-white/10 mt-2">
                   <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                      View Details <ArrowRight size={14} />
                   </Link>
                   <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                      Live Demo <ExternalLink size={14} />
                   </a>
                </div>
              </div>
            </div>
          ))}

          {/* Show More Projects */}
          <div className="pt-8 flex flex-col items-center justify-center">
            <Link href="/work" className="group flex items-center justify-center flex-col gap-4 text-center w-full">
              <div className="h-28 w-28 rounded-full border border-border flex items-center justify-center bg-foreground text-background transition-colors duration-500 hover:scale-105 ease-out shadow-sm">
                <span className="text-xs tracking-widest uppercase font-sans font-medium">Show More</span>
              </div>
              <span className="font-serif text-lg tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">
                 Discover All Projects
              </span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden">
        
        {/* Header container fixed relative to the screen, blending with the scroll logic */}
        <div className="absolute top-10 sm:top-14 md:top-16 left-6 md:left-12 z-10 pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-[90vw] mb-4 pointer-events-auto">
             <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-normal tracking-tight">Selected Works</h2>
             <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-muted-foreground hidden md:block">03 / Projects</span>
          </div>
        </div>

        {/* The Sliding Track */}
        <motion.div ref={trackRef} style={{ x }} className="flex h-[68dvh] md:h-[70dvh] items-center gap-6 md:gap-8 pl-6 md:pl-12 mt-16 md:mt-24 pr-12 w-max">
          {projectsData.map((project, i) => {
            const isActive = activeProject === i

            return (
            <div 
              key={i} 
              tabIndex={0}
              onClick={() => setActiveProject(isActive ? null : i)}
              className={`group relative h-full w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 overflow-hidden rounded-3xl bg-muted/10 border border-border cursor-pointer select-none touch-manipulation ${isActive ? 'is-active' : ''}`}
            >
              {/* Background Cover Image with Zoom Effect */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-145 group-active:scale-145 ${isActive ? 'scale-145' : ''}`}
                style={{ 
                  backgroundImage: `url("${project.image}")`, 
                  backgroundColor: '#1a1a1a', // Fallback
                }} 
              />
              {/* Dark Gradient Overlay (active primarily on hover/touch) */}
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/60 group-active:bg-black/60 pointer-events-none ${isActive ? 'bg-black/60' : ''}`} />

              {/* The Hover / Touch Slide Sheet (overlay bottom sheet) */}
              <div className={`absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-full flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 group-active:translate-y-0 h-full pt-16 sm:pt-20 ${isActive ? 'translate-y-0' : ''}`}>
                <div className={`flex justify-between items-start mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0' : ''}`}>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white tracking-tight">{project.title}</h3>
                  <span className="text-[10px] sm:text-xs font-sans text-white/70 uppercase px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap hidden sm:inline-block tracking-widest">{project.year}</span>
                </div>
                
                {project.company && (
                  <div className={`text-xs sm:text-sm font-medium text-white/50 tracking-wide uppercase mb-2 sm:mb-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 transition-all duration-500 delay-150 ${isActive ? 'opacity-100 translate-y-0' : ''}`}>{project.company}</div>
                )}
                
                <p className={`text-white/80 font-light text-sm sm:text-lg md:text-xl md:w-[80%] mb-4 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0 transition-all duration-500 delay-200 ${isActive ? 'opacity-100 translate-y-0' : ''}`}>{project.desc}</p>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mt-auto">
                  
                  {/* Tech stack badges */}
                  <div className={`flex flex-wrap gap-1.5 sm:gap-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-active:opacity-100 group-active:scale-100 transition-all duration-500 delay-300 ${isActive ? 'opacity-100 scale-100' : ''}`}>
                    {project.tech.map((t, index) => (
                       <span key={index} className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-black bg-white/90 px-2.5 py-1 rounded-sm backdrop-blur-sm">{t}</span>
                    ))}
                  </div>

                  {/* Call to Actions */}
                  <div className={`flex gap-4 sm:gap-6 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-active:opacity-100 group-active:scale-100 transition-all duration-500 delay-400 ${isActive ? 'opacity-100 scale-100' : ''}`}>
                     <Link href={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                        Details <ArrowRight size={16} />
                     </Link>
                     <a href={project.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                        Demo <ExternalLink size={16} />
                     </a>
                  </div>
                </div>
              </div>

               {/* Default Text when not hovering/active */}
               <div className={`absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none group-active:opacity-0 group-active:pointer-events-none text-white pointer-events-none ${isActive ? 'opacity-0 pointer-events-none' : ''}`}>
                  <div>
                    <span className="text-[10px] sm:text-xs font-sans text-white/70 uppercase mb-1 sm:mb-2 inline-block tracking-widest">{project.year}</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight">{project.title}</h3>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-black/10 text-white pointer-events-auto cursor-pointer transition-transform group-hover:scale-110">
                    <ArrowRight size={20} className="-rotate-45" />
                  </div>
               </div>
            </div>
            )
          })}

          {/* Dynamic Navigation Show More Projects Button at the Far Right */}
          <div className="h-full w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 flex items-center justify-center pr-6 md:pr-12">
            <Link href="/work" className="group flex items-center justify-center flex-col gap-6 md:gap-8 text-center px-4 w-full h-full">
              <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-active:bg-foreground group-active:text-background transition-colors duration-500 hover:scale-105 ease-out shadow-sm overflow-hidden relative">
                <span className="text-xs sm:text-sm tracking-widest uppercase font-sans font-medium z-10">Show More</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight text-muted-foreground group-hover:text-foreground transition-colors inline-flex">
                 Discover All Projects
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
