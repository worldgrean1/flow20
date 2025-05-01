import { useState, useEffect } from 'react';
import { WeatherCondition } from './calculations';

export interface WeatherAnimation {
  cloudPosition: number;
  rainIntensity: number;
  lightningIntensity: number;
  sunIntensity: number;
}

export const useWeatherAnimation = (condition: WeatherCondition) => {
  const [animation, setAnimation] = useState<WeatherAnimation>({
    cloudPosition: 0,
    rainIntensity: 0,
    lightningIntensity: 0,
    sunIntensity: 1
  });

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Update cloud position
      const cloudSpeed = condition.type === 'stormy' ? 0.1 : 0.05;
      const newCloudPosition = (animation.cloudPosition + cloudSpeed * deltaTime) % 100;

      // Update rain intensity
      const targetRainIntensity = condition.type === 'rainy' || condition.type === 'stormy' 
        ? condition.intensity 
        : 0;
      const newRainIntensity = animation.rainIntensity + (targetRainIntensity - animation.rainIntensity) * 0.1;

      // Update lightning intensity
      const targetLightningIntensity = condition.type === 'stormy' 
        ? Math.random() * condition.intensity 
        : 0;
      const newLightningIntensity = animation.lightningIntensity + 
        (targetLightningIntensity - animation.lightningIntensity) * 0.2;

      // Update sun intensity
      const targetSunIntensity = condition.type === 'sunny' 
        ? condition.intensity 
        : 0;
      const newSunIntensity = animation.sunIntensity + 
        (targetSunIntensity - animation.sunIntensity) * 0.1;

      setAnimation({
        cloudPosition: newCloudPosition,
        rainIntensity: newRainIntensity,
        lightningIntensity: newLightningIntensity,
        sunIntensity: newSunIntensity
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [condition]);

  const getCloudStyle = () => ({
    transform: `translateX(${animation.cloudPosition}%)`,
    opacity: condition.type === 'sunny' ? 0.2 : 1,
    transition: 'opacity 0.5s ease-in-out'
  });

  const getRainStyle = () => ({
    opacity: animation.rainIntensity,
    transition: 'opacity 0.5s ease-in-out'
  });

  const getLightningStyle = () => ({
    opacity: animation.lightningIntensity,
    transition: 'opacity 0.1s ease-in-out'
  });

  const getSunStyle = () => ({
    opacity: animation.sunIntensity,
    transform: `scale(${1 + animation.sunIntensity * 0.2})`,
    transition: 'all 0.5s ease-in-out'
  });

  return {
    cloudStyle: getCloudStyle(),
    rainStyle: getRainStyle(),
    lightningStyle: getLightningStyle(),
    sunStyle: getSunStyle()
  };
}; 