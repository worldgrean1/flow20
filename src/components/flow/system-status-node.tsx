import { Handle, Position, type NodeProps } from "reactflow"
import { cn } from "@/lib/utils"
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react"
import { ThemeInfo } from "../ui/theme-info"

interface SystemStatusData {
  solarProduction: number
  batteryLevel: number
  energyFlow: "charging" | "discharging" | "balanced"
  totalConsumption: number
  systemSecurity?: "secure" | "warning" | "breach"
  t: (key: string) => string
}

// Default settings for the System Status Node
export const defaultSystemStatusSettings = {
  solarProduction: 180,
  batteryLevel: 65,
  energyFlow: "charging" as "charging" | "discharging" | "balanced",
  totalConsumption: 150,
  systemSecurity: "secure" as "secure" | "warning" | "breach",
}

function SystemStatusNode({ data }: NodeProps<SystemStatusData>) {
  const { t } = data

  // Determine security status icon and color
  const getSecurityStatus = () => {
    switch (data.systemSecurity) {
      case "secure":
        return {
          icon: <ShieldCheck className="h-5 w-5 text-green-400" />,
          text: "System Secure",
          color: "text-green-400",
          bgColor: "bg-green-900/20",
          borderColor: "border-green-500/30",
        }
      case "warning":
        return {
          icon: <ShieldAlert className="h-5 w-5 text-yellow-400" />,
          text: "Security Warning",
          color: "text-yellow-400",
          bgColor: "bg-yellow-900/20",
          borderColor: "border-yellow-500/30",
        }
      case "breach":
        return {
          icon: <Shield className="h-5 w-5 text-red-400" />,
          text: "Security Breach",
          color: "text-red-400",
          bgColor: "bg-red-900/20",
          borderColor: "border-red-500/30",
        }
      default:
        return {
          icon: <ShieldCheck className="h-5 w-5 text-green-400" />,
          text: "System Secure",
          color: "text-green-400",
          bgColor: "bg-green-900/20",
          borderColor: "border-green-500/30",
        }
    }
  }

  const securityStatus = getSecurityStatus()

  return (
    <div className="w-full">
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{ background: "#3b82f6", width: "10px", height: "10px" }}
        isConnectable={true}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{ background: "#3b82f6", width: "10px", height: "10px" }}
        isConnectable={true}
      />

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-lime-600/20 dark:bg-slate-800/80 dark:border-lime-600/20">
        {/* SAFE-GUARD Security Status */}
        <div
          className={cn(
            "mb-4 p-2 rounded-md flex items-center justify-between",
            securityStatus.bgColor,
            securityStatus.borderColor,
          )}
        >
          <div className="flex items-center">
            {securityStatus.icon}
            <span className={cn("ml-2 font-medium", securityStatus.color)}>{t(securityStatus.text)}</span>
          </div>
          <div className={cn("text-xs px-2 py-0.5 rounded-full", securityStatus.bgColor, securityStatus.color)}>
            SAFE-GUARD
          </div>
        </div>

        {/* Theme Info Component */}
        <div className="mb-4">
          <ThemeInfo />
        </div>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium text-slate-300 mb-1">{t("Solar Production")}</div>
            <div className="text-xl font-bold text-white dark:text-white">{data.solarProduction}W</div>
            <div className="mt-1 w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${Math.min(100, (data.solarProduction / 200) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm font-medium text-slate-300 mb-1">{t("Battery Status")}</div>
            <div
              className={cn(
                "text-xl font-bold",
                data.energyFlow === "charging"
                  ? "text-lime-400"
                  : data.energyFlow === "discharging"
                    ? "text-red-400"
                    : "text-blue-400",
              )}
            >
              {data.energyFlow === "charging"
                ? t("Charging")
                : data.energyFlow === "discharging"
                  ? t("Discharging")
                  : t("Balanced")}
            </div>
            <div className="mt-1 w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full",
                  data.batteryLevel > 70 ? "bg-green-500" : data.batteryLevel > 30 ? "bg-yellow-500" : "bg-red-500",
                )}
                style={{ width: `${data.batteryLevel}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-sm font-medium text-slate-300 mb-1">{t("Power Consumption")}</div>
            <div className="text-xl font-bold text-white dark:text-white">{data.totalConsumption}W</div>
            <div className="mt-1 w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.min(100, (data.totalConsumption / 200) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Net power balance */}
        <div className="mt-4 pt-3 border-t border-slate-700/50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">{t("Net Power Balance")}</span>
            <span
              className={cn(
                "text-sm font-bold",
                data.solarProduction > data.totalConsumption ? "text-lime-400" : "text-red-400",
              )}
            >
              {data.solarProduction - data.totalConsumption}W
            </span>
          </div>
          <div className="mt-1 w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500",
                data.solarProduction > data.totalConsumption ? "bg-lime-500" : "bg-red-500",
              )}
              style={{
                width: `${Math.min(100, Math.abs((data.solarProduction - data.totalConsumption) / 2))}%`,
                marginLeft:
                  data.solarProduction >= data.totalConsumption
                    ? "50%"
                    : `${50 - Math.min(50, Math.abs((data.solarProduction - data.totalConsumption) / 4))}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemStatusNode
