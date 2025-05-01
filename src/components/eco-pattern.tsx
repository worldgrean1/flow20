import React from "react"
import { cn } from "@/lib/utils"

interface EcoPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "leaves" | "waves" | "solar" | "wind"
  intensity?: "light" | "medium" | "dark"
  animate?: boolean
}

export function EcoPattern({
  variant = "leaves",
  intensity = "light",
  animate = false,
  className,
  ...props
}: EcoPatternProps) {
  // Generate different pattern styles based on variant
  const getPatternStyle = () => {
    const baseOpacity = intensity === "light" ? 0.1 : intensity === "medium" ? 0.2 : 0.3
    
    switch (variant) {
      case "leaves":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm0 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z' fill='%2399cc33' fill-opacity='${baseOpacity}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }
      case "waves":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.5 0c6 0 10 4 10 10s-4 10-10 10S11.5 16 11.5 10s4-10 10-10zM0 10c6 0 10 4 10 10H0V10zm100 0c-6 0-10 4-10 10h10V10z' fill='%231e90ff' fill-opacity='${baseOpacity}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 20px",
        }
      case "solar":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f6b93b' fill-opacity='${baseOpacity}' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='10'/%3E%3Cpath d='M20 0v8m0 24v8M0 20h8m24 0h8M5.9 5.9l5.7 5.7m16.8 16.8l5.7 5.7M5.9 34.1l5.7-5.7m16.8-16.8l5.7-5.7'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }
      case "wind":
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='20' viewBox='0 0 80 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h80 M20 0 v20 M60 0 v20' stroke='%2300bfff' stroke-width='1' stroke-opacity='${baseOpacity}'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 20px",
        }
      default:
        return {}
    }
  }

  // Animation styles for when animate is true
  const animationStyle = animate ? {
    animation: variant === "wind" ? "slide 20s linear infinite" : "pulse 8s ease-in-out infinite",
  } : {}

  return (
    <div
      className={cn("eco-pattern absolute inset-0 z-0 overflow-hidden", className)}
      style={{
        ...getPatternStyle(),
        ...animationStyle,
      }}
      {...props}
    />
  )
} 