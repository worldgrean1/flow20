import { MapStyle } from './types';

export const defaultMapStyle: MapStyle = {
  container: {
    width: 270,
    height: 220,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  region: {
    active: {
      color: 'rgb(34, 197, 94)',
      glow: 'rgba(34, 197, 94, 0.5)',
      size: 20,
    },
    warning: {
      color: 'rgb(234, 179, 8)',
      glow: 'rgba(234, 179, 8, 0.5)',
      size: 20,
    },
    offline: {
      color: 'rgb(239, 68, 68)',
      glow: 'rgba(239, 68, 68, 0.5)',
      size: 20,
    },
  },
  tooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    textColor: 'rgb(248, 250, 252)',
    borderColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 6,
  },
};

export const getRegionStyle = (status: "active" | "warning" | "offline", isHovered: boolean, style: MapStyle) => {
  const baseStyle = {
    width: style.region[status].size,
    height: style.region[status].size,
    backgroundColor: style.region[status].color,
    border: `2px solid ${isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'}`,
    boxShadow: `0 0 8px ${style.region[status].glow}`,
    transition: 'all 0.3s ease-out',
  };

  if (isHovered) {
    return {
      ...baseStyle,
      transform: 'scale(1.2)',
      boxShadow: `0 0 12px ${style.region[status].glow}`,
    };
  }

  return baseStyle;
};

export const getContainerStyle = (isConnected: boolean, style: MapStyle) => ({
  width: style.container.width,
  height: style.container.height,
  borderRadius: style.container.borderRadius,
  borderWidth: style.container.borderWidth,
  borderColor: isConnected ? 'rgba(34, 197, 94, 0.4)' : style.container.borderColor,
  backgroundColor: style.container.backgroundColor,
  boxShadow: style.container.shadow,
  transition: 'all 0.3s ease-out',
});

export const getTooltipStyle = (style: MapStyle) => ({
  backgroundColor: style.tooltip.backgroundColor,
  color: style.tooltip.textColor,
  borderColor: style.tooltip.borderColor,
  borderRadius: style.tooltip.borderRadius,
  padding: '8px 12px',
  fontSize: '12px',
  lineHeight: '1.5',
  maxWidth: '200px',
}); 