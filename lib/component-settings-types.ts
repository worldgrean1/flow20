export interface BaseComponentSettings {
  type: string
  visible: boolean
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
  scale: {
    x: number
    y: number
    z: number
  }
}

export function getDefaultSettingsForType(type: string): BaseComponentSettings {
  return {
    type,
    visible: true,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  }
} 