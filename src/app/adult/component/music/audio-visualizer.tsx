"use client"

import { useRef, useEffect } from "react"

interface AudioVisualizerProps {
  audioData: Uint8Array | null
  isPlaying: boolean
}

export default function AudioVisualizer({ audioData, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !audioData || audioData.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
    gradient.addColorStop(0, "#6366f1") // Indigo
    gradient.addColorStop(0.2, "#ec4899") // Pink
    gradient.addColorStop(0.4, "#ef4444") // Red
    gradient.addColorStop(0.6, "#f97316") // Orange
    gradient.addColorStop(0.8, "#eab308") // Yellow
    gradient.addColorStop(1, "#22c55e") // Green

    // Draw visualization
    const centerY = rect.height / 2
    const sliceWidth = rect.width / audioData.length

    // Draw the waveform
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = gradient

    if (!isPlaying) {
      // If not playing, draw a flat line with some noise
      for (let i = 0; i < audioData.length; i++) {
        const x = i * sliceWidth
        const y = centerY + (Math.random() * 5 - 2.5)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
    } else {
      // When playing, use the actual audio data
      let lastX = 0
      let lastY = centerY

      // Process the audio data to create a smoother, more visually appealing waveform
      for (let i = 0; i < audioData.length; i += 2) {
        // Convert the data to a value between -1 and 1
        const normalizedData = audioData[i] / 128.0 - 1

        // Scale the waveform
        const scaleFactor = 0.8
        const y = centerY + normalizedData * centerY * scaleFactor
        const x = i * sliceWidth

        // Create a smooth curve
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          // Use quadratic curves for smoother visualization
          const cpX = (lastX + x) / 2
          ctx.quadraticCurveTo(cpX, lastY, x, y)
        }

        lastX = x
        lastY = y

        // Add dots at significant amplitude changes
        if (Math.abs(normalizedData) > 0.5 && i % 16 === 0) {
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    ctx.stroke()

    // Add a subtle glow effect
    if (isPlaying) {
      ctx.save()
      ctx.filter = "blur(4px)"
      ctx.globalAlpha = 0.4
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
    }
  }, [audioData, isPlaying])

  return <canvas ref={canvasRef} className="w-full h-32" />
}
