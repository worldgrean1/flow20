import { Handle, Position, type NodeProps } from "reactflow";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface LightSwitchData {
  switchOn: boolean;
  onSwitchToggle?: (value: boolean) => void;
  t: (key: string) => string;
}

export interface LightSwitchNodeProps extends NodeProps<LightSwitchData> {}

const LightSwitchNode = ({ data }: LightSwitchNodeProps) => {
  const { t = (key: string) => key } = data;
  const [pressed, setPressed] = useState(false);

  // Toggle switch on click
  const handleToggle = () => {
    setPressed(true);
    data.onSwitchToggle?.(!data.switchOn);
    setTimeout(() => setPressed(false), 150);
  };
  
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-32 h-32 select-none cursor-pointer transition-shadow",
        data.switchOn ? "shadow-[0_0_16px_4px_rgba(59,130,246,0.3)]" : "shadow-none"
      )}
      onClick={handleToggle}
      title={data.switchOn ? t("Switch On") : t("Switch Off")}
      style={{ background: "#f7f7f7", borderRadius: 18, border: "2px solid #e5e7eb" }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: data.switchOn ? "#3b82f6" : "#cbd5e1",
          width: 10,
          height: 10,
          top: "50%",
        }}
      />
      {/* Modern Light Switch SVG */}
      <svg width="100" height="100" viewBox="0 0 100 100" className="block" style={{ marginTop: 8 }}>
        {/* Outer plate */}
        <rect x="5" y="5" width="90" height="90" rx="12" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
        {/* Switch rocker */}
        <rect
          x="28"
          y="18"
          width="44"
          height="64"
          rx="7"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="1.5"
              style={{ 
            filter: data.switchOn ? "drop-shadow(0 0 8px #3b82f6aa)" : undefined,
            transition: 'filter 0.2s',
          }}
        />
        {/* Blue LED indicator */}
        <rect
          x="48"
          y="22"
          width="4"
          height="6"
          rx="2"
          fill={data.switchOn ? "#3b82f6" : "#cbd5e1"}
        />
        {/* Pressed effect */}
        {pressed && (
          <rect x="5" y="5" width="90" height="90" rx="12" fill="#3b82f6" fillOpacity="0.08" />
        )}
      </svg>
      {/* Status label removed for clean look */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default LightSwitchNode; 