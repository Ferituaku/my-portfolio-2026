'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"

const TECH = ["React", "Node.js", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Python", "Premiere Pro"]

export function TechStack() {
  return (
     <section id="stack" className="py-18 border-y border-border bg-background">
       <ScrollSection>
           <h2 className="text-sm font-mono tracking-widest uppercase mb-12 text-center opacity-50">04 / Stack</h2>
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-5xl mx-auto px-6">
              {TECH.map((tech) => (
                 <span key={tech} className="text-2xl md:text-5xl font-light hover:text-muted-foreground transition-colors cursor-default">
                   {tech}
                 </span>
              ))}
           </div>
       </ScrollSection>
     </section>
  )
}

