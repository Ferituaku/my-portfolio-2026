'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function About() {
  return (
    <section id="about" className="min-h-[60dvh] flex items-center justify-center py-20 md:py-32 px-6 md:px-12 bg-background">
      <ScrollSection className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
        <div className="w-full md:w-5/12">
          <ScrambleText text="01 / About Me" className="text-xs md:text-sm font-sans tracking-widest text-muted-foreground uppercase mb-4 block" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight tracking-tight text-foreground mb-6">
            Bridging Logic <br className="hidden sm:inline" />& Machine Intelligence
          </h2>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-border bg-muted/30 text-foreground">
              B.Sc. Informatics (Cumlaude)
            </span>
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-border bg-muted/30 text-foreground">
              GPA 3.60 / 4.00
            </span>
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-border bg-muted/30 text-foreground">
              Universitas Diponegoro
            </span>
          </div>
        </div>

        <div className="w-full md:w-6/12 space-y-6 text-base md:text-lg lg:text-xl leading-relaxed font-sans font-light text-muted-foreground">
          <p>
            I am a <span className="text-foreground font-medium">Cumlaude Computer Science / Informatics graduate</span> at Universitas Diponegoro, specializing in <span className="text-foreground font-medium">Full-Stack Web Development</span> and <span className="text-foreground font-medium">Generative AI / NLP Engineering</span>.
          </p>

          <p>
            With hands-on experience across <span className="text-foreground font-medium">Next.js, React, TypeScript, Python Flask, and Prisma</span>, I build end-to-end applications — from intuitive frontend interfaces to robust backend APIs and intelligent machine learning models.
          </p>

          <p>
            My background includes shipping production features at <span className="text-foreground font-medium">PT Astra International</span> (Generative AI & RPA monitoring dashboard), developing LangChain AI chatbots for public health (<span className="text-foreground font-medium">WASKITA</span>), and executing an undergraduate thesis on extractive multi-document summarization using <span className="text-foreground font-medium">Sentence-BERT & MMR</span>.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-border/40 text-xs md:text-sm font-sans tracking-wide">
            <div>
              <span className="block text-foreground font-medium uppercase mb-1">Core Focus</span>
              <span className="text-muted-foreground">Full-Stack Web & GenAI / NLP</span>
            </div>
            <div>
              <span className="block text-foreground font-medium uppercase mb-1">End-to-End Ownership</span>
              <span className="text-muted-foreground">UI Design → REST API → ML Model</span>
            </div>
          </div>
        </div>
      </ScrollSection>
    </section>
  )
}
