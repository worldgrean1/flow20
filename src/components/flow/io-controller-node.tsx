"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"
import { Activity, Power, ToggleLeft, Wifi, Settings, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface IoControllerData {
  systemMode: "auto" | "manual" | "eco" | "boost"
  remoteAccess: boolean
  autoShutdown: boolean
  dataLogging: boolean
  onSystemModeChange?: (mode: "auto" | "manual" | "eco" | "boost") => void
  onRemoteAccessChange?: (enabled: boolean) => void
  onAutoShutdownChange?: (enabled: boolean) => void
  onDataLoggingChange?: (enabled: boolean) => void
  t: (key: string) => string
}

export const defaultIoControllerSettings = {
  systemMode: "auto" as const,
  remoteAccess: true,
  autoShutdown: true,
  dataLogging: true,
}

const IoControllerNode = ({ data }: { data: IoControllerData }) => {
  const {
    systemMode,
    remoteAccess,
    autoShutdown,
    dataLogging,
    onSystemModeChange,
    onRemoteAccessChange,
    onAutoShutdownChange,
    onDataLoggingChange,
    t,
  } = data

  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected")
  const [showSettings, setShowSettings] = useState(false)

  // Handle system mode change
  const handleSystemModeChange = (mode: "auto" | "manual" | "eco" | "boost") => {
    if (onSystemModeChange) {
      onSystemModeChange(mode)
    }
  }

  const getModeDescription = (mode: "auto" | "manual" | "eco" | "boost") => {
    switch (mode) {
      case "auto":
        return t("Automatically manages system based on conditions")
      case "manual":
        return t("Manual control of all system parameters")
      case "eco":
        return t("Optimizes for energy efficiency")
      case "boost":
        return t("Maximum performance mode")
      default:
        return ""
    }
  }

  return (
    <div className="node-container w-[280px] bg-slate-900/50 rounded-lg border border-slate-700/50 shadow-lg">
      <div className="node-header flex items-center justify-between p-3 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-400" />
          <h3 className="text-node-text font-medium">{t("I/O Controller")}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-500/20 text-foreground border-purple-500">
            {t("SMART-TECH")}
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-slate-800 rounded-md transition-colors"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("Advanced Settings")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="node-content p-3 space-y-4">
        {/* System Mode */}
        <div>
          <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
            {t("System Mode")}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-slate-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getModeDescription(systemMode)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSystemModeChange("auto")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                systemMode === "auto"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                  : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-800"
              )}
            >
              {t("Auto")}
            </button>
            <button
              onClick={() => handleSystemModeChange("manual")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                systemMode === "manual"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                  : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-800"
              )}
            >
              {t("Manual")}
            </button>
            <button
              onClick={() => handleSystemModeChange("eco")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                systemMode === "eco"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-800"
              )}
            >
              {t("Eco")}
            </button>
            <button
              onClick={() => handleSystemModeChange("boost")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                systemMode === "boost"
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                  : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-800"
              )}
            >
              {t("Boost")}
            </button>
          </div>
        </div>

        {/* Remote Access */}
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="text-sm text-slate-400 mb-2">{t("Remote Access")}</div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wifi className={cn("h-4 w-4", remoteAccess ? "text-green-400" : "text-slate-500")} />
              <span className="text-sm text-slate-300">{t("Enable Remote Access")}</span>
            </div>
            <Switch
              checked={remoteAccess}
              onCheckedChange={(checked) => {
                if (onRemoteAccessChange) {
                  onRemoteAccessChange(checked)
                  setConnectionStatus("connecting")
                  setTimeout(() => {
                    setConnectionStatus(checked ? "connected" : "disconnected")
                  }, 1500)
                }
              }}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("w-2 h-2 rounded-full", {
                "bg-green-500": connectionStatus === "connected",
                "bg-amber-500 animate-pulse": connectionStatus === "connecting",
                "bg-red-500": connectionStatus === "disconnected"
              })}
            />
            <span className="text-xs text-slate-400">
              {connectionStatus === "connected"
                ? t("Connected")
                : connectionStatus === "connecting"
                  ? t("Connecting...")
                  : t("Disconnected")}
            </span>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="text-sm text-slate-400 mb-2">{t("System Settings")}</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Power className={cn("h-4 w-4", autoShutdown ? "text-red-400" : "text-slate-500")} />
                <span className="text-sm text-slate-300">{t("Auto Shutdown")}</span>
              </div>
              <Switch
                checked={autoShutdown}
                onCheckedChange={(checked) => {
                  if (onAutoShutdownChange) {
                    onAutoShutdownChange(checked)
                  }
                }}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ToggleLeft className={cn("h-4 w-4", dataLogging ? "text-blue-400" : "text-slate-500")} />
                <span className="text-sm text-slate-300">{t("Data Logging")}</span>
              </div>
              <Switch
                checked={dataLogging}
                onCheckedChange={(checked) => {
                  if (onDataLoggingChange) {
                    onDataLoggingChange(checked)
                  }
                }}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output handles for data connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: "#64748b", width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#64748b", width: 8, height: 8 }}
      />
    </div>
  )
}

export default IoControllerNode