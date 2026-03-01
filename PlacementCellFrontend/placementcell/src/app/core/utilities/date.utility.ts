/**
 * Date Utility Functions
 * Helper functions for Date manipulation and formatting
 */

/**
 * Format Date to 'DD/MM/YYYY' format
 * @param Date - Date object or Date string
 * @returns Formatted Date string
 */
export function formatDate(Date: Date | string): string {
  const d = new Date(Date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format Date to 'DD MMM YYYY' format (e.g., 09 Nov 2025)
 * @param Date - Date object or Date string
 * @returns Formatted Date string
 */
export function formatDateLong(Date: Date | string): string {
  const d = new Date(Date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format Date and time to 'DD/MM/YYYY HH:MM' format
 * @param Date - Date object or Date string
 * @returns Formatted Date-time string
 */
export function formatDateTime(Date: Date | string): string {
  const d = new Date(Date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Get relative time (e.g., '2 hours ago', 'yesterday')
 * @param Date - Date object or Date string
 * @returns Relative time string
 */
export function getRelativeTime(Date: Date | string): string {
  const now = new Date();
  const past = new Date(Date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * Check if a Date is today
 * @param Date - Date object or Date string
 * @returns True if Date is today
 */
export function isToday(Date: Date | string): boolean {
  const d = new Date(Date);
  const today = new Date();
  return d.getDate() === today.getDate() &&
         d.getMonth() === today.getMonth() &&
         d.getFullYear() === today.getFullYear();
}

/**
 * Check if a Date is in the past
 * @param Date - Date object or Date string
 * @returns True if Date is in the past
 */
export function isPast(Date: Date | string): boolean {
  const d = new Date(Date);
  const now = new Date();
  return d < now;
}

/**
 * Add days to a Date
 * @param Date - Date object or Date string
 * @param days - Number of days to add
 * @returns New Date with days added
 */
export function addDays(Date: Date | string, days: number): Date {
  const d = new Date(Date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Get Date range string (e.g., '1 Jan - 31 Jan 2025')
 * @param startDate - Start Date
 * @param endDate - End Date
 * @returns Formatted Date range string
 */
export function getDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];
  const year = end.getFullYear();
  
  if (start.getMonth() === end.getMonth()) {
    return `${startDay} - ${endDay} ${endMonth} ${year}`;
  }
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
}

