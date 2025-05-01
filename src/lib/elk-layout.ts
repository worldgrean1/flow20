import ELK from 'elkjs/lib/elk.bundled.js';
import { Node, Edge } from 'reactflow';

// Initialize the ELK instance with explicit configuration and timeouts
const elk = new ELK({
  defaultLayoutOptions: {
    'elk.algorithm': 'layered',
    'elk.padding': '[50, 50, 50, 50]',
    'elk.edgeRouting': 'ORTHOGONAL',
    'elk.aspectRatio': '1.6',
    'elk.spacing.componentComponent': '25',
    'elk.layered.spacing': '25',
    'elk.interactive': 'true'
  }
});

// Default configuration for the tree layout
const elkOptions = {
  'algorithm': 'layered',
  'elk.direction': 'DOWN',
  'elk.spacing.nodeNode': '50',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100'
};

// Convert ReactFlow nodes and edges to ELK format
export function toElkGraph(nodes: Node[], edges: Edge[]) {
  // Ensure nodes have valid dimensions
  const elkNodes = nodes.map(node => ({
    id: node.id,
    width: node.width || 150,
    height: node.height || 50,
    x: node.position.x,
    y: node.position.y,
  }));

  // Ensure edges have valid source and target
  const elkEdges = edges.map(edge => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target]
  }));

  return {
    id: 'root',
    children: elkNodes,
    edges: elkEdges
  };
}

// Cache for layout results to avoid unnecessary calculations
const layoutCache = new Map();

// Apply ELK layout and update ReactFlow nodes
export async function getLayoutedElements(nodes: Node[], edges: Edge[], options = {}) {
  if (nodes.length === 0) {
    console.warn("No nodes to layout");
    return { nodes, edges };
  }

  // Create a cache key based on nodes, edges, and options
  const cacheKey = JSON.stringify({
    nodesCount: nodes.length,
    edgesCount: edges.length,
    options
  });

  // Check if we have a cached result
  if (layoutCache.has(cacheKey)) {
    console.log("Using cached layout result");
    return layoutCache.get(cacheKey);
  }

  const elkGraph = toElkGraph(nodes, edges);
  
  const layoutOptions = {
    ...elkOptions,
    ...options
  };

  try {
    console.time('ELK Layout Calculation');
    // Add a timeout promise to avoid infinite calculations
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Layout calculation timed out')), 5000);
    });

    // Race the layout calculation against the timeout
    const elkLayoutedGraph = await Promise.race([
      elk.layout(elkGraph, { layoutOptions }),
      timeoutPromise
    ]) as any;

    console.timeEnd('ELK Layout Calculation');

    if (!elkLayoutedGraph.children || elkLayoutedGraph.children.length === 0) {
      console.warn("ELK layout returned no children");
      return { nodes, edges };
    }

    // Apply the calculated positions to the original nodes
    const layoutedNodes = nodes.map(node => {
      const elkNode = elkLayoutedGraph.children?.find((elkNode: any) => elkNode.id === node.id);
      
      if (elkNode && elkNode.x !== undefined && elkNode.y !== undefined) {
        return {
          ...node,
          position: {
            x: elkNode.x,
            y: elkNode.y
          },
          // Add data for animation
          data: {
            ...node.data,
            layoutTransition: {
              fromX: node.position.x,
              fromY: node.position.y,
              toX: elkNode.x,
              toY: elkNode.y
            }
          }
        };
      }
      
      return node;
    });

    const result = { nodes: layoutedNodes, edges };
    
    // Cache the result for future use
    layoutCache.set(cacheKey, result);
    
    // Limit cache size to avoid memory issues
    if (layoutCache.size > 10) {
      // Remove the oldest entry
      const firstKey = layoutCache.keys().next().value;
      layoutCache.delete(firstKey);
    }
    
    return result;
  } catch (error) {
    console.error("Error applying ELK layout:", error);
    console.error("Layout options used:", JSON.stringify(layoutOptions, null, 2));
    console.error("ELK graph input:", JSON.stringify({
      ...elkGraph,
      children: elkGraph.children?.length + " nodes",
      edges: elkGraph.edges?.length + " edges"
    }, null, 2));
    
    // Return the original nodes and edges in case of error
    return { nodes, edges };
  }
}

