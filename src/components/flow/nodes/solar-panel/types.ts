import { NodeProps } from "reactflow"

export interface ProductionDataPoint {
  time: string
  power: number
}

export interface PanelConfiguration {
  totalPanels: number
  strings: number
  panelsPerString: number
  orientation: string
  tiltAngle: number
}

export interface SolarPanelData {
  sunIntensity: number
  solarActive: boolean
  solarProduction: number
  onSunIntensityChange: (value: number) => void
  onSolarActiveChange: (value: boolean) => void
  t: (key: string) => string
  panelTemperature: number
  panelEfficiency: number
  dcVoltage: number
  dcCurrent: number
  powerFactor: number
  dailyEnergyYield: number
  peakPowerTime: string
  cellHealthStatus: number
  connectionQuality: number
  hotspotDetection: boolean
  degradationRate: number
  isDegraded: boolean
  isMaintenanceRequired: boolean
  isFaultCondition: boolean
  hasReverseCurrentProtection: boolean
  hasOvervoltageProtection: boolean
  hasGroundFaultProtection: boolean
  hasSurgeProtection: boolean
  hasStringFuseProtection: boolean
  temperatureCoefficient: number
  warrantyStatus: string
  warrantyExpiryDate: string
  lastCleaningDate: string
  cleaningRequired: boolean
  dustAccumulation: number
  shadingLevel: number
  productionCurve: ProductionDataPoint[]
  panelConfiguration: PanelConfiguration
  windSpeed?: number
}

export interface SolarPanelNodeProps extends NodeProps<SolarPanelData> {}