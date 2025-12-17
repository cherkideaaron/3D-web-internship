"use client"

import { useEffect, useRef } from "react"

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      size: number
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Setup canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(document.body)

    const particleCount = 200
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * Math.max(document.documentElement.scrollHeight, window.innerHeight),
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
    }))

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (200 - dist) / 200
          particle.vx -= (dx / dist) * force * 0.3
          particle.vy -= (dy / dist) * force * 0.3
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const scale = 1000 / (1000 + particle.z)
        const opacity = 0.4 + scale * 0.6

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`
        ctx.fill()

        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - distance / 150) * 0.25})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      resizeObserver.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{
        background: "linear-gradient(to bottom, #000000, #0a0a0a)",
        zIndex: 0,
      }}
    />
  )
}