// Alternative layout configurations
export const layoutOptions = {
  tree: {
    'algorithm': 'mrtree',
    'elk.direction': 'RIGHT',
    'elk.spacing.nodeNode': '80',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX'
  },
  force: {
    'algorithm': 'force',
    'elk.force.springLength': '100',
    'elk.force.iterations': '300',
    'elk.force.repulsivePower': '0.5'
  },
  layered: {
    'algorithm': 'layered',
    'elk.direction': 'DOWN',
    'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
    'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
    'elk.spacing.nodeNode': '50',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100'
  },
  hierarchical: {
    'algorithm': 'layered',
    'elk.direction': 'UP',
    'elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
    'elk.layered.spacing.nodeNodeBetweenLayers': '150',
    'elk.layered.thoroughness': '7',
    'elk.spacing.componentComponent': '100',
    'elk.spacing.nodeNode': '75'
  },
  // Power System layout with main sources on left
  powerSystem: {
    'algorithm': 'layered',
    'elk.direction': 'RIGHT',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
    'elk.layered.crossingMinimization.strategy': 'INTERACTIVE',
    'elk.layered.crossingMinimization.forceNodeModelOrder': 'true',
    'elk.spacing.nodeNode': '80',
    'elk.layered.spacing.nodeNodeBetweenLayers': '120',
    'elk.layered.layering.strategy': 'INTERACTIVE',
    'elk.partitioning.activate': 'true',
    'elk.hierarchical.rankConstraints': '[{"type":"SAME_LAYER","elements":["transformer-1"],"layer":1},{"type":"SAME_LAYER","elements":["solar-1"],"layer":2},{"type":"SAME_LAYER","elements":["generator-1"],"layer":3},{"type":"SAME_LAYER","elements":["battery-1"],"layer":4}]'
  },
  // Power Sources Column layout - rotated 90 degrees left (power sources on right)
  powerSourcesColumn: {
    'algorithm': 'layered',
    'elk.direction': 'LEFT',
    'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
    'elk.layered.crossingMinimization.strategy': 'INTERACTIVE',
    'elk.layered.crossingMinimization.forceNodeModelOrder': 'true',
    'elk.spacing.nodeNode': '60',
    'elk.layered.spacing.nodeNodeBetweenLayers': '80',
    'elk.layered.layering.strategy': 'INTERACTIVE',
    'elk.partitioning.activate': 'true',
    'elk.hierarchical.rankConstraints': '[{"type":"SAME_LAYER","elements":["transformer-1"],"layer":1,"position":200},{"type":"SAME_LAYER","elements":["solar-1","generator-1"],"layer":1},{"type":"SAME_LAYER","elements":["weather-1"],"layer":0}]',
    'elk.partitioning.partition': '[{"id":"powerSources","nodes":["transformer-1","solar-1","generator-1"]},{"id":"otherNodes","nodes":["battery-1","controller-1","distribution-1","inverter-1","monitor-1","sensor-1","io-controller-1","status-1","weather-1","ethiopia-map-1"]}]',
    'elk.partitioning.partition.0.position': '800,0',
    'elk.partitioning.partition.1.position': '0,0',
    'elk.partitioning.partition.0.padding': '[20, 20, 20, 20]',
    'elk.partitioning.partition.1.padding': '[20, 20, 20, 20]',
    'elk.partitioning.partition.0.borderSpacing': '80',
    'elk.partitioning.partition.1.borderSpacing': '30',
    'elk.partitioning.partition.0.alignment': 'CENTER',
    'elk.partitioning.partition.1.alignment': 'CENTER',
    'elk.layered.crossingMinimization.semiInteractive': 'true',
    'elk.layered.spacing.edgeNodeBetweenLayers': '80',
    'elk.layered.spacing.edgeEdgeBetweenLayers': '80',
    'elk.edgeRouting': 'ORTHOGONAL',
    'elk.spacing.edgeNode': '80',
    'elk.spacing.edgeEdge': '80',
    'elk.node.weather-1.y': '0'
  }
}; 