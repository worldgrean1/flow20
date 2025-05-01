import { useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { EthiopiaMapData } from '../types';

const EthiopiaMapNode: React.FC<NodeProps<EthiopiaMapData>> = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [pulseIntensity, setPulseIntensity] = useState(0.6);

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animate pulse intensity for connected regions
  useEffect(() => {
    if (!data.isGridConnected) return;

    const interval = setInterval(() => {
      setPulseIntensity((prev) => (prev === 0.6 ? 1 : 0.6));
    }, 2000);

    return () => clearInterval(interval);
  }, [data.isGridConnected]);

  // Get status color for region markers with enhanced visual effect
  const getStatusColor = (status: "active" | "warning" | "offline", isHovered: boolean) => {
    switch (status) {
      case "active":
        return isHovered ? "bg-green-400 ring-2 ring-green-300" : "bg-green-500";
      case "warning":
        return isHovered ? "bg-yellow-400 ring-2 ring-yellow-300" : "bg-yellow-500";
      case "offline":
        return isHovered ? "bg-red-400 ring-2 ring-red-300" : "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  // Determine the glow color based on connection state
  const glowColor = data.isGridConnected ? "rgba(132, 204, 22, 0.8)" : "rgba(100, 116, 139, 0.3)";
  const glowIntensity = data.isGridConnected ? "12px" : "3px";

  return (
    <div className="flex flex-col items-center">
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          background: "#ef4444",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
        }}
        isConnectable={true}
      />

      <div
        className={`p-4 rounded-lg border transition-all duration-500 transform hover:scale-105 relative
          ${data.isGridConnected ? "border-lime-500" : ""}
          ${animate ? "scale-105" : "scale-100"}`}
        style={{
          boxShadow: `0 0 ${glowIntensity} ${glowColor}, inset 0 0 ${glowIntensity} ${glowColor}`,
          transition: "box-shadow 0.5s ease-in-out, transform 0.3s ease-out",
        }}
      >
        {/* Enhanced pulsing effect when connected */}
        {data.isGridConnected && (
          <>
            <div
              className="absolute inset-0 rounded-lg pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle, rgba(132, 204, 22, ${pulseIntensity * 0.3}) 0%, rgba(132, 204, 22, 0) 70%)`,
                transition: "background 1.5s ease-in-out",
              }}
            ></div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-lime-500 animate-pulse shadow-[0_0_10px_rgba(132,204,22,0.8)]"></div>
          </>
        )}

        <h3 className="text-white text-sm font-medium mb-2 flex items-center justify-between">
          <span>Ethiopia Solar Network</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full transition-colors
              ${data.isGridConnected ? "bg-lime-600/30 text-lime-400" : "bg-slate-700/30 text-slate-400"}`}
          >
            {data.isGridConnected ? "ONLINE" : "OFFLINE"}
          </span>
        </h3>

        <div className="relative w-[270px] h-[220px] perspective-[800px]">
          {/* 3D effect for the map */}
          <div
            className="w-full h-full transition-transform duration-300 transform-style-3d"
            style={{ transform: "rotateX(10deg)" }}
          >
            <div className="w-full h-full bg-gray-800 rounded-md opacity-70 transition-opacity duration-500" />

            {/* Enhanced region markers with 3D effect */}
            {data.regions.map((region) => (
              <button
                key={region.id}
                className={`absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                  ${getStatusColor(region.status, hoveredRegion === region.id)}
                  ${data.isGridConnected && region.status === "active" && "animate-pulse"}`}
                style={{
                  left: `${region.position.x}%`,
                  top: `${region.position.y}%`,
                  animation: region.status === "warning" ? "pulse 2s infinite" : "none",
                  boxShadow: data.isGridConnected && region.status === "active" ? "0 0 10px rgba(132, 204, 22, 0.8)" : "none",
                  transform: `translate(-50%, -50%) translateZ(${hoveredRegion === region.id ? 25 : 15}px)`,
                }}
                onClick={() => data.onRegionSelect?.(region)}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                aria-label={`${region.name} region`}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-start">
          <div className="flex space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs text-white">Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <span className="text-xs text-white">Warning</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-xs text-white">Offline</span>
            </div>
          </div>
        </div>

        {/* Enhanced connection status indicator */}
        {data.isGridConnected && (
          <div className="mt-2 bg-lime-600/20 rounded-md px-2 py-1 text-center border border-lime-600/30">
            <span className="text-xs text-lime-400 flex items-center justify-center">
              <span className="w-2 h-2 bg-lime-500 rounded-full mr-1 animate-pulse"></span>
              Grid Connected
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EthiopiaMapNode; 