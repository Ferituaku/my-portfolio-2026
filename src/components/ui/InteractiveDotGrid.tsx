'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  originX: number
  originY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
  alpha: number
}

interface InteractiveDotGridProps {
  dotSpacing?: number
  dotRadius?: number
  repelRadius?: number
  repelStrength?: number
  returnSpeed?: number
  damping?: number
  className?: string
}

export function InteractiveDotGrid({
  dotSpacing = 28,
  dotRadius = 1.1,
  repelRadius = 65,
  repelStrength = 15,
  returnSpeed = 0.1,
  damping = 0.8,
  className = '',
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let dots: Dot[] = []
    let mouse = { x: -9999, y: -9999, isHovering: false }

    const initDots = (width: number, height: number) => {
      dots = []
      const cols = Math.floor(width / dotSpacing)
      const rows = Math.floor(height / dotSpacing)

      const startX = (width - cols * dotSpacing) / 2 + dotSpacing / 2
      const startY = (height - rows * dotSpacing) / 2 + dotSpacing / 2

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const originX = startX + c * dotSpacing
          const originY = startY + r * dotSpacing
          dots.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            radius: dotRadius,
            baseAlpha: 0.18,
            alpha: 0.18,
          })
        }
      }
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = parent.clientWidth
      const height = parent.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      initDots(width, height)
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.isHovering = true
    }

    const handlePointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
      mouse.isHovering = false
    }

    const render = () => {
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2))
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2))

      ctx.clearRect(0, 0, width, height)

      // Detect if dark mode or light mode to render appropriate dot color
      const isDark = document.documentElement.classList.contains('dark')
      const dotColorRGB = isDark ? '255, 255, 255' : '0, 0, 0'

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Physics: calculate distance to cursor
        const dx = dot.x - mouse.x
        const dy = dot.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < repelRadius && dist > 0) {
          // Repulsion force: push away from cursor ("pecah" scattering effect)
          const force = (1 - dist / repelRadius) * repelStrength
          const angle = Math.atan2(dy, dx)
          dot.vx += Math.cos(angle) * force
          dot.vy += Math.sin(angle) * force
          // Increase opacity and size subtly when scattered
          dot.alpha = Math.min(dot.baseAlpha * 3, 0.6)
        } else {
          // Fade back to normal opacity
          dot.alpha += (dot.baseAlpha - dot.alpha) * 0.05
        }

        // Return force (spring towards original grid position)
        const springX = (dot.originX - dot.x) * returnSpeed
        const springY = (dot.originY - dot.y) * returnSpeed

        dot.vx += springX
        dot.vy += springY
        dot.vx *= damping
        dot.vy *= damping

        dot.x += dot.vx
        dot.y += dot.vy

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColorRGB}, ${dot.alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('pointermove', handlePointerMove)
      parent.addEventListener('pointerleave', handlePointerLeave)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      if (parent) {
        parent.removeEventListener('pointermove', handlePointerMove)
        parent.removeEventListener('pointerleave', handlePointerLeave)
      }
    }
  }, [dotSpacing, dotRadius, repelRadius, repelStrength, returnSpeed, damping])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_120px,black_calc(100%-100px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_120px,black_calc(100%-100px),transparent_100%)] ${className}`}
    />
  )
}

