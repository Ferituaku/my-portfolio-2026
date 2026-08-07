'use client'

import { Footer } from "@/components/sections/Footer"
import { ScrollSection } from "@/components/ui/ScrollSection"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Send, CheckCircle2, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [activeField, setActiveField] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  // Interactive Particle System react-effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener("resize", handleResize)

    // Particle class definition
    class Particle {
      x: number
      y: number
      targetX: number
      targetY: number
      vx: number
      vy: number
      radius: number
      color: string
      baseX: number
      baseY: number
      angle: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.baseX = this.x
        this.baseY = this.y
        this.targetX = this.x
        this.targetY = this.y
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.radius = Math.random() * 2 + 1
        this.color = "rgba(255, 255, 255, 0.2)"
        this.angle = Math.random() * Math.PI * 2
      }

      update(mouse: { x: number; y: number }, activeField: string | null) {
        this.angle += 0.02

        // Behavior depends on focused input field
        if (activeField === "name") {
          // Circular orbit around mouse
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const force = (180 - dist) / 180
            const orbitSpeed = 2
            this.x -= (dy / (dist || 1)) * orbitSpeed * force
            this.y += (dx / (dist || 1)) * orbitSpeed * force
          }
          // Drift back to baseline
          this.x += (this.baseX - this.x) * 0.02
          this.y += (this.baseY - this.y) * 0.02
        } else if (activeField === "email") {
          // Grid convergence pattern
          const gridCol = Math.floor(this.baseX / 40) * 40
          const gridRow = Math.floor(this.baseY / 40) * 40
          this.x += (gridCol - this.x) * 0.1
          this.y += (gridRow - this.y) * 0.1
        } else if (activeField === "message") {
          // Flowing sine waves
          this.x += this.vx * 1.2
          this.y = this.baseY + Math.sin(this.angle + this.x * 0.01) * 30
          if (this.x < 0 || this.x > width) this.vx *= -1
        } else {
          // Standard organic drifting & magnetic repulsion
          this.x += this.vx
          this.y += this.vy

          // Boundaries
          if (this.x < 0 || this.x > width) this.vx *= -1
          if (this.y < 0 || this.y > height) this.vy *= -1

          // Mouse push force
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const force = (100 - dist) / 100
            this.x += (dx / (dist || 1)) * force * 5
            this.y += (dy / (dist || 1)) * force * 5
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
      }
    }

    // Initialize particles
    const particleCount = 120
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw interactive connections
      ctx.strokeStyle = activeField === "email" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)"
      ctx.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse, activeField)
        particles[i].draw(ctx)

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 75) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeField])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 4000)
  }

  return (
    <>
      <main className="relative z-10 bg-black text-white min-h-[100dvh] pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-[calc(12rem+env(safe-area-inset-bottom,0px))] shadow-2xl shadow-black mb-[50dvh]">
        
        {/* Interactive Canvas Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <ScrollSection className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
             <motion.span 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 0.5, y: 0 }}
               transition={{ duration: 0.6 }}
               className="text-xs font-mono uppercase tracking-[0.3em] block mb-4"
             >
               05 / Contact
             </motion.span>
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-tight leading-none uppercase"
             >
               Let's create <br />
               <span className="italic font-normal text-muted-foreground">something bold</span>
             </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-12 lg:gap-24 max-w-6xl mx-auto items-start">
            
            {/* Info Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12 lg:pr-8"
            >
              <div className="space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">Collabs & Inquiries</h2>
                <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white/80">
                  Currently open to full-time engineering opportunities, freelance projects, and creative collaborations. Let's build something state-of-the-art.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Send an Email</h3>
                  <a href="mailto:alferroputra1313@gmail.com" className="text-lg md:text-xl font-medium hover:text-white/60 transition-colors block break-all">
                    alferroputra1313@gmail.com
                  </a>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Call Directly</h3>
                  <a href="tel:+6287745494074" className="text-lg md:text-xl font-medium hover:text-white/60 transition-colors block">
                    +62 877 4549 4074
                  </a>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Social Coordinates</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium uppercase tracking-widest">
                   <a href="https://linkedin.com/in/al-ferro-putra-yusanda" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline underline-offset-4 decoration-white/30">LinkedIn</a>
                   <a href="https://github.com/Ferituaku" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline underline-offset-4 decoration-white/30">GitHub</a>
                   <a href="#" className="hover:text-white/60 transition-colors underline underline-offset-4 decoration-white/30">Instagram</a>
                </div>
              </div>
            </motion.div>

            {/* Interactive Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-[#0e0e0e]/90 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
               <AnimatePresence mode="wait">
                 {!isSubmitted ? (
                   <motion.div
                     key="form"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="space-y-8"
                   >
                     <h3 className="text-lg font-serif uppercase tracking-wider">Drop a line</h3>
                     
                     <form className="space-y-6" onSubmit={handleSubmit}>
                       {/* Name Input */}
                       <div className="relative group">
                         <input 
                           type="text" 
                           id="name" 
                           value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           onFocus={() => setActiveField("name")}
                           onBlur={() => setActiveField(null)}
                           required
                           className="w-full bg-transparent border-b border-white/20 py-4 text-sm font-sans focus:outline-none focus:border-white transition-colors peer"
                           placeholder=" "
                         />
                         <label 
                           htmlFor="name" 
                           className="absolute left-0 top-4 text-xs font-mono uppercase tracking-widest text-muted-foreground/60 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
                         >
                           Your Name
                         </label>
                       </div>

                       {/* Email Input */}
                       <div className="relative group">
                         <input 
                           type="email" 
                           id="email" 
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           onFocus={() => setActiveField("email")}
                           onBlur={() => setActiveField(null)}
                           required
                           className="w-full bg-transparent border-b border-white/20 py-4 text-sm font-sans focus:outline-none focus:border-white transition-colors peer"
                           placeholder=" "
                         />
                         <label 
                           htmlFor="email" 
                           className="absolute left-0 top-4 text-xs font-mono uppercase tracking-widest text-muted-foreground/60 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
                         >
                           Email Address
                         </label>
                       </div>

                       {/* Message Input */}
                       <div className="relative group">
                         <textarea 
                           id="message" 
                           value={formData.message}
                           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                           onFocus={() => setActiveField("message")}
                           onBlur={() => setActiveField(null)}
                           required
                           rows={4}
                           className="w-full bg-transparent border-b border-white/20 py-4 text-sm font-sans focus:outline-none focus:border-white transition-colors resize-none peer"
                           placeholder=" "
                         />
                         <label 
                           htmlFor="message" 
                           className="absolute left-0 top-4 text-xs font-mono uppercase tracking-widest text-muted-foreground/60 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white"
                         >
                           Project Summary
                         </label>
                       </div>

                       {/* Submit Button */}
                       <button 
                         type="submit"
                         className="w-full group/btn h-14 rounded-full bg-white text-black font-sans uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors mt-8"
                       >
                         Send Inquiry
                         <Send size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                     </form>
                   </motion.div>
                 ) : (
                   <motion.div
                     key="success"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="py-16 text-center space-y-6"
                   >
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white border border-white/20 mb-4">
                       <CheckCircle2 size={32} />
                     </div>
                     <h3 className="text-2xl font-serif">Message Received</h3>
                     <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xs mx-auto">
                       Thank you for reaching out, {formData.name}! I will review your details and respond within 24 hours.
                     </p>
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>

          </div>
        </ScrollSection>
      </main>
      <Footer />
    </>
  )
}
