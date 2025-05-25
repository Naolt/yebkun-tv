"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioData: Uint8Array | null;
  isPlaying: boolean;
}

export default function AudioVisualizer({ audioData, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioData || audioData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    const centerY = rect.height / 2;
    const barSpacing = 5; // Increase this for more space
    const barWidth = (rect.width / audioData.length) * 0.8;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
    gradient.addColorStop(0, "#6366f1");
    gradient.addColorStop(0.3, "#ec4899");
    gradient.addColorStop(0.6, "#f97316");
    gradient.addColorStop(1, "#22c55e");

    // Draw bars
    let x = 0;
    for (let i = 0; i < audioData.length; i += 1) {
      const value = audioData[i];
      const barHeight = (value / 255) * rect.height;

      ctx.fillStyle = gradient;
      ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);

      x += barWidth + barSpacing;
    }
  }, [audioData, isPlaying]);

  return <canvas ref={canvasRef} className="w-full h-32" />;
}
