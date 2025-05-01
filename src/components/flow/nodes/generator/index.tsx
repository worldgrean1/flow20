import { NodeProps } from 'reactflow';
import { useGeneratorSimulation } from './simulation';
import { useGeneratorAnimation } from './animations';
import { cn } from '@/lib/utils';

export interface GeneratorData {
  t: (key: string) => string;
  generatorOn: boolean;
  runtime: number;
  fuelLevel: number;
  onGeneratorToggle: (value: boolean) => void;
  onFuelLevelChange: (value: number) => void;
}

export function GeneratorNode({ data }: NodeProps<GeneratorData>) {
  const { t } = data;
  
  const maxRPM = 3000; // Define maxRPM as a constant
  
  const metrics = useGeneratorSimulation(
    data.generatorOn,
    maxRPM, // maxRPM
    5,    // startupTime
    3,    // shutdownTime
    0.5,  // heatGenerationRate
    0.3   // coolingRate
  );

  const {
    fanStyle,
    smokeStyle,
    vibrationStyle,
    fanSpeed
  } = useGeneratorAnimation(data.generatorOn, metrics.status, maxRPM);

  const handleGeneratorToggle = () => {
    data.onGeneratorToggle(!data.generatorOn);
  };

  return (
    <div 
      className="w-[520px] transition-all duration-300"
      style={vibrationStyle}
    >
      <div className="relative">
        <div className="absolute -inset-3 bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl border border-orange-800/40 -z-10 shadow-lg blur-[2px]"></div>

        <div className="flex items-start p-3 transition-transform duration-300 ease-out">
          <div className="relative">
            {/* Generator Body */}
            <div className="w-56 h-56 bg-slate-900 rounded-md shadow-xl border-2 border-orange-500 overflow-hidden relative">
              {/* Fan */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                style={fanStyle}
              >
                <div className="w-full h-full relative">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 left-1/2 w-1/2 h-full origin-left"
                      style={{ transform: `rotate(${i * 90}deg)` }}
                    >
                      <div className="w-full h-4 bg-orange-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smoke Effect */}
              <div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={smokeStyle}
              >
                <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-gray-400 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-gray-400 rounded-full opacity-15 blur-xl"></div>
              </div>
            </div>
          </div>

          <div className="ml-4 flex-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{t("Generator Status")}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Status")}:</span>
                    <span className={cn(
                      "text-sm font-medium",
                      metrics.status === 'running' && "text-green-400",
                      metrics.status === 'starting' && "text-yellow-400",
                      metrics.status === 'stopping' && "text-orange-400",
                      metrics.status === 'off' && "text-slate-400"
                    )}>
                      {metrics.status.charAt(0).toUpperCase() + metrics.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("RPM")}:</span>
                    <span className="text-white">{Math.round(metrics.rpm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Temperature")}:</span>
                    <span className="text-white">{metrics.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Fuel Consumption")}:</span>
                    <span className="text-white">{metrics.fuelConsumption.toFixed(1)} L/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Power Output")}:</span>
                    <span className="text-white">{Math.round(metrics.powerOutput)}W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Fuel Level")}:</span>
                    <span className="text-white">{data.fuelLevel}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGeneratorToggle}
                className={cn(
                  "w-full py-2 px-4 rounded-md font-medium transition-colors",
                  data.generatorOn
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                )}
              >
                {data.generatorOn ? t("Stop Generator") : t("Start Generator")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 