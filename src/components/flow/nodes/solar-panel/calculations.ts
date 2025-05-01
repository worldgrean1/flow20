import { useState, useEffect } from 'react';

export interface SolarPanelMetrics {
  temperature: number;
  efficiency: number;
  powerOutput: number;
  solarAngle: number;
  solarIntensity: number;
}

export const useSolarPanelCalculations = (
  shadingLevel: number,
  windSpeed: number,
  dustAccumulation: number,
  temperatureCoefficient: number
) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState<SolarPanelMetrics>({
    temperature: 25,
    efficiency: 20,
    powerOutput: 0,
    solarAngle: 0,
    solarIntensity: 0
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate solar position and intensity
  const calculateSolarPosition = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const timeInHours = hour + minute / 60;
    
    const solarAngle = Math.max(0, Math.min(90, 
      (timeInHours - 6) * 15
    ));
    
    return {
      angle: solarAngle,
      intensity: Math.max(0, Math.min(100, 
        (solarAngle / 90) * 100 * (1 - shadingLevel / 100)
      ))
    };
  };

  // Calculate panel temperature
  const calculatePanelTemperature = (solarIntensity: number) => {
    const ambientTemp = 25;
    const windCooling = windSpeed ? Math.min(10, windSpeed * 0.5) : 0;
    
    return ambientTemp + (solarIntensity / 100) * 30 - windCooling;
  };

  // Calculate panel efficiency
  const calculateEfficiency = (panelTemp: number) => {
    const baseEfficiency = 20;
    const tempDiff = panelTemp - 25;
    const tempEffect = tempDiff * temperatureCoefficient;
    const dustEffect = dustAccumulation * 0.1;
    const shadingEffect = shadingLevel * 0.2;
    
    return Math.max(0, Math.min(100, 
      baseEfficiency + tempEffect - dustEffect - shadingEffect
    ));
  };

  // Calculate power output
  const calculatePowerOutput = (solarIntensity: number, efficiency: number) => {
    const panelArea = 1.6;
    const maxIrradiance = 1000;
    
    return Math.round(
      (solarIntensity / 100) * maxIrradiance * panelArea * (efficiency / 100)
    );
  };

  // Update metrics
  useEffect(() => {
    const { angle, intensity } = calculateSolarPosition();
    const temperature = calculatePanelTemperature(intensity);
    const efficiency = calculateEfficiency(temperature);
    const powerOutput = calculatePowerOutput(intensity, efficiency);

    setMetrics({
      temperature,
      efficiency,
      powerOutput,
      solarAngle: angle,
      solarIntensity: intensity
    });
  }, [currentTime, shadingLevel, windSpeed, dustAccumulation, temperatureCoefficient]);

  return metrics;
}; 