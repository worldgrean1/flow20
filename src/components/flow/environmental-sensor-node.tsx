"use client"

import { useState, useEffect } from "react"
import { Handle, Position } from "reactflow"
import { Cloud, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface EnvironmentalSensorData {
  temperature: number
  humidity: number
  sunIntensity: number
  windSpeed: number
  cloudCover: number
  onWeatherChange?: (weather: any) => void
  t: (key: string) => string
}

export const defaultEnvironmentalSensorSettings = {
  temperature: 25,
  humidity: 45,
  sunIntensity: 80,
  windSpeed: 12,
  cloudCover: 20,
}

const EnvironmentalSensorNode = ({ data }: { data: EnvironmentalSensorData }) => {
  const { temperature, humidity, sunIntensity, windSpeed, cloudCover, t } = data
  const [isUpdating, setIsUpdating] = useState(false)

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => setIsUpdating(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get temperature color based on value
  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return "text-red-500"
    if (temp >= 20) return "text-orange-400"
    if (temp >= 10) return "text-green-400"
    return "text-blue-400"
  }

  // Get humidity color based on value
  const getHumidityColor = (hum: number) => {
    if (hum >= 70) return "text-blue-500"
    if (hum >= 40) return "text-green-400"
    if (hum >= 20) return "text-yellow-400"
    return "text-orange-500"
  }

  // Get sun intensity color based on value
  const getSunIntensityColor = (intensity: number) => {
    if (intensity >= 80) return "text-amber-400"
    if (intensity >= 50) return "text-yellow-400"
    if (intensity >= 20) return "text-orange-300"
    return "text-slate-400"
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-4 w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-green-400" />
          <h3 className="text-white font-medium">{t("Environmental Sensor")}</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/20 text-foreground border-green-500">
          {t("SMART-TECH")}
        </Badge>
      </div>

      <div className={`relative bg-slate-800/50 rounded-lg p-3 mb-3 ${isUpdating ? "animate-pulse" : ""}`}>
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-500 m-2 animate-ping"></div>

        <div className="grid grid-cols-2 gap-3">
          {/* Temperature */}
          <div className="flex items-center gap-2">
            <Thermometer className={`h-5 w-5 ${getTemperatureColor(temperature)}`} />
            <div>
              <div className="text-xs text-slate-400">{t("Temperature")}</div>
              <div className={`text-sm font-medium ${getTemperatureColor(temperature)}`}>{temperature}°C</div>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-2">
            <Droplets className={`h-5 w-5 ${getHumidityColor(humidity)}`} />
            <div>
              <div className="text-xs text-slate-400">{t("Humidity")}</div>
              <div className={`text-sm font-medium ${getHumidityColor(humidity)}`}>{humidity}%</div>
            </div>
          </div>

          {/* Sun Intensity */}
          <div className="flex items-center gap-2">
            <Sun className={`h-5 w-5 ${getSunIntensityColor(sunIntensity)}`} />
            <div>
              <div className="text-xs text-slate-400">{t("Sun Intensity")}</div>
              <div className={`text-sm font-medium ${getSunIntensityColor(sunIntensity)}`}>{sunIntensity}%</div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-xs text-slate-400">{t("Wind Speed")}</div>
              <div className="text-sm font-medium text-blue-400">{windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* Cloud Cover */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Cloud className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-400">{t("Cloud Cover")}</span>
            </div>
            <span className="text-xs text-slate-300">{cloudCover}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400" style={{ width: `${cloudCover}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-3">
        <div className="text-xs text-slate-400 mb-2">{t("Weather Impact")}</div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-300">{t("Solar Efficiency")}</div>
          <div className="text-xs font-medium text-white">{Math.round(sunIntensity * (1 - cloudCover / 100))}%</div>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1 mb-2">
          <div
            className="h-full bg-amber-500"
            style={{ width: `${Math.round(sunIntensity * (1 - cloudCover / 100))}%` }}
          ></div>
        </div>

        <div className="text-xs text-slate-400 mt-2">
          {t("Optimal Conditions")}:
          <span className={`ml-1 ${sunIntensity > 70 && cloudCover < 30 ? "text-green-400" : "text-slate-300"}`}>
            {sunIntensity > 70 && cloudCover < 30 ? t("Yes") : t("No")}
          </span>
        </div>
      </div>

      {/* Output handle for data connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#64748b", width: 8, height: 8 }}
      />
    </div>
  )
}

export default EnvironmentalSensorNode
