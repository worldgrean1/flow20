import { Handle, Position, type NodeProps } from "reactflow"
import { cn } from "../../lib/utils"
import { useState, useEffect, memo, useCallback, useRef } from "react"
import { TransformerBushing } from "./transformer-bushing"
import { VoltageFlowPath } from "./voltage-flow-path"
import { TransformerControl } from "./three-phase-transformer-control"

// Import CSS for animations
import "./animations.css"
import "./transformer-animations.css"
import "./nv1.css" // Import Nv1 animation styles

// Default settings for the three-phase transformer component
export const defaultThreePhaseTransformerSettings = {
  id: "three-phase-transformer",
  name: "Three-Phase Transformer",
  type: "threePhaseTransformer",
  containerSize: { width: 40, height: 48 },
  containerStyle: {
    backgroundColor: "",
    gradientStart: "#1e40af", // blue-800
    gradientEnd: "#1e3a8a", // blue-900
    borderColor: "",
    activeColor: "#3b82f6", // blue-500
    inactiveColor: "#475569", // slate-600
    borderWidth: 2,
    borderRadius: 6,
    shadow: "md",
  },
  panelStyle: {
    backgroundColor: "#0f172a", // slate-900
    borderColor: "#334155", // slate-700
    textColor: "#f8fafc", // slate-50
    accentColor: "#3b82f6", // blue-500
    fontSize: 12,
  },
  simulationParams: {
    maxInputVoltage: 11000,
    maxOutputVoltage: 415,
    maxCapacity: 1500,
    efficiency: 98,
    phases: 3,
    coolingType: "oil",
    temperatureRiseRate: 2,
    coolingRate: 1,
    normalOperatingTemp: 65,
    maxOperatingTemp: 95,
    oilViscosity: 1.2,
    windingResistance: 0.02,
    coreResistance: 0.05,
    magnetizingCurrent: 0.5,
    harmonicDistortion: 2.5,
    impedance: 5.5,
    powerFactor: 0.98,
    shortCircuitImpedance: 6,
    noLoadLoss: 1.2,
    loadLoss: 10.5,
    coronaDischargeProbability: 0.02,
    insulationAgingRate: 0.001,
    bushingLeakageCurrent: 0.05,
    windingHotSpotFactor: 1.3,
    oilAcidityLevel: 0.15,
    moistureContent: 15, // ppm
    dielectricStrength: 40, // kV
    arcingProbability: 0.01,
    tapChangerPosition: 3,
    tapChangerPositions: 5,
  },
  animations: {
    enableVibration: true,
    vibrationIntensity: 0.5,
    enableHumNoise: true,
    humNoiseIntensity: 0.7,
    enableGlow: true,
    glowIntensity: 0.5,
    enableOilFlow: true,
    oilFlowSpeed: 1,
    enableCoolingFan: true,
    fanSpeed: 1,
    enableCoronaEffect: true,
    coronaIntensity: 0.3,
    enableElectricalArcs: true,
    arcIntensity: 0.4,
    enableBushingLeakage: true,
    leakageIntensity: 0.2,
    enableMagneticFlux: true,
    magneticFluxIntensity: 0.6,
    enableHotspotGlow: true,
    hotspotIntensity: 0.5,
  },
}

export interface ThreePhaseTransformerData {
  transformerOn: boolean
  gridConnected: boolean
  loadPercentage: number
  onTransformerChange: (value: boolean) => void
  onGridConnectionChange?: (value: boolean) => void
  t?: (key: string) => string
  efficiency?: number
  inputVoltage?: number
  outputVoltage?: number
  frequency?: number
  powerFactor?: number
  oilLevel?: number
  coolingStatus?: "normal" | "warning" | "critical"
  insulationStatus?: "good" | "degraded" | "critical"
  harmonicDistortion?: number
  phaseImbalance?: number
  shortCircuitCurrent?: number
  impedanceVoltage?: number
  noLoadCurrent?: number
  windingTemperature?: number
  ambientTemperature?: number
  tapPosition?: number
  maxTapPositions?: number
  oilAcidityLevel?: number
  moistureContent?: number // ppm
  dielectricStrength?: number // kV
  bushingCondition?: "good" | "degraded" | "critical"
  coronaDischargeDetected?: boolean
  partialDischargeLevel?: number
  windingHotSpotTemperature?: number
  coolingFanStatus?: "off" | "low" | "medium" | "high"
  oilPumpStatus?: "off" | "on"
  loadType?: "balanced" | "unbalanced"
  groundFaultDetected?: boolean
  tankPressure?: number // kPa
  onTapPositionChange?: (value: number) => void
  // Add animations property
  animations?: {
    enableVibration?: boolean
    vibrationIntensity?: number
    enableHumNoise?: boolean
    humNoiseIntensity?: number
    enableGlow?: boolean
    glowIntensity?: number
    enableOilFlow?: boolean
    oilFlowSpeed?: number
    enableCoolingFan?: boolean
    fanSpeed?: number
    enableCoronaEffect?: boolean
    coronaIntensity?: number
    enableElectricalArcs?: boolean
    arcIntensity?: number
    enableBushingLeakage?: boolean
    leakageIntensity?: number
    enableMagneticFlux?: boolean
    magneticFluxIntensity?: number
    enableHotspotGlow?: boolean
    hotspotIntensity?: number
  }
}

export interface ThreePhaseTransformerNodeProps extends NodeProps<ThreePhaseTransformerData> {}

