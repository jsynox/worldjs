"use client"

import { useEffect, useRef } from "react"

export default function MapOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Simple world map outline
    const drawMap = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Draw some basic continent shapes (simplified)
      ctx.beginPath()
      ctx.moveTo(0.1 * canvas.width, 0.3 * canvas.height)
      ctx.lineTo(0.3 * canvas.width, 0.4 * canvas.height)
      ctx.lineTo(0.2 * canvas.width, 0.6 * canvas.height)
      ctx.lineTo(0.4 * canvas.width, 0.8 * canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0.5 * canvas.width, 0.2 * canvas.height)
      ctx.lineTo(0.7 * canvas.width, 0.3 * canvas.height)
      ctx.lineTo(0.6 * canvas.width, 0.6 * canvas.height)
      ctx.lineTo(0.8 * canvas.width, 0.7 * canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0.8 * canvas.width, 0.8 * canvas.height, 0.1 * canvas.width, 0, Math.PI * 2)
      ctx.stroke()
    }

    drawMap()

    return () => {
      // Clean up if necessary
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />
}

