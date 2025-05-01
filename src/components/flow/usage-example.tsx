import { useCallback, useEffect } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  NodeTypes,
  Node
} from 'reactflow'

// Import the custom node component
import PoliceBeaconNode from './police-beacon-node'
import ThreePhaseTransformerNode from './three-phase-transformer-node'

// Import styles
import 'reactflow/dist/style.css'

// Define common interfaces for our node data types
interface BaseNodeData {
  [key: string]: any;
}

interface TransformerNodeData extends BaseNodeData {
  transformerOn: boolean;
  gridConnected: boolean;
  loadPercentage: number;
  onTransformerChange: (value: boolean) => void;
}

interface BeaconNodeData extends BaseNodeData {
  isActive: boolean;
  enableSound?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  onToggleSound?: () => void;
}

// Create a union type for all possible node data
type FlowNodeData = TransformerNodeData | BeaconNodeData;

// Define the custom node types
const nodeTypes: NodeTypes = {
  policeBeacon: PoliceBeaconNode,
  threePhaseTransformer: ThreePhaseTransformerNode,
}

const PoliceBeaconExample = () => {
  // Define initial nodes with proper typing
  const initialNodes: Node<FlowNodeData>[] = [
    {
      id: 'transformer-1',
      type: 'threePhaseTransformer',
      position: { x: 100, y: 200 },
      data: {
        transformerOn: false,
        gridConnected: true,
        loadPercentage: 70,
        onTransformerChange: (value: boolean) => {
          setNodes((nds) => {
            return nds.map((node) => {
              if (node.id === 'transformer-1') {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    transformerOn: value,
                  },
                }
              } else if (node.id === 'beacon-1') {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    isActive: value,
                  },
                }
              }
              return node
            })
          })
        },
      },
    },
    {
      id: 'beacon-1',
      type: 'policeBeacon',
      position: { x: 550, y: 100 },
      data: {
        isActive: false,
        enableSound: true,
        label: '⚠️ HIGH VOLTAGE',
        size: 'md',
        onToggleSound: () => {
          setNodes((nds) => {
            return nds.map((node) => {
              if (node.id === 'beacon-1') {
                const beaconData = node.data as BeaconNodeData;
                return {
                  ...node,
                  data: {
                    ...node.data,
                    enableSound: !beaconData.enableSound,
                  },
                }
              }
              return node
            })
          })
        },
      },
    },
    {
      id: 'beacon-2',
      type: 'policeBeacon',
      position: { x: 550, y: 300 },
      data: {
        isActive: false,
        enableSound: false,
        label: '⚠️ DANGER ZONE',
        size: 'lg',
      },
    },
  ]

  // Define initial edges
  const initialEdges = [
    {
      id: 'e1-2',
      source: 'transformer-1',
      sourceHandle: 'output',
      target: 'beacon-1',
      targetHandle: 'input',
      animated: false,
      style: { stroke: '#3b82f6' },
    },
    {
      id: 'e1-3',
      source: 'transformer-1',
      sourceHandle: 'output',
      target: 'beacon-2',
      targetHandle: 'input',
      animated: false,
      style: { stroke: '#3b82f6' },
    },
  ]

  // Initialize nodes and edges with React Flow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update edges when transformer is activated
  useEffect(() => {
    const transformerNode = nodes.find(node => node.id === 'transformer-1');
    if (transformerNode) {
      const transformerData = transformerNode.data as TransformerNodeData;
      const isActive = transformerData.transformerOn;
      
      // Update beacons state based on transformer state
      setNodes((nds) => {
        return nds.map((node) => {
          if (node.id.startsWith('beacon-')) {
            return {
              ...node,
              data: {
                ...node.data,
                isActive,
              },
            }
          }
          return node
        })
      })
      
      // Update edge animations based on transformer state
      setEdges((eds) => {
        return eds.map((edge) => {
          return {
            ...edge,
            animated: isActive,
          }
        })
      })
    }
  }, [nodes, setNodes, setEdges])

  // Handle new connections
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#f8f8f8" gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

export default PoliceBeaconExample 