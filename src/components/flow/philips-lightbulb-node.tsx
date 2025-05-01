import { Handle, Position, type NodeProps } from "reactflow";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface PhilipsLightBulbData {
  bulbOn: boolean;
  onBulbToggle?: (value: boolean) => void;
  t: (key: string) => string;
}

export interface PhilipsLightBulbNodeProps extends NodeProps<PhilipsLightBulbData> {}

const PhilipsLightBulbNode = ({ data }: PhilipsLightBulbNodeProps) => {
  const { t = (key: string) => key } = data;
  const [pressed, setPressed] = useState(false);

  // Toggle bulb on click
  const handleToggle = () => {
    setPressed(true);
    data.onBulbToggle?.(!data.bulbOn);
    setTimeout(() => setPressed(false), 150);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-28 h-48 select-none cursor-pointer transition-shadow",
        "shadow-none"
      )}
      onClick={handleToggle}
      title={data.bulbOn ? t("Bulb On") : t("Bulb Off")}
      style={{ background: "transparent" }}
    >
      {/* Circular glow behind the bulb, not clipped by SVG */}
      {data.bulbOn && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '90px',
            width: '180px',
            height: '180px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fffbe4 0%, #fde047 40%, #fbbf24 70%, #fb923c00 100%)',
            filter: 'blur(32px)',
            opacity: 0.7,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Move the Handle to the bottom center of the bulb cap */}
      <Handle
        type="target"
        position={Position.Bottom}
        style={{
          left: '50%',
          top: 143, // aligns with the black tip in SVG
          transform: 'translateX(-50%)',
          background: data.bulbOn ? "#fde047" : "#cbd5e1",
          width: 12,
          height: 12,
          border: '2px solid #fff',
          zIndex: 2,
        }}
      />
      {/* Philips Standard Light Bulb SVG - no background frame, with glowing glass when ON */}
      <svg width="80" height="160" viewBox="0 0 80 160" className="block relative z-10" style={{ marginTop: 0 }}>
        <defs>
          <radialGradient id="bulb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbe4" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#fde047" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.0" />
          </radialGradient>
          <radialGradient id="bulb-glass" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#e5e7eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.1" />
          </radialGradient>
          <linearGradient id="base-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8e7b0" />
            <stop offset="30%" stopColor="#e6c15c" />
            <stop offset="60%" stopColor="#bfa76a" />
            <stop offset="90%" stopColor="#a67c2d" />
            <stop offset="100%" stopColor="#7c6a3a" />
          </linearGradient>
          <filter id="bulb-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        {/* Wide, blurred, perfectly circular glow behind the bulb when ON */}
        {data.bulbOn && (
          <ellipse cx="40" cy="90" rx="80" ry="80" fill="url(#bulb-glow)" filter="url(#bulb-blur)" fillOpacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite" />
          </ellipse>
        )}
        {/* Bulb glass */}
        <ellipse cx="40" cy="70" rx="32" ry="48" fill="url(#bulb-glass)" stroke="#d1d5db" strokeWidth="2" />
        {/* Extra inner glow when ON */}
        {data.bulbOn && (
          <ellipse cx="40" cy="70" rx="28" ry="42" fill="#fde68a" fillOpacity="0.22">
            <animate attributeName="opacity" values="0.22;0.38;0.22" dur="1.2s" repeatCount="indefinite" />
          </ellipse>
        )}
        {/* Glass highlight */}
        <ellipse cx="32" cy="55" rx="7" ry="18" fill="#fff" fillOpacity="0.18" />
        {/* Filament supports */}
        <rect x="38.5" y="80" width="3" height="22" rx="1.2" fill="#bdbdbd" />
        <rect x="38.5" y="60" width="3" height="18" rx="1.2" fill="#bdbdbd" />
        {/* Filament wires */}
        <path d="M40 80 L40 60" stroke="#bdbdbd" strokeWidth="1.2" />
        <path d="M40 60 Q35 50 30 80" stroke="#bdbdbd" strokeWidth="1.2" fill="none" />
        <path d="M40 60 Q45 50 50 80" stroke="#bdbdbd" strokeWidth="1.2" fill="none" />
        {/* Filament */}
        <path
          d="M32 80 Q40 65 48 80"
          stroke={data.bulbOn ? "#fbbf24" : "#bdbdbd"}
          strokeWidth={data.bulbOn ? 2.5 : 2}
          fill="none"
          filter={data.bulbOn ? "url(#filament-glow)" : undefined}
        />
        {/* Filament glow filter */}
        {data.bulbOn && (
          <defs>
            <filter id="filament-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}
        {/* Improved photorealistic metallic screw base */}
        <g>
          {/* Neck transition from glass to base */}
          <ellipse cx="40" cy="116" rx="11" ry="5" fill="#e6c15c" opacity="0.7" />
          {/* Main base body (polygonal, stepped) */}
          <path d="M28,116 Q40,120 52,116 Q54,120 52,134 Q40,146 28,134 Q26,120 28,116 Z" fill="url(#base-metal)" stroke="#bfa76a" strokeWidth="1.5" />
          {/* Threads (curved lines) */}
          <path d="M30,120 Q40,124 50,120" stroke="#fff8" strokeWidth="1.2" />
          <path d="M31,124 Q40,128 49,124" stroke="#fff6" strokeWidth="1.1" />
          <path d="M32,128 Q40,132 48,128" stroke="#fff4" strokeWidth="1" />
          <path d="M33,132 Q40,135 47,132" stroke="#fff2" strokeWidth="0.9" />
          {/* Gold highlight */}
          <path d="M36,120 Q40,122 44,120" stroke="#ffe066" strokeWidth="0.8" />
          {/* Black conical tip */}
          <ellipse cx="40" cy="143" rx="6" ry="3.2" fill="#222" stroke="#444" strokeWidth="1.2" />
          <polygon points="36,143 44,143 40,150" fill="#222" stroke="#444" strokeWidth="0.7" />
          {/* Silver contact at the very bottom */}
          <ellipse cx="40" cy="149" rx="2.1" ry="1.1" fill="#ccc" stroke="#888" strokeWidth="0.5" />
        </g>
        {/* Pressed effect */}
        {pressed && (
          <ellipse cx="40" cy="70" rx="32" ry="48" fill="#fde047" fillOpacity="0.10" />
        )}
      </svg>
      {/* Status label removed */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default PhilipsLightBulbNode; 