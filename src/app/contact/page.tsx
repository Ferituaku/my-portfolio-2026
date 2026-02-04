'use client'

import { Footer } from "@/components/sections/Footer"
import { ScrollSection } from "@/components/ui/ScrollSection"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <>
      <main className="relative z-10 bg-background min-h-[100vh] pt-32 shadow-2xl shadow-black mb-[50vh]">
        <ScrollSection className="container mx-auto px-6 md:px-12">
           <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter text-center uppercase mb-16 opacity-90">
             Get in Touch
           </h1>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
             
             {/* Text Content */}
             <div className="space-y-8">
               <div className="space-y-4">
                 <h2 className="text-xl font-mono uppercase tracking-widest opacity-50">Collaboration</h2>
                 <p className="text-2xl md:text-3xl font-light text-muted-foreground">
                   Interested in working together? I'm currently available for freelance projects and open to full-time opportunities.
                 </p>
               </div>
               
               <div className="space-y-4">
                 <h2 className="text-xl font-mono uppercase tracking-widest opacity-50">Contact Details</h2>
                 <div className="flex flex-col gap-2 text-xl md:text-2xl font-medium">
                   <a href="mailto:contact@alferro.com" className="hover:opacity-50 transition-opacity">ferismegg123@gmail.com</a>
                   <a href="tel:+6287745494074" className="hover:opacity-50 transition-opacity">+62 877 4</a>
                 </div>
               </div>

               <div className="space-y-4">
                 <h2 className="text-xl font-mono uppercase tracking-widest opacity-50">Socials</h2>
                 <div className="flex flex-wrap gap-4 text-xl md:text-2xl font-medium">
                    <a href="#" className="hover:opacity-50 transition-opacity underline decoration-1 underline-offset-4">LinkedIn</a>
                    <a href="#" className="hover:opacity-50 transition-opacity underline decoration-1 underline-offset-4">GitHub</a>
                    <a href="#" className="hover:opacity-50 transition-opacity underline decoration-1 underline-offset-4">Instagram</a>
                 </div>
               </div>
             </div>

             {/* Simple Form or Visual */}
             <div className="bg-muted p-8 md:p-12 rounded-xl border border-border mb-10">
                <h3 className="text-2xl font-bold uppercase mb-8">Send a Message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-mono uppercase opacity-70">Name</label>
                    <input type="text" id="name" className="w-full bg-background border border-border p-4 rounded-md focus:outline-none focus:ring-1 focus:ring-white/50 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-mono uppercase opacity-70">Email</label>
                    <input type="email" id="email" className="w-full bg-background border border-border p-4 rounded-md focus:outline-none focus:ring-1 focus:ring-white/50 transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-mono uppercase opacity-70">Message</label>
                    <textarea id="message" rows={4} className="w-full bg-background border border-border p-4 rounded-md focus:outline-none focus:ring-1 focus:ring-white/50 transition-all resize-none" placeholder="Hello..." />
                  </div>
                  <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-gray-200 transition-colors">
                    Send Request
                  </button>
                </form>
             </div>

           </div>
        </ScrollSection>
      </main>
      <Footer />
    </>
  )
}
