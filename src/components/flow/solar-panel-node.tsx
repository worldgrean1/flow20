"use client"
import { Handle, Position, type NodeProps } from "reactflow"
import type React from "react"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export interface SolarPanelData {
  sunIntensity: number
  solarActive: boolean
  solarProduction: number
  onSunIntensityChange: (value: number) => void
  onSolarActiveChange: (value: boolean) => void
  t: (key: string) => string // Translation function
  // New monitoring parameters
  panelTemperature: number
  panelEfficiency: number
  dcVoltage: number
  dcCurrent: number
  powerFactor: number
  dailyEnergyYield: number
  peakPowerTime: string
  cellHealthStatus: number
  connectionQuality: number
  hotspotDetection: boolean
  degradationRate: number
  // New state indicators
  isDegraded: boolean
  isMaintenanceRequired: boolean
  isFaultCondition: boolean
  // New protection features
  hasReverseCurrentProtection: boolean
  hasOvervoltageProtection: boolean
  hasGroundFaultProtection: boolean
  hasSurgeProtection: boolean
  hasStringFuseProtection: boolean
  // New metrics
  temperatureCoefficient: number
  warrantyStatus: string
  warrantyExpiryDate: string
  lastCleaningDate: string
  cleaningRequired: boolean
  dustAccumulation: number
  shadingLevel: number
  // Production curve data
  productionCurve: {
    time: string
    power: number
  }[]
  // Panel configuration
  panelConfiguration: {
    totalPanels: number
    strings: number
    panelsPerString: number
    orientation: string
    tiltAngle: number
  }
  windSpeed?: number
  weatherCondition: string
  efficiency: number
}

export interface SolarPanelNodeProps extends NodeProps<SolarPanelData> {}

export const defaultSolarPanelSettings = {
  id: "solar-panel",
  name: "Solar Panel",
  type: "solarPanel",
  containerSize: { width: 18, height: 30 },
  containerStyle: {
    backgroundColor: "",
    gradientStart: "#1e293b", // slate-800
    gradientEnd: "#0f172a", // slate-900
    borderColor: "",
    activeColor: "#3b82f6", // blue-500
    inactiveColor: "#475569", // slate-600
    borderWidth: 2,
    borderRadius: 6,
    shadow: "md",
  },
  panelStyle: {
    backgroundColor: "#0f172a", // slate-900
    borderColor: "#334155", // slate-700
    textColor: "#f8fafc", // slate-50
    accentColor: "#3b82f6", // blue-500
    fontSize: 12,
  },
  simulationParams: {
    maxOutputWattage: 400, // Updated to 400W
    temperatureEffect: 0.5, // % efficiency loss per degree C above 25°C
    baseEfficiency: 20, // Updated to 20% at optimal conditions
    operatingTemperatureRange: { min: -40, max: 85 }, // Updated temperature range
    maxSystemVoltage: 1000, // Updated to 1000V DC
    voltageRange: { min: 150, max: 500 }, // Updated voltage range
    currentRange: { min: 0, max: 13 }, // Updated current range
    maxTotalPower: 5000, // Updated to 5000W total
  },
  animations: {
    enableReflection: true,
    reflectionOpacity: 0.2,
    enableRotation: true,
    rotationSensitivity: 1, // Multiplier
  },
  displayOptions: {
    showOutputWattage: true,
    showTemperature: true,
    showEfficiency: true,
    showSpecifications: true,
    showRealTimeMetrics: true,
    showPerformanceMetrics: true,
    showHealthMetrics: true,
    showProtectionFeatures: true,
  },
  protectionFeatures: {
    reverseCurrentProtection: true,
    overvoltageProtection: true,
    groundFaultProtection: true,
    surgeProtection: true,
    stringFuseProtection: true,
  },
  maintenanceIndicators: {
    cleaningRequired: false,
    performanceDegradation: false,
    connectionIssues: false,
    physicalDamage: false,
    warrantyStatus: "Active",
  },
  integrationFeatures: {
    weatherDataCorrelation: true,
    predictiveProductionAnalysis: true,
    optimizationAlgorithms: true,
    remoteMonitoring: true,
    historicalDataAnalysis: true,
  },
  // New default values for monitoring parameters
  panelTemperature: 25,
  panelEfficiency: 20,
  dcVoltage: 400,
  dcCurrent: 10,
  powerFactor: 0.98,
  dailyEnergyYield: 0,
  peakPowerTime: "12:00",
  cellHealthStatus: 100,
  connectionQuality: 100,
  hotspotDetection: false,
  degradationRate: 0.5,
  // New state indicators
  isDegraded: false,
  isMaintenanceRequired: false,
  isFaultCondition: false,
  // New protection features
  hasReverseCurrentProtection: true,
  hasOvervoltageProtection: true,
  hasGroundFaultProtection: true,
  hasSurgeProtection: true,
  hasStringFuseProtection: true,
  // New metrics
  temperatureCoefficient: -0.4,
  warrantyStatus: "Active",
  warrantyExpiryDate: "2030-12-31",
  lastCleaningDate: "2024-01-01",
  cleaningRequired: false,
  dustAccumulation: 10,
  shadingLevel: 0,
  // Production curve data
  productionCurve: [
    { time: "06:00", power: 0 },
    { time: "09:00", power: 200 },
    { time: "12:00", power: 400 },
    { time: "15:00", power: 200 },
    { time: "18:00", power: 0 }
  ],
  // Panel configuration
  panelConfiguration: {
    totalPanels: 12,
    strings: 2,
    panelsPerString: 6,
    orientation: "South",
    tiltAngle: 30
  }
}

