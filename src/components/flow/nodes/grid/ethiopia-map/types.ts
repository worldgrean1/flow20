export interface Position {
  x: number;
  y: number;
}

export interface RegionState {
  id: string;
  name: string;
  position: Position;
  status: 'active' | 'warning' | 'offline';
  batteryLevel: number;
  solarOutput: number;
  gridConnection: boolean;
  lastUpdate?: string;
}

export interface EthiopiaMapData {
  isConnected: boolean;
  regions: RegionState[];
  onRegionSelect: (region: RegionState) => void;
  onGridConnectionChange: (connected: boolean) => void;
  onBatteryLevelUpdate?: (regionId: string, level: number) => void;
  onSolarOutputUpdate?: (regionId: string, output: number) => void;
}

export interface MapStyle {
  container: {
    width: number;
    height: number;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
    shadow: string;
  };
  region: {
    active: {
      color: string;
      glow: string;
      size: number;
    };
    warning: {
      color: string;
      glow: string;
      size: number;
    };
    offline: {
      color: string;
      glow: string;
      size: number;
    };
  };
  tooltip: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: number;
  };
} 