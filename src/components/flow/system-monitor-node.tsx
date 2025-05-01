"use client"

import { useState, useEffect } from "react"
import { Handle, Position } from "reactflow"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ArrowUpDown, Battery, Sun, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface SystemMonitorData {
  batteryLevel: number
  solarProduction: number
  powerConsumption: number
  systemEfficiency: number
  t: (key: string) => string
}

export const defaultSystemMonitorSettings = {
  batteryLevel: 75,
  solarProduction: 180,
  powerConsumption: 150,
  systemEfficiency: 92,
}

// Generate mock historical data
const generateHistoricalData = () => {
  const data = []
  const now = new Date()
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000)
    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      solar: Math.round(Math.random() * 200),
      consumption: Math.round(Math.random() * 180),
      battery: Math.round(Math.random() * 100),
    })
  }
  return data
}

const SystemMonitorNode = ({ data }: { data: SystemMonitorData }) => {
  const { batteryLevel, solarProduction, powerConsumption, systemEfficiency, t } = data
  const [historicalData, setHistoricalData] = useState(generateHistoricalData())
  const [activeTab, setActiveTab] = useState<"solar" | "consumption" | "battery">("solar")

  // Update historical data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHistoricalData((prev) => {
        const newData = [...prev.slice(1)]
        const lastTime = new Date()
        const currentBatteryLevel = parseFloat(batteryLevel.toString())

        newData.push({
          time: lastTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          solar: solarProduction,
          consumption: powerConsumption,
          battery: currentBatteryLevel,
        })

        return newData
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [solarProduction, powerConsumption, batteryLevel])

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-4 w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-blue-400" />
          <h3 className="text-white font-medium">{t("System Monitor")}</h3>
        </div>
        <Badge variant="outline" className="bg-purple-500/20 text-foreground border-purple-500">
          {t("SMART-TECH")}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div
          className={`flex flex-col items-center p-2 rounded-md cursor-pointer transition-colors ${
            activeTab === "solar"
              ? "bg-amber-500/20 border border-amber-500/50"
              : "bg-slate-800/50 border border-slate-700/50"
          }`}
          onClick={() => setActiveTab("solar")}
        >
          <Sun className="h-4 w-4 text-amber-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Solar")}</span>
          <span className="text-sm font-medium text-amber-400">{solarProduction}W</span>
        </div>

        <div
          className={`flex flex-col items-center p-2 rounded-md cursor-pointer transition-colors ${
            activeTab === "consumption"
              ? "bg-purple-500/20 border border-purple-500/50"
              : "bg-slate-800/50 border border-slate-700/50"
          }`}
          onClick={() => setActiveTab("consumption")}
        >
          <Zap className="h-4 w-4 text-purple-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Usage")}</span>
          <span className="text-sm font-medium text-purple-400">{powerConsumption}W</span>
        </div>

        <div
          className={`flex flex-col items-center p-2 rounded-md cursor-pointer transition-colors ${
            activeTab === "battery"
              ? "bg-green-500/20 border border-green-500/50"
              : "bg-slate-800/50 border border-slate-700/50"
          }`}
          onClick={() => setActiveTab("battery")}
        >
          <Battery className="h-4 w-4 text-green-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Battery")}</span>
          <span className="text-sm font-medium text-green-400">{Number(batteryLevel).toFixed(2)}%</span>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-md p-2 h-[140px] mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={{ stroke: "#475569" }}
              axisLine={{ stroke: "#475569" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={{ stroke: "#475569" }}
              axisLine={{ stroke: "#475569" }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#475569",
                color: "#f8fafc",
              }}
              itemStyle={{ color: "#f8fafc" }}
              labelStyle={{ color: "#94a3b8" }}
            />
            {activeTab === "solar" && (
              <Line
                type="monotone"
                dataKey="solar"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#f59e0b" }}
              />
            )}
            {activeTab === "consumption" && (
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#a855f7" }}
              />
            )}
            {activeTab === "battery" && (
              <Line
                type="monotone"
                dataKey="battery"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#22c55e" }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-800/50 p-2 rounded-md">
          <div className="text-xs text-slate-400 mb-1">{t("System Efficiency")}</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">{systemEfficiency}%</span>
            <div className="w-24 h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  systemEfficiency > 90 ? "bg-green-500" : systemEfficiency > 75 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${systemEfficiency}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-2 rounded-md">
          <div className="text-xs text-slate-400 mb-1">{t("Energy Balance")}</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">
              {solarProduction > powerConsumption ? "+" : ""}
              {solarProduction - powerConsumption}W
            </span>
            <div
              className={`px-2 py-0.5 rounded text-xs ${
                solarProduction > powerConsumption ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              {solarProduction > powerConsumption ? t("Surplus") : t("Deficit")}
            </div>
          </div>
        </div>
      </div>

      {/* Input handle for data connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: "#64748b", width: 8, height: 8 }}
      />
    </div>
  )
}

export default SystemMonitorNode
