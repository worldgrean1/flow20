// Mathematical utility functions for solar system simulation

/**
 * Convert degrees to radians
 * @param degrees Angle in degrees
 * @returns Angle in radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 * @param radians Angle in radians
 * @returns Angle in degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculate orbital position based on angle
 * @param centerX Center X coordinate
 * @param centerY Center Y coordinate
 * @param radius Orbital radius
 * @param angleInDegrees Current angle in degrees
 * @returns Coordinates {x, y}
 */
export function calculateOrbitalPosition(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = degreesToRadians(angleInDegrees);
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

/**
 * Calculate distance between two points
 * @param x1 First point X coordinate
 * @param y1 First point Y coordinate
 * @param x2 Second point X coordinate
 * @param y2 Second point Y coordinate
 * @returns Distance between points
 */
export function calculateDistance(
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Calculate gravitational force between two objects
 * @param mass1 Mass of first object
 * @param mass2 Mass of second object
 * @param distance Distance between objects
 * @param G Gravitational constant (optional)
 * @returns Gravitational force
 */
export function calculateGravitationalForce(
  mass1: number,
  mass2: number,
  distance: number,
  G: number = 6.67430e-11
): number {
  return G * (mass1 * mass2) / Math.pow(distance, 2);
}

/**
 * Linear interpolation between two values
 * @param start Start value
 * @param end End value
 * @param t Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

/**
 * Clamp a value between a minimum and maximum
 * @param value Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
} 