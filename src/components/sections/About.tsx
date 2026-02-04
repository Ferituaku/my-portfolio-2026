'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"

export function About() {
  return (
    <section id="about" className="min-h-[60vh] flex items-center justify-center py-24 px-6 md:px-12 bg-background">
      <ScrollSection className="max-w-5xl mx-auto text-center">
        <h2 className="text-sm font-mono tracking-widest uppercase mb-6 opacity-50">01 / About</h2>
        <p className="text-2xl md:text-3xl lg:text-4xl leading-tight font-light text-muted-foreground">
          I am a final-year <span className="text-foreground font-medium">Informatics undergraduate at Diponegoro University</span>, blending <span className="text-foreground font-medium">Full-Stack Engineering</span> with <span className="text-foreground font-medium">Machine Learning</span> expertise.
          <br /><br />
          With over 3 years of experience building scalable applications using <span className="text-foreground">Next.js</span> and <span className="text-foreground">React</span>, I bridge the gap between robust backend logic and immersive frontend experiences. 
          <br /><br />
        </p>
      </ScrollSection>
    </section>
  )
}
