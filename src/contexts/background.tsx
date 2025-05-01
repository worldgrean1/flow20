import React, { useState, useCallback, createContext } from 'react';

interface Background {
  pattern: string;
  color: string;
  darkMode: boolean;
}

const defaultBackground: Background = {
  pattern: 'grid',
  color: '#ffffff',
  darkMode: false
};

export const BackgroundContext = createContext<{
  background: Background;
  updateBackground: (newBackground: Partial<Background>) => void;
}>({
  background: defaultBackground,
  updateBackground: () => {}
});

const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
  return hexRegex.test(color);
};

const validateAndFormatColor = (color: string): string => {
  // Remove any whitespace
  const trimmedColor = color.trim();
  
  // Add # if missing
  const colorWithHash = trimmedColor.startsWith('#') ? trimmedColor : `#${trimmedColor}`;
  
  // Convert 3-digit hex to 6-digit hex
  if (isValidHexColor(colorWithHash) && colorWithHash.length === 4) {
    const r = colorWithHash[1];
    const g = colorWithHash[2];
    const b = colorWithHash[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  
  return isValidHexColor(colorWithHash) ? colorWithHash : defaultBackground.color;
};

export const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
  const [background, setBackground] = useState<Background>(defaultBackground);
  
  const updateBackground = useCallback((newBackground: Partial<Background>) => {
    setBackground((prev: Background) => ({
      ...prev,
      ...newBackground,
      color: newBackground.color ? validateAndFormatColor(newBackground.color) : prev.color
    }));
  }, []);

  return (
    <BackgroundContext.Provider value={{ background, updateBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
}; 