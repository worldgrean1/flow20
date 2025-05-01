"use client"

import { useCallback } from "react"
import { type EdgeProps, getSmoothStepPath, EdgeLabelRenderer } from "reactflow"

// Extended edge data type with cable type information
interface EdgeData {
  energyFlow: "input" | "output" | "data"
  active: boolean
  wattage?: string
  voltage?: string
  cableType?: "highVoltage" | "lowVoltage" | "medium" | "data" | "ground" | "acTransmission" | "dcTransmission" | "solarMain" | "generatorMain"
  phases?: 1 | 3
  label?: string
  source?: string
  target?: string
  isTransformerConnection?: boolean
}

// Custom edge component for energy flow
export default function CustomEnergyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  source,
  target,
}: EdgeProps<EdgeData>) {
  // If transformer is connected, use more complex path
  const isTransformerConnection = 
    data?.isTransformerConnection || 
    source?.includes('transformer') || 
    target?.includes('transformer');
    
  // Get the path for a smooth step edge
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: isTransformerConnection ? 30 : 20, // Increase radius for transformer connections
  })

  // Determine edge color based on energy flow, active state, and cable type
  const getEdgeColor = useCallback(() => {
    if (!data?.active) return "#64748b" // Inactive edge color
    
    if (data?.cableType === "generatorMain") return "#f97316"; // Orange for generator main
    if (data?.cableType === "highVoltage") return "#f97316" // Orange for high voltage
    if (data?.cableType === "lowVoltage") return "#22c55e" // Green for low voltage
    if (data?.cableType === "data") return "#8b5cf6" // Purple for data
    if (data?.cableType === "ground") return "#6b7280" // Gray for ground
    if (data?.cableType === "acTransmission") return "#ef4444" // Red for AC
    if (data?.cableType === "dcTransmission") return "#3b82f6" // Blue for DC

    // If no specific cable type, use energy flow
    if (data?.energyFlow === "input") {
      return "#22c55e" // Green for input energy
    } else if (data?.energyFlow === "output") {
      return "#f97316" // Orange for output energy
    } else {
      return "#8b5cf6" // Purple for data flow
    }
  }, [data])

  // Determine edge width based on cable type and phases
  const getEdgeWidth = useCallback(() => {
    if (!data?.active) return 2;

    if (data?.cableType === "solarMain") return 12;
    if (data?.cableType === "generatorMain") return 12;
    if (data?.cableType === "highVoltage") return 5;
    if (data?.cableType === "acTransmission") return 4;
    if (data?.cableType === "lowVoltage") return 3;
    if (data?.cableType === "data") return 1.5;
    if (data?.cableType === "ground") return 2;
    
    // Consider phases for transformer connections
    if (isTransformerConnection && data?.phases === 3) return 4;
    if (isTransformerConnection) return 3;
    
    return 3;  // Default
  }, [data, isTransformerConnection])

  // Determine edge style based on cable properties
  const getEdgeStyle = useCallback(() => {
    const strokeWidth = getEdgeWidth();
    const strokeColor = getEdgeColor();
    
    // Base style
    const baseStyle = {
      ...style,
      stroke: strokeColor,
      strokeWidth,
    };

    // Cable appearance by type
    if (!data?.active) {
      return {
        ...baseStyle,
        strokeDasharray: "5,5",
        opacity: 0.6,
      };
    }
    
    if (data?.cableType === "data") {
      return {
        ...baseStyle,
        strokeDasharray: "3,3",
      };
    }
    
    if (data?.cableType === "ground") {
      return {
        ...baseStyle,
        strokeDasharray: "10,3",
      };
    }
    
    // Special transformer styles
    if (isTransformerConnection) {
      if (data?.cableType === "highVoltage") {
        return {
          ...baseStyle,
          strokeLinecap: "round" as const,
          filter: data.active ? "drop-shadow(0 0 2px rgba(249, 115, 22, 0.5))" : "",
        };
      }
      
      if (data?.cableType === "lowVoltage") {
        return {
          ...baseStyle,
          strokeLinecap: "round" as const,
          // For 3-phase connections, show parallel lines
          strokeDasharray: data?.phases === 3 ? "0,0" : "0,0",
          filter: data.active ? "drop-shadow(0 0 2px rgba(34, 197, 94, 0.5))" : "",
        };
      }
    }
    
    // AC/DC visualizations
    if (data?.cableType === "acTransmission") {
      return {
        ...baseStyle,
        strokeLinecap: "round" as const,
        filter: data.active ? "drop-shadow(0 0 3px rgba(239, 68, 68, 0.4))" : "",
      }
    }
    
    if (data?.cableType === "dcTransmission") {
      return {
        ...baseStyle,
        strokeLinecap: "round" as const,
        filter: data.active ? "drop-shadow(0 0 3px rgba(59, 130, 246, 0.4))" : "",
      }
    }

    return baseStyle;
  }, [data, style, getEdgeColor, getEdgeWidth, isTransformerConnection])

  // Cable pattern path for 3-phase connections
  const renderPhaseIndicators = useCallback(() => {
    if (!isTransformerConnection || !data?.active || data?.phases !== 3) return null;
    
    // Offset path for phase indicators
    const phasePathStyle = {
      ...getEdgeStyle(),
      strokeWidth: 1,
      strokeDasharray: "3,6",
      opacity: 0.8,
    };
    
    // Create 2 parallel lines to simulate 3-phase
    return (
      <>
        <path 
          style={phasePathStyle} 
          className="react-flow__edge-path" 
          d={edgePath} 
          strokeWidth={1}
          transform="translate(0, 3)"
        />
        <path 
          style={phasePathStyle} 
          className="react-flow__edge-path" 
          d={edgePath} 
          strokeWidth={1}
          transform="translate(0, -3)"
        />
      </>
    );
  }, [data, edgePath, getEdgeStyle, isTransformerConnection]);

  // Create enhanced label with voltage information
  const renderEnhancedLabel = useCallback(() => {
    if (!data?.wattage && !data?.voltage && !data?.label) return null;
    
    const bgColor = data.active 
      ? data?.cableType === "highVoltage" 
        ? "rgba(249, 115, 22, 0.8)" 
        : data?.cableType === "lowVoltage" 
          ? "rgba(34, 197, 94, 0.8)"
          : data?.cableType === "data"
            ? "rgba(139, 92, 246, 0.8)"
            : "rgba(0, 0, 0, 0.7)"
      : "rgba(0, 0, 0, 0.4)";
      
    const labelText = data.label || 
      (data.wattage && data.voltage) 
        ? `${data.wattage} | ${data.voltage}` 
        : data.wattage || data.voltage || "";
    
    return (
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            backgroundColor: bgColor,
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            color: data.active ? "#ffffff" : "#cbd5e1",
            border: data.active ? "1px solid rgba(255,255,255,0.2)" : "none",
            boxShadow: data.active ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
          }}
          className="nodrag nopan"
        >
          {labelText}
        </div>
      </EdgeLabelRenderer>
    )
  }, [data, labelX, labelY]);

  return (
    <>
      {/* Main path */}
      <path 
        id={id} 
        style={getEdgeStyle()} 
        className="react-flow__edge-path" 
        d={edgePath} 
        markerEnd={markerEnd} 
      />
      
      {/* Phase indicators for 3-phase connections */}
      {renderPhaseIndicators()}
      
      {/* Enhanced label */}
      {renderEnhancedLabel()}
    </>
  )
}
