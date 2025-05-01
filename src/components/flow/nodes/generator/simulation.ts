import { useState, useEffect } from 'react';

export interface GeneratorMetrics {
  rpm: number;
  temperature: number;
  fuelConsumption: number;
  powerOutput: number;
  status: 'off' | 'starting' | 'running' | 'stopping';
}

export const useGeneratorSimulation = (
  isRunning: boolean,
  maxRPM: number = 3000,
  startupTime: number = 5,
  shutdownTime: number = 3,
  heatGenerationRate: number = 0.5,
  coolingRate: number = 0.3
) => {
  const [metrics, setMetrics] = useState<GeneratorMetrics>({
    rpm: 0,
    temperature: 25,
    fuelConsumption: 0,
    powerOutput: 0,
    status: 'off'
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let startTime: number;
    let targetRPM: number;

    if (isRunning && metrics.status === 'off') {
      setMetrics(prev => ({ ...prev, status: 'starting' }));
      startTime = Date.now();
      targetRPM = maxRPM;
    } else if (!isRunning && metrics.status === 'running') {
      setMetrics(prev => ({ ...prev, status: 'stopping' }));
      startTime = Date.now();
      targetRPM = 0;
    }

    if (metrics.status === 'starting' || metrics.status === 'stopping') {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const duration = metrics.status === 'starting' ? startupTime : shutdownTime;
        const progress = Math.min(1, elapsed / duration);
        
        const currentRPM = metrics.status === 'starting' 
          ? maxRPM * progress 
          : maxRPM * (1 - progress);

        const temperature = metrics.status === 'starting'
          ? 25 + (progress * 50)
          : 75 - (progress * 50);

        const fuelConsumption = metrics.status === 'starting'
          ? progress * 2
          : (1 - progress) * 2;

        const powerOutput = metrics.status === 'starting'
          ? maxRPM * 0.5 * progress
          : maxRPM * 0.5 * (1 - progress);

        setMetrics({
          rpm: currentRPM,
          temperature,
          fuelConsumption,
          powerOutput,
          status: metrics.status
        });

        if (progress >= 1) {
          setMetrics(prev => ({
            ...prev,
            status: metrics.status === 'starting' ? 'running' : 'off'
          }));
          clearInterval(interval);
        }
      }, 100);
    } else if (metrics.status === 'running') {
      interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          rpm: maxRPM,
          temperature: Math.min(75, prev.temperature + heatGenerationRate),
          fuelConsumption: 2,
          powerOutput: maxRPM * 0.5
        }));
      }, 1000);
    } else if (metrics.status === 'off') {
      interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          rpm: 0,
          temperature: Math.max(25, prev.temperature - coolingRate),
          fuelConsumption: 0,
          powerOutput: 0
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, metrics.status, maxRPM, startupTime, shutdownTime, heatGenerationRate, coolingRate]);

  return metrics;
}; 