import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MapOverlayProps {
  isActive?: boolean
}

export function MapOverlay({ isActive = false }: MapOverlayProps) {
  const [points, setPoints] = useState<Array<{ x: number; y: number; size: number; active: boolean }>>([])

  useEffect(() => {
    // Generate grid points
    const newPoints = []
    const gridSize = 10
    const spacing = 100 / (gridSize - 1)

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        newPoints.push({
          x: j * spacing,
          y: i * spacing,
          size: 2 + Math.random() * 2,
          active: Math.random() > 0.3,
        })
      }
    }
    setPoints(newPoints)
  }, [])

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-lg overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Connection points */}
      {points.map((point, index) => (
        <div
          key={index}
          className={cn(
            "absolute rounded-full transition-all duration-500",
            point.active && isActive ? "bg-green-400" : "bg-slate-600",
          )}
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Active overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isActive ? "opacity-20" : "opacity-0",
        )}
        style={{
          background: "radial-gradient(circle at center, #22c55e 0%, transparent 70%)",
        }}
      />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {points.map((point, index) => {
          if (!point.active || !isActive) return null
          const nextPoint = points[index + 1]
          if (!nextPoint?.active) return null

          return (
            <line
              key={index}
              x1={`${point.x}%`}
              y1={`${point.y}%`}
              x2={`${nextPoint.x}%`}
              y2={`${nextPoint.y}%`}
              stroke="#22c55e"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          )
        })}
      </svg>
    </div>
  )
}