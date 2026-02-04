'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-18 px-6 md:px-12 bg-background flex flex-col justify-center">
      <ScrollSection>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-6">
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">Projects</h2>
           <span className="text-sm font-mono opacity-50 mb-4">03 / Selected Works</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Real Projects */}
           {[
             {
               title: 'Gen AI Monitoring Portal',
               company: 'Astra',
               tech: 'Next.js, Python Flask, REST API',
               desc: 'A dashboard to monitor RPA and Gen AI project logs, providing stakeholders with timely visibility.',
               year: '2025'
             },
             {
               title: 'Cahaya Silver Platform',
               tech: 'Next.js, Prisma ORM',
               desc: 'A robust full-stack platform featuring a dual-interface system for administrative management and guest engagement.',
               year: '2024'
             },
             {
               title: 'WASKITA',
               tech: 'Web Development (Fullstack)',
               desc: 'Interactive educational platform for HIV/AIDS awareness, built in partnership with Public Health organizations.',
               year: '2024'
             },
             {
               title: 'SIT (Sistem Informasi Terpadu)',
               tech: 'Web Development',
               desc: 'Integrated Information System for managing IRS for Informatics students at Undip.',
               year: '2024'
             }
           ].map((project, i) => (
             <div key={i} className="group relative min-h-[300px] bg-muted/5 border border-border overflow-hidden cursor-pointer hover:bg-muted/10 transition-colors flex flex-col justify-between p-6">
                <div>
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                      <span className="text-xs font-mono opacity-50 border border-border px-2 py-1 rounded-full">{project.year}</span>
                   </div>
                   {project.company && <div className="text-sm font-medium mb-2">{project.company}</div>}
                   <p className="text-muted-foreground font-light mb-4">{project.desc}</p>
                </div>
                <div className="mt-auto">
                   <div className="text-xs font-mono uppercase tracking-widest opacity-70 mb-1">Tech Stack</div>
                   <div className="text-sm font-medium">{project.tech}</div>
                </div>
             </div>
           ))}
        </div>
      </ScrollSection>
    </section>
  )
}
