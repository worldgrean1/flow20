import { createContext, useContext, useEffect, useState } from 'react';

type BackgroundContextType = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  resetBackgroundColor: () => void;
  customColors: string[];
  addCustomColor: (color: string) => void;
};

const DEFAULT_BACKGROUND_COLOR = '#cbd2cb'; // Light gray default
const DEFAULT_CUSTOM_COLORS = ['#cbd2cb', '#1a1c2a', '#0f172a', '#1e293b', '#0f0f13', '#132043', '#1f2937'];

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundColor, setBackgroundColorState] = useState<string>(DEFAULT_BACKGROUND_COLOR);
  const [customColors, setCustomColors] = useState<string[]>(DEFAULT_CUSTOM_COLORS);

  // Load saved background color from localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem('background-color');
    if (savedColor) {
      setBackgroundColorState(savedColor);
      document.documentElement.style.setProperty('--app-background', savedColor);
    }

    const savedCustomColors = localStorage.getItem('custom-background-colors');
    if (savedCustomColors) {
      try {
        const colors = JSON.parse(savedCustomColors);
        if (Array.isArray(colors)) {
          setCustomColors(colors);
        }
      } catch (error) {
        console.error('Error parsing custom colors:', error);
      }
    }
  }, []);

  // Initialize background color for the first render
  useEffect(() => {
    // Apply default background color if none is set
    document.documentElement.style.setProperty('--app-background', backgroundColor);
    document.body.style.backgroundColor = backgroundColor;
  }, []);

  // Update background color and save to localStorage
  const setBackgroundColor = (color: string) => {
    setBackgroundColorState(color);
    localStorage.setItem('background-color', color);
    document.documentElement.style.setProperty('--app-background', color);
    document.body.style.backgroundColor = color;
  };

  // Reset to default color
  const resetBackgroundColor = () => {
    setBackgroundColorState(DEFAULT_BACKGROUND_COLOR);
    localStorage.setItem('background-color', DEFAULT_BACKGROUND_COLOR);
    document.documentElement.style.setProperty('--app-background', DEFAULT_BACKGROUND_COLOR);
    document.body.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
  };

  // Add a new custom color to the palette
  const addCustomColor = (color: string) => {
    // Don't add duplicates
    if (!customColors.includes(color)) {
      const updatedColors = [color, ...customColors.slice(0, 11)]; // Keep only 12 colors max
      setCustomColors(updatedColors);
      localStorage.setItem('custom-background-colors', JSON.stringify(updatedColors));
    }
  };

  return (
    <BackgroundContext.Provider value={{ 
      backgroundColor, 
      setBackgroundColor, 
      resetBackgroundColor,
      customColors,
      addCustomColor
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}; 