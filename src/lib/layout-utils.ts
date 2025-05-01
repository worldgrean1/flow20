// Layout utility functions for component positioning and styling

// Calculate positions for flowchart nodes in a solar system simulation
export function calculateSolarSystemLayout(
  containerWidth: number,
  containerHeight: number,
  nodeCount: number
) {
  const positions: Array<{ x: number; y: number }> = [];
  
  // Create a simple grid layout based on container dimensions
  const cols = Math.ceil(Math.sqrt(nodeCount));
  const rows = Math.ceil(nodeCount / cols);
  
  const cellWidth = containerWidth / cols;
  const cellHeight = containerHeight / rows;
  
  for (let i = 0; i < nodeCount; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    positions.push({
      x: col * cellWidth + cellWidth / 2,
      y: row * cellHeight + cellHeight / 2,
    });
  }
  
  return positions;
}

// Create node connections for a solar system simulation
export function createSolarSystemConnections(nodeCount: number) {
  const connections: Array<{ source: number; target: number }> = [];
  
  // For a basic solar system, connect nodes in sequence
  for (let i = 0; i < nodeCount - 1; i++) {
    connections.push({
      source: i,
      target: i + 1,
    });
  }
  
  return connections;
}

// Responsive layout helper
export function getResponsiveLayout(windowWidth: number) {
  if (windowWidth < 640) {
    return 'mobile';
  } else if (windowWidth < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// Utility to calculate dimensions based on container size
export function getDimensions(containerWidth: number, containerHeight: number) {
  return {
    width: containerWidth,
    height: containerHeight,
    centerX: containerWidth / 2,
    centerY: containerHeight / 2,
  };
} 