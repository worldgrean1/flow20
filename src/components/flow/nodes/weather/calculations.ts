import { useState, useEffect } from 'react';

export interface WeatherMetrics {
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  solarIntensity: number;
  precipitation: number;
}

export interface WeatherCondition {
  type: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  intensity: number;
  duration: number;
}

export const useWeatherCalculations = (
  initialCondition: WeatherCondition
) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [condition, setCondition] = useState<WeatherCondition>(initialCondition);
  const [metrics, setMetrics] = useState<WeatherMetrics>({
    temperature: 25,
    humidity: 50,
    windSpeed: 0,
    cloudCover: 0,
    solarIntensity: 100,
    precipitation: 0
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate base metrics based on condition
  const calculateBaseMetrics = (condition: WeatherCondition): WeatherMetrics => {
    const hour = currentTime.getHours();
    const isDaytime = hour >= 6 && hour < 18;
    const timeFactor = isDaytime ? 1 : 0.5;

    switch (condition.type) {
      case 'sunny':
        return {
          temperature: 25 + (condition.intensity * 5),
          humidity: 40 - (condition.intensity * 5),
          windSpeed: 5 + (condition.intensity * 2),
          cloudCover: 10 - (condition.intensity * 2),
          solarIntensity: 100 * timeFactor,
          precipitation: 0
        };
      case 'cloudy':
        return {
          temperature: 20 + (condition.intensity * 3),
          humidity: 60 + (condition.intensity * 10),
          windSpeed: 10 + (condition.intensity * 3),
          cloudCover: 70 + (condition.intensity * 10),
          solarIntensity: 50 * timeFactor,
          precipitation: condition.intensity * 5
        };
      case 'rainy':
        return {
          temperature: 18 + (condition.intensity * 2),
          humidity: 80 + (condition.intensity * 10),
          windSpeed: 15 + (condition.intensity * 5),
          cloudCover: 90 + (condition.intensity * 5),
          solarIntensity: 20 * timeFactor,
          precipitation: 20 + (condition.intensity * 30)
        };
      case 'stormy':
        return {
          temperature: 16 + (condition.intensity * 2),
          humidity: 90 + (condition.intensity * 5),
          windSpeed: 25 + (condition.intensity * 10),
          cloudCover: 100,
          solarIntensity: 10 * timeFactor,
          precipitation: 50 + (condition.intensity * 50)
        };
      default:
        return metrics;
    }
  };

  // Update metrics when condition or time changes
  useEffect(() => {
    const baseMetrics = calculateBaseMetrics(condition);
    setMetrics(baseMetrics);
  }, [condition, currentTime]);

  const changeCondition = (newCondition: WeatherCondition) => {
    setCondition(newCondition);
  };

  return {
    metrics,
    condition,
    changeCondition
  };
}; 