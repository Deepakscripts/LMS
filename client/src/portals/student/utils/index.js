/**
 * Student Portal Utility Functions
 * Centralized utility functions to avoid recreation on each render
 */

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Round a number to two decimal places
 * @param {number} num - Number to round
 * @returns {number} Rounded number
 */
export const roundToTwoDecimalPlaces = num => {
  return Math.round(num * 100) / 100;
};

// ============================================
// DATE/TIME UTILITIES
// ============================================

/**
 * Format a timestamp to relative time string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted time string
 */
export const formatRelativeTime = timestamp => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

/**
 * Format due date from days remaining
 * @param {number} dueInDays - Days until due
 * @returns {string} Formatted due date string
 */
export const formatDueDate = dueInDays => {
  if (dueInDays === 0) return 'Due Today';
  if (dueInDays === 1) return 'Due Tomorrow';
  return `Due in ${dueInDays} Days`;
};

/**
 * Format last accessed time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time string
 */
export const formatLastAccessed = dateString => {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate a URL string
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = url => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate a GitHub URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is a valid GitHub URL
 */
export const isValidGithubUrl = url => {
  if (!url) return false;
  try {
    new URL(url);
    return url.includes('github.com');
  } catch {
    return false;
  }
};

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = name => {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// ============================================
// CONSTANTS
// ============================================

// Mobile breakpoint in pixels
export const MOBILE_BREAKPOINT = 768;

// Cache durations in milliseconds
export const CACHE_DURATION = {
  SHORT: 2 * 60 * 1000, // 2 minutes
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 10 * 60 * 1000, // 10 minutes
};

// File size limits
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
};

// Color variants for course cards
export const COURSE_COLOR_VARIANTS = [
  { bg: 'bg-linear-to-br from-blue-900 to-slate-900', icon: 'text-blue-400' },
  { bg: 'bg-linear-to-br from-purple-900 to-slate-900', icon: 'text-purple-400' },
  { bg: 'bg-linear-to-br from-green-900 to-slate-900', icon: 'text-green-400' },
  { bg: 'bg-linear-to-br from-orange-900 to-slate-900', icon: 'text-orange-400' },
  { bg: 'bg-linear-to-br from-pink-900 to-slate-900', icon: 'text-pink-400' },
  { bg: 'bg-linear-to-br from-cyan-900 to-slate-900', icon: 'text-cyan-400' },
];

// Re-export downloadModuleCertificate
export { downloadModuleCertificate } from './downloadModuleCertificate';
