"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

export default function KanjiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const parent = canvas.parentElement
    if (parent) {
      canvas.width = parent.clientWidth - 32 // Adjust for padding
      canvas.height = 300
    }

    // Get context
    const context = canvas.getContext("2d")
    if (context) {
      context.lineWidth = 8
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = "#000"
      setCtx(context)
    }

    // Clear canvas initially
    clearCanvas()
  }, [])

  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)

    if (!ctx) return

    // Get coordinates
    let x, y
    if ("touches" in e) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    // Get coordinates
    let x, y
    if ("touches" in e) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing || !ctx) return

    ctx.closePath()
    setIsDrawing(false)
  }

  const downloadAsPNG = () => {
    if (!canvasRef.current) return

    const dataUrl = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "kanji-drawing.png"
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-4">
        <canvas
          ref={canvasRef}
          className="border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={clearCanvas}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <Button variant="outline" size="sm" onClick={downloadAsPNG}>
          <Download className="h-4 w-4 mr-2" />
          Save as PNG
        </Button>
      </div>
    </div>
  )
}

