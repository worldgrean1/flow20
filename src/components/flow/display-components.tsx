import { cn } from "../../lib/utils"

// Digital Screen Component for displaying values with units
export function DigitalScreen({ 
  value, 
  unit, 
  label, 
  color = "text-lime-400",
  warning = false
}: { 
  value: number | string
  unit: string
  label: string
  color?: string
  warning?: boolean
}) {
  return (
    <div className={cn(
      "flex flex-col gap-1 p-2 bg-slate-800/90 border rounded-md shadow-inner",
      warning ? "border-red-500/30 animate-pulse" : "border-slate-700/50"
    )}>
      <div className="flex items-end justify-between">
        <span className="text-xs text-slate-400 truncate max-w-[70%]">{label}</span>
        <div className={cn(
          "flex items-baseline gap-1", 
          color
        )}>
          <span className="text-lg font-mono font-bold tabular-nums">{value}</span>
          <span className="text-xs opacity-80">{unit}</span>
        </div>
      </div>
    </div>
  )
} 