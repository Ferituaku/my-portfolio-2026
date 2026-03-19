'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"
import Image from "next/image"

const TECH_CATEGORIES = [
  {
    title: "Frontend & UI",
    items: [
      { name: "HTML5", logo: "/tech-stack-logo/html5-without-wordmark-color-seeklogo.png" },
      { name: "JavaScript", logo: "/tech-stack-logo/Unofficial_JavaScript_logo_2.svg.png" },
      { name: "React", logo: "/tech-stack-logo/react.png" },
      { name: "Next.js", logo: "/tech-stack-logo/next_js_logo_icon_145038.webp" },
      { name: "Tailwind CSS", logo: "/tech-stack-logo/tailwind-css-seeklogo.png" },
      { name: "Bootstrap", logo: "/tech-stack-logo/bootstrap-5-seeklogo.png" },
      { name: "GSAP", logo: "/tech-stack-logo/gsap.png" },
      { name: "Framer", logo: "/tech-stack-logo/framer.png" },
    ]
  },
  {
    title: "Backend & Core",
    items: [
      { name: "Node.js", logo: "/tech-stack-logo/nodejs.webp" },
      { name: "Python", logo: "/tech-stack-logo/Python-Emblem.png" },
      { name: "Laravel", logo: "/tech-stack-logo/laravel-logowine-677e34f3ed94c-scaled.webp" },
    ]
  },
  {
    title: "Design & Video",
    items: [
      { name: "Photoshop", logo: "/tech-stack-logo/Adobe_Photoshop_CC_2026_icon.svg.png" },
      { name: "Premiere Pro", logo: "/tech-stack-logo/Adobe_Premiere_Pro_CC_2026_icon.svg.png" },
      { name: "Canva", logo: "/tech-stack-logo/Canva-icon.png" },
      { name: "CapCut", logo: "/tech-stack-logo/capcut-icon.webp" },
    ]
  }
]

export function TechStack() {
  return (
     <section id="stack" className="py-24 border-y border-border bg-background">
       <ScrollSection>
           <h2 className="text-sm font-sans tracking-widest uppercase mb-16 text-center text-muted-foreground">04 / Stack</h2>
           
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
             {TECH_CATEGORIES.map((category, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-xl font-serif text-foreground/90 border-b border-border pb-4 mb-8">
                    {category.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((tech) => (
                       <div 
                         key={tech.name} 
                         className="group flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-300"
                       >
                          <div className="relative w-12 h-12 md:w-16 md:h-16 mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                            <Image 
                              src={tech.logo} 
                              alt={`${tech.name} logo`} 
                              fill 
                              className="object-contain" 
                            />
                          </div>
                          <span className="text-xs font-sans tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors text-center">
                            {tech.name}
                          </span>
                       </div>
                    ))}
                  </div>
                </div>
             ))}
           </div>
       </ScrollSection>
     </section>
  )
}

