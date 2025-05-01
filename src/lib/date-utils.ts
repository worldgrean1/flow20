// Date and time utility functions

/**
 * Format a date to a readable string
 * @param date The date to format
 * @param format The format to use (short, medium, long)
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? '2-digit' : format === 'medium' ? 'short' : 'long',
    day: '2-digit'
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Format a time to a readable string
 * @param date The date to extract time from
 * @param includeSeconds Whether to include seconds
 * @returns Formatted time string
 */
export function formatTime(date: Date, includeSeconds = false): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: true
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Get relative time (e.g., "2 days ago", "in 3 hours")
 * @param date The date to compare
 * @returns Relative time string
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `in ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
  } else if (diffInDays < 0) {
    return `${Math.abs(diffInDays)} day${Math.abs(diffInDays) > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `in ${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInHours < 0) {
    return `${Math.abs(diffInHours)} hour${Math.abs(diffInHours) > 1 ? 's' : ''} ago`;
  } else if (diffInMins > 0) {
    return `in ${diffInMins} minute${diffInMins > 1 ? 's' : ''}`;
  } else if (diffInMins < 0) {
    return `${Math.abs(diffInMins)} minute${Math.abs(diffInMins) > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

/**
 * Parse a date string into a Date object
 * @param dateString The date string to parse
 * @returns Date object or null if invalid
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
} 