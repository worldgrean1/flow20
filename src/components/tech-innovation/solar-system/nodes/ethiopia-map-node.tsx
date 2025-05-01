"use client"
import type { NodeProps } from "reactflow"
import { Handle, Position } from "reactflow"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import "@/styles/weather-animations.css"

interface RegionState {
  id: string
  name: string
  position: { x: number; y: number }
  status: "active" | "warning" | "offline"
  batteryLevel: number
  solarOutput: number
}

interface EthiopiaMapData {
  regions: RegionState[]
  selectedRegion: string | null
  showRegionalData: boolean
  onRegionSelect: (regionId: string) => void
  onToggleRegionalData: () => void
  isConnected?: boolean
  weatherCondition?: "sunny" | "cloudy" | "rainy"
  efficiency?: number
  t: (key: string) => string
}

function EthiopiaMapNode({ data }: NodeProps<EthiopiaMapData>) {
  const { t } = data
  const [animate, setAnimate] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(0.6)
  const [weatherEffects, setWeatherEffects] = useState<JSX.Element[]>([])
  const efficiency = data.efficiency || 100

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Animate pulse intensity for connected regions
  useEffect(() => {
    if (!data.isConnected) return

    const interval = setInterval(() => {
      setPulseIntensity((prev) => (prev === 0.6 ? 1 : 0.6))
    }, 2000)

    return () => clearInterval(interval)
  }, [data.isConnected])

  // Generate weather effect particles
  useEffect(() => {
    const weather = data.weatherCondition || "sunny"
    const effects: JSX.Element[] = []

    switch (weather) {
      case "sunny":
        // Sun in the sky
        effects.push(
          <div key="sun" className="sun-particle"></div>
        )
        // Sun rays
        for (let i = 0; i < 12; i++) {
          const angle = (i * 30) * (Math.PI / 180)
          const distance = 40
          const x = Math.cos(angle) * distance
          const y = Math.sin(angle) * distance
          
          effects.push(
            <div
              key={`ray-${i}`}
              className="sun-ray"
              style={{
                left: `calc(30px + ${x}px)`,
                top: `calc(30px + ${y}px)`,
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          )
        }
        break

      case "cloudy":
        // Cloud particles floating across
        for (let i = 0; i < 8; i++) {
          const size = 30 + Math.random() * 40
          const opacity = 0.4 + Math.random() * 0.3
          
          effects.push(
            <div
              key={`cloud-${i}`}
              className="cloud-particle"
              style={{
                width: `${size}px`,
                height: `${size * 0.6}px`,
                top: `${20 + Math.random() * 50}px`,
                left: `${Math.random() * 100}%`,
                opacity,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 10}s`,
                background: `radial-gradient(circle, rgba(255,255,255,${opacity}), rgba(200,200,200,${opacity * 0.7}))`,
                borderRadius: '50%',
                filter: 'blur(3px)'
              }}
            ></div>
          )
        }
        break

      case "rainy":
        // Raindrops falling
        for (let i = 0; i < 50; i++) {
          const height = 5 + Math.random() * 15
          
          effects.push(
            <div
              key={`rain-${i}`}
              className="rain-drop"
              style={{
                height: `${height}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -100}%`,
                opacity: 0.6 + Math.random() * 0.4,
                animationDuration: `${0.5 + Math.random()}s`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            ></div>
          )
        }
        break
    }

    setWeatherEffects(effects)
  }, [data.weatherCondition])

  // Determine the glow color based on connection state
  const glowColor = data.isConnected ? "rgba(132, 204, 22, 0.6)" : "rgba(100, 116, 139, 0.3)"
  const glowIntensity = data.isConnected ? "8px" : "3px"

  // Get map filter based on weather condition and efficiency
  const getMapFilter = () => {
    if (!data.isConnected) return "drop-shadow(0 0 5px rgba(100, 116, 139, 0.3))"
    
    const weather = data.weatherCondition || "sunny"
    const efficiencyFactor = efficiency / 100
    
    switch (weather) {
      case "sunny":
        return `drop-shadow(0 0 10px rgba(132, 204, 22, ${0.4 * efficiencyFactor})) brightness(${2 + efficiencyFactor}) contrast(${1.2 + (efficiencyFactor * 0.2)})`
      case "cloudy":
        return `drop-shadow(0 0 8px rgba(132, 204, 22, ${0.3 * efficiencyFactor})) brightness(${1.5 + (efficiencyFactor * 0.5)}) contrast(${1.1 + (efficiencyFactor * 0.1)})`
      case "rainy":
        return `drop-shadow(0 0 6px rgba(132, 204, 22, ${0.2 * efficiencyFactor})) brightness(${1.2 + (efficiencyFactor * 0.3)}) contrast(${1 + (efficiencyFactor * 0.1)})`
    }
  }

  // Get region activity based on weather and efficiency
  const getRegionActivity = (status: "active" | "warning" | "offline") => {
    const weather = data.weatherCondition || "sunny"
    
    if (status === "offline") return "none"
    
    // No pulsing if efficiency is too low
    if (efficiency < 30) return "none"
    
    switch (weather) {
      case "sunny":
        return status === "active" ? "pulse 2s infinite" : "none"
      case "cloudy":
        return status === "active" ? "pulse 3s infinite" : "none"
      case "rainy":
        return "none" // All regions stop pulsing in rainy weather
    }
  }

  // Get weather status text
  const getWeatherStatusText = () => {
    const weather = data.weatherCondition || "sunny"
    switch (weather) {
      case "sunny":
        return t("Optimal Generation")
      case "cloudy":
        return t("Reduced Output")
      case "rainy":
        return t("Minimal Generation")
    }
  }

  // Get solar output based on weather and efficiency
  const getSolarOutput = () => {
    const weather = data.weatherCondition || "sunny"
    const effValue = efficiency
    
    // Calculate range based on weather condition and efficiency
    switch (weather) {
      case "sunny": 
        return `${Math.round(80 * effValue/100)}-${Math.round(100 * effValue/100)}%`
      case "cloudy": 
        return `${Math.round(40 * effValue/100)}-${Math.round(60 * effValue/100)}%`
      case "rainy":
        if (effValue < 30) return "0%" // OFF when efficiency too low in rainy weather
        return `${Math.round(10 * effValue/100)}-${Math.round(30 * effValue/100)}%`
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Input handle for connection */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          background: "#ef4444",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
        }}
        isConnectable={true}
      />

      <div
        className={cn(
          "p-4 rounded-lg transition-all duration-500 transform hover:scale-105 relative",
          data.isConnected ? "border-lime-500" : "",
          animate ? "scale-105" : "scale-100",
        )}
        style={{
          boxShadow: `0 0 ${glowIntensity} ${glowColor}, inset 0 0 ${glowIntensity} ${glowColor}`,
          transition: "box-shadow 0.5s ease-in-out, transform 0.3s ease-out",
          backgroundColor: "transparent",
          border: "none"
        }}
      >
        {/* Enhanced pulsing effect when connected */}
        {data.isConnected && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle, rgba(132, 204, 22, ${pulseIntensity * 0.2}) 0%, rgba(132, 204, 22, 0) 70%)`,
              transition: "background 1.5s ease-in-out",
            }}
          ></div>
        )}

        {/* Title at top of component */}
        <h3 className="text-white text-sm font-medium mb-3 flex items-center justify-between">
          <span className="flex items-center">
            <span className={cn(
              "w-3 h-3 rounded-full mr-2",
              data.isConnected ? "bg-lime-500 animate-pulse" : "bg-slate-500"
            )}></span>
            {t("Ethiopia Solar Network")}
          </span>
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full transition-colors",
              data.isConnected ? "bg-lime-600/30 text-lime-400" : "bg-slate-700/30 text-slate-400",
            )}
          >
            {data.isConnected ? t("ONLINE") : t("OFFLINE")}
          </span>
        </h3>

        {/* Weather indicator */}
        {data.weatherCondition && data.isConnected && (
          <div className="mb-2 text-center">
            <span className="text-xs text-slate-300">
              {t("Weather")}:&nbsp;
              <span className={cn(
                "font-medium",
                data.weatherCondition === "sunny" ? "text-yellow-300" : 
                data.weatherCondition === "cloudy" ? "text-slate-300" : "text-blue-300"
              )}>
                {t(data.weatherCondition.charAt(0).toUpperCase() + data.weatherCondition.slice(1))}
              </span>
              &nbsp;•&nbsp;
              <span className={cn(
                "text-lime-400",
                efficiency < 30 && data.weatherCondition === "rainy" ? "text-red-400" : ""
              )}>
                {getSolarOutput()}
              </span>
              {efficiency < 100 && (
                <span className="ml-1 text-slate-400">
                  ({efficiency}% {t("efficiency")})
                </span>
              )}
            </span>
          </div>
        )}

        {/* Ethiopia Map shaped container */}
        <div className="relative w-[320px] h-[300px] mx-auto perspective-[800px]">
          {/* Weather effects container */}
          <div className="weather-container">
            {weatherEffects}
          </div>

          {/* Shape container with 3D effect */}
          <div className="w-full h-full flex items-center justify-center">
            {/* Map shaped background with content inside */}
            <div className="relative w-[270px] h-[270px]">
              {/* Glowing background for the map */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: data.isConnected 
                    ? "radial-gradient(circle, rgba(132, 204, 22, 0.15) 0%, rgba(15, 23, 42, 0) 70%)" 
                    : "none",
                  filter: "blur(15px)",
                  opacity: 0.8,
                  transform: "scale(1.1)",
                }}
              />
              
              {/* Ethiopia map as container shape */}
              <div className="relative h-full w-full flex flex-col items-center justify-center">
                {/* Map background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/etmap/ethiopia-map.png"
                    alt="Ethiopia Map"
                    className="w-[250px] h-auto opacity-90 transition-all duration-500"
                    style={{
                      filter: getMapFilter(),
                    }}
                  />
                </div>
                
                {/* Inner content positioned relative to map */}
                <div className="absolute inset-0 flex flex-col p-5">
                  {/* Region markers positioned on appropriate locations */}
                  <button
                    className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-green-500"
                    aria-label="Addis Ababa region"
                    style={{
                      left: "45%",
                      top: "55%",
                      animation: getRegionActivity("active"),
                      boxShadow: "0 0 10px rgba(132, 204, 22, 0.8)",
                      zIndex: 20
                    }}
                    onClick={() => data.onRegionSelect("addis-ababa")}
                  ></button>
                  <button
                    className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-yellow-500"
                    aria-label="Tigray region" 
                    style={{
                      left: "35%",
                      top: "25%",
                      animation: getRegionActivity("warning"),
                      boxShadow: "none",
                      zIndex: 20
                    }}
                    onClick={() => data.onRegionSelect("tigray")}
                  ></button>
                  <button
                    className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-green-500"
                    aria-label="Amhara region"
                    style={{
                      left: "55%",
                      top: "35%",
                      animation: getRegionActivity("active"),
                      boxShadow: "0 0 10px rgba(132, 204, 22, 0.8)",
                      zIndex: 20
                    }}
                    onClick={() => data.onRegionSelect("amhara")}
                  ></button>
                  <button
                    className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-red-500"
                    aria-label="Oromia region"
                    style={{
                      left: "65%",
                      top: "65%",
                      animation: getRegionActivity("offline"),
                      boxShadow: "none",
                      zIndex: 20
                    }}
                    onClick={() => data.onRegionSelect("oromia")}
                  ></button>
                  
                  {/* Status legend inside the map at the bottom */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center space-x-3 bg-slate-900/80 px-2 py-1 rounded">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-white">{t("Active")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                      <span className="text-xs text-white">{t("Warning")}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <span className="text-xs text-white">{t("Offline")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection and weather status indicator */}
        {data.isConnected && (
          <div className="mt-2 bg-lime-600/20 rounded-md px-2 py-1 text-center border border-lime-600/30">
            <span className="text-xs text-lime-400 flex items-center justify-center">
              <span className="w-2 h-2 bg-lime-500 rounded-full mr-1 animate-pulse"></span>
              {getWeatherStatusText()}
            </span>
          </div>
        )}
      </div>

      {/* Output handle for connection */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: "#84cc16",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(132, 204, 22, 0.5)",
        }}
        isConnectable={true}
      />
    </div>
  )
}

export default EthiopiaMapNode 