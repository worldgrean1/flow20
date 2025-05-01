import { cn } from '@/lib/utils';
import { PanelRotation } from './animations';

interface PanelDisplayProps {
  isActive: boolean;
  rotation: PanelRotation;
}

export const PanelDisplay: React.FC<PanelDisplayProps> = ({
  isActive,
  rotation
}) => {
  return (
    <div className="relative perspective-[1000px]">
      <div
        className={cn(
          "w-56 h-56 bg-slate-900 rounded-md shadow-xl border-2 overflow-hidden relative transition-all duration-300",
          isActive ? "border-blue-500" : "border-slate-700",
        )}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="grid grid-cols-6 grid-rows-6 gap-[2px] p-2 h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                isActive ? "bg-gradient-to-br from-blue-900 to-blue-950" : "bg-slate-800",
              )}
            >
              {isActive && (
                <>
                  <div className="absolute top-0 left-1/4 right-1/4 h-full bg-blue-700/30"></div>
                  <div className="absolute top-1/4 bottom-1/4 left-0 right-0 w-full bg-blue-700/30"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-500/20 to-transparent transform -skew-x-12"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};