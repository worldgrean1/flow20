import { cn } from '@/lib/utils';
import { SolarPanelMetrics } from './calculations';

interface MetricsDisplayProps {
  metrics: SolarPanelMetrics;
  isActive: boolean;
  t: (key: string) => string;
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  metrics,
  isActive,
  t
}) => {
  return (
    <div className="ml-4 flex-1">
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-white mb-1">{t("Status")}</div>
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                isActive ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span className="text-sm text-white">
              {isActive ? t("Active") : t("Inactive")}
            </span>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-white mb-1">{t("Output")}</div>
          <div className="text-2xl font-bold text-white">{metrics.powerOutput}W</div>
        </div>

        <div>
          <div className="text-sm font-medium text-white mb-1">{t("Efficiency")}</div>
          <div className="text-lg font-semibold text-white">{metrics.efficiency.toFixed(1)}%</div>
        </div>

        <div>
          <div className="text-sm font-medium text-white mb-1">{t("Temperature")}</div>
          <div className="text-lg font-semibold text-white">{metrics.temperature.toFixed(1)}°C</div>
        </div>
      </div>
    </div>
  );
};