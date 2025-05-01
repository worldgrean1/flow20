import { NodeProps } from 'reactflow';
import { useWeatherCalculations, WeatherCondition } from './calculations';
import { useWeatherAnimation } from './animations';
import { cn } from '@/lib/utils';

export interface WeatherData {
  t: (key: string) => string;
  initialCondition: WeatherCondition;
  onConditionChange: (condition: WeatherCondition) => void;
}

export function WeatherNode({ data }: NodeProps<WeatherData>) {
  const { t } = data;
  
  const {
    metrics,
    condition,
    changeCondition
  } = useWeatherCalculations(data.initialCondition);

  const {
    cloudStyle,
    rainStyle,
    lightningStyle,
    sunStyle
  } = useWeatherAnimation(condition);

  const handleConditionChange = (newCondition: WeatherCondition) => {
    changeCondition(newCondition);
    data.onConditionChange(newCondition);
  };

  return (
    <div className="w-[520px] transition-all duration-300">
      <div className="relative">
        <div className="absolute -inset-3 bg-gradient-to-br from-blue-900/40 to-sky-900/40 rounded-xl border border-blue-800/40 -z-10 shadow-lg blur-[2px]"></div>

        <div className="flex items-start p-3 transition-transform duration-300 ease-out">
          <div className="relative w-56 h-56">
            {/* Weather Visualization */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-600 rounded-md overflow-hidden">
              {/* Sun */}
              <div 
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-400 rounded-full"
                style={sunStyle}
              >
                <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm"></div>
              </div>

              {/* Clouds */}
              <div 
                className="absolute top-1/3 left-0 w-full h-16"
                style={cloudStyle}
              >
                <div className="absolute top-0 left-0 w-32 h-16 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-4 left-8 w-24 h-12 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-2 left-20 w-28 h-14 bg-white rounded-full opacity-80"></div>
              </div>

              {/* Rain */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={rainStyle}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-8 bg-white opacity-50"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `rain 1s linear infinite`,
                      animationDelay: `${Math.random() * 1}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Lightning */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={lightningStyle}
              >
                <div className="absolute inset-0 bg-white"></div>
              </div>
            </div>
          </div>

          <div className="ml-4 flex-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{t("Weather Conditions")}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Condition")}:</span>
                    <span className={cn(
                      "text-sm font-medium",
                      condition.type === 'sunny' && "text-yellow-400",
                      condition.type === 'cloudy' && "text-slate-400",
                      condition.type === 'rainy' && "text-blue-400",
                      condition.type === 'stormy' && "text-purple-400"
                    )}>
                      {condition.type.charAt(0).toUpperCase() + condition.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Temperature")}:</span>
                    <span className="text-white">{metrics.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Humidity")}:</span>
                    <span className="text-white">{metrics.humidity.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Wind Speed")}:</span>
                    <span className="text-white">{metrics.windSpeed.toFixed(1)} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Cloud Cover")}:</span>
                    <span className="text-white">{metrics.cloudCover.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Solar Intensity")}:</span>
                    <span className="text-white">{metrics.solarIntensity.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">{t("Precipitation")}:</span>
                    <span className="text-white">{metrics.precipitation.toFixed(1)} mm/h</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleConditionChange({ type: 'sunny', intensity: 1, duration: 60 })}
                  className={cn(
                    "py-2 px-4 rounded-md font-medium transition-colors",
                    condition.type === 'sunny' 
                      ? "bg-yellow-500 text-white" 
                      : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                  )}
                >
                  {t("Sunny")}
                </button>
                <button
                  onClick={() => handleConditionChange({ type: 'cloudy', intensity: 0.5, duration: 60 })}
                  className={cn(
                    "py-2 px-4 rounded-md font-medium transition-colors",
                    condition.type === 'cloudy' 
                      ? "bg-slate-500 text-white" 
                      : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
                  )}
                >
                  {t("Cloudy")}
                </button>
                <button
                  onClick={() => handleConditionChange({ type: 'rainy', intensity: 0.7, duration: 60 })}
                  className={cn(
                    "py-2 px-4 rounded-md font-medium transition-colors",
                    condition.type === 'rainy' 
                      ? "bg-blue-500 text-white" 
                      : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                  )}
                >
                  {t("Rainy")}
                </button>
                <button
                  onClick={() => handleConditionChange({ type: 'stormy', intensity: 0.9, duration: 60 })}
                  className={cn(
                    "py-2 px-4 rounded-md font-medium transition-colors",
                    condition.type === 'stormy' 
                      ? "bg-purple-500 text-white" 
                      : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                  )}
                >
                  {t("Stormy")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 