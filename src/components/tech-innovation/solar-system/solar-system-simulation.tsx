"use client"

import { useState, useEffect, useCallback } from "react"
import ReactFlow, { ReactFlowProvider, Background, Controls, Node, Edge } from "reactflow"
import "reactflow/dist/style.css"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getLayoutedElements, layoutOptions } from "../../../lib/elk-layout"
import { LayoutControls } from "../../../components/ui/layout-controls"

// Weather conditions type
type WeatherCondition = "sunny" | "cloudy" | "rainy"

// Main component
export function SolarSystemSimulation({
  initialLayout,
}: {
  initialLayout?: Record<string, { x: number; y: number }> | null
  isSharedLayout?: boolean
} = {}) {
  return (
    <TooltipProvider>
      <ReactFlowProvider>
        <Flow initialLayout={initialLayout} />
        <div className="sr-only" aria-live="polite" id="flow-announcements"></div>
      </ReactFlowProvider>
    </TooltipProvider>
  )
}

// Define a well-designed default layout for all components
const defaultComponentLayout = {
  "solar-panel": {
    x: 465,
    y: -120,
  },
  "charge-controller": {
    x: 705,
    y: 375,
  },
  battery: {
    x: 990,
    y: 525,
  },
  inverter: {
    x: 150,
    y: 585,
  },
  "distribution-panel": {
    x: -165,
    y: 450,
  },
  "system-status": {
    x: 510,
    y: -240,
  },
  "ethiopia-map": {
    x: -180,
    y: -195,
  },
  "weather-controls": {
    x: -150,
    y: 165,
  },
  "breaker-panel": {
    x: 1050,
    y: -165,
  },
  "backup-generator": {
    x: 405,
    y: 585,
  },
  "sensor-node": {
    x: 1350,
    y: -195,
  },
  "io-controller": {
    x: 1320,
    y: 450,
  },
  "load-device": {
    x: 195,
    y: -75,
  },
}

function Flow({
  initialLayout,
}: {
  initialLayout?: Record<string, { x: number; y: number }> | null
}) {
  // System state - only keep what's used in the UI
  const [batteryLevel] = useState(100)
  const [weatherCondition] = useState<WeatherCondition>("sunny")
  const [totalConsumption] = useState(90)
  const [solarProduction] = useState(120)
  const [netPower, setNetPower] = useState(30)
  
  // Add nodes and edges state for diagram
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, _setEdges] = useState<Edge[]>([])
  
  // Loading state for layouts
  const [isLayouting, setIsLayouting] = useState(false)
  const [currentLayoutType, setCurrentLayoutType] = useState<keyof typeof layoutOptions | null>(null)

  // Layout storage
  const [_savedLayout, setSavedLayout] = useLocalStorage<Record<string, { x: number; y: number }>>(
    "solar-system-layout",
    defaultComponentLayout
  )

  useEffect(() => {
    // Update net power calculation
    const netPowerValue = solarProduction - totalConsumption
    setNetPower(netPowerValue)
  }, [solarProduction, totalConsumption])

  // Use the initialLayout prop
  useEffect(() => {
    if (initialLayout && Object.keys(initialLayout).length > 0) {
      setSavedLayout(initialLayout)
    }
  }, [initialLayout, setSavedLayout])
  
  // Apply layout function
  const applyLayout = useCallback(async (layoutType: keyof typeof layoutOptions) => {
    if (isLayouting || nodes.length === 0) return
    
    setIsLayouting(true)
    setCurrentLayoutType(layoutType)
    
    try {
      const options = layoutOptions[layoutType]
      const { nodes: layoutedNodes, edges: _layoutedEdges } = await getLayoutedElements(
        nodes,
        edges,
        options
      )
      
      // Apply layout with animation and active class
      setNodes([...layoutedNodes].map(node => ({ 
        ...node, 
        style: { ...node.style, transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' } 
      })))
      
      // Reset transition after animation completes
      setTimeout(() => {
        setNodes(prevNodes => prevNodes.map(node => ({
          ...node,
          style: { ...node.style, transition: undefined }
        })))
        
        // Save the new layout
        const newLayout: Record<string, { x: number; y: number }> = {}
        layoutedNodes.forEach(node => {
          newLayout[node.id] = { x: node.position.x, y: node.position.y }
        })
        setSavedLayout(newLayout)
      }, 800)
    } catch (error) {
      console.error('Error applying layout:', error)
    } finally {
      setTimeout(() => {
        setIsLayouting(false)
        setCurrentLayoutType(null)
      }, 800) // Match the transition duration
    }
  }, [nodes, edges, isLayouting, setSavedLayout])
  
  return (
    <div className="solar-system-flow relative h-[800px] w-full overflow-hidden rounded-lg border bg-background">
      <div className="absolute top-4 right-4 z-10">
        <LayoutControls onApplyLayout={applyLayout} className="bg-opacity-80" />
      </div>
      {isLayouting && (
        <div className="layout-loading">
          <div className="layout-loading__spinner"></div>
          <div className="layout-loading__text">
            {currentLayoutType === 'tree' && 'Organizing solar components in tree structure...'}
            {currentLayoutType === 'force' && 'Calculating natural energy flow positions...'}
            {currentLayoutType === 'layered' && 'Creating energy flow layers for optimal visibility...'}
            {currentLayoutType === 'hierarchical' && 'Creating bottom-up energy flow hierarchy...'}
            {!currentLayoutType && 'Optimizing solar system layout...'}
          </div>
        </div>
      )}
      <ReactFlow
        className={`solar-system-simulation ${isLayouting ? 'layout-transition active' : ''}`}
        nodes={nodes}
        edges={edges}
        onNodesChange={(_changes) => setNodes(nds => nds.map(n => ({ ...n })))}
        nodesDraggable={true}
        nodesConnectable={true}
        snapToGrid={true}
        snapGrid={[20, 20]}
        attributionPosition="bottom-left"
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
      
      <div className="absolute bottom-4 left-4 p-4 bg-white bg-opacity-90 rounded-md shadow-md">
        <h3 className="text-lg font-medium">System Status</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <div>Weather: {weatherCondition}</div>
          <div>Solar: {solarProduction}W</div>
          <div>Battery: {batteryLevel}%</div>
          <div>Net Power: {netPower}W</div>
        </div>
      </div>
    </div>
  );
} 