"use client"
import React from "react"
import { Handle, Position, type NodeProps } from 'reactflow'
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Globe, AlertTriangle, Zap, Power, Activity, Battery } from "lucide-react"
import { useState, useEffect } from "react"
import { MapOverlay } from "@/components/MapOverlay"
import { Badge } from "@/components/ui/badge"

// Define the DistributionPanelSettings type here instead of importing it
export interface DistributionPanelSettings {
  id: string
  name: string
  type: string
  containerSize: { width: number, height: number }
  containerStyle: {
    backgroundColor: string
    gradientStart: string
    gradientEnd: string
    borderColor: string
    activeColor: string
    inactiveColor: string
    overloadColor: string
    borderWidth: number
    borderRadius: number
    shadow: string
  }
  panelStyle: {
    backgroundColor: string
    borderColor: string
    textColor: string
    accentColor: string
    fontSize: number
  }
  deviceStyle: {
    activeBackgroundColor: string
    inactiveBackgroundColor: string
    activeBorderColor: string
    inactiveBorderColor: string
    textColor: string
    iconColor: string
    powerTextColor: string
  }
  powerFlow: {
    enableFlowAnimation: boolean
    flowAnimationSpeed: number
    flowColor: string
    flowOpacity: number
    flowWidth: number
  }
  loadMeter: {
    normalColor: string
    warningColor: string
    criticalColor: string
    warningThreshold: number
    criticalThreshold: number
    enableGradient: boolean
    enableShimmer: boolean
  }
  displayOptions: {
    showLoadMeter: boolean
    showPowerConsumption: boolean
    showDeviceStatus: boolean
    showGridConnection: boolean
    showCircuitLabels: boolean
  }
  batteryStyle: {
    backgroundColor: string
    borderColor: string
    textColor: string
    accentColor: string
    levelColor: string
    warningColor: string
    criticalColor: string
  }
}

// Default settings for Distribution Panel
export const defaultDistributionPanelSettings: DistributionPanelSettings = {
  id: "distribution-panel",
  name: "Distribution Panel",
  type: "distributionPanel",
  containerSize: { width: 25, height: 28 },
  containerStyle: {
    backgroundColor: "",
    gradientStart: "#1e293b", // slate-800
    gradientEnd: "#0f172a", // slate-900
    borderColor: "#334155", // slate-700
    activeColor: "#22c55e", // green-500
    inactiveColor: "#475569", // slate-600
    overloadColor: "#ef4444", // red-500
    borderWidth: 2,
    borderRadius: 12,
    shadow: "lg",
  },
  panelStyle: {
    backgroundColor: "#0f172a", // slate-900
    borderColor: "#1e293b", // slate-800
    textColor: "#f8fafc", // slate-50
    accentColor: "#22c55e", // green-500
    fontSize: 12,
  },
  deviceStyle: {
    activeBackgroundColor: "#1e293b", // slate-800
    inactiveBackgroundColor: "#0f172a", // slate-900
    activeBorderColor: "#22c55e", // green-500
    inactiveBorderColor: "#334155", // slate-700
    textColor: "#f8fafc", // slate-50
    iconColor: "#22c55e", // green-500
    powerTextColor: "#f8fafc", // slate-50
  },
  powerFlow: {
    enableFlowAnimation: true,
    flowAnimationSpeed: 1.5,
    flowColor: "#22c55e", // green-500
    flowOpacity: 0.6,
    flowWidth: 2,
  },
  loadMeter: {
    normalColor: "#22c55e", // green-500
    warningColor: "#facc15", // yellow-500
    criticalColor: "#ef4444", // red-500
    warningThreshold: 60,
    criticalThreshold: 80,
    enableGradient: true,
    enableShimmer: true,
  },
  displayOptions: {
    showLoadMeter: true,
    showPowerConsumption: true,
    showDeviceStatus: true,
    showGridConnection: true,
    showCircuitLabels: true,
  },
  batteryStyle: {
    backgroundColor: "#1e293b", // slate-800
    borderColor: "#22c55e", // green-500
    textColor: "#f8fafc", // slate-50
    accentColor: "#22c55e", // green-500
    levelColor: "#22c55e", // green-500
    warningColor: "#facc15", // yellow-500
    criticalColor: "#ef4444", // red-500
  },
}

export interface DeviceState {
  id: string
  name: string
  icon: React.ReactNode
  on: boolean
  powerConsumption: number
  connected: boolean
}

