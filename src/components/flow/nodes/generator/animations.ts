import { useState, useEffect } from 'react';

export interface FanRotation {
  angle: number;
  speed: number;
}

export const useGeneratorAnimation = (
  isRunning: boolean,
  status: 'off' | 'starting' | 'running' | 'stopping',
  maxRPM: number = 3000
) => {
  const [fanRotation, setFanRotation] = useState<FanRotation>({
    angle: 0,
    speed: 0
  });
  const [smokeOpacity, setSmokeOpacity] = useState(0);
  const [vibration, setVibration] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (status === 'running') {
        // Fan rotation
        const rpm = maxRPM;
        const degreesPerSecond = (rpm / 60) * 360;
        setFanRotation(prev => ({
          angle: (prev.angle + (degreesPerSecond * deltaTime) / 1000) % 360,
          speed: rpm
        }));

        // Smoke effect
        setSmokeOpacity(0.4);

        // Vibration effect
        setVibration(Math.sin(time / 100) * 2);
      } else if (status === 'starting' || status === 'stopping') {
        // Gradual fan rotation
        const progress = status === 'starting' ? 0.5 : 0.3;
        const rpm = maxRPM * progress;
        const degreesPerSecond = (rpm / 60) * 360;
        setFanRotation(prev => ({
          angle: (prev.angle + (degreesPerSecond * deltaTime) / 1000) % 360,
          speed: rpm
        }));

        // Gradual smoke effect
        setSmokeOpacity(status === 'starting' ? 0.2 : 0.1);

        // Gradual vibration effect
        setVibration(Math.sin(time / 100) * progress);
      } else {
        // Reset all effects
        setFanRotation({ angle: 0, speed: 0 });
        setSmokeOpacity(0);
        setVibration(0);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [status, maxRPM]);

  const getFanStyle = () => ({
    transform: `rotate(${fanRotation.angle}deg)`,
    transition: 'transform 0.1s linear'
  });

  const getSmokeStyle = () => ({
    opacity: smokeOpacity,
    transition: 'opacity 0.5s ease-in-out'
  });

  const getVibrationStyle = () => ({
    transform: `translate(${vibration}px, ${vibration}px)`,
    transition: 'transform 0.1s ease-out'
  });

  return {
    fanStyle: getFanStyle(),
    smokeStyle: getSmokeStyle(),
    vibrationStyle: getVibrationStyle(),
    fanSpeed: fanRotation.speed
  };
}; 