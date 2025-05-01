import { useState, useEffect } from 'react';

export interface PanelRotation {
  x: number;
  y: number;
}

export const usePanelAnimation = (isHovered: boolean) => {
  const [rotation, setRotation] = useState<PanelRotation>({ x: 15, y: 0 });
  const [animate, setAnimate] = useState(false);

  // Handle mouse interaction for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = 20 * ((y - rect.height / 2) / rect.height);
    const rotateY = -20 * ((x - rect.width / 2) / rect.width);

    setRotation({ x: rotateX, y: rotateY });
  };

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const resetRotation = () => {
    setRotation({ x: 15, y: 0 });
  };

  return {
    rotation,
    animate,
    handleMouseMove,
    resetRotation
  };
};

export const getPanelStyle = (
  rotation: PanelRotation,
  isActive: boolean,
  animate: boolean
) => ({
  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
  transformStyle: "preserve-3d" as const,
  transition: animate ? "transform 0.3s ease-out" : "none",
  borderColor: isActive ? "rgb(59, 130, 246)" : "rgb(51, 65, 85)",
  boxShadow: isActive 
    ? "0 0 15px rgba(59, 130, 246, 0.5)" 
    : "0 0 5px rgba(0, 0, 0, 0.2)"
});

export const getCellStyle = (isActive: boolean, index: number) => ({
  transform: `translateZ(${isActive ? 1 : 0}px)`,
  boxShadow: isActive 
    ? "inset 0 0 5px rgba(59, 130, 246, 0.5)" 
    : "none",
  transition: `transform 0.3s ease-out ${index * 0.01}s`
}); 