// Metric section component
// const MetricSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
//   <div className="mb-4">
//     <h3 className="text-sm font-medium text-slate-300 mb-2">{title}</h3>
//     <div className="space-y-1">{children}</div>
//   </div>
// )

// Metric row component
// const MetricRow = ({ label, value, unit = "" }: { label: string, value: string | number, unit?: string }) => (
//   <div className="flex items-center justify-between text-xs">
//     <span className="text-slate-400">{label}</span>
//     <span className="text-white font-medium">
//       {value}
//       {unit && <span className="text-slate-400 ml-1">{unit}</span>}
//     </span>
//   </div>
// )

// Production curve component with proper type checking
const ProductionCurve = ({ productionData }: { productionData?: Array<{ time: string, power: number }> }) => {
  if (!productionData || !Array.isArray(productionData) || productionData.length === 0) {
    // Instead of showing "No production data available", create dummy data
    const dummyData = [
      { time: "06:00", power: 0 },
      { time: "09:00", power: 50 },
      { time: "12:00", power: 100 },
      { time: "15:00", power: 50 },
      { time: "18:00", power: 0 }
    ];
    
    return (
      <div className="h-20 mt-2">
        <div className="relative h-full w-full">
          {dummyData.map((point, index) => {
            const width = `${100 / dummyData.length}%`
            const left = `${(index / dummyData.length) * 100}%`
            
            return (
              <div
                key={index}
                className="absolute bottom-0 bg-slate-500/50"
                style={{
                  height: `${point.power}%`,
                  width,
                  left,
                }}
              />
            )
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-slate-500 bg-slate-900/60 px-2 py-1 rounded">
              Estimated Production
            </span>
          </div>
        </div>
      </div>
    )
  }

  const maxPower = Math.max(...productionData.map(p => p.power))

  return (
    <div className="h-20 mt-2">
      <div className="relative h-full w-full">
        {productionData.map((point, index) => {
          const height = maxPower > 0 ? `${(point.power / maxPower) * 100}%` : "0%"
          const width = `${100 / productionData.length}%`
          const left = `${(index / productionData.length) * 100}%`
          
          return (
            <div
              key={index}
              className="absolute bottom-0 bg-blue-500"
              style={{
                height,
                width,
                left,
                transition: 'height 0.5s ease-in-out'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

function SolarPanelNode({ data }: SolarPanelNodeProps) {
  const { t } = data
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 15, y: 0 })
  const [animate, setAnimate] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Calculate real-time solar position and intensity
  const calculateSolarPosition = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const timeInHours = hour + minute / 60
    
    // Calculate solar angle (simplified for demonstration)
    const solarAngle = Math.max(0, Math.min(90, 
      (timeInHours - 6) * 15 // 15 degrees per hour from 6 AM
    ))
    
    return {
      angle: solarAngle,
      intensity: Math.max(0, Math.min(100, 
        (solarAngle / 90) * 100 * (1 - data.shadingLevel / 100)
      ))
    }
  }

  // Calculate real-time panel temperature
  const calculatePanelTemperature = () => {
    const ambientTemp = 25 // Base temperature
    const solarIntensity = calculateSolarPosition().intensity || 0
    const windCooling = data.windSpeed ? Math.min(10, data.windSpeed * 0.5) : 0
    
    const temp = ambientTemp + (solarIntensity / 100) * 30 - windCooling
    return isNaN(temp) ? 25 : temp // Return default 25°C if calculation results in NaN
  }

  // Calculate real-time efficiency
  const calculateEfficiency = () => {
    const baseEfficiency = 20 // Base efficiency at 25°C
    const tempDiff = calculatePanelTemperature() - 25
    const tempCoef = typeof data.temperatureCoefficient === 'number' ? data.temperatureCoefficient : -0.4
    const tempEffect = tempDiff * tempCoef
    const dustEffect = (data.dustAccumulation || 0) * 0.1 // 0.1% efficiency loss per 1% dust
    const shadingEffect = (data.shadingLevel || 0) * 0.2 // 0.2% efficiency loss per 1% shading
    
    const eff = Math.max(0, Math.min(100, 
      baseEfficiency + tempEffect - dustEffect - shadingEffect
    ))
    return isNaN(eff) ? 20 : eff // Return default 20% if calculation results in NaN
  }

  // Calculate real-time power output
  const calculatePowerOutput = () => {
    // If solar is not active, return 0 immediately
    if (!data.solarActive) {
      return 0;
    }
    
    const solarIntensity = calculateSolarPosition().intensity || 0
    const efficiency = calculateEfficiency()
    const panelArea = 1.6 // m² (typical panel size)
    const maxIrradiance = 1000 // W/m²
    
    // Calculate power based on sunIntensity rather than solarPosition.intensity
    // to ensure it reflects the user-set intensity value directly
    const power = Math.round(
      (data.sunIntensity / 100) * maxIrradiance * panelArea * (efficiency / 100)
    )
    
    // Ensure we return at least 1W when active and sun intensity > 0
    if (data.solarActive && data.sunIntensity > 0 && power <= 0) {
      return Math.max(1, Math.round(data.sunIntensity * 4)); // Return at least some power proportional to sun intensity
    }
    
    // After calculating power, update the solarProduction property
    // so it can be accessed by other components
    if (typeof data.solarProduction !== 'undefined') {
      // Only update if the property is defined and writable
      data.solarProduction = power;
    }
    
    return isNaN(power) ? 0 : power // Return 0 if calculation results in NaN
  }

  // Update production curve in real-time
  useEffect(() => {
    const updateProductionCurve = () => {
      if (!data.productionCurve || !Array.isArray(data.productionCurve)) {
        return
      }

      const hour = currentTime.getHours()
      const minute = currentTime.getMinutes()
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      const newCurve = [...data.productionCurve]
      const currentIndex = newCurve.findIndex(point => point.time === timeString)
      
      if (currentIndex !== -1) {
        newCurve[currentIndex] = {
          time: timeString,
          power: calculatePowerOutput()
        }
        data.productionCurve = newCurve
      }
    }
    
    updateProductionCurve()
  }, [currentTime, data])

  // Handle mouse interaction for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    const rotateX = 20 * ((y - rect.height / 2) / rect.height)
    const rotateY = -20 * ((x - rect.width / 2) / rect.width)

    setRotation({ x: rotateX, y: rotateY })
  }

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSunIntensityChange = (value: number[]) => {
    data.onSunIntensityChange(value[0])
  }

  // Get real-time values
  const panelTemp = calculatePanelTemperature()
  const efficiency = calculateEfficiency()
  const powerOutput = calculatePowerOutput()
  const solarPosition = calculateSolarPosition()
  
  // Power flow visual intensity calculation
  const getPowerFlowIntensity = () => {
    if (!data.solarActive || powerOutput <= 0) return 0;
    
    // Return a value between 0.2 and 1 based on power output
    // Using log scale to make it more visually responsive at lower power levels
    const maxExpectedPower = 400; // Maximum expected power output in watts
    const intensity = 0.2 + 0.8 * Math.min(1, Math.log10(powerOutput + 1) / Math.log10(maxExpectedPower + 1));
    return intensity;
  }
  
  const powerFlowIntensity = getPowerFlowIntensity();

  // Determine panel state based on conditions
  const getPanelState = () => {
    // First priority: check if panel is active at all
    if (!data.solarActive) return "inactive"
    
    // Then check other conditions
    if (data.isFaultCondition) return "fault"
    if (data.isDegraded) return "degraded"
    if (data.isMaintenanceRequired) return "maintenance"
    if (solarPosition.intensity > 80) return "full-sun"
    if (solarPosition.intensity > 20) return "partial-sun"
    return "low-light"
  }

  const panelState = getPanelState()

  // Calculate cleaning recommendation based on dust accumulation
  const getCleaningRecommendation = () => {
    if (data.dustAccumulation > 80) return "urgent"
    if (data.dustAccumulation > 50) return "soon"
    return "normal"
  }

  // Calculate shading impact
  const getShadingImpact = () => {
    if (data.shadingLevel > 80) return "severe"
    if (data.shadingLevel > 50) return "moderate"
    if (data.shadingLevel > 20) return "light"
    return "none"
  }

  // Digital screen style component
  const DigitalScreen = ({ value, unit, label, color = "text-lime-400" }: { 
    value: number | string, 
    unit: string, 
    label: string,
    color?: string 
  }) => (
    <div className="bg-slate-900/80 p-2 rounded-md border border-slate-700/50">
      <div className="text-xs text-slate-400 mb-1">{t(label)}</div>
      <div className={`font-mono text-lg ${color} flex items-baseline`}>
        <span className="tracking-wider">{value}</span>
        <span className="text-xs ml-1 text-slate-400">{t(unit)}</span>
      </div>
    </div>
  )

  // Circular gauge component
  const CircularGauge = ({ 
    value, 
    max = 100, 
    size = 40, 
    color = "text-lime-400",
    label 
  }: { 
    value: number, 
    max?: number, 
    size?: number, 
    color?: string,
    label: string 
  }) => {
    const percentage = Math.min(100, (value / max) * 100)
    const strokeWidth = 16
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="transform -rotate-90" width={size} height={size}>
            <circle
              className="text-slate-700"
              strokeWidth={strokeWidth}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
            <circle
              className={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs ${color}`}>{Math.round(value)}%</span>
          </div>
        </div>
        <span className="text-xs text-slate-400 mt-1">{t(label)}</span>
      </div>
    )
  }

  // Add this effect to respond to solarActive changes from parent
  useEffect(() => {
    // When solarActive changes from props, enforce the visual state
    if (data.solarActive !== undefined) {
      // We don't need to call the onChange because this is already coming from the parent
      // This is just to ensure the visual state matches the data
      setAnimate(data.solarActive);
      
      // Set a brief animation when state changes
      if (data.solarActive) {
        setTimeout(() => setAnimate(false), 300);
      }
    }
  }, [data.solarActive]);

  // Determine if solar should be disabled based on weather and efficiency
  const isSolarDisabled = data.weatherCondition === 'rainy' && 
    ((typeof data.efficiency === 'number' && data.efficiency < 30) ||
    data.sunIntensity < 30);

  // Update disable state when component renders
  useEffect(() => {
    // If conditions for auto-disable are met, make sure panel is off
    if (isSolarDisabled && data.solarActive && data.onSolarActiveChange) {
      // Force turn off the panel
      data.onSolarActiveChange(false);
    }
  }, [data.weatherCondition, data.efficiency, data.sunIntensity, isSolarDisabled, data.solarActive, data.onSolarActiveChange]);

  // Add alerts for cleaning and shading issues if values are high enough to warrant attention
  const cleaningAlert = getCleaningRecommendation() !== "normal" ? (
    <div className="absolute -top-2 right-4 bg-orange-600/90 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg">
      {t("Cleaning " + getCleaningRecommendation())}
    </div>
  ) : null;

  const shadingAlert = getShadingImpact() !== "none" ? (
    <div className="absolute -top-2 right-24 bg-red-600/90 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg">
      {t("Shading: " + getShadingImpact())}
    </div>
  ) : null;

  return (
    <div className="w-[520px] transition-all duration-300" style={{ transform: animate ? "scale(1.05)" : "scale(1)" }}>
      <div className="relative">
        {cleaningAlert}
        {shadingAlert}
        {/* Enhanced backdrop with glow effect */}
        <div className="absolute -inset-3 bg-gradient-to-br from-blue-900/40 to-emerald-900/40 rounded-xl border border-blue-800/40 -z-10 shadow-lg blur-[2px]"></div>

        <div
          className="flex items-start p-3 transition-transform duration-300 ease-out"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setRotation({ x: 15, y: 0 })
          }}
          onMouseMove={handleMouseMove}
        >
          {/* 3D Solar Panel Visualization */}
          <div className="relative perspective-[1000px]">
            <div
              className={cn(
                "w-56 h-56 bg-slate-900 rounded-md shadow-xl border-2 overflow-hidden relative transition-all duration-300",
                data.solarActive ? "border-blue-500" : "border-slate-700",
                panelState === "fault" && "border-red-500",
                panelState === "degraded" && "border-yellow-500",
                panelState === "maintenance" && "border-orange-500",
              )}
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Enhanced aluminum frame with 3D effect */}
              <div
                className="absolute inset-0 border-4 border-slate-400/40"
                style={{ transform: "translateZ(2px)" }}
              ></div>

              {/* Solar cells grid with 3D effect */}
              <div className="grid grid-cols-6 grid-rows-6 gap-[2px] p-2 h-full w-full">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative overflow-hidden transition-all duration-300",
                      data.solarActive ? "bg-gradient-to-br from-blue-900 to-blue-950" : "bg-slate-800",
                    )}
                    style={{
                      transform: `translateZ(${data.solarActive ? 1 : 0}px)`,
                      boxShadow: data.solarActive ? "inset 0 0 5px rgba(59, 130, 246, 0.5)" : "none",
                    }}
                  >
                    {data.solarActive && (
                      <>
                        {/* Enhanced cell bus bars */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-full bg-blue-700/30"></div>
                        <div className="absolute top-1/4 bottom-1/4 left-0 right-0 w-full bg-blue-700/30"></div>

                        {/* Enhanced reflection effect */}
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-500/20 to-transparent transform -skew-x-12"></div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Enhanced junction box */}
              <div
                className="absolute bottom-1 right-1 w-6 h-4 bg-slate-800 border border-slate-700 rounded-sm"
                style={{ transform: "translateZ(3px)" }}
              ></div>

              {/* Enhanced panel specs label */}
              <div
                className="absolute top-1 left-1 bg-slate-900/90 rounded text-[8px] text-slate-300 px-1"
                style={{ transform: "translateZ(3px)" }}
              >
                250W • 24V
              </div>

              {/* Add sun reflection animation when active */}
              {data.solarActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent animate-pulse-slow"></div>
              )}
            </div>

            {/* Enhanced panel mount with 3D effect */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-slate-700 rounded-b-md"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-600 rounded-full"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-600"></div>
          </div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <div className="font-medium text-white text-sm">{t("Solar Panel System")}</div>
          </div>

          {/* Enhanced controls and data display on the right side */}
          <div className="ml-6 flex flex-col space-y-4 pointer-events-auto relative z-10 w-64">
            {/* Panel Status Card */}
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-3 pointer-events-auto shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <Label htmlFor="solar-active" className="text-sm text-slate-300 font-medium flex items-center">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      data.solarActive ? "bg-green-500 animate-pulse" : "bg-red-500",
                      panelState === "fault" && "bg-red-500",
                      panelState === "degraded" && "bg-yellow-500",
                      panelState === "maintenance" && "bg-orange-500",
                    )}
                  ></div>
                  {t("Panel Status")}
                </Label>
                <Switch
                  checked={data.solarActive}
                  onCheckedChange={data.onSolarActiveChange}
                  id="solar-active"
                  className={cn(
                    "data-[state=checked]:bg-lime-600 relative z-20",
                    isSolarDisabled ? "opacity-50 cursor-not-allowed" : ""
                  )}
                  disabled={isSolarDisabled}
                />
              </div>

              {/* Sun intensity slider */}
              <div className="flex items-center space-x-2 mb-2">
                <Sun
                  className={cn("h-5 w-5", data.solarActive ? "text-yellow-500 animate-pulse-slow" : "text-slate-400")}
                />
                <span className="text-sm text-slate-300 font-medium">{t("Sun Intensity")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Slider
                  value={[data.sunIntensity]}
                  min={0}
                  max={100}
                  step={1}
                  className="w-40 relative z-20"
                  onValueChange={handleSunIntensityChange}
                />
                <span className="text-sm font-medium w-10 text-white">{data.sunIntensity}%</span>
              </div>

              {/* Advanced Metrics Display */}
              <div className="grid grid-cols-2 gap-2">
                <DigitalScreen 
                  value={data.solarActive ? (powerOutput || (data.sunIntensity > 0 ? Math.max(1, Math.round(data.sunIntensity * 4)) : 0)) : 0} 
                  unit="W" 
                  label={t("Power Output")} 
                  color={data.solarActive ? "text-lime-400" : "text-red-500"}
                />
                <DigitalScreen 
                  value={(panelTemp || 25).toFixed(1)} 
                  unit="°C" 
                  label={t("Panel Temp")} 
                  color="text-orange-400"
                />
                <DigitalScreen 
                  value={data.solarActive ? (efficiency || 0).toFixed(1) : "0.0"} 
                  unit="%" 
                  label={t("Efficiency")} 
                  color={data.solarActive ? "text-blue-400" : "text-slate-500"}
                />
                <DigitalScreen 
                  value={(solarPosition.angle || 0).toFixed(1)} 
                  unit="°" 
                  label={t("Solar Angle")} 
                  color="text-yellow-400"
                />
              </div>

              {/* Circular Gauges */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <CircularGauge 
                  value={solarPosition.intensity || 0} 
                  label={t("Sun Intensity")} 
                  color="text-yellow-400"
                />
                <CircularGauge 
                  value={data.dustAccumulation || 0} 
                  label={t("Dust Level")} 
                  color="text-orange-400"
                />
                <CircularGauge 
                  value={data.shadingLevel || 0} 
                  label={t("Shading")} 
                  color="text-red-400"
                />
              </div>

              {/* Production Curve */}
              <div className="mt-4">
                <ProductionCurve productionData={data.productionCurve} />
              </div>

              {/* Health Indicators - Updated cell health and connection displays */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <DigitalScreen 
                  value={data.cellHealthStatus !== undefined && !isNaN(data.cellHealthStatus) ? data.cellHealthStatus : 100} 
                  unit="%" 
                  label={t("Cell Health")} 
                  color={(data.cellHealthStatus > 80 || !data.cellHealthStatus) ? "text-green-400" : "text-red-400"}
                />
                <DigitalScreen 
                  value={data.connectionQuality !== undefined && !isNaN(data.connectionQuality) ? data.connectionQuality : 100} 
                  unit="%" 
                  label={t("Connection")} 
                  color={(data.connectionQuality > 80 || !data.connectionQuality) ? "text-green-400" : "text-red-400"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output handle with power flow visualization */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{
          background: data.solarActive ? `rgba(34, 197, 94, ${powerFlowIntensity})` : "#666",
          width: "12px",
          height: "12px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: data.solarActive ? `0 0 ${5 + powerFlowIntensity * 10}px rgba(34, 197, 94, ${powerFlowIntensity})` : "none",
          transition: "all 0.3s ease-in-out",
          animation: data.solarActive && powerOutput > 0 ? "pulse 2s infinite" : "none",
        }}
        isConnectable={true}
      />
      
      {/* Add data flow indicator near the handle */}
      {data.solarActive && powerOutput > 0 && (
        <div 
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-4 bg-slate-900/80 px-2 py-0.5 rounded text-xs font-medium z-50"
          style={{
            color: "#22c55e",
            textShadow: "0 0 5px rgba(34, 197, 94, 0.5)",
          }}
        >
          Data
        </div>
      )}
    </div>
  )
}

export default SolarPanelNode