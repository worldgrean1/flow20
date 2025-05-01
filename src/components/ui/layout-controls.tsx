import { useState } from 'react';
import { layoutOptions } from '../../lib/elk-layout';
import { GitBranch, Network, Layers, AlignEndHorizontal, Zap } from 'lucide-react';

interface LayoutControlsProps {
  onApplyLayout: (layoutType: keyof typeof layoutOptions) => void;
  className?: string;
}

export function LayoutControls({ onApplyLayout, className = '' }: LayoutControlsProps) {
  const [activeLayout, setActiveLayout] = useState<keyof typeof layoutOptions | null>(null);
  const [isLayouting, setIsLayouting] = useState(false);

  const handleLayoutClick = (layoutType: keyof typeof layoutOptions) => {
    if (isLayouting) return;
    
    setIsLayouting(true);
    setActiveLayout(layoutType);
    
    try {
      // Apply the layout
      onApplyLayout(layoutType);
      
      // Set a timeout to reset the layouting state
      setTimeout(() => {
        setIsLayouting(false);
      }, 1000); // slightly longer than the animation
    } catch (error) {
      console.error(`Error in layout controls for ${layoutType}:`, error);
      setIsLayouting(false);
    }
  };

  const buttonBaseClass = "layout-button flex items-center justify-center p-0 rounded-md shadow-sm transition-all duration-300 border border-transparent w-[32px] h-[32px] min-w-[32px] min-h-[32px]";
  const buttonActiveEffects = "scale-105 shadow-md";
  const buttonHoverEffects = "hover:scale-105 hover:shadow-md";
  const buttonDisabledClass = "opacity-50 cursor-not-allowed scale-100 shadow-none";

  // Layout button styles
  const treeButtonStyle = activeLayout === 'tree' 
    ? `${buttonBaseClass} ${buttonActiveEffects} bg-gradient-to-br from-blue-500 to-blue-700 text-white tree-button-glow`
    : `${buttonBaseClass} ${buttonHoverEffects} text-slate-300 hover:bg-gradient-to-br hover:from-blue-500/70 hover:to-blue-700/70 hover:text-white`;
    
  const forceButtonStyle = activeLayout === 'force'
    ? `${buttonBaseClass} ${buttonActiveEffects} bg-gradient-to-br from-purple-500 to-purple-700 text-white force-button-glow`
    : `${buttonBaseClass} ${buttonHoverEffects} text-slate-300 hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-purple-700/70 hover:text-white`;
    
  const layeredButtonStyle = activeLayout === 'layered'
    ? `${buttonBaseClass} ${buttonActiveEffects} bg-gradient-to-br from-orange-500 to-orange-700 text-white layered-button-glow`
    : `${buttonBaseClass} ${buttonHoverEffects} text-slate-300 hover:bg-gradient-to-br hover:from-orange-500/70 hover:to-orange-700/70 hover:text-white`;
    
  const hierarchicalButtonStyle = activeLayout === 'hierarchical'
    ? `${buttonBaseClass} ${buttonActiveEffects} bg-gradient-to-br from-cyan-500 to-cyan-700 text-white hierarchical-button-glow`
    : `${buttonBaseClass} ${buttonHoverEffects} text-slate-300 hover:bg-gradient-to-br hover:from-cyan-500/70 hover:to-cyan-700/70 hover:text-white`;

  // New Power System button style
  const powerSystemButtonStyle = activeLayout === 'powerSystem'
    ? `${buttonBaseClass} ${buttonActiveEffects} bg-gradient-to-br from-green-500 to-green-700 text-white power-button-glow`
    : `${buttonBaseClass} ${buttonHoverEffects} text-slate-300 hover:bg-gradient-to-br hover:from-green-500/70 hover:to-green-700/70 hover:text-white`;

  return (
    <div 
      className={`flex items-center rounded-lg px-2 py-0 shadow-lg ${className}`}
      style={{ 
        background: 'rgba(30, 41, 59, 0.85)', 
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Layout buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleLayoutClick('powerSystem')}
          className={`${powerSystemButtonStyle} ${isLayouting ? buttonDisabledClass : ''}`}
          title="Power System Layout: Organize power sources on the left side with specific order"
          disabled={isLayouting}
          data-tooltip="Power System Layout"
        >
          <Zap className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => handleLayoutClick('tree')}
          className={`${treeButtonStyle} ${isLayouting ? buttonDisabledClass : ''}`}
          title="Tree Layout: Organize nodes in a hierarchical tree structure"
          disabled={isLayouting}
          data-tooltip="Tree Layout"
        >
          <GitBranch className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => handleLayoutClick('force')}
          className={`${forceButtonStyle} ${isLayouting ? buttonDisabledClass : ''}`}
          title="Force Layout: Natural positioning with physics simulation"
          disabled={isLayouting}
          data-tooltip="Force Layout"
        >
          <Network className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => handleLayoutClick('layered')}
          className={`${layeredButtonStyle} ${isLayouting ? buttonDisabledClass : ''}`}
          title="Layered Layout: Create clear hierarchy layers"
          disabled={isLayouting}
          data-tooltip="Layered Layout"
        >
          <Layers className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => handleLayoutClick('hierarchical')}
          className={`${hierarchicalButtonStyle} ${isLayouting ? buttonDisabledClass : ''}`}
          title="Hierarchical Layout: Bottom-up hierarchical structure"
          disabled={isLayouting}
          data-tooltip="Hierarchical Layout"
        >
          <AlignEndHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 