export interface RegionState {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'offline';
  position: {
    x: number;
    y: number;
  };
  powerOutput: number;
  load: number;
}

export interface EthiopiaMapData {
  regions: RegionState[];
  isGridConnected: boolean;
  onRegionSelect?: (region: RegionState) => void;
  onGridConnectionChange?: () => void;
} 