import { Handle, Position, type NodeProps } from "reactflow"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Fuel, AlertTriangle, Gauge, Power, RotateCw, Clock, Droplet, Volume2, VolumeX } from "lucide-react"
import { cn } from "../../lib/utils"
import { useState, useEffect, useCallback, memo, useRef } from "react"

// Import CSS for animations
import "./animations.css"

// Default settings for the backup generator component
export const defaultBackupGeneratorSettings = {
  id: "backup-generator",
  name: "Backup Generator",
  type: "backupGenerator",
  containerSize: { width: 28.8, height: 38 },
  containerStyle: {
    backgroundColor: "",
    gradientStart: "#334155", // slate-700
    gradientEnd: "#1e293b", // slate-800
    borderColor: "",
    activeColor: "#f97316", // orange-500
    inactiveColor: "#475569", // slate-600
    borderWidth: 2,
    borderRadius: 6,
    shadow: "md",
  },
  panelStyle: {
    backgroundColor: "#0f172a", // slate-900
    borderColor: "#334155", // slate-700
    textColor: "#f8fafc", // slate-50
    accentColor: "#f97316", // orange-500
    fontSize: 12,
  },
  simulationParams: {
    maxOutputWattage: 1000,
    maxRPM: 3600,
    fuelConsumptionRate: 0.2, // % per second when running
    heatGenerationRate: 5, // °C per second when starting
    coolingRate: 3, // °C per second when cooling
    startupTime: 3, // seconds to reach max RPM
    shutdownTime: 5, // seconds to cool down
  },
  animations: {
    enableSmoke: true,
    smokeOpacity: 0.4,
    smokeDensity: 10, // Number of particles
    enableFanRotation: true,
    fanRotationSpeed: 1, // Multiplier
    enableVibration: true,
    vibrationIntensity: 1, // Multiplier
    enableHeatShimmer: true,
    enableSound: true,    // New sound option
    soundVolume: 0.7,     // Default sound volume
  },
  displayOptions: {
    showOutputWattage: true,
    showRuntime: true,
    showRPM: true,
    showTemperature: true,
    showOilPressure: true,
    showFuelLevel: true,
    showSoundControls: true, // New display option for sound controls
  },
}

// Mock useComponentSettings hook - in a real app, this would likely be context-based
const useComponentSettings = () => {
  return {
    settings: defaultBackupGeneratorSettings,
    updateSettings: () => {},
  }
}

export interface BackupGeneratorData {
  generatorOn: boolean
  fuelLevel: number
  onGeneratorChange: (value: boolean) => void
  t: (key: string) => string // Translation function
  animations?: {
    enableSound?: boolean    // Flag to enable/disable sound
    soundVolume?: number     // Volume setting (0-1)
  }
}

export interface BackupGeneratorNodeProps extends NodeProps<BackupGeneratorData> {
  // Additional props if needed
}

