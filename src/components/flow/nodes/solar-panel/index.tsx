import { useState } from 'react';
import { NodeProps } from 'reactflow';
import { useSolarPanelCalculations } from './calculations';
import { usePanelAnimation, getPanelStyle, getCellStyle } from './animations';
import { cn } from '@/lib/utils';

export interface SolarPanelData {
  t: (key: string) => string;
  solarActive: boolean;
  sunIntensity: number;
  onSunIntensityChange: (value: number) => void;
  shadingLevel: number;
  windSpeed: number;
  dustAccumulation: number;
  temperatureCoefficient: number;
}

export function SolarPanelNode({ data }: NodeProps<SolarPanelData>) {
  const { t } = data;
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    rotation,
    animate,
    handleMouseMove,
    resetRotation
  } = usePanelAnimation(isHovered);

  const metrics = useSolarPanelCalculations(
    data.shadingLevel,
    data.windSpeed,
    data.dustAccumulation,
    data.temperatureCoefficient
  );

  return (
    <div 
      className="w-[520px] transition-all duration-300" 
      style={{ transform: animate ? "scale(1.05)" : "scale(1)" }}
    >
      <div className="relative">
        <div className="absolute -inset-3 bg-gradient-to-br from-blue-900/40 to-emerald-900/40 rounded-xl border border-blue-800/40 -z-10 shadow-lg blur-[2px]"></div>

        <div
          className="flex items-start p-3 transition-transform duration-300 ease-out"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            resetRotation();
          }}
          onMouseMove={handleMouseMove}
        >
          <div className="relative perspective-[1000px]">
            <div
              className={cn(
                "w-56 h-56 bg-slate-900 rounded-md shadow-xl border-2 overflow-hidden relative transition-all duration-300"
              )}
              style={getPanelStyle(rotation, data.solarActive, animate)}
            >
              <div className="grid grid-cols-6 grid-rows-6 gap-[2px] p-2 h-full w-full">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative overflow-hidden transition-all duration-300",
                      data.solarActive ? "bg-gradient-to-br from-blue-900 to-blue-950" : "bg-slate-800"
                    )}
                    style={getCellStyle(data.solarActive, i)}
                  >
                    {data.solarActive && (
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

          <div className="ml-4 flex-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{t("Solar Panel Status")}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Temperature")}:</span>
                    <span className="text-white">{metrics.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Efficiency")}:</span>
                    <span className="text-white">{metrics.efficiency.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Power Output")}:</span>
                    <span className="text-white">{metrics.powerOutput}W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Solar Angle")}:</span>
                    <span className="text-white">{metrics.solarAngle.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Solar Intensity")}:</span>
                    <span className="text-white">{metrics.solarIntensity.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 