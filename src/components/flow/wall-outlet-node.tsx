import { Handle, Position, type NodeProps } from "reactflow";
import { cn } from "../../lib/utils";
import { useState } from "react";

export interface WallOutletData {
  outletActive: boolean;
  onOutletActiveChange?: (value: boolean) => void;
  t: (key: string) => string;
}

export interface WallOutletNodeProps extends NodeProps<WallOutletData> {}

const WallOutletNode = ({ data }: WallOutletNodeProps) => {
  const { t = (key: string) => key } = data;
  const [pressed, setPressed] = useState(false);

  // Toggle outlet on click
  const handleToggle = () => {
    setPressed(true);
    data.onOutletActiveChange?.(!data.outletActive);
    setTimeout(() => setPressed(false), 150);
  };
  
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-28 h-48 select-none cursor-pointer transition-shadow",
        data.outletActive ? "shadow-[0_0_16px_4px_rgba(59,130,246,0.4)]" : "shadow-none"
      )}
      onClick={handleToggle}
      title={data.outletActive ? t("Outlet On") : t("Outlet Off")}
      style={{ background: "#f7f7f7", borderRadius: 16, border: "2px solid #e5e7eb" }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: data.outletActive ? "#3b82f6" : "#cbd5e1",
          width: 10,
          height: 10,
          top: "50%",
        }}
      />
      {/* Duplex Outlet SVG */}
      <svg width="80" height="160" viewBox="0 0 80 160" className="block" style={{ marginTop: 8 }}>
        {/* Outer plate */}
        <rect x="4" y="4" width="72" height="152" rx="8" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
        {/* Top outlet */}
        <g>
          <rect x="20" y="24" width="40" height="40" rx="7" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
          {/* Left slot */}
          <rect x="28" y="38" width="6" height="14" rx="2.5" fill="#222" />
          {/* Right slot */}
          <rect x="46" y="38" width="6" height="14" rx="2.5" fill="#222" />
          {/* Ground */}
          <rect x="37" y="54" width="6" height="7" rx="3" fill="#222" />
        </g>
        {/* Bottom outlet */}
        <g>
          <rect x="20" y="96" width="40" height="40" rx="7" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />
          {/* Left slot */}
          <rect x="28" y="110" width="6" height="14" rx="2.5" fill="#222" />
          {/* Right slot */}
          <rect x="46" y="110" width="6" height="14" rx="2.5" fill="#222" />
          {/* Ground */}
          <rect x="37" y="126" width="6" height="7" rx="3" fill="#222" />
        </g>
        {/* Status glow overlay */}
        {data.outletActive && (
          <rect x="4" y="4" width="72" height="152" rx="8" fill="#3b82f6" fillOpacity="0.08" />
        )}
        {/* Pressed effect */}
        {pressed && (
          <rect x="4" y="4" width="72" height="152" rx="8" fill="#3b82f6" fillOpacity="0.10" />
        )}
      </svg>
      <Handle
        type="source"
        position={Position.Right}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default WallOutletNode; 