function BackupGeneratorNode({ data }: BackupGeneratorNodeProps) {
  const { t = (key: string) => key } = data || {}
  const [engineRPM, setEngineRPM] = useState(0)
  const [engineTemp, setEngineTemp] = useState(25)
  const [oilPressure, setOilPressure] = useState(0)
  const [runTime, setRunTime] = useState(0)
  const [smokeParticles, setSmokeParticles] = useState<
    Array<{ id: number; size: number; opacity: number; left: string }>
  >([])
  const [fanRotation, setFanRotation] = useState(0)
  
  // Sound state and controls
  const engineSoundRef = useRef<HTMLAudioElement>(null)
  const [soundEnabled, setSoundEnabled] = useState(true) // Default to enabled
  const configuredSoundVolume = data.animations?.soundVolume ?? defaultBackupGeneratorSettings.animations.soundVolume
  const [audioVolume, setAudioVolume] = useState(0)
  const [soundPlaying, setSoundPlaying] = useState(false)

  // Get component settings
  const { settings } = useComponentSettings()
  const customSettings = settings

  // Calculate simulated output based on fuel level and whether generator is on
  const outputWattage = data.generatorOn
    ? Math.round(customSettings.simulationParams.maxOutputWattage * (data.fuelLevel / 100) * (engineRPM / customSettings.simulationParams.maxRPM))
    : 0

  // Calculate simulated runtime remaining based on fuel level
  const runtimeHours = Math.round((data.fuelLevel / 100) * 8)

  // Calculate power flow intensity for visual effects
  const getPowerFlowIntensity = () => {
    if (!data.generatorOn || outputWattage <= 0) return 0;
    
    // Return a value between 0.2 and 1 based on power output
    // Using log scale to make it more visually responsive at lower power levels
    const maxExpectedPower = customSettings.simulationParams.maxOutputWattage; // Maximum expected power
    const intensity = 0.2 + 0.8 * Math.min(1, Math.log10(outputWattage + 1) / Math.log10(maxExpectedPower + 1));
    return intensity;
  }
  
  const powerFlowIntensity = getPowerFlowIntensity();

  // Determine if fuel is low
  const lowFuel = data.fuelLevel < 20

  // Determine if temperature is in warning range
  const tempWarning = engineTemp > 85

  // Direct function to play sound
  const playGeneratorSound = useCallback(() => {
    console.log("Attempting to play generator sound...");
    
    if (!engineSoundRef.current || !soundEnabled) {
      console.log("Sound ref not available or sound disabled");
      return false;
    }
    
    try {
      // Make sure the audio is loaded
      engineSoundRef.current.load();
      
      // Set initial volume
      engineSoundRef.current.volume = 0.35; // Start at 35% volume
      engineSoundRef.current.loop = true;
      
      // Play with robust error handling
      const playPromise = engineSoundRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Generator sound started successfully!");
          setSoundPlaying(true);
          setAudioVolume(0.35);
        }).catch(error => {
          console.error("Failed to play generator sound:", error);
          // Try again with a user interaction - this is for browsers with autoplay restrictions
          const retryPlayback = () => {
            console.log("Retrying sound playback after user interaction");
            if (engineSoundRef.current && data.generatorOn) {
              engineSoundRef.current.play()
                .then(() => {
                  console.log("Generator sound started after retry!");
                  setSoundPlaying(true);
                })
                .catch(e => console.error("Retry also failed:", e));
            }
          };
          
          // Create a one-time event listener for user interaction to retry sound playback
          const handleUserInteraction = () => {
            retryPlayback();
            document.removeEventListener('click', handleUserInteraction);
          };
          
          document.addEventListener('click', handleUserInteraction, { once: true });
        });
      }
      
      return true;
    } catch (e) {
      console.error("Error playing generator sound:", e);
      return false;
    }
  }, [soundEnabled, data.generatorOn]);
  
  // Direct function to stop sound
  const stopGeneratorSound = useCallback(() => {
    console.log("Stopping generator sound...");
    
    if (!engineSoundRef.current) {
      console.log("Sound ref not available");
      return;
    }
    
    try {
      engineSoundRef.current.pause();
      engineSoundRef.current.currentTime = 0;
      setSoundPlaying(false);
      setAudioVolume(0);
      console.log("Generator sound stopped.");
    } catch (e) {
      console.error("Error stopping generator sound:", e);
    }
  }, []);

  // Directly respond to generator on/off state changes
  useEffect(() => {
    console.log("Generator state changed:", data.generatorOn ? "ON" : "OFF", "Auto-start triggered:", data.generatorOn && !soundPlaying ? "YES" : "NO");
    
    if (data.generatorOn) {
      console.log("Generator ON - playing sound");
      // Always play sound when generator is ON, whether manually toggled or auto-started when solar is OFF
      playGeneratorSound();
      
      // The generator can auto-start when:
      // 1. Solar panels are turned OFF manually
      // 2. Weather conditions (rainy + low efficiency) cause solar to turn OFF automatically
      // In both cases, we need to ensure the sound plays correctly
    } else {
      console.log("Generator OFF - stopping sound");
      stopGeneratorSound();
    }
  }, [data.generatorOn, playGeneratorSound, stopGeneratorSound]);

  // Update engine parameters when generator is turned on/off
  useEffect(() => {
    if (data.generatorOn) {
      // Start engine - ramp up RPM
      const rampInterval = setInterval(() => {
        setEngineRPM((prev) => {
          if (prev < customSettings.simulationParams.maxRPM)
            return prev + customSettings.simulationParams.maxRPM / customSettings.simulationParams.startupTime / 3
          clearInterval(rampInterval)
          return customSettings.simulationParams.maxRPM
        })

        // Increase temperature gradually
        setEngineTemp((prev) =>
          Math.min(prev + customSettings.simulationParams.heatGenerationRate / 3, 75 + Math.random() * 15),
        )

        // Increase oil pressure
        setOilPressure((prev) => Math.min(prev + 10, 60 + Math.random() * 10))
      }, 300)

      // Start runtime counter
      const runtimeInterval = setInterval(() => {
        setRunTime((prev) => prev + 1)
      }, 60000) // Increment every minute

      // Start fan rotation animation
      const fanAnimationInterval = setInterval(() => {
        if (customSettings.animations.enableFanRotation) {
          setFanRotation((prev) => (prev + 10 * customSettings.animations.fanRotationSpeed) % 360)
        }
      }, 50)

      // Keep volume fixed at 35% while running
      const volumeUpdateInterval = setInterval(() => {
        if (!engineSoundRef.current || !soundEnabled || !soundPlaying) return;
        engineSoundRef.current.volume = 0.35;
        setAudioVolume(0.35);
      }, 300);
      
      return () => {
        clearInterval(rampInterval);
        clearInterval(runtimeInterval);
        clearInterval(fanAnimationInterval);
        clearInterval(volumeUpdateInterval);
      };
    } else {
      // Stop engine - ramp down RPM
      const rampDownInterval = setInterval(() => {
        setEngineRPM((prev) => {
          if (prev > 0)
            return Math.max(
              0,
              prev - customSettings.simulationParams.maxRPM / customSettings.simulationParams.shutdownTime / 3,
            )
          clearInterval(rampDownInterval)
          return 0
        })

        // Decrease temperature gradually
        setEngineTemp((prev) => Math.max(25, prev - customSettings.simulationParams.coolingRate / 3))

        // Decrease oil pressure
        setOilPressure((prev) => Math.max(0, prev - 15))
      }, 300)
      
      return () => {
        clearInterval(rampDownInterval);
      };
    }
  }, [
    data.generatorOn,
    customSettings.simulationParams.maxRPM,
    customSettings.simulationParams.startupTime,
    customSettings.simulationParams.shutdownTime,
    customSettings.simulationParams.heatGenerationRate,
    customSettings.simulationParams.coolingRate,
    customSettings.animations.enableFanRotation,
    customSettings.animations.fanRotationSpeed,
    soundEnabled,
    configuredSoundVolume,
    soundPlaying
  ]);

  // Toggle sound on/off
  const handleToggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    console.log(`Sound toggle: ${soundEnabled ? 'OFF' : 'ON'}`);
    setSoundEnabled(newSoundEnabled);
    
    if (!newSoundEnabled) {
      stopGeneratorSound();
    } else if (data.generatorOn) {
      playGeneratorSound();
    }
  };

  // Generate smoke particles when generator is running
  useEffect(() => {
    if (!data.generatorOn || engineRPM < 1000 || !customSettings.animations.enableSmoke) return

    const smokeInterval = setInterval(() => {
      // Ensure we have a valid smoke density value - doubled for more dense effect
      const maxParticles = Math.max(2, Math.min(60, (customSettings.animations.smokeDensity || 10) * 2))

      if (smokeParticles.length < maxParticles) {
        setSmokeParticles((prev) => [
          ...prev,
          {
            id: Date.now(),
            size: 3 + Math.random() * 8, // Increased size variation
            opacity: (customSettings.animations.smokeOpacity || 0.4) * (0.3 + Math.random() * 0.5), // Increased opacity
            left: `${-10 + Math.random() * 25}%`, // Wider spread
          },
        ])
      }

      // Remove old particles
      setSmokeParticles((prev) => prev.filter((p) => Date.now() - p.id < 6000)) // Double lifetime to 6 seconds
    }, 50) // Faster generation rate (was 100)

    return () => clearInterval(smokeInterval)
  }, [data.generatorOn, engineRPM, smokeParticles.length, customSettings.animations.enableSmoke, customSettings.animations.smokeDensity, customSettings.animations.smokeOpacity])

  // Format runtime display
  const formatRuntime = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }, [])

  // Add SoundVisualization component
  const SoundVisualization = ({ volume }: { volume: number }) => {
    return (
      <div className="w-8 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-300 rounded-full"
          style={{ 
            width: `${volume * 100}%`,
            opacity: volume > 0 ? 1 : 0.3 
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{
          background: "#ef4444",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
        }}
        isConnectable={true}
      />

      <div
        className={cn(
          "bg-gradient-to-b rounded-md shadow-md flex flex-col relative border-2 p-3",
          data.generatorOn ? "border-orange-500" : "border-slate-600",
        )}
        style={{
          width: `${customSettings.containerSize.width}rem`,
          height: `${customSettings.containerSize.height + 2}rem`,
          backgroundImage: `linear-gradient(to bottom, ${customSettings.containerStyle.gradientStart}, ${customSettings.containerStyle.gradientEnd})`,
          borderRadius: `${customSettings.containerStyle.borderRadius}px`,
          borderWidth: `${customSettings.containerStyle.borderWidth}px`,
          borderColor: data.generatorOn
            ? customSettings.containerStyle.activeColor
            : customSettings.containerStyle.inactiveColor,
          boxShadow:
            customSettings.containerStyle.shadow === "lg"
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              : customSettings.containerStyle.shadow === "md"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                : customSettings.containerStyle.shadow === "sm"
                  ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                  : "none",
          position: "relative",
          zIndex: "2",
        }}
      >
        {/* Exhaust pipe aligned with the left border - positioned behind */}
        <div className="absolute -top-3 -left-5 w-12 h-10" style={{ zIndex: "1" }}>
          {/* Enhanced industrial exhaust pipe with metal details */}
          <div className="relative">
            {/* Main exhaust pipe */}
            <div
              className="w-7 h-7 bg-gradient-to-br from-gray-600 to-gray-800 rounded-tl-md rounded-tr-md mx-auto border-t border-l border-r border-gray-900"
              style={{ 
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)",
                borderColor: "rgba(0,0,0,0.7)"
              }}
            >
              {/* Pipe details */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900 rounded-t-sm opacity-20"></div>
              <div className="absolute top-1 left-1 w-5 h-4 rounded-sm border border-gray-700 bg-gradient-to-b from-gray-700 to-gray-800"></div>
              
              {/* Rivet details */}
              <div className="absolute top-2 left-0.5 w-1 h-1 rounded-full bg-gray-900"></div>
              <div className="absolute top-2 right-0.5 w-1 h-1 rounded-full bg-gray-900"></div>
            </div>
            
            {/* Exhaust opening with soot marks */}
            <div className="w-8 h-2.5 bg-gradient-to-b from-gray-800 to-black rounded-md mx-auto -mt-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-70 rounded-md"></div>
              
              {/* Soot stains around exhaust */}
              <div className="absolute -top-1 -bottom-1 left-0 right-0">
                <div className="absolute top-0 left-1/4 right-1/4 h-3 bg-black opacity-30 blur-sm rounded-full"></div>
              </div>
              
              {/* Heat distortion effect from exhaust */}
              {data.generatorOn && (
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent 
                     opacity-70 animate-pulse" style={{ animationDuration: '1.5s' }}></div>
              )}
            </div>
            
            {/* Metal heat shield*/}
            <div className="absolute -top-0.5 -left-1 w-9 h-1.5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 
                 rounded-md border-t border-l border-r border-gray-800"></div>
            
            {/* Pipe mount bracket */}
            <div className="absolute top-2 -left-2 w-4 h-3 bg-gradient-to-b from-gray-700 to-gray-800 
                 border border-gray-900 rounded-sm"></div>
          </div>

          {/* Smoke particles coming from the exhaust pipe - positioned for left border */}
          {data.generatorOn && engineRPM > 1000 && customSettings.animations.enableSmoke && (
            <div className="absolute top-0 left-0 w-full h-20 overflow-visible"> {/* Increased height for taller smoke column */}
              {/* Diesel smoke base layer - thick and dark */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`smoke-base-${i}`}
                  className="absolute rounded-lg" /* Squared corners for grittier look */
                  style={{
                    width: `${8 + Math.random() * 4}px`,
                    height: `${6 + Math.random() * 6}px`,
                    background: 'linear-gradient(to top, #111827, #374151)', /* Darker, dirtier color */
                    top: `-${2 + i * 6}px`,
                    left: `${1 + Math.sin(Date.now() / 900 + i) * 4}px`,
                    animation: `dieselSmoke ${1.8 + Math.random() * 0.7}s infinite ease-out`,
                    animationDelay: `${i * 0.08}s`,
                    opacity: 0.9 - (i * 0.05),
                    transform: `rotate(${Math.random() * 20 - 10}deg)`, /* Random rotation for chaotic look */
                    filter: 'blur(1px)',
                  }}
                ></div>
              ))}
              
              {/* Thick black plumes with ragged edges */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`smoke-plume-${i}`}
                  className="absolute" /* No rounded corners for ragged look */
                  style={{
                    width: `${5 + Math.random() * 8}px`,
                    height: `${4 + Math.random() * 7}px`,
                    backgroundColor: i % 3 === 0 ? '#1f2937' : i % 2 === 0 ? '#374151' : '#4b5563', /* Varied dark grays */
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 90% 70%, 70% 90%, 30% 100%, 10% 70%, 0% 30%)', /* Ragged edges */
                    top: `-${8 + i * 4}px`,
                    left: `${2 + Math.cos(Date.now() / 800 + i) * 6}px`,
                    animation: `dieselSmoke ${2.2 + Math.random() * 0.8}s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32)`,
                    animationDelay: `${i * 0.11}s`,
                    opacity: 0.85 - (i * 0.03),
                    transform: `rotate(${Math.random() * 40 - 20}deg) scale(${0.9 + Math.random() * 0.4})`,
                    filter: 'blur(0.8px)',
                  }}
                ></div>
              ))}
              
              {/* Oily texture particles for gritty feel */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`smoke-oil-${i}`}
                  className="absolute rounded-sm opacity-70"
                  style={{
                    width: `${2 + Math.random() * 3}px`,
                    height: `${2 + Math.random() * 3}px`,
                    backgroundColor: '#111827',
                    top: `-${5 + i * 4 + Math.random() * 10}px`,
                    left: `${3 + Math.sin(Date.now() / 700 + i * 2) * 7}px`,
                    animation: `dieselSmoke ${2 + Math.random() * 1}s infinite ease-in-out`,
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0.7,
                    filter: 'blur(0.5px)',
                  }}
                ></div>
              ))}
              
              {/* Chaotic swirls - smoke dispersing */}
              {engineRPM > 2000 && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`smoke-swirl-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: `${12 + Math.random() * 8}px`,
                        height: `${10 + Math.random() * 6}px`,
                        background: 'radial-gradient(circle, #4b5563 20%, #6b7280 60%, transparent 90%)',
                        top: `-${18 + i * 7}px`,
                        left: `${i % 2 === 0 ? -5 : 5}px`,
                        animation: `swirlSmoke ${2.5 + Math.random() * 1}s infinite ease-out`,
                        animationDelay: `${i * 0.2}s`,
                        opacity: 0.5 - (i * 0.04),
                        transform: `rotate(${Date.now() / 50 % 360}deg)`,
                        filter: 'blur(1.5px)',
                      }}
                    ></div>
                  ))}
                </>
              )}
              
              {/* Faded gray wisps at the top */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`smoke-wisp-${i}`}
                  className="absolute"
                  style={{
                    width: `${10 + Math.random() * 10}px`,
                    height: `${8 + Math.random() * 8}px`,
                    background: 'linear-gradient(to top, #6b7280, #9ca3af, transparent)',
                    borderRadius: '40% 60% 60% 40% / 40% 50% 50% 60%', /* Irregular shape */
                    top: `-${30 + i * 5}px`,
                    left: `${-8 + Math.sin(Date.now() / 1200 + i) * 10}px`,
                    animation: `fadeSmoke ${3 + Math.random() * 2}s infinite ease-out`,
                    animationDelay: `${i * 0.3}s`,
                    opacity: 0.4 - (i * 0.03),
                    transform: `rotate(${Math.random() * 180}deg)`,
                    filter: 'blur(2px)',
                  }}
                ></div>
              ))}
              
              {/* Sudden bursts of smoke for diesel effect - only on high RPM */}
              {data.generatorOn && engineRPM > 2500 && (
                <div className="absolute w-8 h-8 rounded-lg bg-zinc-900/80"
                  style={{
                    top: '-8px',
                    left: '2px',
                    animation: 'dieselBurst 1.8s infinite ease-out',
                    opacity: 0.9,
                    filter: 'blur(1px)',
                    transformOrigin: 'center bottom',
                  }}
                ></div>
              )}
            </div>
          )}
        </div>

        {/* Generator brand and model */}
        <div className="absolute top-2 left-3 right-3 flex flex-col items-center justify-center">
          <div className="text-xs font-bold" style={{ color: customSettings.panelStyle.accentColor }}>
            {t("Backup Generator")}
          </div>
          <div className="text-xs mt-1" style={{ color: customSettings.panelStyle.textColor }}>
            {t("DG-1000")}
          </div>
        </div>

        {/* Main display panel */}
        {(customSettings.displayOptions.showOutputWattage || customSettings.displayOptions.showRuntime) && (
          <div
            className="mt-12 border rounded-sm p-2 mb-2"
            style={{
              backgroundColor: customSettings.panelStyle.backgroundColor,
              borderColor: customSettings.panelStyle.borderColor,
              color: customSettings.panelStyle.textColor,
              fontSize: `${customSettings.panelStyle.fontSize}px`,
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-semibold" style={{ color: customSettings.panelStyle.accentColor }}>
                {t("Generator Status Panel")}
              </div>
              <div className={cn("text-xs px-1.5 py-0.5 rounded-sm", data.generatorOn ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                {data.generatorOn ? t("OPERATIONAL") : t("STANDBY")}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {customSettings.displayOptions.showOutputWattage && (
                <div className="flex flex-col col-span-1">
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{t("Output")}</span>
                  <span className="font-bold text-lg" style={{ color: customSettings.panelStyle.accentColor }}>
                    {outputWattage}W
                  </span>
                </div>
              )}
              {customSettings.displayOptions.showRuntime && (
                <div className="flex flex-col col-span-1">
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{t("Runtime")}</span>
                  <span className="font-bold text-lg" style={{ color: customSettings.panelStyle.textColor }}>
                    {runtimeHours}h
                  </span>
                </div>
              )}
              <div className="flex flex-col col-span-1">
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{t("Temperature")}</span>
                <span className={cn("font-bold text-lg", tempWarning ? "text-red-400" : "text-white")}>
                  {engineTemp.toFixed(0)}°C
                </span>
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center">
                <Power className={cn("h-3 w-3 mr-1", data.generatorOn ? "text-green-400" : "text-red-400")} />
                <span className={cn("text-xs", data.generatorOn ? "text-green-400" : "text-red-400")}>
                  {data.generatorOn ? t("Running") : t("Offline")}
                </span>
              </div>
                <div className="flex items-center">
                <span className="text-xs text-slate-400 mr-2">RPM:</span>
                <span className="text-xs text-white">{engineRPM}</span>
              </div>
            </div>
            
            {/* Load status now integrated into generator status panel */}
            <div className="mt-2 pt-2 border-t border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-1.5" style={{ 
                    backgroundColor: data.generatorOn ? '#4ade80' : '#f87171',
                    boxShadow: data.generatorOn ? '0 0 5px rgba(74, 222, 128, 0.7)' : 'none' 
                  }}></div>
                  <span className="text-xs font-medium">{t("Load Status")}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {Math.round((outputWattage / customSettings.simulationParams.maxOutputWattage) * 100)}% 
                  {t("Capacity")}
                  </span>
                </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{t("Primary Circuit")}</span>
                  <span className={data.generatorOn ? "text-green-400" : "text-red-400"}>
                    {data.generatorOn ? t("ONLINE") : t("OFFLINE")}
                  </span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{t("Backup Circuit")}</span>
                  <span className={data.generatorOn ? "text-green-400" : "text-slate-500"}>
                    {data.generatorOn ? t("STANDBY") : t("INACTIVE")}
                  </span>
                </div>
                
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      outputWattage > customSettings.simulationParams.maxOutputWattage * 0.8 
                        ? "bg-red-500" 
                        : outputWattage > customSettings.simulationParams.maxOutputWattage * 0.5 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                    )}
                    style={{ width: `${Math.min(100, (outputWattage / customSettings.simulationParams.maxOutputWattage) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engine visualization section with dual engines - Now taller */}
        {customSettings.displayOptions.showRPM && (
          <div className="grid grid-cols-2 gap-3 mb-2">
            {/* Engine 1 visualization */}
          <div
              className="border rounded-sm p-2 relative overflow-hidden"
            style={{
              backgroundColor: customSettings.panelStyle.backgroundColor,
              borderColor: customSettings.panelStyle.borderColor,
              color: customSettings.panelStyle.textColor,
              fontSize: `${customSettings.panelStyle.fontSize}px`,
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <RotateCw className={cn("h-3 w-3 mr-1", data.generatorOn ? "text-green-400" : "text-slate-400")} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {t("Engine")} 1
                </span>
              </div>
              <span className="text-xs" style={{ color: customSettings.panelStyle.textColor }}>
                {engineRPM} RPM
              </span>
            </div>

              {/* Engine block visualization - increased height */}
            <div
                className={cn(
                  "relative h-20 rounded-sm border overflow-hidden",
                  data.generatorOn && customSettings.animations.enableVibration && "animate-vibrate-sm"
                )}
              style={{
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: customSettings.panelStyle.borderColor,
                  animationDuration: data.generatorOn ? `${0.1 / (customSettings.animations.vibrationIntensity || 0.1)}s` : '0s',
              }}
            >
              {/* Radiator grille */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={`radiator-cell-1-${i}`} className="bg-slate-900 rounded-sm"></div>
                  ))}
              </div>

                {/* Heat glow effect for running engine */}
                {data.generatorOn && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-orange-600/20"
                    style={{
                      animation: "glow 3s ease-in-out infinite",
                      opacity: Math.min(0.7, (engineTemp / 100) * 0.7)
                    }}
                  ></div>
                )}
                
                {/* Additional heat waves effect */}
                {data.generatorOn && engineTemp > 40 && (
                  <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"
                      style={{
                        animation: "heatRise 3s ease-in-out infinite",
                        opacity: Math.min(0.6, (engineTemp / 100) * 0.6)
                      }}
                    ></div>
              </div>
                )}
                
                {/* Engine heat pattern */}
                {data.generatorOn && engineTemp > 55 && (
                  <div className="absolute inset-0 mix-blend-overlay">
                    <div className="absolute w-full h-full bg-orange-500/10" 
                      style={{
                        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.3) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 35%)',
                        animation: "heatPulse 4s ease-in-out infinite alternate",
                      }}
                    ></div>
              </div>
                )}

                {/* Engine fan animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-10">
                {/* Fan housing */}
                <div className="absolute inset-0 border-2 border-slate-600 rounded-full"></div>

                {/* Fan blades */}
                <div
                  className="w-full h-full relative"
                  style={{
                    transform: `rotate(${fanRotation}deg)`,
                    transition:
                      data.generatorOn && customSettings.animations.enableFanRotation
                        ? "transform 50ms linear"
                        : "transform 500ms ease-out",
                  }}
                >
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <div
                        key={`fan-blade-1-${angle}`}
                      className="absolute top-1/2 left-1/2 w-1.5 h-6 bg-slate-400"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                        transformOrigin: "center center",
                      }}
                    />
                  ))}
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-slate-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-slate-400"></div>
                </div>
              </div>

              {/* Engine vibration effect */}
              {data.generatorOn && customSettings.animations.enableVibration && (
                  <div
                    className="absolute inset-0 bg-white"
                    style={{
                      opacity: Math.min(0.1, (engineRPM / customSettings.simulationParams.maxRPM) * 0.1),
                    }}
                  ></div>
                )}

                {/* Heat shimmer effect */}
                {data.generatorOn && engineTemp > 50 && customSettings.animations.enableHeatShimmer && (
                  <div
                    className="absolute inset-0 bg-orange-500/10"
                    style={{
                      animation: "heatShimmer 1s ease-in-out infinite",
                    }}
                  ></div>
                )}
                
                {/* Hot spots for engine - randomly positioned */}
                {data.generatorOn && engineTemp > 60 && (
                  <>
                    <div className="absolute w-3 h-3 rounded-full bg-orange-500/30 blur-sm"
                      style={{
                        top: '35%',
                        left: '70%',
                        animation: "glow 2s ease-in-out infinite alternate",
                        animationDelay: "0.2s",
                      }}
                    ></div>
                    <div className="absolute w-2 h-2 rounded-full bg-orange-400/30 blur-sm"
                      style={{
                        top: '60%',
                        left: '25%',
                        animation: "glow 2.5s ease-in-out infinite alternate",
                        animationDelay: "0.7s",
                      }}
                    ></div>
                    
                    {/* Additional hot spots */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-orange-500/30 blur-sm"
                      style={{
                        top: '20%',
                        left: '40%',
                        animation: "glow 2.2s ease-in-out infinite alternate",
                        animationDelay: "0.4s",
                      }}
                    ></div>
                    <div className="absolute w-4 h-4 rounded-full bg-orange-400/20 blur-sm"
                      style={{
                        top: '75%',
                        left: '55%',
                        animation: "glow 3.5s ease-in-out infinite alternate",
                        animationDelay: "1.2s",
                      }}
                    ></div>
                  </>
                )}
                
                {/* Dynamic heat visualizer based on temperature */}
                {data.generatorOn && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={`heat-viz-1-${i}`}
                        className="absolute rounded-full blur-md"
                        style={{
                          backgroundColor: engineTemp > 70 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                          width: `${10 + i * 4}px`,
                          height: `${10 + i * 4}px`,
                          top: `${25 + Math.sin(Date.now() / 2000 + i) * 5}%`,
                          left: `${35 + Math.cos(Date.now() / 1800 + i) * 5}%`,
                          opacity: Math.min(0.3, (engineTemp / 100) * 0.3) * (1 - i * 0.15),
                          animation: `heatPulse ${2 + i * 0.3}s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Engine block label */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-slate-700 border-t border-slate-600 flex items-center justify-center">
                  <div className="text-[8px] text-slate-300 font-bold">{t("ENGINE_1")}</div>
                </div>
                    </div>
                  </div>

            {/* Engine 2 visualization */}
                    <div
              className="border rounded-sm p-2 relative overflow-hidden"
                      style={{
                backgroundColor: customSettings.panelStyle.backgroundColor,
                borderColor: customSettings.panelStyle.borderColor,
                color: customSettings.panelStyle.textColor,
                fontSize: `${customSettings.panelStyle.fontSize}px`,
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <RotateCw className={cn("h-3 w-3 mr-1", data.generatorOn ? "text-green-400" : "text-slate-400")} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {t("Engine")} 2
                  </span>
                </div>
                <span className="text-xs" style={{ color: customSettings.panelStyle.textColor }}>
                  {engineRPM} RPM
                </span>
              </div>

              {/* Engine block visualization - increased height */}
              <div
                className={cn(
                  "relative h-20 rounded-sm border overflow-hidden",
                  data.generatorOn && customSettings.animations.enableVibration && "animate-vibrate-sm"
                )}
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  borderColor: customSettings.panelStyle.borderColor,
                  animationDuration: data.generatorOn ? `${0.12 / (customSettings.animations.vibrationIntensity || 0.1)}s` : '0s',
                  animationDelay: "0.05s",
                }}
              >
                {/* Radiator grille */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={`radiator-cell-2-${i}`} className="bg-slate-900 rounded-sm"></div>
                  ))}
                </div>
                
                {/* Heat glow effect for running engine */}
                {data.generatorOn && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-orange-600/20"
                    style={{
                      animation: "glow 2.5s ease-in-out infinite",
                      opacity: Math.min(0.7, (engineTemp / 100) * 0.7)
                      }}
                    ></div>
                  )}
                
                {/* Additional heat waves effect */}
                {data.generatorOn && engineTemp > 40 && (
                  <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"
                      style={{
                        animation: "heatRise 3.5s ease-in-out infinite",
                        opacity: Math.min(0.6, (engineTemp / 100) * 0.6)
                      }}
                    ></div>
                  </div>
                )}
                
                {/* Engine heat pattern */}
                {data.generatorOn && engineTemp > 55 && (
                  <div className="absolute inset-0 mix-blend-overlay">
                    <div className="absolute w-full h-full bg-orange-500/10" 
                      style={{
                        backgroundImage: 'radial-gradient(circle at 60% 60%, rgba(249, 115, 22, 0.3) 0%, transparent 40%), radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.3) 0%, transparent 35%)',
                        animation: "heatPulse 4.5s ease-in-out infinite alternate",
                      }}
                    ></div>
                  </div>
                )}

                {/* Engine fan animation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-10">
                  {/* Fan housing */}
                  <div className="absolute inset-0 border-2 border-slate-600 rounded-full"></div>

                  {/* Fan blades */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      transform: `rotate(${(fanRotation + 45) % 360}deg)`,
                      transition:
                        data.generatorOn && customSettings.animations.enableFanRotation
                          ? "transform 50ms linear"
                          : "transform 500ms ease-out",
                    }}
                  >
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <div
                        key={`fan-blade-2-${angle}`}
                        className="absolute top-1/2 left-1/2 w-1.5 h-6 bg-slate-400"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                          transformOrigin: "center center",
                        }}
                      />
                    ))}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-slate-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-slate-400"></div>
                  </div>
                </div>

                {/* Engine vibration effect */}
                {data.generatorOn && customSettings.animations.enableVibration && (
                  <div
                    className="absolute inset-0 bg-white"
                    style={{
                      opacity: Math.min(0.1, (engineRPM / customSettings.simulationParams.maxRPM) * 0.1),
                    }}
                  ></div>
                )}

                {/* Heat shimmer effect */}
                {data.generatorOn && engineTemp > 50 && customSettings.animations.enableHeatShimmer && (
                  <div
                    className="absolute inset-0 bg-orange-500/10"
                    style={{
                      animation: "heatShimmer 1s ease-in-out infinite",
                    }}
                  ></div>
                )}
                
                {/* Hot spots for engine - randomly positioned */}
                {data.generatorOn && engineTemp > 60 && (
                  <>
                    <div className="absolute w-3 h-3 rounded-full bg-orange-500/30 blur-sm"
                      style={{
                        top: '45%',
                        left: '65%',
                        animation: "glow 2.2s ease-in-out infinite alternate",
                        animationDelay: "0.5s",
                      }}
                    ></div>
                    <div className="absolute w-2 h-2 rounded-full bg-orange-400/30 blur-sm"
                      style={{
                        top: '70%',
                        left: '30%',
                        animation: "glow 3s ease-in-out infinite alternate",
                        animationDelay: "1s",
                      }}
                    ></div>
                    
                    {/* Additional hot spots */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-orange-500/30 blur-sm"
                      style={{
                        top: '25%',
                        left: '45%',
                        animation: "glow 2.7s ease-in-out infinite alternate",
                        animationDelay: "0.3s",
                      }}
                    ></div>
                    <div className="absolute w-4 h-4 rounded-full bg-orange-400/20 blur-sm"
                      style={{
                        top: '65%',
                        left: '60%',
                        animation: "glow 3.2s ease-in-out infinite alternate",
                        animationDelay: "1.5s",
                      }}
                    ></div>
                  </>
                )}
                
                {/* Dynamic heat visualizer based on temperature */}
                {data.generatorOn && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={`heat-viz-2-${i}`}
                        className="absolute rounded-full blur-md"
                        style={{
                          backgroundColor: engineTemp > 70 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                          width: `${10 + i * 4}px`,
                          height: `${10 + i * 4}px`,
                          top: `${30 + Math.sin(Date.now() / 1800 + i) * 5}%`,
                          left: `${40 + Math.cos(Date.now() / 2000 + i) * 5}%`,
                          opacity: Math.min(0.3, (engineTemp / 100) * 0.3) * (1 - i * 0.15),
                          animation: `heatPulse ${2 + i * 0.3}s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.15 + 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Engine block label */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-slate-700 border-t border-slate-600 flex items-center justify-center">
                  <div className="text-[8px] text-slate-300 font-bold">{t("ENGINE_2")}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic indicators */}
        <div className="border rounded-sm p-2 mb-2" style={{
          backgroundColor: customSettings.panelStyle.backgroundColor,
          borderColor: customSettings.panelStyle.borderColor,
          color: customSettings.panelStyle.textColor,
        }}>
          <div className="text-xs font-medium mb-2">{t("Diagnostic Indicators")}</div>
          <div className="grid grid-cols-4 gap-1">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mb-1", 
                data.generatorOn ? "bg-green-500" : "bg-slate-600"
              )}></div>
              <span className="text-[8px] text-center">POWER</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mb-1", 
                engineTemp > 70 ? "bg-red-500" : engineTemp > 50 ? "bg-yellow-500" : "bg-slate-600"
              )}></div>
              <span className="text-[8px] text-center">TEMP</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mb-1", 
                oilPressure < 20 ? "bg-red-500" : "bg-green-500"
              )}></div>
              <span className="text-[8px] text-center">OIL</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mb-1", 
                data.fuelLevel < 20 ? "bg-red-500" : data.fuelLevel < 40 ? "bg-yellow-500" : "bg-green-500"
              )}></div>
              <span className="text-[8px] text-center">FUEL</span>
            </div>
          </div>
        </div>

        {/* Additional gauges */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {/* Oil pressure gauge */}
          {customSettings.displayOptions.showOilPressure && (
            <div
              className="border rounded-sm p-2"
              style={{
                backgroundColor: customSettings.panelStyle.backgroundColor,
                borderColor: customSettings.panelStyle.borderColor,
                color: customSettings.panelStyle.textColor,
                fontSize: `${customSettings.panelStyle.fontSize}px`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Droplet className="h-3 w-3 text-blue-400 mr-1" />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {t("Oil")}
                  </span>
                </div>
                <span className="text-xs" style={{ color: customSettings.panelStyle.textColor }}>
                  {oilPressure.toFixed(0)} PSI
                </span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-500", oilPressure < 20 ? "bg-red-500" : "bg-blue-500")}
                  style={{ width: `${(oilPressure / 80) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Runtime counter */}
          {customSettings.displayOptions.showRuntime && (
            <div
              className="border rounded-sm p-2"
              style={{
                backgroundColor: customSettings.panelStyle.backgroundColor,
                borderColor: customSettings.panelStyle.borderColor,
                color: customSettings.panelStyle.textColor,
                fontSize: `${customSettings.panelStyle.fontSize}px`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" style={{ color: customSettings.panelStyle.accentColor }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {t("Total")}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-xs font-mono" style={{ color: customSettings.panelStyle.textColor }}>
                  {formatRuntime(runTime)}
                </span>
              </div>
            </div>
          )}

          {/* Power Output */}
          <div
            className="border rounded-sm p-2"
            style={{
              backgroundColor: customSettings.panelStyle.backgroundColor,
              borderColor: customSettings.panelStyle.borderColor,
              color: customSettings.panelStyle.textColor,
              fontSize: `${customSettings.panelStyle.fontSize}px`,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Power className="h-3 w-3 mr-1" style={{ color: customSettings.panelStyle.accentColor }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {t("Power")}
                </span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-mono" style={{ color: data.generatorOn ? "rgb(74, 222, 128)" : "rgb(248, 113, 113)" }}>
                {data.generatorOn ? t("ACTIVE") : t("INACTIVE")}
              </span>
            </div>
          </div>
        </div>

        {/* Fuel gauge */}
        {customSettings.displayOptions.showFuelLevel && (
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Fuel className="h-3 w-3 mr-1" style={{ color: customSettings.panelStyle.accentColor }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {t("Fuel Level")}
                </span>
              </div>
              <span className={cn("text-xs font-medium", lowFuel ? "text-red-400" : "text-white")}>
                {Math.round(data.fuelLevel)}%
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: customSettings.panelStyle.backgroundColor }}
            >
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  data.fuelLevel > 60 ? "bg-green-500" : data.fuelLevel > 20 ? "bg-yellow-500" : "bg-red-500",
                )}
                style={{ width: `${data.fuelLevel}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Generator controls */}
        <div
          className="border rounded-sm p-2 flex items-center justify-between mt-auto mb-6"
          style={{
            backgroundColor: customSettings.panelStyle.backgroundColor,
            borderColor: customSettings.panelStyle.borderColor,
            color: customSettings.panelStyle.textColor,
            fontSize: `${customSettings.panelStyle.fontSize}px`,
          }}
        >
          <div className="flex items-center">
            <Gauge className="h-4 w-4 mr-2" style={{ color: customSettings.panelStyle.accentColor }} />
            <Label htmlFor="generator-active" className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("Engine Power")}
            </Label>
          </div>
          <Switch
            checked={data.generatorOn}
            onCheckedChange={data.onGeneratorChange}
            id="generator-active"
            className="data-[state=checked]:bg-orange-600"
          />
        </div>

        {/* Warning indicators */}
        {lowFuel && (
          <div className="absolute top-2 right-12 animate-pulse">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
        )}

        {/* Engine sound effect indicator */}
        {customSettings.displayOptions.showSoundControls && (
          <div className="absolute top-3 right-3 flex flex-col items-end space-y-1">
            <button
              onClick={handleToggleSound}
              className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-xs",
                soundEnabled && soundPlaying ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-300"
              )}
              title={soundEnabled ? t("Mute generator sound") : t("Unmute generator sound")}
            >
              {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
            <SoundVisualization volume={audioVolume} />
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: data.generatorOn ? `rgba(249, 115, 22, ${powerFlowIntensity})` : "#666",
          width: "10px",
          height: "10px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: data.generatorOn ? `0 0 ${5 + powerFlowIntensity * 10}px rgba(249, 115, 22, ${powerFlowIntensity})` : "none",
          transition: "all 0.3s ease-in-out",
          animation: data.generatorOn && outputWattage > 0 ? "pulse 2s infinite" : "none",
        }}
        isConnectable={true}
      />

      {/* Add data flow indicator near the handle */}
      {data.generatorOn && outputWattage > 0 && (
        <div 
          className="absolute right-2 top-1/2 transform translate-x-4 -translate-y-1/2 bg-slate-900/80 px-2 py-0.5 rounded text-xs font-medium z-50"
          style={{
            color: "#f97316",
            textShadow: "0 0 5px rgba(249, 115, 22, 0.5)",
          }}
        >
          Data
        </div>
      )}

      {/* Hidden audio element for generator sound */}
      <audio
        ref={engineSoundRef}
        src="/sounds/generator-large.mp3"
        preload="auto"
        loop
      />
    </div>
  )
}

export default memo(BackupGeneratorNode)