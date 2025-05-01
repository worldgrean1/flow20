import { Node, Edge } from 'reactflow';
import { Zap, Power } from 'lucide-react';
import React from 'react';

export const initialNodes: Node[] = [
  {
    id: 'generator-1',
    type: 'backupGenerator',
    position: { x: 100, y: 50 },
    draggable: true,
    data: {
      generatorOn: false,
      fuelLevel: 75,
      onGeneratorChange: (_value: boolean) => {},
      t: (key: string) => key, // Will be updated in App.tsx
    },
  },
  {
    id: 'battery-1',
    type: 'battery',
    position: { x: 400, y: 50 },
    draggable: true,
    data: {
      batteryLevel: 75,
      status: 'charging',
      voltage: 24,
      capacity: 200,
      battery1Level: 75,
      battery2Level: 73,
      connectionType: 'parallel',
      health: 95,
      temperature: 25,
      systemVoltage: 24,
      energyFlow: 'charging',
      t: (key: string) => key,
    },
  },
  {
    id: 'controller-1',
    type: 'chargeController',
    position: { x: 250, y: 200 },
    draggable: true,
    data: {
      solarProduction: 150,
      output: Math.round(150 * 0.95),
      backupMode: false,
      t: (key: string) => key,
    },
  },
  {
    id: 'solar-1',
    type: 'solarPanel',
    position: { x: 100, y: 350 },
    draggable: true,
    data: {
      sunIntensity: 80,
      solarActive: true,
      solarProduction: 180,
      weatherCondition: 'sunny',
      efficiency: 100,
      onSunIntensityChange: (_value: number) => {},
      onSolarActiveChange: (_value: boolean) => {},
      t: (key: string) => key,
    },
  },
  {
    id: 'weather-1',
    type: 'weatherControls',
    position: { x: 100, y: 100 },
    draggable: true,
    data: {
      weatherCondition: 'sunny' as const,
      efficiency: 100,
      onWeatherChange: (condition: 'sunny' | 'cloudy' | 'rainy') => {
        // This will be replaced with the actual callback in App.tsx
        console.log('Weather condition changed:', condition);
      },
      onEfficiencyChange: (efficiency: number) => {
        // This will be replaced with the actual callback in App.tsx
        console.log('Efficiency changed:', efficiency);
      },
      t: (key: string) => key,
    },
  },
  {
    id: 'monitor-1',
    type: 'systemMonitor',
    position: { x: 800, y: 50 },
    draggable: true,
    data: {
      batteryLevel: 75,
      solarProduction: 180,
      powerConsumption: 150,
      systemEfficiency: 92,
      t: (key: string) => key,
    },
  },
  {
    id: 'distribution-1',
    type: 'distributionPanel',
    position: { x: 100, y: 100 },
    draggable: true,
    data: {
      devices: [
        {
          id: 'device-1',
          name: 'Life-Critical Systems',
          icon: React.createElement(Zap, { className: "h-4 w-4" }),
          on: true,
          powerConsumption: 100,
          connected: true
        },
        {
          id: 'device-2',
          name: 'Emergency Backup',
          icon: React.createElement(Power, { className: "h-4 w-4" }),
          on: false,
          powerConsumption: 50,
          connected: true
        }
      ],
      totalConsumption: 150,
      inverterOn: true,
      onToggleDevice: (_id: string) => {},
      gridConnected: true,
      onToggleGridConnection: (_value: boolean) => {},
      label: 'Critical Power Distribution Hub',
      isActive: true,
      t: (key: string) => key,
      batteryLevel: 75,
      panelName: "Main Distribution Panel",
      voltage: 240,
      frequency: 60,
      maxCurrent: 200,
      breakers: [
        { id: "b1", name: "Main", rating: 200, status: "on" },
        { id: "b2", name: "Kitchen", rating: 30, status: "on" },
        { id: "b3", name: "Living Room", rating: 20, status: "on" },
        { id: "b4", name: "Bedroom", rating: 15, status: "on" },
      ],
    },
  },
  {
    id: 'sensor-1',
    type: 'environmentalSensor',
    position: { x: 1000, y: 50 },
    draggable: true,
    data: {
      temperature: 25,
      humidity: 45,
      sunIntensity: 80,
      windSpeed: 12,
      cloudCover: 20,
      onWeatherChange: (_weather: any) => {},
      t: (key: string) => key,
    },
  },
  {
    id: 'inverter-1',
    type: 'inverter',
    position: { x: 1000, y: 300 },
    draggable: true,
    data: {
      inverterOn: true,
      systemVoltage: 24,
      onInverterChange: (_value: boolean) => {},
      t: (key: string) => key,
    },
  },
  {
    id: 'io-controller-1',
    type: 'ioController',
    position: { x: 1200, y: 50 },
    draggable: true,
    data: {
      systemMode: "auto" as const,
      remoteAccess: true,
      autoShutdown: true,
      dataLogging: true,
      onSystemModeChange: (_mode: "auto" | "manual" | "eco" | "boost") => {},
      onRemoteAccessChange: (_enabled: boolean) => {},
      onAutoShutdownChange: (_enabled: boolean) => {},
      onDataLoggingChange: (_enabled: boolean) => {},
      t: (key: string) => key,
    },
  },
  {
    id: 'status-1',
    type: 'systemStatus',
    position: { x: 1200, y: 300 },
    draggable: true,
    data: {
      systemHealth: 95,
      components: [
        { name: 'Solar Panel', status: 'operational', health: 98 },
        { name: 'Battery', status: 'operational', health: 95 },
        { name: 'Inverter', status: 'operational', health: 97 },
        { name: 'Controller', status: 'operational', health: 96 }
      ],
      alerts: [],
      onAlertDismiss: (_alertId: string) => {},
      t: (key: string) => key,
    },
  },
  {
    id: 'ethiopia-map-1',
    type: 'ethiopiaMap',
    position: { x: 600, y: 50 },
    draggable: true,
    data: {
      regions: [
        {
          id: 'addis',
          name: 'Addis Ababa',
          position: { x: 45, y: 55 },
          status: 'active',
          batteryLevel: 85,
          solarOutput: 120,
          weatherCondition: 'sunny'
        },
        {
          id: 'tigray',
          name: 'Tigray',
          position: { x: 35, y: 20 },
          status: 'warning',
          batteryLevel: 45,
          solarOutput: 70,
          weatherCondition: 'sunny'
        },
        {
          id: 'amhara',
          name: 'Amhara',
          position: { x: 55, y: 35 },
          status: 'active',
          batteryLevel: 75,
          solarOutput: 100,
          weatherCondition: 'sunny'
        },
        {
          id: 'oromia',
          name: 'Oromia',
          position: { x: 65, y: 65 },
          status: 'offline',
          batteryLevel: 20,
          solarOutput: 10,
          weatherCondition: 'sunny'
        }
      ],
      selectedRegion: null,
      showRegionalData: false,
      onRegionSelect: (_regionId: string) => {},
      onToggleRegionalData: () => {},
      isConnected: true,
      t: (key: string) => key,
    },
  },
  {
    id: 'transformer-1',
    type: 'threePhaseTransformer',
    position: { x: 400, y: 100 },
    draggable: true,
    data: {
      transformerOn: true,
      gridConnected: true,
      loadPercentage: 75,
      voltageRatio: "240/120",
      loadType: "balanced",
      onTransformerToggle: (value: boolean) => console.log("Transformer toggled:", value),
      onLoadChange: (value: number) => console.log("Load changed:", value),
      onGridToggle: (value: boolean) => console.log("Grid toggled:", value),
      t: (key: string) => key,
    },
  },
  // Light Switch Node
  {
    id: 'light-switch-1',
    type: 'lightSwitch',
    position: { x: 1400, y: 50 },
    draggable: true,
    data: {
      switchOn: false,
      brightness: 70,
      powerSaving: false,
      motionActivated: false,
      motionDetected: false,
      numberOfLights: 4,
      wattagePerLight: 18,
      isEssential: true,
      systemMode: 'normal',
      deviceName: 'Emergency Illumination System',
      description: 'Disaster-ready LED array with backup power priority',
      onSwitchToggle: (_value: boolean) => {},
      onBrightnessChange: (_value: number) => {},
      onPowerSavingChange: (_value: boolean) => {},
      onMotionActivatedChange: (_value: boolean) => {},
      onPowerConsumptionChange: (_value: number) => {},
      t: (key: string) => key,
    },
  },
  // Wall Outlet Node
  {
    id: 'wall-outlet-1',
    type: 'wallOutlet',
    position: { x: 1400, y: 450 },
    draggable: true,
    data: {
      outletActive: true,
      priority: 'critical',
      currentDraw: 120,
      connectedDevice: 'Critical Medical Equipment',
      outletType: 'E', // Set initial outlet type to Type E
      systemMode: 'normal',
      deviceName: 'Medical-Grade Power Interface',
      description: 'Isolated circuit with surge protection and battery failover for life-critical equipment',
      onOutletActiveChange: (_value: boolean) => {},
      onPriorityChange: (_value: 'critical' | 'standard' | 'nonessential') => {},
      onOutletTypeChange: (_value: 'C' | 'E' | 'F' | 'D' | 'J' | 'L') => {},
      onPowerConsumptionChange: (_value: number) => {},
      t: (key: string) => key,
    },
  },
  // Only one Philips Standard Light Bulb Node should exist
  {
    id: 'bulb-1',
    type: 'philipsLightBulb',
    position: { x: 1375, y: 320 },
    draggable: true,
    data: {
      bulbOn: false,
      onBulbToggle: (_value: boolean) => {},
      t: (key: string) => key,
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'solar-to-controller',
    source: 'solar-1',
    target: 'controller-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 12 },
    data: { 
      energyFlow: 'input', 
      active: true, 
      wattage: '180W',
      voltage: '48V',
      efficiency: '98%',
      label: 'Solar Power',
      labelStyle: { fill: '#f59e0b' },
      tooltip: 'Solar panel output to charge controller',
      cableType: 'solarMain',
      details: {
        type: 'DC Power',
        maxCapacity: '200W',
        currentEfficiency: '98%',
        temperature: '45°C',
        status: 'optimal'
      },
      onHover: () => {
        // Add glow effect on hover
        return { stroke: '#f59e0b', strokeWidth: 16, filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' };
      }
    },
  },
  {
    id: 'controller-to-battery',
    source: 'controller-1',
    target: 'battery-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#22c55e', strokeWidth: 2 },
    data: { 
      energyFlow: 'output', 
      active: true, 
      wattage: '171W',
      voltage: '24V',
      efficiency: '95%',
      label: 'Charging',
      labelStyle: { fill: '#22c55e' },
      tooltip: 'Charge controller to battery storage',
      details: {
        type: 'DC Power',
        chargingRate: '171W',
        batteryVoltage: '24V',
        temperature: '35°C',
        status: 'charging'
      },
      onHover: () => {
        return { stroke: '#22c55e', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))' };
      }
    },
  },
  {
    id: 'battery-to-inverter',
    source: 'battery-1',
    target: 'inverter-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    data: { 
      energyFlow: 'input', 
      active: true, 
      wattage: '200W',
      voltage: '24V',
      efficiency: '99%',
      label: 'DC Power',
      labelStyle: { fill: '#3b82f6' },
      tooltip: 'Battery DC output to inverter',
      cableType: "dcTransmission",
      details: {
        type: 'DC Power',
        batteryLevel: '85%',
        dischargeRate: '200W',
        temperature: '30°C',
        status: 'discharging'
      },
      onHover: () => {
        return { stroke: '#3b82f6', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' };
      }
    },
  },
  {
    id: 'inverter-to-distribution',
    source: 'inverter-1',
    target: 'distribution-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
    data: { 
      energyFlow: 'output', 
      active: true, 
      wattage: '190W',
      voltage: '230V',
      efficiency: '95%',
      label: 'AC Power',
      labelStyle: { fill: '#ef4444' },
      tooltip: 'Inverter AC output to distribution panel',
      details: {
        type: 'AC Power',
        frequency: '50Hz',
        powerFactor: '0.98',
        temperature: '40°C',
        status: 'operational'
      },
      onHover: () => {
        return { stroke: '#ef4444', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' };
      }
    },
  },
  {
    id: 'sensor-to-monitor',
    source: 'sensor-1',
    target: 'monitor-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5,5' },
    data: { 
      energyFlow: 'data', 
      active: true, 
      wattage: '0W',
      label: 'Sensor Data',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Environmental sensor data to system monitor',
      details: {
        type: 'Data Stream',
        updateInterval: '1s',
        dataPoints: ['temperature', 'humidity', 'light', 'wind'],
        format: 'JSON',
        status: 'streaming'
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      }
    },
  },
  {
    id: 'distribution-to-outlet',
    source: 'distribution-1',
    target: 'wall-outlet-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    sourceHandle: 'out-1',
    data: { 
      energyFlow: 'output', 
      active: true, 
      wattage: '100W',
      voltage: '120V',
      label: 'Medical-Grade Power Line',
      labelStyle: { fill: '#3b82f6' },
      tooltip: 'Isolated surge-protected circuit for life-sustaining equipment',
      cableType: "acTransmission",
      phases: 1,
      details: {
        type: 'AC Power',
        circuit: 'Life Support',
        priority: 'Critical',
        status: 'active'
      },
      onHover: () => {
        return { stroke: '#3b82f6', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' };
      }
    },
  },
  {
    id: 'distribution-to-light',
    source: 'distribution-1',
    target: 'light-switch-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    sourceHandle: 'out-2',
    data: { 
      energyFlow: 'output', 
      active: true, 
      wattage: '72W',
      voltage: '120V',
      label: 'Lighting Circuit',
      labelStyle: { fill: '#3b82f6' },
      tooltip: 'Power to emergency lighting system',
      cableType: "acTransmission",
      phases: 1,
      details: {
        type: 'AC Power',
        circuit: 'Lighting',
        priority: 'Essential',
        status: 'active'
      },
      onHover: () => {
        return { stroke: '#3b82f6', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' };
      }
    },
  },
  {
    id: 'distribution-to-bulb',
    source: 'distribution-1',
    target: 'bulb-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#fde047', strokeWidth: 2 },
    sourceHandle: 'out-3',
    data: { 
      energyFlow: 'output', 
      active: true, 
      wattage: '40W',
      voltage: '120V',
      label: 'Lighting Circuit',
      labelStyle: { fill: '#fde047' },
      tooltip: 'Power to Philips 40W standard bulb',
      cableType: 'acTransmission',
      phases: 1,
      details: {
        type: 'AC Power',
        circuit: 'Lighting',
        priority: 'Standard',
        status: 'active',
      },
      onHover: () => {
        return { stroke: '#fde047', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.5))' };
      },
    },
  },
  {
    id: 'generator-to-controller',
    source: 'generator-1',
    target: 'controller-1',
    type: 'energyEdge',
    animated: false, // Not active initially
    style: { stroke: '#f97316', strokeWidth: 12 },
    data: { 
      energyFlow: 'input', 
      active: false, // Generator starts off
      wattage: '0W',
      voltage: '48V',
      efficiency: '90%',
      label: 'Backup Power',
      labelStyle: { fill: '#f97316' },
      tooltip: 'Backup generator power to charge controller',
      cableType: 'highVoltage', // Use highVoltage for backup generator
      details: {
        type: 'DC Power',
        fuelType: 'Diesel',
        maxOutput: '5000W',
        status: 'standby'
      },
      onHover: () => {
        return { stroke: '#f97316', strokeWidth: 16, filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))' };
      }
    },
  },
  {
    id: 'transformer-to-distribution',
    source: 'transformer-1',
    target: 'distribution-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 3 },
    data: { 
      energyFlow: 'output', 
      active: true, 
      wattage: '10kW',
      voltage: '400V/230V',
      efficiency: '98%',
      label: 'Grid Connection',
      labelStyle: { fill: '#ef4444' },
      tooltip: 'Three-phase power from transformer to distribution panel',
      cableType: "acTransmission",
      phases: 3,
      isTransformerConnection: true,
      details: {
        type: 'AC Power',
        frequency: '50Hz',
        powerFactor: '0.95',
        temperature: '60°C',
        status: 'operational'
      },
      onHover: () => {
        return { stroke: '#ef4444', strokeWidth: 4, filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' };
      }
    },
  },
  {
    id: 'weather-to-solar',
    source: 'weather-1',
    target: 'solar-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: { 
      energyFlow: 'data', 
      active: true, 
      wattage: '0W',
      label: 'Weather Control',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Weather node controls solar panel status and efficiency',
      cableType: "data",
      details: {
        type: 'Data Stream',
        updateInterval: '5s',
        dataPoints: ['condition', 'efficiency', 'solarActive'],
        format: 'JSON',
        status: 'streaming'
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      }
    },
  },
  {
    id: 'weather-to-sensor',
    source: 'weather-1',
    target: 'sensor-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: { 
      energyFlow: 'data', 
      active: true, 
      wattage: '0W',
      label: 'Weather Data',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Weather data to environmental sensor',
      cableType: "data",
      details: {
        type: 'Data Stream',
        updateInterval: '5s',
        dataPoints: ['temperature', 'humidity', 'windSpeed', 'cloudCover'],
        format: 'JSON',
        status: 'streaming'
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      }
    },
  },
  {
    id: 'monitor-to-io',
    source: 'monitor-1',
    target: 'io-controller-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: { 
      energyFlow: 'data', 
      active: true, 
      wattage: '0W',
      label: 'System Telemetry',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'System monitor data to IO controller',
      cableType: "data",
      details: {
        type: 'Data Stream',
        updateInterval: '1s',
        dataPoints: ['power', 'battery', 'solar', 'load'],
        format: 'JSON',
        status: 'streaming'
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      }
    },
  },
  {
    id: 'io-to-status',
    source: 'io-controller-1',
    target: 'status-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: { 
      energyFlow: 'data', 
      active: true,
      wattage: '0W',
      label: 'Control Commands',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'System management commands from IO controller',
      cableType: "data",
      details: {
        type: 'Data Stream',
        updateInterval: '0.5s',
        dataPoints: ['commands', 'status', 'alerts'],
        format: 'JSON',
        status: 'streaming'
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      }
    },
  },
  {
    id: 'ethiopia-to-io',
    source: 'ethiopia-map-1',
    target: 'io-controller-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: { 
      energyFlow: 'data', 
      active: true,
      wattage: '0W',
      label: 'Geographic Data',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Regional system status and monitoring data',
      cableType: "data",
      details: {
        type: 'Data Stream',
        updateInterval: '5s',
        dataPoints: ['regions', 'status', 'energy'],
        format: 'JSON',
        status: 'streaming'
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      }
    },
  },
  {
    id: 'weather-to-battery',
    source: 'weather-1',
    target: 'battery-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: {
      energyFlow: 'data',
      active: true,
      wattage: '0W',
      label: 'Weather Data',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Weather data affecting battery performance',
      cableType: 'data',
      details: {
        type: 'Data Stream',
        updateInterval: '5s',
        dataPoints: ['temperature', 'humidity'],
        format: 'JSON',
        status: 'streaming',
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      },
    },
  },
  {
    id: 'weather-to-controller',
    source: 'weather-1',
    target: 'controller-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: {
      energyFlow: 'data',
      active: true,
      wattage: '0W',
      label: 'Weather Data',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Weather data affecting charge controller',
      cableType: 'data',
      details: {
        type: 'Data Stream',
        updateInterval: '5s',
        dataPoints: ['temperature', 'solarIrradiance'],
        format: 'JSON',
        status: 'streaming',
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      },
    },
  },
  {
    id: 'weather-to-monitor',
    source: 'weather-1',
    target: 'monitor-1',
    type: 'energyEdge',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,5' },
    data: {
      energyFlow: 'data',
      active: true,
      wattage: '0W',
      label: 'Weather Data',
      labelStyle: { fill: '#8b5cf6' },
      tooltip: 'Weather data to system monitor',
      cableType: 'data',
      details: {
        type: 'Data Stream',
        updateInterval: '5s',
        dataPoints: ['weatherCondition', 'efficiency'],
        format: 'JSON',
        status: 'streaming',
      },
      onHover: () => {
        return { stroke: '#8b5cf6', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' };
      },
    },
  },
];

// Add ELK layout configuration
export const layoutConfig = {
  name: "elk",
  elk: {
    algorithm: "layered",
    "elk.direction": "RIGHT",
    "elk.layered.spacing.nodeNodeBetweenLayers": 200,
    "elk.layered.spacing.baseValue": 100,
    "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
    "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
    "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
    "elk.layered.layering.layerId": "0",
    "elk.layered.layering.layerConstraint": "FIRST_SEPARATE"
  },
};

// Add type annotations for callback functions
export interface TransformerCallbacks {
  onTransformerToggle: (value: boolean) => void;
  onLoadChange: (value: number) => void;
  onGridToggle: (value: boolean) => void;
}

export interface OutletCallbacks {
  onOutletActiveChange: (value: boolean) => void;
  onPriorityChange: (value: string) => void;
  onCurrentDrawChange: (value: number) => void;
}

export interface LightSwitchCallbacks {
  onSwitchToggle: (value: boolean) => void;
  onBrightnessChange: (value: number) => void;
  onPowerSavingToggle: (value: boolean) => void;
}

export interface BulbCallbacks {
  onBulbToggle: (value: boolean) => void;
} 