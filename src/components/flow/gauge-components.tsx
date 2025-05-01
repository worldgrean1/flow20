import { cn } from "../../lib/utils"

// Circular Gauge Component for displaying values in a circular visualization
export function CircularGauge({ 
  value, 
  max = 100, 
  size = 40, 
  color = "text-lime-400",
  label,
  warning = false
}: { 
  value: number
  max?: number
  size?: number
  color?: string
  label: string
  warning?: boolean
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percentage * circumference) / 100;
  
  return (
    <div className={cn(
      "flex flex-col items-center p-2 bg-slate-800/90 border rounded-md shadow-inner",
      warning ? "border-red-500/30 animate-pulse" : "border-slate-700/50"
    )}>
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            className={color}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={cn("text-sm font-medium tabular-nums", color)}>
            {Math.round(value)}
          </span>
        </div>
      </div>
      <span className="mt-1 text-xs text-slate-400 text-center">{label}</span>
    </div>
  )
} 