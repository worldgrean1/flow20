import React, { useEffect, useState, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Check, Paintbrush, RefreshCw, Grid, Hexagon, Circle, Square } from 'lucide-react';
import { useBackground } from '../../lib/background-context';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../hooks/use-translation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Label } from './label';

const patterns = [
  { id: 'grid', icon: Grid, label: 'Grid' },
  { id: 'hexagon', icon: Hexagon, label: 'Hexagon' },
  { id: 'circles', icon: Circle, label: 'Circles' },
  { id: 'squares', icon: Square, label: 'Squares' },
] as const;

type Pattern = typeof patterns[number]['id'];

const backgroundPatterns = [
  { value: 'none', label: 'None' },
  { value: 'grid', label: 'Grid' },
  { value: 'hexagon', label: 'Hexagon' },
  { value: 'circles', label: 'Circles' },
  { value: 'squares', label: 'Squares' },
];

interface BackgroundSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function BackgroundSelector({ value, onChange }: BackgroundSelectorProps) {
  const { backgroundColor, setBackgroundColor, resetBackgroundColor, customColors, addCustomColor } = useBackground();
  const [customColor, setCustomColor] = useState('#1a1c2a');
  const [isOpen, setIsOpen] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [currentPattern, setCurrentPattern] = useState<Pattern>('grid');
  const { t } = useTranslation();

  // If being used in controlled mode with value/onChange
  if (value !== undefined && onChange) {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="background-pattern">Background Pattern</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="background-pattern">
            <SelectValue placeholder="Select background pattern" />
          </SelectTrigger>
          <SelectContent>
            {backgroundPatterns.map((pattern) => (
              <SelectItem key={pattern.value} value={pattern.value}>
                {pattern.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // Update custom color input when background color changes
  useEffect(() => {
    setCustomColor(backgroundColor);
  }, [backgroundColor]);

  // Apply custom color and add it to saved colors
  const applyCustomColor = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate color format
    const isValidHex = /^#[0-9A-F]{6}$/i.test(customColor);
    if (!isValidHex) {
      // If invalid, try to fix it or fallback to current color
      if (customColor.startsWith('#') && customColor.length < 7) {
        // Pad with zeros if needed
        const paddedColor = customColor.padEnd(7, '0');
        setCustomColor(paddedColor);
        setBackgroundColor(paddedColor);
        addCustomColor(paddedColor);
      } else {
        // Use current background color as fallback
        setCustomColor(backgroundColor);
      }
      return;
    }
    
    setBackgroundColor(customColor);
    addCustomColor(customColor);
    setIsOpen(false);
  };

  // Handle color picker change
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
  };

  // Handle text input change with validation
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value;
    
    // Add # if missing
    if (newColor.length > 0 && !newColor.startsWith('#')) {
      newColor = '#' + newColor;
    }
    
    // Limit to 7 characters total (# + 6 hex digits)
    if (newColor.length > 7) {
      newColor = newColor.slice(0, 7);
    }
    
    setCustomColor(newColor);
  };

  // Handle reset button click
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resetBackgroundColor();
  };

  // Handle preset color button click
  const handlePresetClick = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBackgroundColor(color);
  };

  const handlePatternChange = (pattern: Pattern) => {
    setCurrentPattern(pattern);
    document.body.setAttribute('data-pattern', pattern);
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-green-500/10"
      >
        <Grid className="h-4 w-4 text-green-500" />
      </Button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-background/95 backdrop-blur-md rounded-lg shadow-lg border border-border/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2 space-y-1">
          {patterns.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handlePatternChange(id)}
              className={`
                w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                ${currentPattern === id 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'text-muted-foreground hover:bg-green-500/5 hover:text-green-500'
                }
                transition-colors duration-200
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{t(label)}</span>
              {currentPattern === id && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-green-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 px-3 border-slate-600 bg-slate-800/60 hover:bg-slate-700/70"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <div 
              className="w-4 h-4 rounded-full border border-slate-500" 
              style={{ backgroundColor }}
            />
            <Paintbrush className="h-4 w-4" />
            <span className="text-xs">Background</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-slate-800 border-slate-700">
          <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-200">Color Presets</h4>
              <div className="grid grid-cols-6 gap-2">
                {customColors.map((color, index) => (
                  <button
                    key={index}
                    className={cn(
                      'h-6 w-6 rounded-md border border-slate-700',
                      color === backgroundColor && 'ring-2 ring-green-500 ring-offset-2 ring-offset-slate-800'
                    )}
                    style={{ backgroundColor: color }}
                    onClick={(e) => handlePresetClick(color, e)}
                  >
                    {color === backgroundColor && (
                      <Check className="h-4 w-4 text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-200">Custom Color</h4>
              <div className="flex gap-2">
                <input
                  ref={colorInputRef}
                  type="color"
                  value={customColor}
                  onChange={handleColorPickerChange}
                  className="h-8 w-8 rounded cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={handleTextInputChange}
                  className="flex-1 h-8 px-2 rounded bg-slate-900 border border-slate-700 text-sm"
                  placeholder="#000000"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full bg-slate-700 hover:bg-slate-600"
                  onClick={applyCustomColor}
                >
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={handleReset}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 