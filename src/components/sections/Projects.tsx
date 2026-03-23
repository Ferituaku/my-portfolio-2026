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

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        setXRange(trackRef.current.scrollWidth - window.innerWidth)
      }
    }
    
    updateRange()
    window.addEventListener("resize", updateRange)
    return () => window.removeEventListener("resize", updateRange)
  }, [])
  
  // We use scrollYProgress on the whole section wrapper (which is 400vh tall).
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Map progress (0 to 1) to horizontal translation mathematically
  const x = useTransform(scrollYProgress, [0, 1], [0, -xRange])

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Header container fixed relative to the screen, blending with the scroll logic */}
        <div className="absolute top-16 left-6 md:left-12 z-10 pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-[90vw] mb-4 pointer-events-auto">
             <h2 className="text-5xl md:text-7xl font-serif font-normal tracking-tight">Selected Works</h2>
             <span className="text-sm font-sans uppercase tracking-widest text-muted-foreground hidden md:block">03 / Projects</span>
          </div>
        </div>

        {/* The Sliding Track */}
        <motion.div ref={trackRef} style={{ x }} className="flex h-[70vh] items-center gap-8 pl-6 md:pl-12 mt-24 pr-12 w-max">
          {projectsData.map((project, i) => (
            <div 
              key={i} 
              className="group relative h-full w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 overflow-hidden rounded-3xl bg-muted/10 border border-border"
            >
              {/* Background Cover Image with Zoom Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-145"
                style={{ 
                  backgroundImage: `url("${project.image}")`, 
                  backgroundColor: '#1a1a1a', // Fallback
                }} 
              />
              {/* Dark Gradient Overlay (active primarily on hover) */}
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/60 pointer-events-none" />

              {/* The Hover Slide Sheet (overlay bottom sheet) */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-full flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 h-full pt-20">
                <div className="flex justify-between items-start mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">{project.title}</h3>
                  <span className="text-xs font-sans text-white/70 uppercase px-3 py-1 rounded-full border border-white/20 whitespace-nowrap hidden sm:inline-block tracking-widest">{project.year}</span>
                </div>
                
                {project.company && (
                  <div className="text-sm font-medium text-white/50 tracking-wide uppercase mb-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">{project.company}</div>
                )}
                
                <p className="text-white/80 font-light text-lg md:text-xl md:w-[80%] mb-8 leading-relaxed line-clamp-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">{project.desc}</p>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-auto">
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-300">
                    {project.tech.map((t, index) => (
                       <span key={index} className="text-xs font-sans uppercase tracking-wider text-black bg-white/90 px-3 py-1.5 rounded-sm backdrop-blur-sm">{t}</span>
                    ))}
                  </div>

                  {/* Call to Actions */}
                  <div className="flex gap-6 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-400">
                     <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 text-sm uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                        View Details <ArrowRight size={18} />
                     </Link>
                     <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-wider text-white hover:text-white/60 transition-colors">
                        Live Demo <ExternalLink size={18} />
                     </a>
                  </div>
                </div>
              </div>

               {/* Default Text when not hovering */}
               <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none text-white pointer-events-none">
                  <div>
                    <span className="text-xs font-sans text-white/70 uppercase mb-2 inline-block tracking-widest">{project.year}</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tight">{project.title}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-black/10 text-white pointer-events-auto cursor-pointer transition-transform hover:scale-110">
                    <ArrowRight size={24} className="-rotate-45" />
                  </div>
               </div>
            </div>
          ))}

          {/* Dynamic Navigation Show More Projects Button at the Far Right */}
          <div className="h-full w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 flex items-center justify-center pr-6 md:pr-12">
            <Link href="/work" className="group flex items-center justify-center flex-col gap-8 text-center px-4 w-full h-full">
              <div className="h-40 w-40 md:h-56 md:w-56 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500 hover:scale-105 ease-out shadow-sm overflow-hidden relative">
                <span className="text-sm tracking-widest uppercase font-sans font-medium z-10">Show More</span>
                {/* Micro animation bg slide maybe? We keep it simple and elegant */}
              </div>
              <span className="font-serif text-2xl md:text-3xl tracking-tight text-muted-foreground group-hover:text-foreground transition-colors overflow-hidden inline-flex">
                 Discover All Projects
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
