'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const EXPERIENCE = [
  {
    role: "CIST - Divisi HOTD Generative AI Intern",
    company: "Astra International",
    period: "January - March 2025",
    description: "Developed a full-stack website to monitor AI Generative Projects, including designing wireframes and UI layouts for the user dashboard using NextJS. Integrated the frontend with a Python Flask API to fetch data from the backend"
  },
  {
    role: "Operation System Lab Assistant",
    company: "Undip",
    period: "September - November 2025",
    description: "Teach about basic operations of Linux, Focuses on the use and management of Linux-based systems and basic concepts of the operating system, including navigation in the Linux environment, file management, process control"
  },
  {
    role: "Machine Learning Lab Assistant",
    company: "Undip",
    period: "September - November 2025",
    description: "Teaching assistant for Machine Learning courses. Guided students through the end-to-end Machine Learning pipeline, from Exploratory Data Analysis (EDA) to model training and evaluation metrics (Accuracy, Precision, Recall)."
  },
  {
    role: "Staff of Arts & Sports",
    company: "HMIF",
    period: "2023 - 2024",
    description: "Managed creative events and sports competitions for the student association, coordinating between multiple divisions."
  }
]

export function Work() {
  return (
    <section id="work" className="min-h-[80vh] flex flex-col justify-center py-24 px-6 md:px-24 bg-background">
      <ScrollSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-border pb-6">
           <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Work</h2>
           <span className="text-sm font-mono opacity-50 mb-2 md:mb-4">02 / Experience</span>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {EXPERIENCE.map((item, index) => (
             <AccordionItem key={index} value={`item-${index}`} className="border-b-muted-foreground/20">
                <AccordionTrigger className="text-xl md:text-3xl py-8 hover:no-underline hover:text-muted-foreground transition-all">
                   <div className="flex flex-col md:flex-row md:items-center gap-4 w-full text-left">
                     <span className="font-light">{item.role}</span>
                     <span className="text-sm md:text-lg font-mono text-muted-foreground md:ml-auto md:mr-8">{item.company}</span>
                   </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground pl-0 md:pl-4 pb-8">
                   <p className="max-w-2xl">{item.description}</p>
                   <div className="mt-4 text-xs font-mono opacity-50 uppercase tracking-wider">{item.period}</div>
                </AccordionContent>
             </AccordionItem>
          ))}
        </Accordion>
      </ScrollSection>
    </section>
  )
}
