import { useState, useEffect, useRef, useCallback } from 'react';
import { layoutOptions } from '../../lib/elk-layout';
import { Slider } from './slider';
import { Button } from './button';
import { Label } from './label';
import { Switch } from './switch';
import { useTranslation } from '../../hooks/use-translation';
import { X, Grid, Layout, Move, RotateCw, ZoomIn, Layers, Box, GitBranch, Maximize } from 'lucide-react';

// Define a type that includes 'custom' as a valid layout type
type LayoutType = keyof typeof layoutOptions | 'custom';

interface LayoutSettingsProps {
  onApplySettings: (settings: any) => void;
  onClose: () => void;
  currentLayout: keyof typeof layoutOptions;
}

export function LayoutSettings({ onApplySettings, onClose, currentLayout }: LayoutSettingsProps) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();
  const [settings, setSettings] = useState({
    powerSourcesPosition: [800],
    nodeSpacing: [60],
    layerSpacing: [80],
    direction: 'LEFT',
    enablePartitioning: true,
    partitionSpacing: [80],
    edgeRouting: 'ORTHOGONAL',
    edgeSpacing: [80],
    zoomLevel: [100],
    rotation: [0],
    gridSize: [20],
    animationSpeed: [1],
  });
  const [manualDragMode, setManualDragMode] = useState(false);
  const [layoutType, setLayoutType] = useState<LayoutType>(currentLayout);

  const updatePosition = useCallback(() => {
    if (cardRef.current && isDragging.current) {
      cardRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      animationFrame.current = requestAnimationFrame(updatePosition);
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.drag-handle')) {
      isDragging.current = true;
      startPos.current = {
        x: e.clientX - currentPos.current.x,
        y: e.clientY - currentPos.current.y
      };
      if (cardRef.current) {
        cardRef.current.style.transition = 'none';
      }
      animationFrame.current = requestAnimationFrame(updatePosition);
    }
  }, [updatePosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current) {
      currentPos.current = {
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y
      };
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current && cardRef.current) {
      isDragging.current = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      cardRef.current.style.transition = 'transform 0.1s ease-out';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  // Update layout type when manual drag mode changes
  useEffect(() => {
    if (manualDragMode) {
      console.log('Manual drag mode enabled, updating layout type to custom');
      setLayoutType('custom');
      // Save the layout type immediately when manual drag mode is enabled
      const settingsToSave = {
        ...settings,
        manualDragMode: true,
        layoutType: 'custom' as LayoutType
      };
      localStorage.setItem('layoutSettings', JSON.stringify(settingsToSave));
    } else {
      console.log('Manual drag mode disabled, restoring previous layout type');
      setLayoutType(currentLayout);
      // Save the layout type immediately when manual drag mode is disabled
      const settingsToSave = {
        ...settings,
        manualDragMode: false,
        layoutType: currentLayout
      };
      localStorage.setItem('layoutSettings', JSON.stringify(settingsToSave));
    }
  }, [manualDragMode, currentLayout, settings]);

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('layoutSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        console.log('Loading layout settings:', parsed);
        setSettings({
          ...parsed,
          powerSourcesPosition: [parsed.powerSourcesPosition || 800],
          nodeSpacing: [parsed.nodeSpacing || 60],
          layerSpacing: [parsed.layerSpacing || 80],
          partitionSpacing: [parsed.partitionSpacing || 80],
          edgeSpacing: [parsed.edgeSpacing || 80],
          zoomLevel: [parsed.zoomLevel || 100],
          rotation: [parsed.rotation || 0],
          gridSize: [parsed.gridSize || 20],
          animationSpeed: [parsed.animationSpeed || 1],
        });
        // Set manual drag mode and layout type from saved settings
        if (parsed.manualDragMode !== undefined) {
          setManualDragMode(parsed.manualDragMode);
        }
        if (parsed.layoutType) {
          setLayoutType(parsed.layoutType as LayoutType);
        }
      } catch (error) {
        console.error('Error loading saved settings:', error);
      }
    }
  }, []);

  const handleApply = () => {
    const updatedLayoutOptions = {
      ...(layoutType === 'custom' ? {} : layoutOptions[currentLayout]),
      'elk.partitioning.partition.0.position': `${settings.powerSourcesPosition[0]},0`,
      'elk.spacing.nodeNode': settings.nodeSpacing[0].toString(),
      'elk.layered.spacing.nodeNodeBetweenLayers': settings.layerSpacing[0].toString(),
      'elk.direction': settings.direction,
      'elk.partitioning.activate': settings.enablePartitioning.toString(),
      'elk.partitioning.partition.0.borderSpacing': settings.partitionSpacing[0].toString(),
      'elk.edgeRouting': settings.edgeRouting,
      'elk.spacing.edgeNode': settings.edgeSpacing[0].toString(),
      'elk.spacing.edgeEdge': settings.edgeSpacing[0].toString(),
      zoomLevel: settings.zoomLevel[0],
      rotation: settings.rotation[0],
      gridSize: settings.gridSize[0],
      animationSpeed: settings.animationSpeed[0],
      manualDragMode: manualDragMode,
      layoutType: layoutType
    };

    // Save all settings including layout type
    const settingsToSave = {
      ...settings,
      powerSourcesPosition: settings.powerSourcesPosition[0],
      nodeSpacing: settings.nodeSpacing[0],
      layerSpacing: settings.layerSpacing[0],
      partitionSpacing: settings.partitionSpacing[0],
      edgeSpacing: settings.edgeSpacing[0],
      zoomLevel: settings.zoomLevel[0],
      rotation: settings.rotation[0],
      gridSize: settings.gridSize[0],
      animationSpeed: settings.animationSpeed[0],
      manualDragMode: manualDragMode,
      layoutType: layoutType
    };
    console.log('Saving layout settings on apply:', settingsToSave);
    localStorage.setItem('layoutSettings', JSON.stringify(settingsToSave));

    // If switching to custom layout, save current positions
    if (manualDragMode) {
      console.log('Saving custom layout due to manual drag mode');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('saveCustomLayout'));
        
        // Verify the save was successful
        setTimeout(() => {
          const savedSettings = localStorage.getItem('layoutSettings');
          const savedPositions = localStorage.getItem('customLayoutPositions');
          console.log('Layout Settings Save Verification:', {
            settingsSaved: !!savedSettings,
            positionsSaved: !!savedPositions,
            manualDragMode: manualDragMode,
            layoutType: layoutType
          });
        }, 100);
      }
    }

    onApplySettings(updatedLayoutOptions);
  };

  const SliderSection = ({ 
    label, 
    icon: Icon, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    hint 
  }: { 
    label: string;
    icon: any;
    value: number[];
    onChange: (value: number[]) => void;
    min: number;
    max: number;
    step: number;
    hint?: string;
  }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Icon className="h-4 w-4 text-green-500" />
          <span>{label}</span>
        </Label>
        <span className="text-xs text-slate-400">{value[0]}</span>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
        className="py-0.5"
      />
      {hint && (
        <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>
      )}
    </div>
  );

  return (
    <div
      ref={cardRef}
      className="fixed bg-slate-900/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-700/50 w-[400px] max-h-[85vh] overflow-y-auto z-[100]"
      style={{
        transform: 'translate(0px, 0px)',
        cursor: isDragging.current ? 'grabbing' : 'default',
        top: '50%',
        left: '50%',
        marginTop: '-300px',
        marginLeft: '-200px',
        willChange: 'transform',
        transition: 'transform 0.1s ease-out'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-6">
        {/* Company Branding */}
        <div className="flex items-center justify-between drag-handle cursor-move">
          <div className="flex items-center space-x-3">
            {/* GREAN WORLD Logo */}
            <div className="flex items-center justify-center h-12 w-12 rounded-lg overflow-hidden bg-white p-1">
              <img 
                src="etmap/grean-world-logo.png.png" 
                alt="GREAN WORLD Logo"
                className="h-full w-full object-contain"
                style={{ imageRendering: 'auto' }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  console.error('Failed to load image:', img.src);
                  img.onerror = null; // Prevent infinite loop
                  img.src = 'etmap/Header-logo.PNG'; // Fallback to alternative logo
                }}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-200">GREAN WORLD</h3>
              <p className="text-[10px] text-slate-400">Energy Technology PLC</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0 hover:bg-green-500/10">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Settings Title */}
        <div className="flex items-center space-x-2 px-1">
          <Layout className="h-4 w-4 text-green-500" />
          <div>
            <h2 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {t('Layout Settings')}
            </h2>
            <p className="text-[10px] text-slate-400">{t('PowerVision Pro Configuration')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Manual Drag Mode */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <Move className="h-4 w-4 text-green-500" />
            {t('Manual Drag Mode')}
          </Label>
          <Switch 
            checked={manualDragMode} 
            onCheckedChange={setManualDragMode}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        {/* Layout Type */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <Grid className="h-4 w-4 text-green-500" />
            {t('Layout Type')}
          </Label>
          <select
            value={layoutType}
            onChange={(e) => setLayoutType(e.target.value as LayoutType)}
            className="w-full h-8 px-2 text-sm rounded-md bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-1 focus:ring-green-500/50"
          >
            <option value="custom" className="bg-slate-900">{t('Custom (Manual)')}</option>
            <option value="powerSourcesColumn" className="bg-slate-900">{t('Power Sources Column')}</option>
          </select>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <SliderSection
            label={t('Power Sources Position')}
            icon={Box}
            value={settings.powerSourcesPosition}
            onChange={(value) => setSettings({ ...settings, powerSourcesPosition: value })}
            min={0}
            max={1200}
            step={50}
            hint={t('Adjust the horizontal position of power sources')}
          />

          <SliderSection
            label={t('Node Spacing')}
            icon={Grid}
            value={settings.nodeSpacing}
            onChange={(value) => setSettings({ ...settings, nodeSpacing: value })}
            min={20}
            max={200}
            step={10}
            hint={t('Adjust spacing between nodes')}
          />

          <SliderSection
            label={t('Layer Spacing')}
            icon={Layers}
            value={settings.layerSpacing}
            onChange={(value) => setSettings({ ...settings, layerSpacing: value })}
            min={20}
            max={200}
            step={10}
            hint={t('Adjust spacing between layers')}
          />

          {/* Layout Direction */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <RotateCw className="h-4 w-4 text-green-500" />
              {t('Layout Direction')}
            </Label>
            <select
              value={settings.direction}
              onChange={(e) => setSettings({ ...settings, direction: e.target.value })}
              className="w-full h-8 px-2 text-sm rounded-md bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-1 focus:ring-green-500/50"
            >
              <option value="LEFT" className="bg-slate-900">{t('Left')}</option>
              <option value="RIGHT" className="bg-slate-900">{t('Right')}</option>
              <option value="UP" className="bg-slate-900">{t('Up')}</option>
              <option value="DOWN" className="bg-slate-900">{t('Down')}</option>
            </select>
          </div>

          {/* Enable Partitioning */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <GitBranch className="h-4 w-4 text-green-500" />
              {t('Enable Partitioning')}
            </Label>
            <Switch 
              checked={settings.enablePartitioning}
              onCheckedChange={(checked) => setSettings({ ...settings, enablePartitioning: checked })}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <SliderSection
            label={t('Partition Spacing')}
            icon={Maximize}
            value={settings.partitionSpacing}
            onChange={(value) => setSettings({ ...settings, partitionSpacing: value })}
            min={20}
            max={200}
            step={10}
            hint={t('Adjust spacing between partitions')}
          />

          {/* Edge Routing */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <GitBranch className="h-4 w-4 text-green-500" />
              {t('Edge Routing')}
            </Label>
            <select
              value={settings.edgeRouting}
              onChange={(e) => setSettings({ ...settings, edgeRouting: e.target.value })}
              className="w-full h-8 px-2 text-sm rounded-md bg-slate-800/50 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-1 focus:ring-green-500/50"
            >
              <option value="ORTHOGONAL" className="bg-slate-900">{t('Orthogonal')}</option>
              <option value="POLYLINE" className="bg-slate-900">{t('Polyline')}</option>
              <option value="SPLINES" className="bg-slate-900">{t('Splines')}</option>
            </select>
          </div>

          <SliderSection
            label={t('Edge Spacing')}
            icon={GitBranch}
            value={settings.edgeSpacing}
            onChange={(value) => setSettings({ ...settings, edgeSpacing: value })}
            min={20}
            max={200}
            step={10}
            hint={t('Adjust spacing between edges')}
          />

          <SliderSection
            label={t('Zoom Level')}
            icon={ZoomIn}
            value={settings.zoomLevel}
            onChange={(value) => setSettings({ ...settings, zoomLevel: value })}
            min={50}
            max={200}
            step={10}
            hint={t('Adjust the zoom level of the layout')}
          />

          <SliderSection
            label={t('Grid Size')}
            icon={Grid}
            value={settings.gridSize}
            onChange={(value) => setSettings({ ...settings, gridSize: value })}
            min={10}
            max={50}
            step={5}
            hint={t('Adjust the size of the background grid')}
          />

          <SliderSection
            label={t('Animation Speed')}
            icon={RotateCw}
            value={settings.animationSpeed}
            onChange={(value) => setSettings({ ...settings, animationSpeed: value })}
            min={0.5}
            max={2}
            step={0.1}
            hint={t('Adjust the speed of layout animations')}
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-700/50">
        <Button 
          variant="outline" 
          onClick={onClose} 
          className="h-8 px-3 text-sm border-slate-700 hover:bg-slate-800"
        >
          {t('Cancel')}
        </Button>
        <Button 
          onClick={handleApply}
          className="h-8 px-3 text-sm bg-green-500 hover:bg-green-600 text-white"
        >
          {t('Apply Settings')}
        </Button>
      </div>
    </div>
  );
} 