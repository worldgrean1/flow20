import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * This allows for conditional classes and proper handling of Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TranslationFunction = (key: string) => string;

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Format a date using Intl.DateTimeFormat
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(dateObj)
}

/**
 * Truncate a string to a specified length and add ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Debounce a function to limit how often it can be called
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Calculate battery health based on cycles and age
 */
export function calculateBatteryHealth(cycles: number, age: number): number {
  const maxCycles = 3000;
  const maxAge = 10; // years
  const cycleHealth = Math.max(0, 100 - (cycles / maxCycles) * 100);
  const ageHealth = Math.max(0, 100 - (age / maxAge) * 100);
  return Math.round((cycleHealth + ageHealth) / 2);
}

/**
 * Calculate charge controller efficiency
 */
export function calculateControllerEfficiency(input: number, output: number): number {
  if (input === 0) return 0;
  return Math.min(100, Math.round((output / input) * 100));
}

/**
 * Get temperature status based on temperature value
 */
export function getTemperatureStatus(temp: number): 'normal' | 'warning' | 'critical' {
  if (temp < 40) return 'normal';
  if (temp < 50) return 'warning';
  return 'critical';
} 