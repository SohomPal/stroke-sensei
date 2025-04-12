"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Check } from "lucide-react"

export default function KanjiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [recognizedCharacter, setRecognizedCharacter] = useState<string | null>(null)

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
      setRecognizedCharacter(null)
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

  const onSubmit = async () => {
    if (!canvasRef.current) return;
  
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
  
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;
  
    const grayscale: number[][] = [];
  
    for (let y = 0; y < height; y++) {
      const row: number[] = [];
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
  
        // Convert to grayscale and normalize to [0, 1]
        const gray = (r + g + b) / 3 / 255;
        row.push(gray);
      }
      grayscale.push(row);
    }
  
    // Ensure the input is a 28x28 image. You might need to resize the canvas or the image data.
    // Resize the grayscale image data to 28x28 if needed.
    const resizedGrayscale = resizeImage(grayscale, 28, 28);

    const response = await fetch(`/api/detectCharacter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: resizedGrayscale }),
    });
  
    const result = await response.json();
  
    if (result.error) {
      console.error("Error:", result.error);
      return;
    }
  
    const prediction = result.prediction;
    setRecognizedCharacter(prediction[0]);
    console.log("Recognized character:", prediction[0]);
};

// Function to resize the grayscale image data to 28x28
const resizeImage = (input: number[][], targetWidth: number, targetHeight: number): number[][] => {
  const resized: number[][] = [];
  const height = input.length;
  const width = input[0].length;

  for (let y = 0; y < targetHeight; y++) {
    const row: number[] = [];
    for (let x = 0; x < targetWidth; x++) {
      const srcY = Math.floor((y / targetHeight) * height);
      const srcX = Math.floor((x / targetWidth) * width);
      row.push(input[srcY][srcX]);
    }
    resized.push(row);
  }

  return resized;
};

  

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
        <Button variant="outline" size="sm" onClick={onSubmit}>
          <Check className="h-4 w-4 mr-2" />
          Submit
        </Button>
      </div>

      {recognizedCharacter && (
        <div className="mt-4 text-center">
          <p className="text-lg">
            You drew: <span className="text-2xl font-bold">{recognizedCharacter}</span>
          </p>
        </div>
      )}
    </div>
  )
}
