export interface NodeData {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    status?: string;
    power?: number;
    voltage?: number;
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
    cloudCover?: number;
    isActive?: boolean;
    devices?: DistributionDevice[];
    alerts?: SystemAlert[];
    [key: string]: any;
  };
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  type: string;
  data: {
    label?: string;
    wattage?: string;
    voltage?: string;
    efficiency?: string;
    energyFlow?: 'input' | 'output' | 'data';
    details?: {
      type: string;
      status: string;
      temperature?: string;
      powerFactor?: string;
      frequency?: string;
      updateInterval?: string;
      format?: string;
      dataPoints?: string[];
    };
  };
}

export interface DistributionDevice {
  id: string;
  name: string;
  powerConsumption: number;
  isActive: boolean;
}

export interface SystemAlert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
  timestamp: Date;
}

export interface WeatherCondition {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export interface Metrics {
  power?: number;
  voltage?: number;
  temperature?: number;
  timestamp?: Date;
  trend?: 'up' | 'down' | 'stable';
}

export interface PowerQualityMetrics {
  voltageSag: number;
  voltageSwell: number;
  frequencyDeviation: number;
  transientResponse: number;
  powerFactor: number;
  harmonicDistortion: number;
  phaseImbalance: number;
}

export interface SafetyMetrics {
  overvoltage: boolean;
  undervoltage: boolean;
  overcurrent: boolean;
  overtemperature: boolean;
  groundFault: boolean;
  arcFault: boolean;
}

export interface PowerFlowResult {
  power: number;
  current: number;
  efficiency: number;
  quality: PowerQualityMetrics;
  safety: SafetyMetrics;
}

export interface MonitoringMetrics {
  timestamp: Date;
  powerQuality: {
    voltage: number;
    frequency: number;
    powerFactor: number;
    harmonicDistortion: number;
  };
  systemHealth: {
    temperature: number;
    humidity: number;
    vibration: number;
    noiseLevel: number;
  };
  performance: {
    efficiency: number;
    outputPower: number;
    inputPower: number;
    losses: number;
  };
  safety: {
    status: 'safe' | 'warning' | 'critical';
    alerts: string[];
    protectionActive: boolean;
  };
}

export interface GridMetrics {
  regions: {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'degraded';
    powerOutput: number;
    load: number;
    voltage: number;
    frequency: number;
  }[];
  overallStatus: {
    totalGeneration: number;
    totalLoad: number;
    reserveMargin: number;
    stability: number;
  };
  weatherImpact: {
    temperatureEffect: number;
    windEffect: number;
    solarEffect: number;
  };
}

export interface ComponentMetrics {
  solarPanel: {
    production: {
      current: number;
      daily: number;
      monthly: number;
      efficiency: number;
    };
    health: {
      temperature: number;
      dustAccumulation: number;
      shadingLevel: number;
      degradation: number;
    };
    position: {
      azimuth: number;
      elevation: number;
      trackingError: number;
    };
  };
  battery: {
    state: {
      chargeLevel: number;
      voltage: number;
      current: number;
      temperature: number;
    };
    health: {
      capacity: number;
      cycles: number;
      internalResistance: number;
      stateOfHealth: number;
    };
    performance: {
      chargeEfficiency: number;
      dischargeEfficiency: number;
      selfDischarge: number;
    };
  };
  inverter: {
    operation: {
      inputVoltage: number;
      outputVoltage: number;
      frequency: number;
      powerFactor: number;
    };
    efficiency: {
      conversion: number;
      standby: number;
      temperature: number;
    };
    protection: {
      overvoltage: boolean;
      undervoltage: boolean;
      overcurrent: boolean;
      overtemperature: boolean;
    };
  };
}

export interface WeatherImpact {
  solar: {
    irradiance: number;
    cloudCover: number;
    airMass: number;
    soiling: number;
  };
  temperature: {
    ambient: number;
    module: number;
    effectOnEfficiency: number;
  };
  wind: {
    speed: number;
    direction: number;
    coolingEffect: number;
    structuralLoad: number;
  };
  precipitation: {
    type: 'none' | 'rain' | 'snow' | 'hail';
    intensity: number;
    effectOnProduction: number;
    cleaningEffect: number;
  };
}

export interface AlertSystem {
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'safety' | 'maintenance' | 'weather' | 'grid';
  component: string;
  timestamp: Date;
  message: string;
  details: {
    currentValue: number;
    threshold: number;
    unit: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    duration: number;
  };
  actions: {
    automatic: string[];
    recommended: string[];
    required: string[];
  };
  status: 'active' | 'acknowledged' | 'resolved';
} 