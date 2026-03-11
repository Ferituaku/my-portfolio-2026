'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"

export function About() {
  return (
    <section id="about" className="min-h-[60vh] flex items-center justify-center py-32 px-6 md:px-12 bg-background flex-col md:flex-row gap-12">
      <ScrollSection className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <span className="text-sm font-sans tracking-wide text-muted-foreground uppercase mb-4 block">01 / About</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight tracking-tight text-foreground">
            Bridging Logic <br/>& Experience
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg md:text-xl leading-relaxed font-sans font-light text-muted-foreground">
            I am a final-year <span className="text-foreground font-medium">Informatics undergraduate at Diponegoro University</span>, blending <span className="text-foreground font-medium">Full-Stack Engineering</span> with <span className="text-foreground font-medium">Machine Learning</span> expertise.
            <br /><br />
            With over 3 years of experience building scalable applications using <span className="text-foreground">Next.js</span> and <span className="text-foreground">React</span>, I bridge the gap between robust backend logic and immersive frontend experiences. 
          </p>
        </div>
      </ScrollSection>
    </section>
  )
}
