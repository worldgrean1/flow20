import { cn } from "../../lib/utils"

interface VoltageFlowPathProps {
  pathId: string;
  pathNumber: number;
  isActive: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  voltage?: number;
  current?: number;
  phase?: number;
  showLabels?: boolean;
}

export function VoltageFlowPath({
  pathId,
  pathNumber,
  isActive,
  startX,
  startY,
  endX,
  endY,
  voltage = 0,
  current = 0,
  phase = 0,
  showLabels = true
}: VoltageFlowPathProps) {
  // Path color based on voltage level:
  // 1 = High Voltage (Red)
  // 2 = Medium Voltage (Yellow)
  // 3 = Low Voltage (Green)
  const pathColor = pathNumber === 1 ? "#ef4444" : pathNumber === 2 ? "#eab308" : "#22c55e";
  
  // Calculate path length for animation timing
  const pathLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const animationDuration = Math.max(1, Math.min(3, pathLength / 100));
  
  return (
    <>
      <defs>
        {/* Glow effect for active paths */}
        <filter id={`glow-${pathId}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Gradient for flow effect */}
        <linearGradient id={`flow-gradient-${pathId}`} gradientUnits="userSpaceOnUse"
          x1={startX} y1={startY} x2={endX} y2={endY}>
          <stop offset="0%" stopColor={pathColor} stopOpacity="0.3"/>
          <stop offset="50%" stopColor={pathColor} stopOpacity="0.8"/>
          <stop offset="100%" stopColor={pathColor} stopOpacity="0.3"/>
        </linearGradient>
      </defs>

      {/* Base path with gradient */}
      <path
        id={pathId}
        className={cn(
          "voltage-path",
          `voltage-path-${pathNumber}`,
          isActive && "active"
        )}
        d={`M ${startX} ${startY} L ${endX} ${endY}`}
        stroke={`url(#flow-gradient-${pathId})`}
        strokeWidth={isActive ? "4" : "2"}
        fill="none"
        filter={isActive ? `url(#glow-${pathId})` : ""}
      />

      {/* Animated flow particles */}
      {isActive && (
        <g className="flow-particles">
          {[0, 1, 2].map(i => (
            <circle
              key={`flow-particle-${i}`}
              r="3"
              fill={pathColor}
              filter={`url(#glow-${pathId})`}
            >
              <animateMotion
                dur={`${animationDuration}s`}
                repeatCount="indefinite"
                path={`M ${startX} ${startY} L ${endX} ${endY}`}
                begin={`${i * (animationDuration / 3)}s`}
              />
              <animate
                attributeName="opacity"
                values="1;0"
                dur={`${animationDuration}s`}
                begin={`${i * (animationDuration / 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* Connection points */}
      {isActive && (
        <>
          <circle
            cx={startX}
            cy={startY}
            r="4"
            fill={pathColor}
            filter={`url(#glow-${pathId})`}
            className="animate-pulse"
          />
          <circle
            cx={endX}
            cy={endY}
            r="4"
            fill={pathColor}
            filter={`url(#glow-${pathId})`}
            className="animate-pulse"
          />
        </>
      )}

      {/* Voltage and current labels */}
      {showLabels && isActive && (
        <g transform={`translate(${(startX + endX) / 2}, ${(startY + endY) / 2})`}>
          <text
            x="0"
            y="-10"
            textAnchor="middle"
            fill={pathColor}
            fontSize="10"
            fontWeight="bold"
          >
            {voltage}V
          </text>
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill={pathColor}
            fontSize="10"
          >
            {current}A
          </text>
          {phase > 0 && (
            <text
              x="0"
              y="20"
              textAnchor="middle"
              fill={pathColor}
              fontSize="10"
            >
              Phase {phase}
            </text>
          )}
        </g>
      )}
    </>
  );
} 