export interface DistributionPanelData {
  devices: DeviceState[]
  totalConsumption: number
  inverterOn: boolean
  onToggleDevice: (id: string) => void
  onToggleGridConnection?: (value: boolean) => void
  gridConnected?: boolean
  label?: string
  isActive?: boolean
  ethiopiaConnected?: boolean
  onToggleEthiopiaConnection?: (value: boolean) => void
  t: (key: string) => string
  batteryLevel?: number
}

function DistributionPanelNode({ data }: NodeProps<DistributionPanelData>) {
  const { t } = data
  const [animate, setAnimate] = useState(false)
  const [activeDevice, setActiveDevice] = useState<string | null>(null)

  // Use default settings since we're not using the context in this standalone version
  const customSettings = defaultDistributionPanelSettings

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate load percentage (simulated max capacity of 200W)
  const loadPercentage = (data.totalConsumption / 200) * 100

  // Determine if the panel is overloaded based on settings
  const isWarning = loadPercentage > customSettings.loadMeter.warningThreshold
  const isOverloaded = loadPercentage > customSettings.loadMeter.criticalThreshold

  // Get device icon with proper size
  const getDeviceIcon = (icon: React.ReactElement<{ className?: string; style?: React.CSSProperties }>) => {
    return React.cloneElement(icon, {
      className: "h-4 w-4",
      style: { color: customSettings.deviceStyle.iconColor },
    })
  }

  // Get load meter color based on load percentage and settings
  const getLoadMeterColor = () => {
    if (isOverloaded) return customSettings.loadMeter.criticalColor
    if (isWarning) return customSettings.loadMeter.warningColor
    return customSettings.loadMeter.normalColor
  }

  const handlePositions = [24, 48, 72, 96]; // x positions for 4 handles (adjust as needed)

  return (
    <div className="flex flex-col items-center">
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          background: "#3b82f6",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)",
        }}
        isConnectable={true}
        data-testid="target-handle"
      />

      <div className="node-container" style={{
        borderRadius: "var(--radius)",
        borderWidth: "1px",
        borderColor: "hsl(var(--node-border))",
        backgroundColor: "hsl(216.36deg 12% 46.02%)",
        color: "hsl(var(--node-text))",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }}>
        <div className="node-header" style={{
          borderTopLeftRadius: "var(--radius)",
          borderTopRightRadius: "var(--radius)",
          borderBottomWidth: "1px",
          borderColor: "hsl(var(--node-border))",
          backgroundImage: "linear-gradient(to bottom, hsl(217.24deg 24.34% 37.85%), hsl(217.24deg 33.33% 17.06%))",
          padding: "1rem",
        }}>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-400" />
            <h3 className="text-node-text font-medium">{t("Distribution Panel")}</h3>
          </div>
          <Badge variant="outline" className="bg-purple-500/20 text-foreground border-purple-500">
            {t("SMART-TECH")}
          </Badge>
        </div>

        <div className="node-content">
          {/* Map Overlay Section */}
          <div className="relative h-[200px] mb-4 overflow-hidden rounded-lg">
            <MapOverlay isActive={data.gridConnected} />
          </div>

          {/* Power Consumption Display */}
          <div className="flex justify-end items-center mb-4">
            {customSettings.displayOptions.showPowerConsumption && (
              <div
                className={cn(
                  "flex items-center px-3 py-1.5 rounded-md border",
                  "bg-slate-800/50 border-slate-700/50"
                )}
              >
                <Zap
                  className={cn("h-3.5 w-3.5 mr-1.5", 
                    isOverloaded ? "text-red-400" : "text-green-400"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    isOverloaded ? "text-red-400" : "text-green-400"
                  )}
                >
                  {data.totalConsumption}W
                </span>
              </div>
            )}
          </div>

          <div
            className={cn(
              "bg-gradient-to-b rounded-lg shadow-xl flex flex-col border-2 relative",
              isOverloaded ? "border-red-500" : "border-slate-600",
              animate ? "scale-105" : "scale-100",
              "transition-all duration-300",
              "backdrop-blur-sm",
            )}
            style={{
              width: `${customSettings.containerSize.width}rem`,
              height: `${customSettings.containerSize.height}rem`,
              backgroundImage: `linear-gradient(to bottom, ${customSettings.containerStyle.gradientStart}, ${customSettings.containerStyle.gradientEnd})`,
              borderRadius: `${customSettings.containerStyle.borderRadius}px`,
              borderWidth: `${customSettings.containerStyle.borderWidth}px`,
              borderColor: isOverloaded
                ? customSettings.containerStyle.overloadColor
                : data.inverterOn
                  ? customSettings.containerStyle.activeColor
                  : customSettings.containerStyle.inactiveColor,
              boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)`,
              padding: "16px",
            }}
          >
            {/* Load meter with animated gradient */}
            {customSettings.displayOptions.showLoadMeter && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs" style={{ color: customSettings.panelStyle.textColor }}>
                    {t("System Load")}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: isOverloaded ? customSettings.loadMeter.criticalColor : customSettings.panelStyle.textColor,
                    }}
                  >
                    {Math.round(loadPercentage)}%
                  </span>
                </div>
                <div
                  className="h-3 rounded-full overflow-hidden shadow-inner"
                  style={{ backgroundColor: customSettings.panelStyle.backgroundColor }}
                >
                  <div
                    className={cn("h-full transition-all duration-300 relative")}
                    style={{
                      width: `${Math.min(100, loadPercentage)}%`,
                      backgroundColor: customSettings.loadMeter.enableGradient ? undefined : getLoadMeterColor(),
                      background: customSettings.loadMeter.enableGradient
                        ? isOverloaded
                          ? undefined
                          : `linear-gradient(to right, ${customSettings.loadMeter.normalColor}, ${isWarning ? customSettings.loadMeter.warningColor : customSettings.loadMeter.normalColor})`
                        : undefined,
                    }}
                  >
                    {/* Add shimmer effect if enabled */}
                    {customSettings.loadMeter.enableShimmer && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{
                          animation: "shimmer 2s infinite",
                          backgroundSize: "200% 100%",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Circuit breakers and devices section */}
            <div
              className="border rounded-md p-3 mb-4 shadow-inner"
              style={{
                backgroundColor: customSettings.panelStyle.backgroundColor,
                borderColor: customSettings.panelStyle.borderColor,
              }}
            >
              {customSettings.displayOptions.showCircuitLabels && (
                <div
                  className="text-xs mb-3 border-b pb-2 flex justify-between items-center"
                  style={{
                    color: customSettings.panelStyle.textColor,
                    borderColor: customSettings.panelStyle.borderColor,
                  }}
                >
                  <div className="flex items-center">
                    <Power className="h-3.5 w-3.5 mr-1.5" />
                    <span className="font-medium">{t("CIRCUIT BREAKERS")}</span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-1 rounded-full",
                      data.inverterOn ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400",
                    )}
                  >
                    {data.inverterOn ? t("POWER ON") : t("POWER OFF")}
                  </span>
                </div>
              )}

              {customSettings.displayOptions.showDeviceStatus && (
                <div className="grid grid-cols-2 gap-3">
                  {data.devices.map((device) => (
                    <div
                      key={device.id}
                      className={cn(
                        "p-3 rounded-lg flex flex-col border transition-all duration-300",
                        activeDevice === device.id && "scale-105",
                        "hover:shadow-lg",
                      )}
                      style={{
                        backgroundColor:
                          device.on && data.inverterOn
                            ? customSettings.deviceStyle.activeBackgroundColor
                            : customSettings.deviceStyle.inactiveBackgroundColor,
                        borderColor:
                          device.on && data.inverterOn
                            ? customSettings.deviceStyle.activeBorderColor
                            : customSettings.deviceStyle.inactiveBorderColor,
                        color: customSettings.deviceStyle.textColor,
                        boxShadow: device.on && data.inverterOn ? "0 4px 6px -1px rgba(0, 0, 0, 0.2)" : "none",
                        borderRadius: "8px",
                      }}
                      onMouseEnter={() => setActiveDevice(device.id)}
                      onMouseLeave={() => setActiveDevice(null)}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center">
                          {getDeviceIcon(device.icon as React.ReactElement<{ className?: string; style?: React.CSSProperties }>)}
                          <span
                            className="text-xs ml-1.5 font-medium"
                            style={{ color: customSettings.deviceStyle.textColor }}
                          >
                            {t(device.name)}
                          </span>
                        </div>
                        <div
                          className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor:
                              device.on && data.inverterOn
                                ? `${customSettings.deviceStyle.activeBorderColor}20`
                                : "transparent",
                            color: customSettings.deviceStyle.powerTextColor,
                          }}
                        >
                          {device.powerConsumption}W
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <div
                          className={cn("w-2 h-2 rounded-full", device.on && data.inverterOn ? "animate-pulse" : "")}
                          style={{
                            backgroundColor:
                              device.on && data.inverterOn
                                ? customSettings.containerStyle.activeColor
                                : customSettings.containerStyle.overloadColor,
                          }}
                        ></div>
                        <Switch
                          checked={device.on}
                          onCheckedChange={() => data.onToggleDevice(device.id)}
                          className="scale-75"
                          style={{
                            backgroundColor: device.on ? customSettings.containerStyle.activeColor : undefined,
                          }}
                        />
                      </div>

                      {/* Power flow animation */}
                      {device.on && data.inverterOn && customSettings.powerFlow.enableFlowAnimation && (
                        <div
                          className="absolute left-0 right-0 h-0.5 overflow-hidden"
                          style={{ backgroundColor: `${customSettings.powerFlow.flowColor}30` }}
                        >
                          <div
                            className="h-full w-1/3"
                            style={{
                              backgroundColor: customSettings.powerFlow.flowColor,
                              opacity: customSettings.powerFlow.flowOpacity,
                              animation: `flowRight ${customSettings.powerFlow.flowAnimationSpeed}s infinite linear`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grid Connection section */}
            {data.onToggleGridConnection && customSettings.displayOptions.showGridConnection && (
              <div className="mt-auto">
                <div
                  className="text-xs mb-2 border-b pb-1.5 flex items-center"
                  style={{
                    color: customSettings.panelStyle.textColor,
                    borderColor: customSettings.panelStyle.borderColor,
                  }}
                >
                  <Globe className="h-3.5 w-3.5 mr-1.5" />
                  <span className="font-medium">{t("GRID CONNECTION")}</span>
                </div>
                <div
                  className={cn("p-3 rounded-md flex items-center justify-between transition-all duration-300")}
                  style={{
                    background: data.gridConnected
                      ? `linear-gradient(to right, ${customSettings.deviceStyle.activeBackgroundColor}, ${customSettings.containerStyle.activeColor}30)`
                      : customSettings.deviceStyle.inactiveBackgroundColor,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: data.gridConnected
                      ? customSettings.deviceStyle.activeBorderColor
                      : customSettings.deviceStyle.inactiveBorderColor,
                    color: customSettings.deviceStyle.textColor,
                    boxShadow: data.gridConnected ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                  }}
                >
                  <div className="flex items-center">
                    <Globe
                      className={cn("h-5 w-5 mr-2", data.gridConnected ? "animate-pulse-slow" : "")}
                      style={{
                        color: data.gridConnected
                          ? customSettings.containerStyle.activeColor
                          : customSettings.deviceStyle.textColor,
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{t("Power Grid")}</span>
                      <span
                        className="text-[10px]"
                        style={{
                          color: data.gridConnected ? customSettings.containerStyle.activeColor : "rgba(148, 163, 184, 1)", // slate-400
                        }}
                      >
                        {data.gridConnected ? t("Connected") : t("Disconnected")}
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={!!data.gridConnected}
                    onCheckedChange={() => data.onToggleGridConnection && data.onToggleGridConnection(!data.gridConnected)}
                    className="scale-75"
                    style={{
                      backgroundColor: data.gridConnected ? customSettings.containerStyle.activeColor : undefined,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Add Battery System card after the Grid Connection section */}
            {data.batteryLevel !== undefined && (
              <div className="mt-4">
                <div
                  className="text-xs mb-2 border-b pb-1.5 flex items-center"
                  style={{
                    color: customSettings.panelStyle.textColor,
                    borderColor: customSettings.panelStyle.borderColor,
                  }}
                >
                  <Battery className="h-3.5 w-3.5 mr-1.5" />
                  <span className="font-medium">{t("BATTERY SYSTEM")}</span>
                </div>
                <div
                  className="p-3 rounded-md flex items-center justify-between transition-all duration-300"
                  style={{
                    background: customSettings.panelStyle.backgroundColor,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: customSettings.panelStyle.borderColor,
                    color: customSettings.panelStyle.textColor,
                    boxShadow: "none",
                  }}
                >
                  <div className="flex items-center">
                    <Battery
                      className={cn("h-5 w-5 mr-2", {
                        "text-green-500": data.batteryLevel > 50,
                        "text-yellow-500": data.batteryLevel <= 50 && data.batteryLevel > 20,
                        "text-red-500": data.batteryLevel <= 20,
                      })}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{t("Battery Level")}</span>
                      <span className="text-[10px]" style={{ color: "rgba(148, 163, 184, 1)" }}>
                        {data.batteryLevel}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-24 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${customSettings.panelStyle.backgroundColor}80` }}
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${data.batteryLevel}%`,
                        backgroundColor: data.batteryLevel > 50
                          ? "#22c55e" // green-500
                          : data.batteryLevel > 20
                            ? "#facc15" // yellow-500
                            : "#ef4444", // red-500
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Ethiopian Solar Network Connection */}
            {data.onToggleEthiopiaConnection && (
              <div className="mt-3 p-2 bg-slate-800 rounded-md border border-slate-700">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${data.ethiopiaConnected ? "bg-lime-500 animate-pulse" : "bg-slate-500"}`}
                    ></div>
                    <span className="text-sm font-medium">{t("Ethiopian Grid")}</span>
                    <div className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded border",
                      "transition-colors duration-300",
                      data.ethiopiaConnected 
                        ? "bg-green-500/20 text-green-400 border-green-500" 
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    )}>
                      {t("ESN")}
                    </div>
                  </div>
                  <Switch
                    checked={!!data.ethiopiaConnected}
                    onCheckedChange={data.onToggleEthiopiaConnection}
                    className="data-[state=checked]:bg-lime-600"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {data.ethiopiaConnected
                    ? t("Connected to Ethiopian Solar Network")
                    : t("Disconnected from Ethiopian Solar Network")}
                </p>
              </div>
            )}

            {/* Overload warning indicator */}
            {isOverloaded && (
              <div className="absolute top-3 right-3 animate-pulse">
                <div className="relative">
                  <AlertTriangle className="h-5 w-5" style={{ color: customSettings.containerStyle.overloadColor }} />
                  <div
                    className="absolute inset-0 rounded-full blur-sm animate-ping"
                    style={{ backgroundColor: `${customSettings.containerStyle.overloadColor}30` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Power flow visualization */}
            {data.inverterOn && customSettings.powerFlow.enableFlowAnimation && (
              <div
                className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-20 overflow-hidden"
                style={{ backgroundColor: `${customSettings.powerFlow.flowColor}20` }}
              >
                <div
                  className="h-10 w-full"
                  style={{
                    backgroundColor: `${customSettings.powerFlow.flowColor}60`,
                    animation: `flowRight ${customSettings.powerFlow.flowAnimationSpeed}s infinite linear`,
                  }}
                ></div>
              </div>
            )}

            {/* Add power wave indicators */}
            {data.inverterOn && (
              <>
                {/* Left side power wave */}
                <div className="absolute -left-1 top-10 bottom-10 w-2 flex flex-col space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`left-wave-${i}`}
                      className="h-3 w-1"
                      style={{
                        backgroundColor: "rgb(71 85 105)",
                        animation: `blink 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>

                {/* Right side power wave */}
                <div className="absolute -right-1 top-10 bottom-10 w-2 flex flex-col space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`right-wave-${i}`}
                      className="h-3 w-1"
                      style={{
                        backgroundColor: "rgb(71 85 105)",
                        animation: `blink 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>

                <style>
                  {`@keyframes blink {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                  }`}
                </style>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Output handles for devices */}
      <Handle
        type="source"
        position={Position.Right}
        id="output-devices"
        style={{
          background: "#84cc16",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(132, 204, 22, 0.5)",
        }}
        isConnectable={true}
      />

      {/* Output handle for grid connection */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-grid"
        style={{
          background: "#22c55e",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(34, 197, 94, 0.5)",
        }}
        isConnectable={true}
      />

      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 0, pointerEvents: 'none' }}>
        {handlePositions.map((x, i) => (
          <Handle
            key={`out-${i+1}`}
            type="source"
            position={Position.Bottom}
            id={`out-${i+1}`}
            style={{
              left: `${x}px`,
              bottom: -6,
              background: '#3b82f6',
              width: 12,
              height: 12,
              border: '2px solid #fff',
              pointerEvents: 'auto',
              zIndex: 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default DistributionPanelNode
