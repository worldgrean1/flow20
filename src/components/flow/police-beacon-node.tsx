import { Handle, Position, type NodeProps } from "reactflow"
import { useState, useEffect, useRef } from "react"
import { AlertTriangle } from "lucide-react"
import { cn } from "../../lib/utils"

// Import CSS for animations
import "./police-beacon-animations.css"

export interface PoliceBeaconData {
  isActive: boolean
  enableSound?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  onToggleSound?: () => void
}

export interface PoliceBeaconNodeProps extends NodeProps<PoliceBeaconData> {}

const PoliceBeaconNode = ({ data, selected }: PoliceBeaconNodeProps) => {
  const { 
    isActive = false, 
    enableSound = false, 
    label = "⚠️ DANGER", 
    size = 'md',
    onToggleSound 
  } = data || {}
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [soundPlaying, setSoundPlaying] = useState(false)
  
  // Size mappings based on the size prop
  const sizeClasses = {
    sm: {
      container: "w-20 h-20",
      light: "w-10 h-10",
      label: "text-xs",
    },
    md: {
      container: "w-28 h-28",
      light: "w-14 h-14",
      label: "text-sm",
    },
    lg: {
      container: "w-36 h-36",
      light: "w-18 h-18",
      label: "text-base",
    },
  }
  
  // Handle audio playback when active state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isActive && enableSound && !soundPlaying) {
        audioRef.current.play()
        setSoundPlaying(true)
      } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setSoundPlaying(false)
      }
    }
  }, [isActive, enableSound, soundPlaying])
  
  // Toggle sound when the button is clicked
  const handleToggleSound = () => {
    if (onToggleSound) {
      onToggleSound()
    }
  }
  
  return (
    <div className={cn(
      "relative flex flex-col items-center justify-center rounded-xl border transition-all duration-300",
      selected ? "border-blue-500" : "border-slate-600",
      sizeClasses[size].container
    )}>
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          background: "#ef4444",
          width: "12px",
          height: "12px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
        }}
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: "#22c55e",
          width: "12px",
          height: "12px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(34, 197, 94, 0.5)",
        }}
      />
      
      {/* Police beacon light */}
      <div className="relative">
        {/* Light base */}
        <div className="absolute left-1/2 bottom-0 w-12 h-3 bg-slate-700 rounded-sm -translate-x-1/2"></div>
        
        {/* Main light dome */}
        <div 
          className={cn(
            "relative rounded-full bg-slate-300/20 border border-slate-400 overflow-hidden flex items-center justify-center transition-all duration-300",
            sizeClasses[size].light,
            isActive ? "police-light-active" : "opacity-40"
          )}
        >
          {/* Rotating light colored element */}
          <div 
            className={cn(
              "absolute inset-1 rounded-full",
              isActive ? "police-light-color-rotate" : "bg-slate-400"
            )}
          >
            {/* Light patterns/ribs */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 -translate-x-1/2"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
          
          {/* Inner reflector */}
          <div 
            className={cn(
              "absolute w-1/2 h-1/2 rounded-full bg-white/30",
              isActive && "police-light-reflector"
            )}
          ></div>
          
          {/* Outer glow effect */}
          {isActive && (
            <div className="absolute inset-0 police-light-glow"></div>
          )}
        </div>
      </div>
      
      {/* Warning label */}
      <div className={cn(
        "mt-2 font-bold text-center",
        sizeClasses[size].label,
        isActive ? "text-red-500" : "text-slate-400"
      )}>
        {label}
      </div>
      
      {/* Sound toggle button */}
      {enableSound && (
        <button
          onClick={handleToggleSound}
          className={cn(
            "absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center transition-colors",
            soundPlaying ? "bg-green-500 hover:bg-green-600" : "bg-slate-500 hover:bg-slate-600"
          )}
          title={soundPlaying ? "Mute siren" : "Unmute siren"}
        >
          <span className="text-[8px] text-white">
            {soundPlaying ? "🔊" : "🔇"}
          </span>
        </button>
      )}
      
      {/* Hidden audio element for siren sound */}
      {enableSound && (
        <audio
          ref={audioRef}
          src="/sounds/police-siren.mp3"
          loop
        />
      )}
    </div>
  )
}

export default PoliceBeaconNode 