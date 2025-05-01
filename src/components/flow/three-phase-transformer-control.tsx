import { useRef, useState, useEffect } from "react";
import { Power, Thermometer, Gauge, Activity, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Switch } from "../ui/switch";

interface TransformerControlProps {
  transformerOn: boolean;
  onTransformerChange: (value: boolean) => void;
  temperature: number;
  loadPercentage: number;
  efficiency: number;
  health: number;
  humVolume?: number;
  onHumVolumeChange?: (value: number) => void;
  t?: (key: string) => string;
}

export function TransformerControl({
  transformerOn,
  onTransformerChange,
  temperature,
  loadPercentage,
  efficiency,
  health,
  humVolume = 0.3,
  onHumVolumeChange,
  t = (key: string) => key,
}: TransformerControlProps) {
  const humAudioRef = useRef<HTMLAudioElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(humVolume);
  
  // Play/stop hum sound based on transformer state
  useEffect(() => {
    if (!humAudioRef.current) return;
    if (transformerOn && soundEnabled) {
      humAudioRef.current.volume = volume;
      humAudioRef.current.loop = true;
      humAudioRef.current.play().catch(console.error);
    } else {
      humAudioRef.current.pause();
      humAudioRef.current.currentTime = 0;
    }
  }, [transformerOn, soundEnabled, volume]);

  // Volume slider handler
  const handleVolumeChange = (v: number) => {
    setVolume(v);
    onHumVolumeChange?.(v);
    if (humAudioRef.current) humAudioRef.current.volume = v;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/20 rounded-xl shadow-xl p-6 w-full max-w-[400px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
              <Power className={`w-6 h-6 ${transformerOn ? 'text-blue-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <span className="text-xl font-semibold text-white block">{t("Transformer Control")}</span>
              <span className="text-xs text-slate-400">{transformerOn ? t("System Active") : t("System Inactive")}</span>
            </div>
          </div>
        <Switch checked={transformerOn} onCheckedChange={onTransformerChange} />
            </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col items-center bg-slate-800/60 rounded-lg p-3">
          <Thermometer className="w-7 h-7 text-orange-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Temperature")}</span>
          <span className="text-lg font-bold text-orange-400">{temperature.toFixed(0)}°C</span>
        </div>
        <div className="flex flex-col items-center bg-slate-800/60 rounded-lg p-3">
          <Gauge className="w-7 h-7 text-blue-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Load")}</span>
          <span className="text-lg font-bold text-blue-400">{loadPercentage}%</span>
      </div>
        <div className="flex flex-col items-center bg-slate-800/60 rounded-lg p-3">
          <Activity className="w-7 h-7 text-green-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Efficiency")}</span>
          <span className="text-lg font-bold text-green-400">{efficiency}%</span>
            </div>
        <div className="flex flex-col items-center bg-slate-800/60 rounded-lg p-3">
          <Sparkles className="w-7 h-7 text-yellow-400 mb-1" />
          <span className="text-xs text-slate-300">{t("Health")}</span>
          <span className="text-lg font-bold text-yellow-400">{health}%</span>
                  </div>
                </div>
      <div className="mt-4 bg-slate-800/40 rounded-lg p-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-white">{t("Hum Sound")}</span>
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            className={`ml-2 h-7 w-7 rounded-full flex items-center justify-center ${soundEnabled ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}
            title={soundEnabled ? t("Mute hum sound") : t("Unmute hum sound")}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-full accent-blue-500 bg-slate-700/50 h-2 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-slate-400 mt-1">{t("Volume")}: {Math.round(volume * 100)}%</span>
        <audio ref={humAudioRef} src="/sounds/transformer-hum.mp3" preload="auto" loop />
      </div>
    </div>
  );
} 