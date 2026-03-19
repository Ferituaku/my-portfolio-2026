'use client'

import { ScrollSection } from "@/components/ui/ScrollSection"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const EXPERIENCE = [
  {
    role: "CIST - Divisi HOTD Generative AI Intern",
    company: "Astra International",
    period: "January - March 2025",
    description: "Developed a full-stack website to monitor AI Generative Projects, including designing wireframes and UI layouts for the user dashboard using NextJS. Integrated the frontend with a Python Flask API to fetch data from the backend",
    image: "/work/astra-docum.jpeg",
    logo: "/work-logo/astra.png"
  },
  {
    role: "Operation System Lab Assistant",
    company: "UNIVERSITAS DIPONEGORO",
    period: "September - November 2025",
    description: "Teach about basic operations of Linux, Focuses on the use and management of Linux-based systems and basic concepts of the operating system, including navigation in the Linux environment, file management, process control",
    logo: "/work-logo/Universitas-Diponegoro-Semarang-Logo.png"
  },
  {
    role: "Machine Learning Lab Assistant",
    company: "UNIVERSITAS DIPONEGORO",
    period: "September - November 2025",
    description: "Teaching assistant for Machine Learning courses. Guided students through the end-to-end Machine Learning pipeline, from Exploratory Data Analysis (EDA) to model training and evaluation metrics (Accuracy, Precision, Recall).",
    image: "/work/machine-learning-lab.jpeg",
    logo: "/work-logo/Universitas-Diponegoro-Semarang-Logo.png"
  },
  {
    role: "Staff of Arts & Sports",
    company: "HMIF",
    period: "2023 - 2024",
    description: "Managed creative events and sports competitions for the student association, coordinating between multiple divisions.",
    image: "/work/hmif.jpeg",
    logo: "/work-logo/hmif-logo.png"
  }
]

export function Work() {
  return (
    <section id="work" className="min-h-[80vh] flex flex-col justify-center py-24 px-6 md:px-24 bg-background">
      <ScrollSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-border pb-6">
           <h2 className="text-5xl md:text-7xl font-serif font-normal tracking-tight mb-4 text-foreground">Work Experience</h2>
           <span className="text-sm font-sans uppercase tracking-widest text-muted-foreground mb-4">02 / Experience</span>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {EXPERIENCE.map((item, index) => (
             <AccordionItem key={index} value={`item-${index}`} className="border-b-muted-foreground/20">
                <AccordionTrigger className="text-xl md:text-3xl py-8 hover:no-underline hover:opacity-70 transition-opacity">
                   <div className="flex flex-col md:flex-row md:items-center gap-6 w-full text-left">
                     <span className="font-serif font-normal tracking-tight">{item.role}</span>
                     <span className="text-sm md:text-lg font-sans text-muted-foreground md:ml-auto md:mr-8 mt-2 md:mt-0 uppercase tracking-widest">{item.company}</span>
                   </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground pl-0 md:pl-4 pb-12 pt-4">
                   <div className="flex flex-col md:flex-row gap-12 font-sans font-light">
                      <div className="flex-1">
                         {item.logo && (
                            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 shrink-0 rounded-full border border-border bg-white overflow-hidden flex items-center justify-center p-2">
                               <Image src={item.logo} alt={item.company} fill className="object-contain p-2" />
                            </div>
                         )}
                         <p className="max-w-2xl leading-relaxed mb-8">{item.description}</p>
                         <div className="text-xs font-sans opacity-70 border border-border inline-block px-3 py-1.5 rounded-full uppercase tracking-wider">{item.period}</div>
                      </div>
                      {item.image && (
                        <div className="w-full md:w-2/5 shrink-0 rounded-xl overflow-hidden aspect-[4/3] relative border border-border">
                           <Image src={item.image} alt={item.role} fill className="object-cover hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>
                      )}
                   </div>
                </AccordionContent>
             </AccordionItem>
          ))}
        </Accordion>
      </ScrollSection>
    </section>
  )
}
