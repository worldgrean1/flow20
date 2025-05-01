import { Handle, Position, type NodeProps } from 'reactflow';
import { AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn, TranslationFunction } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';

export interface ChargeControllerData {
  solarProduction: number;
  output: number;
  backupMode?: boolean;
  onToggleBackupMode?: (value: boolean) => void;
  t: TranslationFunction;
}

export interface ChargeControllerNodeProps extends NodeProps<ChargeControllerData> {}

export const defaultChargeControllerSettings = {
  id: 'charge-controller',
  name: 'Charge Controller',
  type: 'chargeController',
  containerSize: { width: 16, height: 20 },
  containerStyle: {
    backgroundColor: '#1e293b', // slate-800
    gradientStart: '#1e293b', // slate-800
    gradientEnd: '#0f172a', // slate-900
    borderColor: '#475569', // slate-600
    activeColor: '#3b82f6', // blue-500
    inactiveColor: '#475569', // slate-600
    borderWidth: 2,
    borderRadius: 6,
    shadow: 'md',
  },
  displayOptions: {
    showEfficiency: true,
    showTemperature: true,
    showInputVoltage: true,
    showOutputVoltage: true,
  },
};

function ChargeControllerNode({ data }: ChargeControllerNodeProps) {
  const { t } = data;
  const [animate, setAnimate] = useState(false);
  const [efficiency, setEfficiency] = useState(95);
  const [temperature, setTemperature] = useState(35);
  const [backupMode, setBackupMode] = useState(data.backupMode || false);
  const [glowIntensity, setGlowIntensity] = useState(5);
  const [pulseIntensity, setPulseIntensity] = useState(0.5);

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update efficiency and temperature based on solar production
  useEffect(() => {
    // Efficiency decreases slightly with higher production due to heat
    const newEfficiency = Math.max(90, 97 - (data.solarProduction / 250) * 5);
    setEfficiency(newEfficiency);

    // Temperature increases with higher production
    const newTemperature = 30 + (data.solarProduction / 250) * 15;
    setTemperature(newTemperature);

    // Update glow intensity based on production
    setGlowIntensity(Math.min(10, 5 + (data.solarProduction / 250) * 5));
    setPulseIntensity(Math.min(1, 0.5 + (data.solarProduction / 250) * 0.5));
  }, [data.solarProduction]);

  // Handle backup mode toggle
  const handleBackupModeToggle = (checked: boolean) => {
    setBackupMode(checked);
    if (data.onToggleBackupMode) {
      data.onToggleBackupMode(checked);
    }
  };

  // Calculate charging mode based on solar production
  const getChargingMode = () => {
    if (data.solarProduction > 150) return 'bulk';
    if (data.solarProduction > 50) return 'absorption';
    if (data.solarProduction > 0) return 'float';
    return 'standby';
  };

  return (
    <div
      className="flex flex-col items-center transition-all duration-300"
      style={{ transform: animate ? 'scale(1.05)' : 'scale(1)' }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{
          background: '#ef4444',
          width: '12px',
          height: '12px',
          border: '2px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)',
        }}
        isConnectable={true}
      />

      <div 
        className="w-72 rounded-md shadow-xl p-4 border-2 border-slate-600 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
        style={{
          backgroundColor: defaultChargeControllerSettings.containerStyle.backgroundColor,
          backgroundImage: `linear-gradient(to bottom, ${defaultChargeControllerSettings.containerStyle.gradientStart}, ${defaultChargeControllerSettings.containerStyle.gradientEnd})`,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-blue-400">{t('Charge Controller')}</div>
          <div className="flex items-center">
            <div
              className={cn(
                'w-3 h-3 rounded-full mr-2',
                data.solarProduction > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500',
              )}
            ></div>
            <span className="text-xs text-slate-300">{data.solarProduction > 0 ? t('Active') : t('Standby')}</span>
          </div>
        </div>

        {/* Digital display panel with enhanced LCD effect */}
        <div className="bg-slate-900 p-3 rounded-md border border-slate-700 mb-4 shadow-inner">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="text-xs text-slate-400">{t('Input')}</div>
              <div className="text-xl font-bold text-green-400">{data.solarProduction}W</div>
              <div className="text-xs text-slate-500">{t('24V DC')}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-slate-400">{t('Output')}</div>
              <div className="text-xl font-bold text-blue-400">{data.output}W</div>
              <div className="text-xs text-slate-500">{t('24V DC')}</div>
            </div>
          </div>
        </div>

        {/* Status indicators with enhanced animations */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-800 p-2 rounded-md border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">{t('Efficiency')}</div>
            <div className="flex items-center">
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mr-2">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ 
                    width: `${efficiency}%`,
                    boxShadow: `0 0 ${glowIntensity}px rgba(34, 197, 94, ${pulseIntensity})`
                  }}
                ></div>
              </div>
              <span className="text-xs text-green-400">{efficiency.toFixed(1)}%</span>
            </div>
          </div>
          <div className="bg-slate-800 p-2 rounded-md border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">{t('Temperature')}</div>
            <div className="flex items-center">
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mr-2">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    temperature > 50 ? 'bg-red-500' : temperature > 40 ? 'bg-yellow-500' : 'bg-blue-500',
                  )}
                  style={{ 
                    width: `${(temperature / 70) * 100}%`,
                    boxShadow: `0 0 ${glowIntensity}px rgba(${temperature > 50 ? '239, 68, 68' : temperature > 40 ? '234, 179, 8' : '59, 130, 246'}, ${pulseIntensity})`
                  }}
                ></div>
              </div>
              <span
                className={cn(
                  'text-xs',
                  temperature > 50 ? 'text-red-400' : temperature > 40 ? 'text-yellow-400' : 'text-blue-400',
                )}
              >
                {temperature.toFixed(1)}°C
              </span>
            </div>
          </div>
        </div>

        {/* Charging modes with enhanced visuals */}
        <div className="bg-slate-800 p-3 rounded-md border border-slate-700 mb-4">
          <div className="text-sm font-medium text-slate-300 mb-2">{t('Charging Mode')}</div>
          <div className="grid grid-cols-3 gap-2">
            <div
              className={cn(
                'text-center text-xs p-1 rounded-md border transition-all duration-300',
                getChargingMode() === 'bulk'
                  ? 'bg-blue-900/50 border-blue-700 text-blue-300 shadow-md shadow-blue-900/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400',
              )}
            >
              {t('Bulk')}
            </div>
            <div
              className={cn(
                'text-center text-xs p-1 rounded-md border transition-all duration-300',
                getChargingMode() === 'absorption'
                  ? 'bg-blue-900/50 border-blue-700 text-blue-300 shadow-md shadow-blue-900/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400',
              )}
            >
              {t('Absorption')}
            </div>
            <div
              className={cn(
                'text-center text-xs p-1 rounded-md border transition-all duration-300',
                getChargingMode() === 'float'
                  ? 'bg-blue-900/50 border-blue-700 text-blue-300 shadow-md shadow-blue-900/20'
                  : 'bg-slate-800 border-slate-700 text-slate-400',
              )}
            >
              {t('Float')}
            </div>
          </div>
        </div>

        {/* Backup mode toggle with enhanced styling */}
        <div className="bg-slate-800 p-3 rounded-md border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {backupMode ? (
                <ToggleRight className="h-4 w-4 mr-2 text-amber-500 animate-pulse" />
              ) : (
                <ToggleLeft className="h-4 w-4 mr-2 text-slate-400" />
              )}
              <Label htmlFor="backup-mode" className="text-sm text-slate-300">
                {t('Battery Backup Mode')}
              </Label>
            </div>
            <Switch
              id="backup-mode"
              checked={backupMode}
              onCheckedChange={handleBackupModeToggle}
              className="data-[state=checked]:bg-amber-600"
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {backupMode
              ? t('Battery is providing backup power to the system')
              : t('Solar panels are the primary power source')}
          </div>
        </div>

        {/* Warning indicator with enhanced animation */}
        {temperature > 50 && (
          <div className="absolute top-2 right-2 animate-pulse">
            <AlertTriangle className="h-5 w-5 text-red-500 drop-shadow-glow-red" />
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{
          background: '#22c55e',
          width: '12px',
          height: '12px',
          border: '2px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 0 8px rgba(34, 197, 94, 0.7)',
        }}
        isConnectable={true}
      />
    </div>
  );
}

export default ChargeControllerNode; 