function ThreePhaseTransformerNode({ data }: ThreePhaseTransformerNodeProps) {
  // Transformer hum sound
  const transformerHumRef = useRef<HTMLAudioElement>(null);
  // Add references for other sound effects
  const bubblesSoundRef = useRef<HTMLAudioElement>(null);
  const oilFlowSoundRef = useRef<HTMLAudioElement>(null);
  const bushingDischargeSoundRef = useRef<HTMLAudioElement>(null);
  // Add reference for electric shock sound
  const electricShockSoundRef = useRef<HTMLAudioElement>(null);
  
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<{ element: HTMLDivElement; timestamp: number; lifespan: number }[]>([]);
  const isGeneratingBubbles = useRef(false);

  // Add default translation function if not provided
  const { t = (key: string) => key } = data || {}
  
  // Add state for electric shock effects
  const [electricShocks, setElectricShocks] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    timestamp: number;
    paths: string[];
  }>>([]);
  const [isUserShocked, setIsUserShocked] = useState(false);

  const [temperature, setTemperature] = useState(35)
  const [currentLoad] = useState(data.loadPercentage || 50)
  const [efficiency] = useState(data.efficiency || 98)
  const [coolingFanSpeed, setCoolingFanSpeed] = useState(0)
  const [harmonicLevel, setHarmonicLevel] = useState(data.harmonicDistortion || 2.5)
  const [windingTemp, setWindingTemp] = useState(data.windingTemperature || 55)
  const [oilFlowRate, setOilFlowRate] = useState(1)
  const [_magneticFlux, setMagneticFlux] = useState(0.8) // Prefixed with underscore to indicate intentionally unused
  const [insulationHealth, setInsulationHealth] = useState(95)
  const [coreVibration, setCoreVibration] = useState(0)
  const [_phaseAngles, setPhaseAngles] = useState([0, 120, 240]) // Prefixed with underscore to indicate intentionally unused
  const [bushingStatus] = useState({
    hv1: true,
    hv2: true,
    hv3: true,
    lv1: true,
    lv2: true,
    lv3: true,
  })
  
  // New state variables
  const [coronaDischarges, setCoronaDischarges] = useState<Array<{ id: number; position: string; size: number; duration: number }>>([])
  const [electricalArcs, setElectricalArcs] = useState<Array<{ id: number; position: string; size: number; duration: number }>>([])
  const [oilAcidity, setOilAcidity] = useState(data.oilAcidityLevel || 0.15)
  const [moistureContent] = useState(data.moistureContent || 15)
  const [dielectricStrength, setDielectricStrength] = useState(data.dielectricStrength || 40)
  const [windingHotSpot, setWindingHotSpot] = useState(data.windingHotSpotTemperature || 65)
  const [oilPumpState, setOilPumpState] = useState(data.oilPumpStatus || "off")
  const [partialDischargeLevel, setPartialDischargeLevel] = useState(data.partialDischargeLevel || 0)
  const [magneticFluxLines, setMagneticFluxLines] = useState<Array<{ id: number; path: string }>>([])
  const [transformerVibrationIntensity, setTransformerVibrationIntensity] = useState(0)

  // Add state for sound control settings
  const [humNoiseIntensity] = useState(
    data.animations?.humNoiseIntensity ?? defaultThreePhaseTransformerSettings.animations.humNoiseIntensity
  );
  const [bubbleNoiseIntensity] = useState(
    data.animations?.oilFlowSpeed ?? defaultThreePhaseTransformerSettings.animations.oilFlowSpeed
  );
  const [oilFlowNoiseIntensity] = useState(
    data.animations?.oilFlowSpeed ?? defaultThreePhaseTransformerSettings.animations.oilFlowSpeed
  );
  const [bushingDischargeNoiseIntensity] = useState(
    data.animations?.coronaIntensity ?? defaultThreePhaseTransformerSettings.animations.coronaIntensity
  );
  
  // Add state for tracking audio visualization volumes
  const [audioVolume, setAudioVolume] = useState(0);
  const [bubbleAudioVolume, setBubbleAudioVolume] = useState(0);
  const [oilFlowAudioVolume, setOilFlowAudioVolume] = useState(0);
  const [bushingDischargeAudioVolume, setBushingDischargeAudioVolume] = useState(0);

  // Get the initial sound intensity settings from props or defaults
  // Removed duplicate declarations

  // Safe play function for audio elements
  const safePlayAudio = useCallback((audioRef: React.RefObject<HTMLAudioElement>, volume: number, setVolume: (value: number) => void) => {
    if (!audioRef.current) return false;
    
    try {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
        setVolume(0);
        return false;
      });
      return true;
    } catch (e) {
      console.error("Error playing audio:", e);
      setVolume(0);
      return false;
    }
  }, []);
  
  // Safe pause function for audio elements
  const safePauseAudio = useCallback((audioRef: React.RefObject<HTMLAudioElement>, setVolume: (value: number) => void) => {
    if (!audioRef.current) return;
    
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setVolume(0);
    } catch (e) {
      console.error("Error pausing audio:", e);
    }
  }, []);

  // Add immediate sound cutoff effect when Power Control is turned OFF
  useEffect(() => {
    if (!data.transformerOn) {
      // Immediately stop all audio when Power Control is turned off
      safePauseAudio(transformerHumRef, setAudioVolume);
      safePauseAudio(bubblesSoundRef, setBubbleAudioVolume);
      safePauseAudio(oilFlowSoundRef, setOilFlowAudioVolume);
      safePauseAudio(bushingDischargeSoundRef, setBushingDischargeAudioVolume);
    }
  }, [data.transformerOn, safePauseAudio]);
  
  // Add effect to control transformer hum audio
  useEffect(() => {
    if (!transformerHumRef.current) return;
    
    if (data.transformerOn && humNoiseIntensity > 0) {
      // Calculate volume based on current load
      const volume = Math.min(1, (currentLoad / 100) * humNoiseIntensity);
      
      transformerHumRef.current.loop = true;
      safePlayAudio(transformerHumRef, volume, setAudioVolume);
    } else {
      // If intensity is exactly 0, stop immediately
      if (humNoiseIntensity === 0) {
        safePauseAudio(transformerHumRef, setAudioVolume);
        return;
      }
      
      // Otherwise fade out and pause the audio
      const fadeInterval = setInterval(() => {
        if (!transformerHumRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        
        if (transformerHumRef.current.volume > 0.01) {
          transformerHumRef.current.volume -= 0.01;
        } else {
          safePauseAudio(transformerHumRef, setAudioVolume);
          clearInterval(fadeInterval);
        }
      }, 50);
      
      return () => clearInterval(fadeInterval);
    }
  }, [data.transformerOn, currentLoad, humNoiseIntensity, safePlayAudio, safePauseAudio]);
  
  // Add effect to control oil bubbling audio
  useEffect(() => {
    // Bubble sound file has been removed, so we disable this functionality
    setBubbleAudioVolume(0); // Always keep volume at 0 since the file doesn't exist
    return;
    
    /* Original code commented out since bubble.mp3 is missing
    if (!bubblesSoundRef.current) return;
    
    // Only play if transformer is ON, oil flow is enabled, and noise intensity > 0
    if (data.transformerOn && data.animations?.enableOilFlow !== false && bubbleNoiseIntensity > 0) {
      // Calculate volume based on temperature and bubbleNoiseIntensity
      const volume = (temperature / 100) * bubbleNoiseIntensity;
      setBubbleAudioVolume(volume);
      
      bubblesSoundRef.current.loop = true;
      safePlayAudio(bubblesSoundRef, volume, setBubbleAudioVolume);
    } else {
      // If intensity is exactly 0, stop immediately
      if (bubbleNoiseIntensity === 0) {
        safePauseAudio(bubblesSoundRef, setBubbleAudioVolume);
        return;
      }
      
      // Otherwise fade out and pause the audio
      const fadeInterval = setInterval(() => {
        if (!bubblesSoundRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        
        if (bubblesSoundRef.current.volume > 0.01) {
          bubblesSoundRef.current.volume -= 0.01;
        } else {
          safePauseAudio(bubblesSoundRef, setBubbleAudioVolume);
          clearInterval(fadeInterval);
        }
      }, 50);
      
      return () => clearInterval(fadeInterval);
    }
    */
  }, [data.transformerOn, temperature, data.animations?.enableOilFlow, bubbleNoiseIntensity, safePlayAudio, safePauseAudio]);
  
  // Add effect to control oil flow audio
  useEffect(() => {
    // Oil flow sound file has been removed, so we disable this functionality
    setOilFlowAudioVolume(0); // Always keep volume at 0 since the file doesn't exist
    return;
    
    /* Original code commented out since oil-flow.mp3 is missing
    if (!oilFlowSoundRef.current) return;
    
    // Only play if transformer is ON, oil flow is enabled, and noise intensity > 0
    if (data.transformerOn && data.animations?.enableOilFlow !== false && oilFlowNoiseIntensity > 0) {
      // Calculate volume based on intensity and flow rate
      const volume = Math.min(1, oilFlowNoiseIntensity * (oilFlowRate / 3));
      oilFlowSoundRef.current.volume = volume;
      setOilFlowAudioVolume(volume);
      
      if (oilFlowSoundRef.current.paused) {
        oilFlowSoundRef.current.play().catch(e => {
          console.error("Error playing oil flow sound:", e);
          // Add fallback for error handling
          setOilFlowAudioVolume(0);
        });
      }
    } else {
      // If intensity is exactly 0, stop immediately
      if (oilFlowNoiseIntensity === 0 && oilFlowSoundRef.current) {
        oilFlowSoundRef.current.pause();
        oilFlowSoundRef.current.currentTime = 0;
        setOilFlowAudioVolume(0);
        return;
      }
      
      // Otherwise fade out and pause the audio
      const fadeInterval = setInterval(() => {
        if (!oilFlowSoundRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        
        if (oilFlowSoundRef.current.volume > 0.01) {
          oilFlowSoundRef.current.volume -= 0.01;
        } else {
          oilFlowSoundRef.current.pause();
          oilFlowSoundRef.current.currentTime = 0;
          setOilFlowAudioVolume(0);
          clearInterval(fadeInterval);
        }
      }, 50);
      
      return () => clearInterval(fadeInterval);
    }
    */
  }, [data.transformerOn, oilFlowRate, data.animations?.enableOilFlow, oilFlowNoiseIntensity]);
  
  // Add effect to control bushing discharge audio
  useEffect(() => {
    // Bushing discharge sound file has been removed, so we disable this functionality
    setBushingDischargeAudioVolume(0); // Always keep volume at 0 since the file doesn't exist
    return;
    
    /* Original code commented out since bushing-discharge.mp3 is missing
    if (!bushingDischargeSoundRef.current) return;
    
    // Only play if transformer is ON, corona effect is enabled, and noise intensity > 0
    if (data.transformerOn && data.animations?.enableCoronaEffect !== false && bushingDischargeNoiseIntensity > 0) {
      // Calculate volume based on intensity and partial discharge level
      const volume = Math.min(1, bushingDischargeNoiseIntensity * (partialDischargeLevel / 10));
      bushingDischargeSoundRef.current.volume = volume;
      setBushingDischargeAudioVolume(volume);
      
      if (bushingDischargeSoundRef.current.paused) {
        bushingDischargeSoundRef.current.play().catch(e => {
          console.log('Discharge audio playback error:', e);
          // Add fallback for error handling
          setBushingDischargeAudioVolume(0);
        });
      }
    } else {
      // If intensity is exactly 0, stop immediately
      if (bushingDischargeNoiseIntensity === 0) {
        if (bushingDischargeSoundRef.current) {
          bushingDischargeSoundRef.current.pause();
          bushingDischargeSoundRef.current.currentTime = 0;
          setBushingDischargeAudioVolume(0);
        }
        return;
      }
      
      // Otherwise fade out gradually
      if (bushingDischargeSoundRef.current && !bushingDischargeSoundRef.current.paused) {
        const fadeOut = () => {
          if (!bushingDischargeSoundRef.current) return;
          
          const vol = bushingDischargeSoundRef.current.volume;
          if (vol > 0.05) {
            bushingDischargeSoundRef.current.volume = vol - 0.05;
            setTimeout(fadeOut, 50);
          } else {
            bushingDischargeSoundRef.current.pause();
            bushingDischargeSoundRef.current.currentTime = 0;
            setBushingDischargeAudioVolume(0);
          }
        };
        fadeOut();
      }
    }
    */
  }, [data.transformerOn, data.animations?.enableCoronaEffect, bushingDischargeNoiseIntensity, partialDischargeLevel]);

  // Adjust hum volume based on transformer load and temperature changes
  useEffect(() => {
    if (transformerHumRef.current && !transformerHumRef.current.paused) {
      // Calculate volume based on load, temperature and intensity
      const baseVolume = humNoiseIntensity * 0.7;
      const loadFactor = currentLoad / 100;
      const tempFactor = Math.min(0.2, (temperature - 35) / 300);
      
      // Calculate final volume with slight variations based on temperature
      const calculatedVolume = baseVolume + (loadFactor * 0.3) + tempFactor;
      
      // Apply volume with smoothing
      transformerHumRef.current.volume = Math.min(1, calculatedVolume);
      setAudioVolume(calculatedVolume);
      
      // Also adjust vibration intensity based on sound volume
      setTransformerVibrationIntensity(calculatedVolume * 0.8);
    }
    
    // Still adjust vibration intensity even if sound isn't playing
    if (!transformerHumRef.current || transformerHumRef.current.paused) {
      const baseIntensity = humNoiseIntensity * 0.7;
      const loadFactor = currentLoad / 100;
      const tempFactor = Math.min(0.2, (temperature - 35) / 300);
      const calculatedIntensity = baseIntensity + (loadFactor * 0.3) + tempFactor;
      setTransformerVibrationIntensity(calculatedIntensity * 0.8);
    }
  }, [currentLoad, temperature, humNoiseIntensity]);

  // Temperature simulation with improved cooling logic
  useEffect(() => {
    if (!data.transformerOn) {
      const cooldownInterval = setInterval(() => {
        setTemperature(prev => Math.max(prev - 1, 35))
        setWindingTemp(prev => Math.max(prev - 1.2, 45))
        setHarmonicLevel(prev => Math.max(prev - 0.1, 2.5))
        setMagneticFlux(prev => Math.max(prev - 0.05, 0.5))
        setCoreVibration(0)
        setWindingHotSpot(prev => Math.max(prev - 1.5, 40))
        setTransformerVibrationIntensity(0)
        setPartialDischargeLevel(0)
        
        // Slowly decrease oil pump and cooling fan activity
        if (coolingFanSpeed > 0) setCoolingFanSpeed(prev => Math.max(prev - 5, 0))
        if (oilPumpState === "on") {
          setOilFlowRate(prev => {
            const newRate = Math.max(prev - 0.1, 0)
            if (newRate === 0) setOilPumpState("off")
            return newRate
          })
        }
      }, 1000)
      return () => clearInterval(cooldownInterval)
    }

    const heatupInterval = setInterval(() => {
      if (data.transformerOn) {
        // Calculate target temperatures based on load and ambient conditions
        const ambientEffect = (data.ambientTemperature || 25) / 25
        const loadFactor = currentLoad / 100
        const targetTemp = 65 + (loadFactor * 30) * ambientEffect
        const targetWindingTemp = 75 + (loadFactor * 35) * ambientEffect
        const hotSpotFactor = defaultThreePhaseTransformerSettings.simulationParams.windingHotSpotFactor
        const targetHotSpot = targetWindingTemp * hotSpotFactor
        
        // Oil quality affects cooling efficiency
        const oilQualityFactor = Math.max(0.7, 1 - (oilAcidity * 2))
        const moistureFactor = Math.max(0.8, 1 - (moistureContent / 100))
        const oilEfficiencyFactor = oilQualityFactor * moistureFactor
        
        // Calculate cooling effect
        const coolingEffect = calculateCoolingEffect(temperature) * oilEfficiencyFactor
        const windingCoolingEffect = calculateCoolingEffect(windingTemp) * oilEfficiencyFactor * 0.8
        const hotSpotCoolingEffect = calculateCoolingEffect(windingHotSpot) * oilEfficiencyFactor * 0.6

        // Update temperatures with cooling
        setTemperature(prev => {
          const newTemp = prev < targetTemp 
            ? Math.min(prev + 2 * ambientEffect, targetTemp)
            : Math.max(prev - coolingEffect, targetTemp)
          return newTemp
        })

        setWindingTemp(prev => {
          const newTemp = prev < targetWindingTemp
            ? Math.min(prev + 2.5 * ambientEffect, targetWindingTemp)
            : Math.max(prev - windingCoolingEffect, targetWindingTemp)
          return newTemp
        })
        
        setWindingHotSpot(prev => {
          const newTemp = prev < targetHotSpot
            ? Math.min(prev + 3 * ambientEffect, targetHotSpot)
            : Math.max(prev - hotSpotCoolingEffect, targetHotSpot)
          return newTemp
        })

        // Update other parameters
        // Harmonic level affected by load and power quality
        setHarmonicLevel(prev => Math.min(prev + 0.2 * loadFactor, 8))
        
        // Phase balance affected by load type
        setPhaseAngles(prev => prev.map(angle => (angle + 2) % 360))
        
        // Magnetic flux affected by voltage and core status
        setMagneticFlux(prev => Math.min(prev + 0.1 * loadFactor, 1.2))
        
        // Core vibration related to load and magnetic flux
        const vibrationLevel = loadFactor * (1 + (harmonicLevel / 10))
        setCoreVibration(vibrationLevel)
        setTransformerVibrationIntensity(vibrationLevel * 0.7)
        
        // Insulation degradation over time - affected by temperature and moisture
        const tempStress = Math.max(0, (windingHotSpot - 80) / 15)
        const moistureStress = moistureContent / 30
        const insulationDegradation = 0.01 * loadFactor * (1 + tempStress + moistureStress)
        setInsulationHealth(prev => Math.max(prev - insulationDegradation, 60))
        
        // Oil quality degradation
        if (temperature > 75) {
          setOilAcidity(prev => Math.min(prev + 0.001 * loadFactor, 0.5))
          setDielectricStrength(prev => Math.max(prev - 0.05 * loadFactor, 25))
        }
        
        // Update oil flow rate based on temperature and pump state
        setOilFlowRate(oilPumpState === "on" ? Math.min(oilFlowRate + 0.1, 2) : Math.max(oilFlowRate - 0.1, 0.5))
        
        // Calculate partial discharge probability based on insulation, moisture and dielectric strength
        const pdFactor = (100 - insulationHealth) / 100 + (moistureContent / 50) + (40 - dielectricStrength) / 40
        const pdLevel = Math.max(0, pdFactor * loadFactor * 5)
        setPartialDischargeLevel(pdLevel)
        
        // Random chance of corona discharge at bushings when voltage is high
        if (Math.random() < 0.05 * loadFactor && coronaDischarges.length < 3) {
          const bushingPositions = ["top-left", "top", "top-right", "bottom-left", "bottom", "bottom-right"]
          const randomPosition = bushingPositions[Math.floor(Math.random() * bushingPositions.length)]
          setCoronaDischarges(prev => [
            ...prev,
            {
              id: Date.now(),
              position: randomPosition,
              size: 3 + Math.random() * 4,
              duration: 1000 + Math.random() * 2000
            }
          ])
        }
        
        // Random electrical arcs when insulation is degraded
        if (insulationHealth < 80 && Math.random() < 0.02 * loadFactor && electricalArcs.length < 2) {
          const arcPositions = ["winding-left", "winding-center", "winding-right"]
          const randomPosition = arcPositions[Math.floor(Math.random() * arcPositions.length)]
          setElectricalArcs(prev => [
            ...prev,
            {
              id: Date.now(),
              position: randomPosition,
              size: 5 + Math.random() * 6,
              duration: 500 + Math.random() * 1000
            }
          ])
        }

        // Update phase angles to simulate AC power
        setPhaseAngles(prev => prev.map(angle => (angle + 2) % 360))
        
        // Generate magnetic flux lines
        if (magneticFluxLines.length < 6 && Math.random() < 0.1) {
          const randomStart = Math.random() * 100
          const controlPoint1 = Math.random() * 100
          const controlPoint2 = Math.random() * 100
          const randomEnd = Math.random() * 100
          
          const path = `M ${randomStart} 0 C ${controlPoint1} 33, ${controlPoint2} 66, ${randomEnd} 100`
          
          setMagneticFluxLines(prev => [
            ...prev, 
            { id: Date.now(), path }
          ])
        }
        
        // Clean up expired effects
        setCoronaDischarges(prev => prev.filter(corona => Date.now() - corona.id < corona.duration))
        setElectricalArcs(prev => prev.filter(arc => Date.now() - arc.id < arc.duration))
        setMagneticFluxLines(prev => {
          // Keep only the most recent 6 lines
          if (prev.length > 6) {
            return prev.slice(-6)
          }
          return prev
        })
      }
    }, 1000)

    return () => clearInterval(heatupInterval)
  }, [data.transformerOn, currentLoad, data.ambientTemperature, data.loadType, harmonicLevel, insulationHealth, 
      moistureContent, oilAcidity, dielectricStrength, windingHotSpot, coronaDischarges.length, electricalArcs.length,
      magneticFluxLines.length, coolingFanSpeed, oilPumpState])

  // Calculate cooling effect based on temperature with more realistic cooling stages
  const calculateCoolingEffect = useCallback((currentTemp: number) => {
    const baseEffect = 1
    const tempDiff = currentTemp - defaultThreePhaseTransformerSettings.simulationParams.normalOperatingTemp
    
    // Determine cooling fan stage based on temperature difference
    if (tempDiff > 25) {
      // Stage 4: Emergency cooling
      setCoolingFanSpeed(100)
      setOilFlowRate(2.5)
      setOilPumpState("on")
      return baseEffect * 3
    } else if (tempDiff > 20) {
      // Stage 3: High cooling
      setCoolingFanSpeed(80)
      setOilFlowRate(2)
      setOilPumpState("on")
      return baseEffect * 2
    } else if (tempDiff > 10) {
      // Stage 2: Medium cooling
      setCoolingFanSpeed(60)
      setOilFlowRate(1.5)
      setOilPumpState("on")
      return baseEffect * 1.5
    } else if (tempDiff > 0) {
      // Stage 1: Low cooling
      setCoolingFanSpeed(40)
      setOilFlowRate(1)
      setOilPumpState("on")
      return baseEffect
    } else if (tempDiff > -10) {
      // Minimal cooling
      setCoolingFanSpeed(20)
      setOilFlowRate(0.5)
      setOilPumpState("on")
      return baseEffect * 0.7
    }
    
    // No active cooling needed
    setCoolingFanSpeed(0)
    setOilFlowRate(0.2)
    setOilPumpState("off")
    return baseEffect * 0.3
  }, [])

  // Inside the component where the oil bubble animations are used
  const createBubble = useCallback(() => {
    if (!isGeneratingBubbles.current) {
      return;
    }

    const MAX_BUBBLES = 15;
    const currentBubbles = bubbleRefs.current;
    
    // Don't add more bubbles than the maximum
    if (currentBubbles.length >= MAX_BUBBLES) {
      return;
    }

    // Calculate bubble size based on oil flow rate
    const baseSize = 6 + Math.random() * 8;
    const sizeMultiplier = Math.min(2, Math.max(1, oilFlowRate / 40));
    const size = baseSize * sizeMultiplier;
    
    // Create a more varied distribution of bubbles
    const left = 10 + Math.random() * 80; // 10-90%
    
    // Create the bubble element
    const bubble = document.createElement('div');
    bubble.className = 'absolute rounded-full bg-blue-200/30 z-10';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.bottom = '5%';
    bubble.style.animation = `
      oilBubbleRise ${4 + Math.random() * 3}s ease-out forwards, 
      oilBubbleWobble ${2 + Math.random()}s ease-in-out infinite alternate,
      oilBubblePulse ${1 + Math.random()}s ease-in-out infinite
    `;
    
    // Add bubble to the container
    const container = bubbleContainerRef.current;
    if (container) {
      container.appendChild(bubble);
      
      // Add to tracking array
      currentBubbles.push({
        element: bubble,
        timestamp: Date.now(),
        lifespan: 4000 + Math.random() * 3000,
      });
    }
  }, [bubbleContainerRef, bubbleRefs, isGeneratingBubbles, oilFlowRate]);

  useEffect(() => {
    isGeneratingBubbles.current = true;
    createBubble();
    return () => {
      isGeneratingBubbles.current = false;
    };
  }, [createBubble]);

  // Add TransformerHumVisualization component
  const TransformerHumVisualization = ({ volume }: { volume: number }) => {
    // Only show visualization if transformer is on and volume > 0
    if (volume <= 0 || !data.transformerOn) return null;
    
    // Calculate number of bars based on volume
    const numBars = 5;
    const activeBarCount = Math.ceil(volume * numBars);
    
    return (
      <div className="absolute bottom-3 right-3 flex items-end gap-0.5 bg-slate-800/70 p-1 rounded-md z-30 border border-slate-700/50">
        {Array.from({ length: numBars }).map((_, index) => {
          const isActive = index < activeBarCount;
          const height = 3 + (index * 2); // Increasing heights
          const delay = index * 0.1; // Stagger animation delay
          
          return (
            <div 
              key={index}
              className={cn(
                "w-1 rounded-sm bg-blue-500/30",
                isActive && "hum-wave"
              )}
              style={{ 
                height: `${height}px`, 
                animationDelay: `${delay}s`,
                opacity: isActive ? 0.3 + (index * 0.15) : 0.15,
              }}
            />
          );
        })}
        <div className="text-[7px] ml-1 text-blue-400/70">
          {Math.round(volume * 100)}%
        </div>
      </div>
    );
  };
  
  // Add effect to control oil bubbling sound
  useEffect(() => {
    // Bubble sound file has been removed, so we disable this functionality
    setBubbleAudioVolume(0); // Always keep volume at 0 since the file doesn't exist
    return;

    /* Original code commented out since bubble.mp3 is missing
    const bubblesEnabled = data.animations?.enableOilFlow ?? defaultThreePhaseTransformerSettings.animations.enableOilFlow;
    
    if (bubblesSoundRef.current) {
      if (data.transformerOn && bubblesEnabled && bubbleNoiseIntensity > 0) {
        // Calculate volume based on intensity and temperature
        const volume = Math.min(1, bubbleNoiseIntensity * (temperature / 75));
        bubblesSoundRef.current.volume = volume;
        setBubbleAudioVolume(volume);
        
        if (bubblesSoundRef.current.paused) {
          bubblesSoundRef.current.play().catch(e => {
            console.error("Error playing bubble sound:", e);
            // Add fallback for error handling
            setBubbleAudioVolume(0);
          });
        }
      } else {
        if (!bubblesSoundRef.current.paused) {
          const fadeOut = () => {
            const vol = bubblesSoundRef.current!.volume;
            if (vol > 0.05) {
              bubblesSoundRef.current!.volume = vol - 0.05;
              setTimeout(fadeOut, 50);
            } else {
              bubblesSoundRef.current!.pause();
              bubblesSoundRef.current!.currentTime = 0;
              setBubbleAudioVolume(0);
            }
          };
          fadeOut();
        }
      }
    }
    */
  }, [data.transformerOn, data.animations?.enableOilFlow, bubbleNoiseIntensity, temperature]);

  // Add effect to control oil flow sounds
  useEffect(() => {
    // Oil flow sound file has been removed, so we disable this functionality
    setOilFlowAudioVolume(0); // Always keep volume at 0 since the file doesn't exist
    return;

    /* Original code commented out since oil-flow.mp3 is missing
    const oilFlowEnabled = data.animations?.enableOilFlow ?? defaultThreePhaseTransformerSettings.animations.enableOilFlow;
    
    if (oilFlowSoundRef.current) {
      if (data.transformerOn && oilFlowEnabled && oilFlowNoiseIntensity > 0 && oilPumpState === "on") {
        // Calculate volume based on intensity and flow rate
        const volume = Math.min(1, oilFlowNoiseIntensity * (oilFlowRate / 3));
        oilFlowSoundRef.current.volume = volume;
        setOilFlowAudioVolume(volume);
        
        if (oilFlowSoundRef.current.paused) {
          oilFlowSoundRef.current.play().catch(e => {
            console.error("Error playing oil flow sound:", e);
            // Add fallback for error handling
            setOilFlowAudioVolume(0);
          });
        }
      } else {
        if (!oilFlowSoundRef.current.paused) {
          const fadeOut = () => {
            const vol = oilFlowSoundRef.current!.volume;
            if (vol > 0.05) {
              oilFlowSoundRef.current!.volume = vol - 0.05;
              setTimeout(fadeOut, 50);
            } else {
              oilFlowSoundRef.current!.pause();
              oilFlowSoundRef.current!.currentTime = 0;
              setOilFlowAudioVolume(0);
            }
          };
          fadeOut();
        }
      }
    }
    */
  }, [data.transformerOn, data.animations?.enableOilFlow, oilFlowNoiseIntensity, oilPumpState, oilFlowRate]);

  // Add effect to control bushing discharge sounds
  useEffect(() => {
    // Bushing discharge sound file has been removed, so we disable this functionality
    setBushingDischargeAudioVolume(0); // Always keep volume at 0 since the file doesn't exist
    return;
    
    /* Original code commented out since bushing-discharge.mp3 is missing
    if (!bushingDischargeSoundRef.current) return;
    
    // Only play if transformer is ON, corona effect is enabled, and noise intensity > 0
    if (data.transformerOn && data.animations?.enableCoronaEffect !== false && bushingDischargeNoiseIntensity > 0) {
      // Calculate volume based on intensity and partial discharge level
      const volume = Math.min(1, bushingDischargeNoiseIntensity * (partialDischargeLevel / 10));
      bushingDischargeSoundRef.current.volume = volume;
      setBushingDischargeAudioVolume(volume);
      
      if (bushingDischargeSoundRef.current.paused) {
        bushingDischargeSoundRef.current.play().catch(e => {
          console.log('Discharge audio playback error:', e);
          // Add fallback for error handling
          setBushingDischargeAudioVolume(0);
        });
      }
    } else {
      // If intensity is exactly 0, stop immediately
      if (bushingDischargeNoiseIntensity === 0) {
        if (bushingDischargeSoundRef.current) {
          bushingDischargeSoundRef.current.pause();
          bushingDischargeSoundRef.current.currentTime = 0;
          setBushingDischargeAudioVolume(0);
        }
        return;
      }
      
      // Otherwise fade out gradually
      if (bushingDischargeSoundRef.current && !bushingDischargeSoundRef.current.paused) {
        const fadeOut = () => {
          if (!bushingDischargeSoundRef.current) return;
          
          const vol = bushingDischargeSoundRef.current.volume;
          if (vol > 0.05) {
            bushingDischargeSoundRef.current.volume = vol - 0.05;
            setTimeout(fadeOut, 50);
          } else {
            bushingDischargeSoundRef.current.pause();
            bushingDischargeSoundRef.current.currentTime = 0;
            setBushingDischargeAudioVolume(0);
          }
        };
        fadeOut();
      }
    }
    */
  }, [data.transformerOn, data.animations?.enableCoronaEffect, bushingDischargeNoiseIntensity, partialDischargeLevel]);

  // Modify SoundVisualization component to fix the label issues
  const SoundVisualization = ({ type, volume }: { type: 'bubble' | 'oilFlow' | 'discharge'; volume: number }) => {
    // Only show visualization if transformer is on and volume > 0
    if (volume <= 0 || !data.transformerOn) return null;
    
    // Settings for different visualizations without the unused label property
    const settings = {
      bubble: {
        color: "bg-blue-400/40",
        textColor: "text-blue-400/70",
        icon: "💧"
      },
      oilFlow: {
        color: "bg-yellow-400/40",
        textColor: "text-yellow-400/70",
        icon: "🔄"
      },
      discharge: {
        color: "bg-purple-400/40",
        textColor: "text-purple-400/70",
        icon: "⚡"
      }
    };
    
    const { color, textColor, icon } = settings[type];
    
    // Calculate number of bars based on volume
    const numBars = 3;
    const activeBarCount = Math.ceil(volume * numBars);
    
    return (
      <div className={`absolute flex items-center gap-1 bg-slate-800/70 p-1 rounded-md z-30 border border-slate-700/50 ${
        type === 'bubble' ? 'bottom-[60px] right-3' : 
        type === 'oilFlow' ? 'bottom-[90px] right-3' : 'bottom-[120px] right-3'
      }`}>
        <span className="mr-1">{icon}</span>
        {Array.from({ length: numBars }).map((_, index) => {
          const isActive = index < activeBarCount;
          
          return (
            <div 
              key={index}
              className={cn(
                "w-1 h-3 rounded-sm",
                isActive ? color : "bg-slate-600/30"
              )}
              style={{ 
                opacity: isActive ? 0.6 + (index * 0.2) : 0.2,
              }}
            />
          );
        })}
        <div className={`text-[7px] ml-1 ${textColor}`}>
          {Math.round(volume * 100)}%
        </div>
      </div>
    );
  };

  // Modified version of existing TransformerControl render
  const renderTransformerControl = () => (
    <TransformerControl
      transformerOn={data.transformerOn}
      onTransformerChange={data.onTransformerChange}
      temperature={temperature}
      loadPercentage={currentLoad}
      efficiency={efficiency}
      health={insulationHealth} // or another health metric if preferred
      t={t}
    />
  );
  
  // Add electric shock effect
  const [lastShockTime, setLastShockTime] = useState(0);
  const [activeCableHover, setActiveCableHover] = useState<boolean>(false);
  
  // Define the handleCableInteraction function first before using it in useEffect
  const handleCableInteraction = useCallback((event: React.MouseEvent<Element> | {
    currentTarget: {
      getBoundingClientRect: () => DOMRect | {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
        x: number;
        y: number;
        toJSON: () => void;
      };
    };
    clientX: number;
    clientY: number;
  }) => {
    // Only create shock effects if transformer is ON
    if (!data.transformerOn) return;
    
    // Add cooldown to prevent too many sound effects at once (80ms minimum between effects)
    const now = Date.now();
    if (now - lastShockTime < 80) return;
    setLastShockTime(now);
    
    // Get the mouse position relative to the container
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Generate random paths for the lightning effect
    const generateLightningPath = () => {
      const paths: string[] = [];
      
      // Create 4-7 random lightning branches for more dramatic effect
      const branchCount = Math.floor(Math.random() * 4) + 4;
      
      for (let i = 0; i < branchCount; i++) {
        const points: [number, number][] = [[0, 0]];
        const segmentCount = Math.floor(Math.random() * 7) + 5; // More segments for more detailed lightning
        const maxOffset = 25; // Increased offset for more jagged lightning
        
        for (let j = 1; j <= segmentCount; j++) {
          const prevPoint = points[j - 1];
          const progress = j / segmentCount;
          const xOffset = (Math.random() - 0.5) * maxOffset * (1 + progress); // Progressive widening
          const yOffset = (Math.random() - 0.5) * maxOffset * (1 + progress);
          
          // Make the lightning progress in a generally outward direction with more variance
          points.push([
            prevPoint[0] + (Math.random() * 25) + (progress * 35) + xOffset,
            prevPoint[1] + (Math.random() * 25) + (progress * 35) + yOffset
          ]);
        }
        
        // Convert points to SVG path
        let path = `M${points[0][0]},${points[0][1]}`;
        for (let j = 1; j < points.length; j++) {
          path += ` L${points[j][0]},${points[j][1]}`;
        }
        
        paths.push(path);
      }
      
      return paths;
    };
    
    // Create a new shock effect
    const newShock = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 40 + 60, // Random size between 60-100
      duration: Math.random() * 300 + 500, // Random duration between 500-800ms
      timestamp: Date.now(),
      paths: generateLightningPath()
    };
    
    // Prioritize playing electric shock sound with random pitch variation
    if (electricShockSoundRef.current) {
      // Make sure the sound plays by setting time to beginning
      electricShockSoundRef.current.currentTime = 0;
      
      // Randomize pitch for variety
      electricShockSoundRef.current.playbackRate = 0.9 + Math.random() * 0.2;
      
      // Force play even if still playing
      const playPromise = electricShockSoundRef.current.play();
      
      // Handle potential play() Promise rejection
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.error("Error playing electric shock sound:", e);
          
          // Retry once if autoplay was prevented
          setTimeout(() => {
            if (electricShockSoundRef.current) {
              electricShockSoundRef.current.play().catch(e => 
                console.error("Failed to play shock sound on retry:", e)
              );
            }
          }, 50);
        });
      }
    }
    
    // Add the shock to state
    setElectricShocks(prev => [...prev, newShock]);
    
    // Set the user as shocked (for screen flash effect)
    setIsUserShocked(true);
    
    // Clear the shocked state after a brief delay
    setTimeout(() => {
      setIsUserShocked(false);
    }, 150);
    
    // Create screen vibration effect using the Web Vibration API if available
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(100);
      } catch (e) {
        console.error("Error using vibration API:", e);
      }
    }
  }, [data.transformerOn, lastShockTime]);
  
  // Handle automatic spark generation when hovering over cables
  useEffect(() => {
    if (!data.transformerOn || !activeCableHover) return;
    
    // Create automatic spark effects while hovering over cables
    const sparkInterval = setInterval(() => {
      // Generate a synthetic event with random position
      const randomX = Math.random() * 700;
      const randomY = Math.random() * 450;
      
      // Trigger the spark effect
      handleCableInteraction({
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 0,
            top: 0,
            right: 700,
            bottom: 450,
            width: 700,
            height: 450,
            x: 0,
            y: 0,
            toJSON: () => {}
          })
        },
        clientX: randomX,
        clientY: randomY
      } as any);
    }, 100); // Generate sparks every 100ms while hovering
    
    return () => clearInterval(sparkInterval);
  }, [data.transformerOn, activeCableHover, handleCableInteraction]);
  
  // Clean up expired shock effects
  useEffect(() => {
    if (electricShocks.length === 0) return;
    
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setElectricShocks(prevShocks => 
        prevShocks.filter(shock => 
          now - shock.timestamp < shock.duration
        )
      );
    }, 100);
    
    return () => clearInterval(cleanupInterval);
  }, [electricShocks]);

  // Function to check if audio resource exists
  const checkAudioFileExists = useCallback((url: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      fetch(url, { method: 'HEAD' })
        .then(response => {
          const contentType = response.headers.get('Content-Type');
          resolve(response.ok && contentType ? contentType.includes('audio') : false);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }, []);

  // Add effect to check audio files on component mount
  useEffect(() => {
    const checkAudioFiles = async () => {
      const transformerHumExists = await checkAudioFileExists('/sounds/transformer-hum.mp3');
      const bubbleExists = await checkAudioFileExists('/sounds/bubble.mp3');
      const oilFlowExists = await checkAudioFileExists('/sounds/oil-flow.mp3');
      const bushingDischargeExists = await checkAudioFileExists('/sounds/bushing-discharge.mp3');
      const electricShockExists = await checkAudioFileExists('/sounds/electric-shock.mp3');
      
      if (!transformerHumExists) console.warn('Transformer hum sound file not found or invalid');
      if (!bubbleExists) console.warn('Bubble sound file not found or invalid');
      if (!oilFlowExists) console.warn('Oil flow sound file not found or invalid');
      if (!bushingDischargeExists) console.warn('Bushing discharge sound file not found or invalid');
      if (!electricShockExists) console.warn('Electric shock sound file not found or invalid');
    };
    
    checkAudioFiles();
  }, [checkAudioFileExists]);

  return (
    <div className="relative">
      {/* Electric shock screen flash effect */}
      {isUserShocked && (
        <div className="fixed inset-0 bg-yellow-400/40 z-[9999] pointer-events-none animation-flash" />
      )}
      
      {/* Audio elements for all sound effects */}
      <audio
        ref={transformerHumRef}
        src="/sounds/transformer-hum.mp3"
        loop
        preload="auto"
        onError={() => {
          console.error("Error loading transformer hum sound file");
          setAudioVolume(0);
        }}
      />
      <audio
        ref={bubblesSoundRef}
        src=""
        loop
        preload="none"
        onError={() => {
          console.error("Error loading bubble sound file");
          setBubbleAudioVolume(0);
        }}
      />
      <audio
        ref={oilFlowSoundRef}
        src=""
        loop
        preload="none"
        onError={() => {
          console.error("Error loading oil flow sound file");
          setOilFlowAudioVolume(0);
        }}
      />
      <audio
        ref={bushingDischargeSoundRef}
        src=""
        preload="none"
        onError={() => {
          console.error("Error loading bushing discharge sound file");
          setBushingDischargeAudioVolume(0);
        }}
      />
      <audio
        ref={electricShockSoundRef}
        src=""
        preload="none"
        onError={() => {
          console.error("Error loading electric shock sound file");
        }}
      />
      
      {/* Sound visualizations */}
      <TransformerHumVisualization volume={audioVolume} />
      <SoundVisualization type="bubble" volume={bubbleAudioVolume} />
      <SoundVisualization type="oilFlow" volume={oilFlowAudioVolume} />
      <SoundVisualization type="discharge" volume={bushingDischargeAudioVolume} />
      
      <div className="flex items-start gap-[100px] perspective-container">
        {/* Left side - Primary winding connections */}
        <div className="relative">
          {/* Base transformer container */}
          <div 
            className={cn(
              "w-[700px] h-[450px] transition-all duration-300 bg-transparent",
              data.transformerOn ? "shadow-none" : "",
              "relative overflow-visible transform-gpu" // Changed from overflow-hidden to overflow-visible
            )}
          >
            {/* SVG for voltage flow paths */}
            <svg className="absolute inset-0 w-full h-full z-40 pointer-events-none" style={{ overflow: 'visible' }}>
              {/* Electric shock effects */}
              {electricShocks.map(shock => (
                <g key={shock.id} className="lightning-effect">
                  <filter id={`lightning-glow-${shock.id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                  </filter>
                  
                  {/* Multiple lightning paths for each shock */}
                  {shock.paths.map((path, idx) => (
                    <g key={`path-${shock.id}-${idx}`}>
                      {/* Outer glow effect */}
                      <path
                        d={path}
                        transform={`translate(${shock.x}, ${shock.y})`}
                        stroke="#94fdff"
                        strokeWidth="12"
                        fill="none"
                        opacity="0.3"
                        filter={`url(#lightning-glow-${shock.id})`}
                      />
                      
                      {/* Middle glow layer */}
                      <path
                        d={path}
                        transform={`translate(${shock.x}, ${shock.y})`}
                        stroke="#4df8ff"
                        strokeWidth="6"
                        fill="none"
                        opacity="0.6"
                        filter={`url(#lightning-glow-${shock.id})`}
                      />
                      
                      {/* Core lightning stroke */}
                      <path
                        d={path}
                        transform={`translate(${shock.x}, ${shock.y})`}
                        stroke="#ffffff"
                        strokeWidth="2"
                        fill="none"
                        opacity="1"
                      />
                      
                      {/* Spark particles at branch points */}
                      {idx % 2 === 0 && (
                        <circle
                          cx={shock.x + Math.random() * 40 - 20}
                          cy={shock.y + Math.random() * 40 - 20}
                          r={Math.random() * 5 + 2}
                          fill="#ffffff"
                          className="spark-particle"
                        />
                      )}
                    </g>
                  ))}
                </g>
              ))}
              
              {/* Create a cable interaction wrapper div for the entire cable system */}
              <rect 
                x="0" 
                y="-200" 
                width="700" 
                height="800" 
                fill="transparent"
                style={{ pointerEvents: 'none' }}
                className="cable-area"
              />
              
              {/* Cable Management System - Top */}
              <rect 
                x="100" 
                y="-190" 
                width="500" 
                height="20" 
                rx="5" 
                fill="#2c3e50" 
                stroke="#34495e" 
                strokeWidth="1"
                className={data.transformerOn ? "cursor-shock" : "cursor-default"}
              />
              
              {/* Interactive overlay for cable system - Top */}
              <rect 
                x="100" 
                y="-190" 
                width="500" 
                height="20" 
                rx="5" 
                fill="transparent"
                className={data.transformerOn ? "cursor-shock" : "cursor-default"}
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={() => data.transformerOn && setActiveCableHover(true)}
                onMouseLeave={() => setActiveCableHover(false)}
              />
              
              {/* Cable clamps - Top */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-clamp-top-${i}`}>
                  <rect 
                    x={x-10} 
                    y="-185" 
                    width="20" 
                    height="10" 
                    rx="2" 
                    fill="#7f8c8d" 
                    stroke="#34495e" 
                    strokeWidth="1"
                  />
                  <circle 
                    cx={x} 
                    cy="-180" 
                    r="3" 
                    fill={data.transformerOn ? "#ff6b00" : "#95a5a6"} 
                    stroke="#34495e" 
                    strokeWidth="0.5"
                    className={data.transformerOn ? "animate-pulse" : ""}
                  />
                  {/* Interactive overlay for connection points */}
                  <circle 
                    cx={x} 
                    cy="-180" 
                    r="15" 
                    fill="transparent"
                    className={data.transformerOn ? "cursor-shock" : "cursor-default"}
                    style={{ pointerEvents: 'auto' }}
                    onMouseEnter={() => data.transformerOn && setActiveCableHover(true)}
                    onMouseLeave={() => setActiveCableHover(false)}
                  />
                </g>
              ))}
              
              {/* Power Flow Indicators - Top */}
              {data.transformerOn && [140, 350, 560].map((x, i) => (
                <g key={`power-flow-top-${i}`}>
                  {[0, 1, 2].map(j => (
                    <circle 
                      key={`flow-indicator-top-${i}-${j}`}
                      cx={x} 
                      cy="-180" 
                      r="2" 
                      fill="#f39c12"
                    >
                      <animate 
                        attributeName="cy" 
                        values="-170;-20" 
                        dur="1.5s" 
                        begin={`${j * 0.5}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0" 
                        dur="1.5s" 
                        begin={`${j * 0.5}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              ))}

              {/* Cable Management System - Bottom */}
              <rect 
                x="100" 
                y="620" 
                width="500" 
                height="20" 
                rx="5" 
                fill="#2c3e50" 
                stroke="#34495e" 
                strokeWidth="1"
                className={data.transformerOn ? "cursor-shock" : "cursor-default"}
              />
              
              {/* Interactive overlay for cable system - Bottom */}
              <rect 
                x="100" 
                y="620" 
                width="500" 
                height="20" 
                rx="5" 
                fill="transparent"
                className={data.transformerOn ? "cursor-shock" : "cursor-default"}
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={() => data.transformerOn && setActiveCableHover(true)}
                onMouseLeave={() => setActiveCableHover(false)}
              />
              
              {/* Cable clamps - Bottom */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-clamp-bottom-${i}`}>
                  <rect 
                    x={x-10} 
                    y="625" 
                    width="20" 
                    height="10" 
                    rx="2" 
                    fill="#7f8c8d" 
                    stroke="#34495e" 
                    strokeWidth="1"
                  />
                  <circle 
                    cx={x} 
                    cy="630" 
                    r="3" 
                    fill={data.transformerOn ? "#00b33c" : "#95a5a6"} 
                    stroke="#34495e" 
                    strokeWidth="0.5"
                    className={data.transformerOn ? "animate-pulse" : ""}
                  />
                  {/* Interactive overlay for connection points */}
                  <circle 
                    cx={x} 
                    cy="630" 
                    r="15" 
                    fill="transparent"
                    className={data.transformerOn ? "cursor-shock" : "cursor-default"}
                    style={{ pointerEvents: 'auto' }}
                    onMouseEnter={() => data.transformerOn && setActiveCableHover(true)}
                    onMouseLeave={() => setActiveCableHover(false)}
                  />
                </g>
              ))}
              
              {/* Power Flow Indicators - Bottom */}
              {data.transformerOn && [140, 350, 560].map((x, i) => (
                <g key={`power-flow-bottom-${i}`}>
                  {[0, 1, 2].map(j => (
                    <circle 
                      key={`flow-indicator-bottom-${i}-${j}`}
                      cx={x} 
                      cy="470" 
                      r="3" 
                      fill="#2ecc71"
                    >
                      <animate 
                        attributeName="cy" 
                        values="470;600" 
                        dur="1s" 
                        begin={`${j * 0.33}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0" 
                        dur="1s" 
                        begin={`${j * 0.33}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              ))}

              {/* Side Cable Management - Right HV */}
              <rect 
                x="700" 
                y="85" 
                width="20" 
                height="60" 
                rx="3" 
                fill="#2c3e50" 
                stroke="#34495e" 
                strokeWidth="1"
                className={data.transformerOn ? "cursor-shock" : "cursor-default"}
              />
              
              {/* Interactive overlay for side cable */}
              <rect 
                x="700" 
                y="85" 
                width="20" 
                height="60" 
                rx="3" 
                fill="transparent"
                className={data.transformerOn ? "cursor-shock" : "cursor-default"}
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={() => data.transformerOn && setActiveCableHover(true)}
                onMouseLeave={() => setActiveCableHover(false)}
              />

              {/* Side Cable Management - Left HV */}
              <rect 
                x="-20" 
                y="85" 
                width="20" 
                height="60" 
                rx="3" 
                fill="#2c3e50" 
                stroke="#34495e" 
                strokeWidth="1"
              />
              <circle 
                cx="-10" 
                cy="115" 
                r="3" 
                fill={data.transformerOn ? "#ff6b00" : "#95a5a6"} 
                stroke="#34495e" 
                strokeWidth="0.5"
                className={data.transformerOn ? "animate-pulse" : ""}
              />
              {data.transformerOn && (
                <g>
                  {[0, 1, 2].map(j => (
                    <circle 
                      key={`flow-indicator-left-hv-${j}`}
                      cx="-20" 
                      cy="115" 
                      r="2" 
                      fill="#f39c12"
                    >
                      <animate 
                        attributeName="cx" 
                        values="-30;0" 
                        dur="1.2s" 
                        begin={`${j * 0.4}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0" 
                        dur="1.2s" 
                        begin={`${j * 0.4}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              )}

              {/* Side Cable Management - Right LV */}
              <rect 
                x="700" 
                y="300" 
                width="20" 
                height="60" 
                rx="3" 
                fill="#2c3e50" 
                stroke="#34495e" 
                strokeWidth="1"
              />
              <circle 
                cx="710" 
                cy="330" 
                r="3" 
                fill={data.transformerOn ? "#00b33c" : "#95a5a6"} 
                stroke="#34495e" 
                strokeWidth="0.5"
                className={data.transformerOn ? "animate-pulse" : ""}
              />
              {data.transformerOn && (
                <g>
                  {[0, 1, 2].map(j => (
                    <circle 
                      key={`flow-indicator-right-lv-${j}`}
                      cx="700" 
                      cy="330" 
                      r="3" 
                      fill="#2ecc71"
                    >
                      <animate 
                        attributeName="cx" 
                        values="700;730" 
                        dur="0.8s" 
                        begin={`${j * 0.27}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0" 
                        dur="0.8s" 
                        begin={`${j * 0.27}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              )}

              {/* Side Cable Management - Left LV */}
              <rect 
                x="-20" 
                y="300" 
                width="20" 
                height="60" 
                rx="3" 
                fill="#2c3e50" 
                stroke="#34495e" 
                strokeWidth="1"
              />
              <circle 
                cx="-10" 
                cy="330" 
                r="3" 
                fill={data.transformerOn ? "#00b33c" : "#95a5a6"} 
                stroke="#34495e" 
                strokeWidth="0.5"
                className={data.transformerOn ? "animate-pulse" : ""}
              />
              {data.transformerOn && (
                <g>
                  {[0, 1, 2].map(j => (
                    <circle 
                      key={`flow-indicator-left-lv-${j}`}
                      cx="0" 
                      cy="330" 
                      r="3" 
                      fill="#2ecc71"
                    >
                      <animate 
                        attributeName="cx" 
                        values="0;-30" 
                        dur="0.8s" 
                        begin={`${j * 0.27}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="1;0" 
                        dur="0.8s" 
                        begin={`${j * 0.27}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              )}

              {/* Top Cable Connectors */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-connector-top-${i}`}>
                  <rect 
                    x={x-6} 
                    y="-20" 
                    width="12" 
                    height="15" 
                    rx="2" 
                    fill="#d35400" 
                    stroke="#34495e" 
                    strokeWidth="0.5"
                  />
                  <rect 
                    x={x-4} 
                    y="-5" 
                    width="8" 
                    height="15" 
                    rx="1" 
                    fill="#e67e22" 
                    stroke="#34495e" 
                    strokeWidth="0.5"
                  />
                </g>
              ))}

              {/* Bottom Cable Connectors */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-connector-bottom-${i}`}>
                  <rect 
                    x={x-8} 
                    y="470" 
                    width="16" 
                    height="20" 
                    rx="2" 
                    fill="#27ae60" 
                    stroke="#34495e" 
                    strokeWidth="0.5"
                  />
                  <rect 
                    x={x-6} 
                    y="490" 
                    width="12" 
                    height="120" 
                    rx="1" 
                    fill="#2ecc71" 
                    stroke="#34495e" 
                    strokeWidth="0.5"
                  />
                </g>
              ))}

              {/* Side Cable Connectors - HV */}
              <rect 
                x="688" 
                y="110" 
                width="12" 
                height="10" 
                rx="2" 
                fill="#d35400" 
                stroke="#34495e" 
                strokeWidth="0.5"
              />
              <rect 
                x="0" 
                y="110" 
                width="12" 
                height="10" 
                rx="2" 
                fill="#d35400" 
                stroke="#34495e" 
                strokeWidth="0.5"
              />

              {/* Side Cable Connectors - LV */}
              <rect 
                x="688" 
                y="325" 
                width="12" 
                height="10" 
                rx="2" 
                fill="#27ae60" 
                stroke="#34495e" 
                strokeWidth="0.5"
              />
              <rect 
                x="0" 
                y="325" 
                width="12" 
                height="10" 
                rx="2" 
                fill="#27ae60" 
                stroke="#34495e" 
                strokeWidth="0.5"
              />

              {/* Cable Labels - HV */}
              <text 
                x="350" 
                y="-210" 
                textAnchor="middle" 
                fill="#e67e22" 
                fontSize="10" 
                fontWeight="bold"
              >
                HV DISTRIBUTION
              </text>

              {/* Cable Labels - LV */}
              <text 
                x="350" 
                y="660" 
                textAnchor="middle" 
                fill="#2ecc71" 
                fontSize="10" 
                fontWeight="bold"
              >
                LV DISTRIBUTION
              </text>

              {/* Top path connecting to the right side - orange line */}
              <VoltageFlowPath 
                pathId="hv-output-right"
                pathNumber={1}
                isActive={data.transformerOn && data.gridConnected}
                startX={560}
                startY={-160}
                endX={700}
                endY={115}
              />
              
              {/* Top path connecting to the left side - orange line */}
              <VoltageFlowPath 
                pathId="hv-output-left"
                pathNumber={1}
                isActive={data.transformerOn && data.gridConnected}
                startX={140}
                startY={-160}
                endX={0}
                endY={115}
              />

              {/* Top Center to Top - orange line */}
              <VoltageFlowPath 
                pathId="hv-center"
                pathNumber={1}
                isActive={data.transformerOn && data.gridConnected}
                startX={350}
                startY={-160}
                endX={350}
                endY={-190}
              />

              {/* Bottom path connecting to the right side - green line */}
              <VoltageFlowPath 
                pathId="lv-output-right"
                pathNumber={3}
                isActive={data.transformerOn}
                startX={560}
                startY={610}
                endX={700}
                endY={330}
              />
              
              {/* Bottom path connecting to the left side - green line */}
              <VoltageFlowPath 
                pathId="lv-output-left"
                pathNumber={3}
                isActive={data.transformerOn}
                startX={140}
                startY={610}
                endX={0}
                endY={330}
              />

              {/* Bottom Center to Bottom - green line */}
              <VoltageFlowPath 
                pathId="lv-center"
                pathNumber={3}
                isActive={data.transformerOn}
                startX={350}
                startY={610}
                endX={350}
                endY={640}
              />

              {/* Outer perimeter flow paths - top right corner */}
              <path 
                d="M 700 115 C 730 115, 730 220, 700 220" 
                stroke="#ff6b00" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-hv-output-right)" : ""}
              />

              {/* Outer perimeter flow paths - top left corner */}
              <path 
                d="M 0 115 C -30 115, -30 220, 0 220" 
                stroke="#ff6b00" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-hv-output-left)" : ""}
              />

              {/* Outer perimeter flow paths - bottom right corner */}
              <path 
                d="M 700 330 C 730 330, 730 225, 700 225" 
                stroke="#00b33c" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-lv-output-right)" : ""}
              />

              {/* Outer perimeter flow paths - bottom left corner */}
              <path 
                d="M 0 330 C -30 330, -30 225, 0 225" 
                stroke="#00b33c" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-lv-output-left)" : ""}
              />

              {/* Diagonal flow paths - top left to bottom right */}
              <path 
                d="M 0 115 L 700 330" 
                stroke="#ff6b00" 
                strokeWidth="2"
                strokeDasharray="10,5"
                fill="none"
                opacity={data.transformerOn ? "0.6" : "0.2"}
                className={data.transformerOn ? "voltage-bus-active" : ""}
              />

              {/* Diagonal flow paths - top right to bottom left */}
              <path 
                d="M 700 115 L 0 330" 
                stroke="#ff6b00" 
                strokeWidth="2"
                strokeDasharray="10,5"
                fill="none"
                opacity={data.transformerOn ? "0.6" : "0.2"}
                className={data.transformerOn ? "voltage-bus-active" : ""}
              />

              {/* Horizontal right-side green connector */}
              <path 
                d="M 700 225 L 700 330" 
                stroke="#00b33c" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-lv-output-right)" : ""}
              />

              {/* Horizontal left-side green connector */}
              <path 
                d="M 0 225 L 0 330" 
                stroke="#00b33c" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-lv-output-left)" : ""}
              />

              {/* Horizontal right-side orange connector */}
              <path 
                d="M 700 115 L 700 220" 
                stroke="#ff6b00" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-hv-output-right)" : ""}
              />

              {/* Horizontal left-side orange connector */}
              <path 
                d="M 0 115 L 0 220" 
                stroke="#ff6b00" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
                filter={data.transformerOn ? "url(#glow-hv-output-left)" : ""}
              />

              {/* High voltage bus connection at top */}
              <path 
                d="M 140 -160 H 560" 
                stroke="#ff6b00" 
                strokeWidth="4"
                fill="none"
                className={data.transformerOn ? "voltage-bus-active" : ""}
              />

              {/* Low voltage bus connection at bottom */}
              <path 
                d="M 140 610 H 560" 
                stroke="#00b33c" 
                strokeWidth="4"
                fill="none" 
                className={data.transformerOn ? "voltage-bus-active" : ""}
              />

              {/* Voltage labels */}
              <text 
                x="350" 
                y="-200" 
                textAnchor="middle" 
                fill="#ff6b00" 
                fontSize="14" 
                fontWeight="bold"
                filter={data.transformerOn ? "url(#glow-hv-center)" : ""}
                className={data.transformerOn ? "animate-pulse-slow" : "opacity-40"}
              >
                750kVA
              </text>

              <text 
                x="350" 
                y="650" 
                textAnchor="middle" 
                fill="#00b33c" 
                fontSize="14" 
                fontWeight="bold"
                filter={data.transformerOn ? "url(#glow-lv-center)" : ""}
                className={data.transformerOn ? "animate-pulse-slow" : "opacity-40"}
              >
                415V
              </text>
            </svg>

            {/* Add HV Bushings (top) */}
            <div className="absolute -top-40 left-0 right-0 flex justify-around z-50 px-20">
              <TransformerBushing
                position="top"
                side="left"
                isEnergized={data.transformerOn && bushingStatus.hv1}
                voltage={data.inputVoltage || 11000}
                leakageCurrent={data.transformerOn ? defaultThreePhaseTransformerSettings.simulationParams.bushingLeakageCurrent * (1 + (partialDischargeLevel / 10)) : 0}
                bushingStatus={data.bushingCondition || "good"}
              />
              <TransformerBushing
                position="top"
                side="center"
                isEnergized={data.transformerOn && bushingStatus.hv2}
                voltage={data.inputVoltage || 11000}
                leakageCurrent={data.transformerOn ? defaultThreePhaseTransformerSettings.simulationParams.bushingLeakageCurrent * (1 + (partialDischargeLevel / 10)) : 0}
                bushingStatus={data.bushingCondition || "good"}
              />
              <TransformerBushing
                position="top"
                side="right"
                isEnergized={data.transformerOn && bushingStatus.hv3}
                voltage={data.inputVoltage || 11000}
                leakageCurrent={data.transformerOn ? defaultThreePhaseTransformerSettings.simulationParams.bushingLeakageCurrent * (1 + (partialDischargeLevel / 10)) : 0}
                bushingStatus={data.bushingCondition || "good"}
              />
            </div>

            {/* Add LV Bushings (bottom) */}
            <div className="absolute -bottom-40 left-0 right-0 flex justify-around z-50 px-20">
              <TransformerBushing
                position="bottom"
                side="left"
                isEnergized={data.transformerOn && bushingStatus.lv1}
                voltage={data.outputVoltage || 415}
                leakageCurrent={data.transformerOn ? defaultThreePhaseTransformerSettings.simulationParams.bushingLeakageCurrent * 0.5 * (1 + (partialDischargeLevel / 20)) : 0}
                bushingStatus={data.bushingCondition || "good"}
              />
              <TransformerBushing
                position="bottom"
                side="center"
                isEnergized={data.transformerOn && bushingStatus.lv2}
                voltage={data.outputVoltage || 415}
                leakageCurrent={data.transformerOn ? defaultThreePhaseTransformerSettings.simulationParams.bushingLeakageCurrent * 0.5 * (1 + (partialDischargeLevel / 20)) : 0}
                bushingStatus={data.bushingCondition || "good"}
              />
              <TransformerBushing
                position="bottom"
                side="right"
                isEnergized={data.transformerOn && bushingStatus.lv3}
                voltage={data.outputVoltage || 415}
                leakageCurrent={data.transformerOn ? defaultThreePhaseTransformerSettings.simulationParams.bushingLeakageCurrent * 0.5 * (1 + (partialDischargeLevel / 20)) : 0}
                bushingStatus={data.bushingCondition || "good"}
              />
            </div>

            {/* Danger Sign */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
              <div className="bg-yellow-400 p-2 rounded-md shadow-md flex flex-col items-center border-2 border-yellow-500">
                <div className="text-black font-bold text-lg">DANGER</div>
                <svg className="w-12 h-12 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="text-black text-sm font-bold text-center leading-tight">
                  ELECTRICAL<br/>HAZARD
                </div>
              </div>
            </div>

            {/* Tap Changer Control */}
            <div className="absolute top-1/2 right-[140px] transform -translate-y-1/2 z-50">
              <div className="bg-gray-700 bg-opacity-80 p-1 rounded-sm shadow-md border border-gray-600 flex flex-col items-center">
                <div className="text-white text-[8px] font-bold mb-1">TAP</div>
                <div className="bg-gray-800 border border-gray-600 rounded-sm flex flex-col items-center gap-0.5 p-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-3 h-1 rounded-sm", 
                        i === (data.tapPosition || 3) - 1 ? "bg-green-500" : "bg-gray-600"
                      )}
                      onClick={() => data.onTapPositionChange?.(i + 1)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Transformer nameplate styled as a metallic plate with enhanced 3D effect - extra compact */}
            <div className="absolute bottom-[90px] left-[105px] z-40 w-[40px] transform-gpu rotate-y-2 shadow-sm">
              <div className="bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm p-0.5 border border-gray-700 shadow-depth">
                <div className="text-[4px] font-mono">
                  <div className="text-center font-bold border-b border-gray-500 pb-px mb-px bg-gray-700 rounded-sm text-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                    3-PHASE<br/>TRANS
                  </div>
                  <div className="grid grid-cols-2 gap-x-0.5 gap-y-px text-[3px]">
                    <div className="font-semibold text-gray-800">RATING:</div><div className="text-right text-black font-medium">{data.inputVoltage || 11}kV</div>
                    <div className="font-semibold text-gray-800">CAPACITY:</div><div className="text-right text-black font-medium">{defaultThreePhaseTransformerSettings.simulationParams.maxCapacity}kVA</div>
                    <div className="font-semibold text-gray-800">OIL:</div><div className="text-right text-black font-medium">MINERAL</div>
                    <div className="font-semibold text-gray-800">COOL:</div><div className="text-right text-black font-medium">ONAN</div>
                  </div>
                  <div className="text-center text-[2.5px] mt-px text-gray-800 font-bold">S/N:TFR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
                </div>
                {/* Rivets/bolts in corners with 3D effect */}
                <div className="absolute top-px left-px w-0.5 h-0.5 bg-gradient-radial from-gray-600 to-gray-800 rounded-full shadow-inner"></div>
                <div className="absolute top-px right-px w-0.5 h-0.5 bg-gradient-radial from-gray-600 to-gray-800 rounded-full shadow-inner"></div>
                <div className="absolute bottom-px left-px w-0.5 h-0.5 bg-gradient-radial from-gray-600 to-gray-800 rounded-full shadow-inner"></div>
                <div className="absolute bottom-px right-px w-0.5 h-0.5 bg-gradient-radial from-gray-600 to-gray-800 rounded-full shadow-inner"></div>
                
                {/* Metallic sheen highlight */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-sm pointer-events-none"></div>
                
                {/* Plate shadow */}
                <div className="absolute -bottom-0.5 left-1/2 w-[35px] h-0.5 transform -translate-x-1/2 bg-gradient-radial from-black/30 to-transparent rounded-full blur-sm -z-10"></div>
              </div>
            </div>
            
            {/* Transformer main tank with enhanced 3D effect */}
            <div className="absolute inset-x-[100px] top-[80px] bottom-[30px] rounded-xl overflow-hidden transform-gpu perspective-[2000px] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              {/* Metallic tank outer shell with improved dramatic lighting effects */}
              <div className="absolute inset-0 rounded-xl border-2 border-slate-500">
                {/* Enhanced layered gradients for dramatic metal appearance */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-500 via-slate-700 to-slate-900"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-500/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-800/50 to-transparent"></div>
                
                {/* Dramatic light reflection sweep effect */}
                <div 
                  className="absolute inset-0 opacity-20 overflow-hidden"
                  style={{
                    background: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.5) 50%, transparent 55%)',
                    backgroundSize: '200% 200%',
                    animation: 'lightSweep 8s ease-in-out infinite'
                  }}
                ></div>
                
                {/* Enhanced dramatic shadow and highlight effects */}
                <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-slate-300/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-[8%] bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-black/20 to-transparent"></div>
                
                {/* Enhanced radiator fins with dramatic 3D depth and shadows */}
                <div className="absolute inset-y-[10%] left-0 right-[85%] flex flex-col justify-evenly">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`left-fin-${i}`} className="relative h-[3%] w-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700 border-y border-r border-slate-500 shadow-[4px_4px_8px_rgba(0,0,0,0.5)]"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-500/30 to-transparent"></div>
                      {data.transformerOn && (
                        <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-blue-500/10 to-transparent" style={{ animation: 'heatPulse 3s ease-in-out infinite' }}></div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Right side cooling fins with enhanced effects */}
                <div className="absolute inset-y-[10%] left-[85%] right-0 flex flex-col justify-evenly">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`right-fin-${i}`} className="relative h-[3%] w-full">
                      <div className="absolute inset-0 bg-gradient-to-l from-slate-900 to-slate-700 border-y border-l border-slate-500 shadow-[-4px_4px_8px_rgba(0,0,0,0.5)]"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-500/30 to-transparent"></div>
                      {data.transformerOn && (
                        <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-blue-500/10 to-transparent" style={{ animation: 'heatPulse 3.5s ease-in-out infinite' }}></div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Oil temperature gauge with dramatic lighting effects */}
                <div className="absolute top-[35%] right-[5%] w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.7),_0_5px_15px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-1 rounded-full bg-gradient-radial from-slate-700 to-slate-900">
                    {/* Enhanced temperature scale with glow effect */}
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = -150 + i * 43;
                      const radian = (angle * Math.PI) / 180;
                      const x = 6 + 5.5 * Math.cos(radian);
                      const y = 6 + 5.5 * Math.sin(radian);
                      const isHot = i >= 5;
                      return (
                        <div 
                          key={`mark-${i}`}
                          className={`absolute w-1.5 h-0.5 ${isHot ? 'bg-red-500' : 'bg-white'}`}
                          style={{
                            top: `${y}px`,
                            left: `${x}px`,
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: '0 0',
                            boxShadow: isHot && data.transformerOn ? '0 0 3px #ef4444' : 'none'
                          }}
                        />
                      );
                    })}
                    
                    {/* Temperature numbers */}
                    <div className="absolute text-[5px] font-bold text-blue-300" style={{ top: '7px', left: '3.5px' }}>0</div>
                    <div className="absolute text-[5px] font-bold text-green-300" style={{ top: '3px', right: '5px' }}>50</div>
                    <div className="absolute text-[5px] font-bold text-red-400" style={{ bottom: '3px', right: '3.5px' }}>100</div>
                    
                    {/* Enhanced needle with dynamic glow based on temperature */}
                    <div 
                      className="absolute w-6 h-0.5 rounded-full shadow-sm transition-transform duration-1000"
                      style={{
                        top: '6px',
                        left: '6px',
                        transformOrigin: 'left center',
                        transform: `rotate(${-150 + (temperature - 30) * 3}deg)`,
                        background: temperature > 75 ? '#ef4444' : temperature > 50 ? '#f97316' : '#3b82f6',
                        boxShadow: data.transformerOn ? `0 0 ${temperature > 75 ? '5px' : '3px'} ${temperature > 75 ? '#ef4444' : temperature > 50 ? '#f97316' : '#3b82f6'}` : 'none'
                      }}
                    >
                      <div className="absolute right-0 w-1.5 h-1.5 rounded-full" style={{ 
                        background: temperature > 75 ? '#ef4444' : temperature > 50 ? '#f97316' : '#3b82f6',
                        top: '-0.5px'
                      }}></div>
                    </div>
                    
                    {/* Center pivot with metallic look */}
                    <div className="absolute top-[6px] left-[6px] w-2 h-2 rounded-full bg-gradient-radial from-slate-300 to-slate-500 border border-slate-700 shadow-[inset_0_0_2px_rgba(0,0,0,0.5)] transform -translate-x-1/2 -translate-y-1/2"></div>
                    
                    {/* Gauge label with dramatic glow when active */}
                    <div className={`absolute bottom-[3px] inset-x-0 text-[5px] text-center font-bold ${data.transformerOn ? 'text-blue-300' : 'text-slate-400'}`} style={{
                      textShadow: data.transformerOn ? '0 0 3px rgba(59, 130, 246, 0.7)' : 'none'
                    }}>TEMP °C</div>
                  </div>
                </div>
                
                {/* Enhanced oil level indicator with dramatic lighting and movement */}
                <div className="absolute top-[35%] left-[5%] w-10 h-36 bg-slate-800 border-2 border-slate-500 rounded-md overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.7),_0_5px_15px_rgba(0,0,0,0.3)]">
                  {/* Glass tube effect with reflections */}
                  <div className="absolute inset-x-0 h-full bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
                  
                  {/* Oil level with enhanced visual effects */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                    style={{ 
                      height: `${data.oilLevel || 95}%`,
                      background: 'linear-gradient(to bottom, rgba(30, 64, 175, 0.4), rgba(30, 64, 175, 0.7))'
                    }}
                  >
                    {/* Dramatic oil surface effect */}
                    <div className="absolute inset-x-0 top-0 h-3">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 to-transparent"></div>
                      <div className="absolute inset-x-0 top-0 h-1 bg-blue-300/30" style={{ animation: 'oilSurface 4s ease-in-out infinite' }}></div>
                    </div>
                    
                    {/* Oil bubble effects */}
                    {data.transformerOn && Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={`bubble-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-blue-200/40"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          animation: `oilBubbleRise ${2 + Math.random() * 3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.7}s`
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Level indicator marks with enhanced contrast */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1 px-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={`level-${i}`} className="flex items-center">
                        <div className="w-3 h-0.5 bg-white"></div>
                        <div className={`ml-1 text-[6px] font-bold ${data.transformerOn ? 'text-blue-300' : 'text-slate-300'}`} style={{
                          textShadow: data.transformerOn ? '0 0 2px rgba(59, 130, 246, 0.5)' : 'none'
                        }}>{20 * (5-i)}</div>
                      </div>
                    ))}
                    <div className="absolute right-1 bottom-1 text-[6px] font-bold text-blue-300" style={{
                      textShadow: data.transformerOn ? '0 0 2px rgba(59, 130, 246, 0.5)' : 'none'
                    }}>OIL %</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Core visualization with dramatically enhanced 3D effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] flex justify-between z-10">
              {/* Three transformer cores with more dramatic 3D offset */}
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={cn(
                    "w-[100px] h-[250px] bg-transparent border-0 relative",
                    data.transformerOn && transformerVibrationIntensity > 0.3 && "transformer-vibration"
                  )}
                  style={{
                    transform: `translateZ(${index * 5}px) rotateY(${index === 0 ? '-3deg' : index === 2 ? '3deg' : '0deg'}) rotate(${coreVibration * Math.sin(Date.now() / 100 + index)}deg)`,
                    transition: "transform 0.1s ease-out",
                    filter: `drop-shadow(0 ${5 + index * 2}px ${7 + index * 3}px rgba(0,0,0,0.4))`
                  }}
                >
                  {/* Iron Core Laminations with enhanced 3D effect */}
                  <div className="absolute inset-2 opacity-40">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-[5px] w-full my-[10px]",
                          data.transformerOn ? "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 shadow-md" : "bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600"
                        )}
                        style={{
                          boxShadow: data.transformerOn ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
                          animation: data.transformerOn ? `corePulsate ${2 + index * 0.5}s ease-in-out infinite` : 'none'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* HV Winding with dramatically enhanced glow and energy effects */}
                  <div className={cn(
                    "absolute inset-x-0 top-0 h-[40%] rounded-t-sm border-b",
                    data.transformerOn 
                      ? windingHotSpot > 90 
                        ? "border-red-500/70 bg-gradient-to-r from-orange-600/40 to-orange-500/30 winding-overload shadow-[0_0_15px_rgba(239,68,68,0.6)]" 
                        : "border-orange-500/70 bg-gradient-to-r from-orange-600/40 to-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.4)]" 
                      : "border-orange-700/50 bg-gradient-to-r from-orange-900/40 to-orange-800/30"
                  )}>
                    {/* Dramatic energy flow effect when powered */}
                    {data.transformerOn && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-30" 
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.7) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                            animation: `energyFlow ${2 + index * 0.3}s linear infinite`
                          }}
                        ></div>
                      </div>
                    )}
                    
                    {/* Enhanced HV Winding Coils with 3D effect */}
                    <div className="absolute inset-1 flex flex-col justify-evenly">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-[2px] w-full rounded-full",
                            data.transformerOn 
                              ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" 
                              : "bg-gradient-to-r from-orange-800 via-orange-900 to-orange-800"
                          )}
                          style={{
                            boxShadow: data.transformerOn 
                              ? windingHotSpot > 90 
                                ? '0 0 5px rgba(239,68,68,0.8)' 
                                : '0 0 3px rgba(249,115,22,0.5)' 
                              : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Core with enhanced energy and magnetic field visualization */}
                  <div className="absolute inset-x-0 top-[40%] h-[20%] bg-gradient-to-r from-blue-500/40 via-blue-600/30 to-blue-500/40 border-y border-blue-500/70 flex items-center justify-center">
                    {/* Magnetic field visualization */}
                    {data.transformerOn && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-40"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(59,130,246,0.7) 0%, transparent 70%)',
                            animation: `magneticPulse ${3 + index * 0.5}s ease-in-out infinite`
                          }}
                        ></div>
                        
                        {/* Magnetic field lines */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div 
                            key={`field-line-${i}`}
                            className="absolute h-[1px] w-full bg-blue-400/30"
                            style={{
                              top: `${30 + i * 20}%`,
                              animation: `magneticWave ${2 + i * 0.3}s ease-in-out infinite`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                    
                    {/* Core label with enhanced glow */}
                    <div className={cn(
                      "absolute text-[10px] font-bold",
                      data.transformerOn 
                        ? "text-blue-300" 
                        : "text-slate-500"
                    )}
                    style={{
                      textShadow: data.transformerOn ? '0 0 8px rgba(59,130,246,0.8)' : 'none'
                    }}>
                      {['R', 'Y', 'B'][index]}
                    </div>
                  </div>
                  
                  {/* LV Winding with dramatically enhanced energy effects */}
                  <div className={cn(
                    "absolute inset-x-0 bottom-0 h-[40%] rounded-b-sm border-t",
                    data.transformerOn 
                      ? "border-blue-300/70 bg-gradient-to-r from-blue-400/40 to-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.4)]" 
                      : "border-blue-700/50 bg-gradient-to-r from-blue-900/40 to-blue-800/30"
                  )}>
                    {/* Dramatic energy flow effect when powered */}
                    {data.transformerOn && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-30" 
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.7) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                            animation: `energyFlow ${2 + index * 0.3}s linear infinite reverse`
                          }}
                        ></div>
                      </div>
                    )}
                    
                    {/* Enhanced LV Winding Coils */}
                    <div className="absolute inset-1 flex flex-col justify-evenly">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-[3px] w-full rounded-full",
                            data.transformerOn 
                              ? "bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300" 
                              : "bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800"
                          )}
                          style={{
                            boxShadow: data.transformerOn ? '0 0 3px rgba(59,130,246,0.5)' : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Animation styles moved to stylesheet */}
            <style>
              {`
                @keyframes lightSweep {
                  0%, 100% { background-position: -100% -100%; }
                  50% { background-position: 200% 200%; }
                }
                
                @keyframes heatPulse {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 0.8; }
                }
                
                @keyframes oilBubbleRise {
                  0% { transform: translateY(0); opacity: 0.7; }
                  100% { transform: translateY(-100px); opacity: 0; }
                }
                
                @keyframes corePulsate {
                  0%, 100% { opacity: 0.4; }
                  50% { opacity: 0.6; }
                }
                
                @keyframes energyFlow {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
                
                @keyframes magneticPulse {
                  0%, 100% { opacity: 0.3; transform: scale(0.9); }
                  50% { opacity: 0.5; transform: scale(1.1); }
                }
                
                @keyframes magneticWave {
                  0%, 100% { transform: scaleX(0.8); opacity: 0.2; }
                  50% { transform: scaleX(1.2); opacity: 0.4; }
                }
              `}
            </style>

            {/* Cable Management System with enhanced 3D effect */}
            <svg className="absolute inset-0 w-full h-full z-40 pointer-events-none" style={{ overflow: 'visible' }}>
              {/* Definitions for cable trays */}
              <defs>
                <linearGradient id="cableTrayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                
                <filter id="cableShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
                </filter>
              </defs>
              
              {/* Top Cable Tray */}
              <g filter="url(#cableShadow)">
                <rect 
                  x="100" 
                  y="-190" 
                  width="500" 
                  height="25" 
                  rx="5" 
                  fill="url(#cableTrayGradient)" 
                  stroke="#1e293b" 
                  strokeWidth="1"
                />
                
                {/* Cable tray inner detail */}
                <rect 
                  x="105" 
                  y="-185" 
                  width="490" 
                  height="15" 
                  rx="3" 
                  fill="#1e293b" 
                  stroke="#475569" 
                  strokeWidth="0.5"
                  opacity="0.7"
                />
                
                {/* Cable guides */}
                {[160, 260, 360, 460].map((x, i) => (
                  <rect 
                    key={`top-guide-${i}`}
                    x={x-5} 
                    y="-190" 
                    width="10" 
                    height="25" 
                    fill="#334155" 
                    stroke="#1e293b" 
                    strokeWidth="0.5"
                  />
                ))}
              </g>
              
              {/* Bottom Cable Tray */}
              <g filter="url(#cableShadow)">
                <rect 
                  x="100" 
                  y="620" 
                  width="500" 
                  height="25" 
                  rx="5" 
                  fill="url(#cableTrayGradient)" 
                  stroke="#1e293b" 
                  strokeWidth="1"
                />
                
                {/* Cable tray inner detail */}
                <rect 
                  x="105" 
                  y="625" 
                  width="490" 
                  height="15" 
                  rx="3" 
                  fill="#1e293b" 
                  stroke="#475569" 
                  strokeWidth="0.5"
                  opacity="0.7"
                />
                
                {/* Cable guides */}
                {[160, 260, 360, 460].map((x, i) => (
                  <rect 
                    key={`bottom-guide-${i}`}
                    x={x-5} 
                    y="620" 
                    width="10" 
                    height="25" 
                    fill="#334155" 
                    stroke="#1e293b" 
                    strokeWidth="0.5"
                  />
                ))}
              </g>
              
              {/* HV Cable Connectors - Top */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-connector-top-${i}`} filter="url(#cableShadow)">
                  {/* Main connector housing */}
                  <rect 
                    x={x-15} 
                    y="-220" 
                    width="30" 
                    height="40" 
                    rx="5" 
                    fill="#334155" 
                    stroke="#1e293b" 
                    strokeWidth="1"
                  />
                  
                  {/* Connector face plate */}
                  <rect 
                    x={x-12} 
                    y="-205" 
                    width="24" 
                    height="20" 
                    rx="3" 
                    fill="#1e293b" 
                    stroke="#475569" 
                    strokeWidth="0.5"
                  />
                  
                  {/* Connection indicator */}
                  <circle 
                    cx={x} 
                    cy="-195" 
                    r="5" 
                    fill={data.transformerOn ? "#f97316" : "#64748b"} 
                    stroke="#334155" 
                    strokeWidth="1"
                  />
                  
                  {/* Connection indicator light */}
                  <circle 
                    cx={x} 
                    cy="-195" 
                    r="2" 
                    fill={data.transformerOn ? "#f59e0b" : "#475569"}
                    className={data.transformerOn ? "animate-pulse" : ""}
                  >
                    {data.transformerOn && (
                      <animate 
                        attributeName="opacity" 
                        values="1;0.6;1" 
                        dur="1.5s" 
                        repeatCount="indefinite" 
                      />
                    )}
                  </circle>
                </g>
              ))}
              
              {/* LV Cable Connectors - Bottom */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-connector-bottom-${i}`} filter="url(#cableShadow)">
                  {/* Main connector housing */}
                  <rect 
                    x={x-15} 
                    y="640" 
                    width="30" 
                    height="40" 
                    rx="5" 
                    fill="#334155" 
                    stroke="#1e293b" 
                    strokeWidth="1"
                  />
                  
                  {/* Connector face plate */}
                  <rect 
                    x={x-12} 
                    y="645" 
                    width="24" 
                    height="20" 
                    rx="3" 
                    fill="#1e293b" 
                    stroke="#475569" 
                    strokeWidth="0.5"
                  />
                  
                  {/* Connection indicator */}
                  <circle 
                    cx={x} 
                    cy="655" 
                    r="5" 
                    fill={data.transformerOn ? "#10b981" : "#64748b"} 
                    stroke="#334155" 
                    strokeWidth="1"
                  />
                  
                  {/* Connection indicator light */}
                  <circle 
                    cx={x} 
                    cy="655" 
                    r="2" 
                    fill={data.transformerOn ? "#34d399" : "#475569"}
                    className={data.transformerOn ? "animate-pulse" : ""}
                  >
                    {data.transformerOn && (
                      <animate 
                        attributeName="opacity" 
                        values="1;0.6;1" 
                        dur="1.5s" 
                        repeatCount="indefinite" 
                      />
                    )}
                  </circle>
                </g>
              ))}
              
              {/* Cable Channels */}
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-channel-top-${i}`} filter="url(#cableShadow)">
                  {/* HV Cable conduit */}
                  <path 
                    d={`M ${x} -180 L ${x} 95`} 
                    stroke="#334155" 
                    strokeWidth="12"
                    fill="none"
                  />
                  
                  <path 
                    d={`M ${x} -180 L ${x} 95`} 
                    stroke={data.transformerOn ? "#f97316" : "#475569"} 
                    strokeWidth="8"
                    strokeOpacity="0.7"
                    fill="none"
                  />
                  
                  {/* Cable channel cap */}
                  <rect 
                    x={x-7} 
                    y="-180" 
                    width="14" 
                    height="8" 
                    rx="2" 
                    fill="#334155" 
                    stroke="#1e293b" 
                    strokeWidth="0.5"
                  />
                  
                  {/* Cable Flow Indicators */}
                  {data.transformerOn && Array.from({ length: 3 }).map((_, j) => (
                    <circle 
                      key={`flow-indicator-top-${i}-${j}`}
                      cx={x} 
                      cy="-160" 
                      r="2" 
                      fill="#f59e0b"
                    >
                      <animate 
                        attributeName="cy" 
                        values={`-160;90`} 
                        dur="2s" 
                        begin={`${j * 0.6}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="0.8;0.3" 
                        dur="2s" 
                        begin={`${j * 0.6}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              ))}
              
              {[140, 350, 560].map((x, i) => (
                <g key={`cable-channel-bottom-${i}`} filter="url(#cableShadow)">
                  {/* LV Cable conduit */}
                  <path 
                    d={`M ${x} 365 L ${x} 610`} 
                    stroke="#334155" 
                    strokeWidth="12"
                    fill="none"
                  />
                  
                  <path 
                    d={`M ${x} 365 L ${x} 610`} 
                    stroke={data.transformerOn ? "#10b981" : "#475569"} 
                    strokeWidth="8"
                    strokeOpacity="0.7"
                    fill="none"
                  />
                  
                  {/* Cable channel cap */}
                  <rect 
                    x={x-7} 
                    y="602" 
                    width="14" 
                    height="8" 
                    rx="2" 
                    fill="#334155" 
                    stroke="#1e293b" 
                    strokeWidth="0.5"
                  />
                  
                  {/* Cable Flow Indicators */}
                  {data.transformerOn && Array.from({ length: 3 }).map((_, j) => (
                    <circle 
                      key={`flow-indicator-bottom-${i}-${j}`}
                      cx={x} 
                      cy="370" 
                      r="2" 
                      fill="#34d399"
                    >
                      <animate 
                        attributeName="cy" 
                        values={`370;600`} 
                        dur="1.5s" 
                        begin={`${j * 0.4}s`} 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="opacity" 
                        values="0.8;0.3" 
                        dur="1.5s" 
                        begin={`${j * 0.4}s`} 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  ))}
                </g>
              ))}
            </svg>

            {/* Warning plate sign centered on the transformer */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[80px] h-[100px] bg-yellow-400 border border-black flex flex-col items-center shadow-md overflow-hidden">
              {/* Black header bar */}
              <div className="w-full h-[20px] bg-black flex items-center justify-center">
                <div className="text-yellow-400 font-bold text-sm tracking-wider">DANGER</div>
              </div>
              
              {/* Triangle warning symbol with lightning bolt */}
              <div className="flex flex-col items-center w-full mt-2 mb-1">
                <div className="relative w-[40px] h-[36px] flex items-center justify-center">
                  {/* Triangle with fill */}
                  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Black triangle outline */}
                    <path d="M20 2L38 34H2L20 2Z" fill="black" />
                    
                    {/* Yellow triangle fill */}
                    <path d="M20 6L35 32H5L20 6Z" fill="#FFCC00" />
                    
                    {/* Centered lightning bolt SVG path */}
                    <path d="M20 10L15 20H20L15 28L27 18H21L24 10H20Z" 
                          fill="black" 
                          stroke="black" 
                          strokeWidth="0.5" 
                          strokeLinejoin="round" />
                  </svg>
                </div>
                
                {/* Bottom text */}
                <div className="flex flex-col items-center text-black mt-2">
                  <div className="font-bold text-[9px] leading-tight tracking-wide">ELECTRICAL</div>
                  <div className="font-bold text-[9px] leading-tight tracking-wide">HAZARD</div>
                </div>
              </div>
              
              {/* Plate shadow */}
              <div className="absolute -bottom-1 left-1/2 w-[60px] h-1 transform -translate-x-1/2 bg-gradient-radial from-black/30 to-transparent rounded-full blur-sm -z-10"></div>
            </div>

            {/* Conservator tank with enhanced 3D effect */}
            <div className="absolute left-[150px] right-[150px] top-[30px] h-[50px]">
              {/* Cylindrical conservator tank with 3D effect */}
              <div className="absolute top-0 left-[50px] right-[50px] h-12 rounded-t-full border-2 border-slate-600 bg-gradient-to-b from-slate-600 to-slate-700 shadow-lg">
                {/* Oil level indicator on conservator with 3D effect */}
                <div className="absolute top-2 bottom-2 left-1/2 w-8 -translate-x-1/2 rounded-md bg-slate-800 border-2 border-slate-500 overflow-hidden shadow-inner">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-blue-800 transition-all duration-500"
                    style={{ height: `${data.oilLevel || 95}%` }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between py-0.5">
                    <div className="border-t border-slate-500 w-full h-0"></div>
                    <div className="border-t border-slate-500 w-full h-0"></div>
                    <div className="border-t border-slate-500 w-full h-0"></div>
                  </div>
                </div>
              </div>
              
              {/* Conservator support brackets with 3D effect */}
              <div className="absolute top-12 left-[100px] w-2 h-[68px] bg-gradient-to-b from-slate-500 to-slate-700 shadow-md transform-gpu rotate-y-2"></div>
              <div className="absolute top-12 right-[100px] w-2 h-[68px] bg-gradient-to-b from-slate-500 to-slate-700 shadow-md transform-gpu rotate-y-neg2"></div>
              
              {/* Breather unit with 3D effect */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-b from-slate-500 to-slate-700 border-2 border-slate-600 flex items-center justify-center shadow-lg">
                  {/* Silica gel container with 3D effect */}
                  <div className="w-6 h-6 rounded-full overflow-hidden shadow-inner">
                    <div className="h-1/2 bg-gradient-to-b from-blue-300 to-blue-500"></div>
                    <div className="h-1/2 bg-gradient-to-b from-red-300 to-red-500"></div>
                  </div>
                </div>
                {/* Breather pipe with 3D effect */}
                <div className="absolute top-11 right-7 w-2 h-[69px] bg-gradient-to-b from-slate-500 to-slate-700 shadow-md"></div>
              </div>
              
              {/* Buchholz relay with 3D effect */}
              <div className="absolute bottom-0 left-[45%] w-12 h-6 bg-gradient-to-b from-slate-500 to-slate-700 rounded-md border-2 border-slate-500 shadow-lg">
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-radial from-red-400 to-red-600 shadow-glow-sm"></div>
              </div>
            </div>
            
            {/* Connection handles */}
            <Handle
              type="target"
              position={Position.Left}
              id="input"
              style={{
                background: "#ef4444",
                width: "12px",
                height: "12px",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 0 5px rgba(239, 68, 68, 0.5)",
              }}
              isConnectable={true}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="output"
              style={{
                background: "#22c55e",
                width: "12px",
                height: "12px",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 0 5px rgba(34, 197, 94, 0.5)",
              }}
              isConnectable={true}
            />
          </div>
        </div>
        
        {/* Transformer Control Card - Using function to render */}
        {renderTransformerControl()}
      </div>
      
      {/* Additional CSS for electric shock effects */}
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .animation-flash {
          animation: flash 0.1s 3;
        }
        
        .cursor-shock {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="yellow" stroke="red"/></svg>'), auto;
        }
        
        .lightning-effect {
          animation: lightning-flicker 0.15s ease-in-out;
        }
        
        @keyframes lightning-flicker {
          0%, 100% { opacity: 0; }
          10%, 30%, 50%, 70%, 90% { opacity: 1; }
          20%, 40%, 60%, 80% { opacity: 0.7; }
        }
        
        .spark-particle {
          animation: spark-fade 0.4s ease-out forwards;
        }
        
        @keyframes spark-fade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2.5); }
        }
      `}</style>
    </div>
  )
}

export default memo(ThreePhaseTransformerNode);