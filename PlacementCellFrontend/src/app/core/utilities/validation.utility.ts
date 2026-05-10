/**
 * Validation Utility Functions
 * Helper functions for data validation
 */

/**
 * ValiDate Email format
 * @param Email - Email Address to valiDate
 * @returns True if Email is valid
 */
export function isValidEmail(Email: string): boolean {
  if (!Email) return false;
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EmailRegex.test(Email);
}

/**
 * ValiDate phone number (Indian format)
 * @param phone - Phone number to valiDate
 * @returns True if phone is valid
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * ValiDate URL format
 * @param url - URL to valiDate
 * @returns True if URL is valid
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * ValiDate password strength
 * @param password - Password to valiDate
 * @returns Object with validity and strength level
 */
export function valiDatePassword(password: string): { isValid: boolean; strength: 'weak' | 'medium' | 'strong' } {
  if (!password) {
    return { isValid: false, strength: 'weak' };
  }

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthScore = [hasMinLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
    .filter(Boolean).length;

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (strengthScore >= 4) strength = 'strong';
  else if (strengthScore >= 3) strength = 'medium';

  return {
    isValid: strengthScore >= 3,
    strength
  };
}

/**
 * ValiDate Indian PAN card number
 * @param pan - PAN card number
 * @returns True if PAN is valid
 */
export function isValidPAN(pan: string): boolean {
  if (!pan) return false;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
}

/**
 * ValiDate Aadhaar number
 * @param aadhaar - Aadhaar number
 * @returns True if Aadhaar is valid
 */
export function isValidAadhaar(aadhaar: string): boolean {
  if (!aadhaar) return false;
  const aadhaarRegex = /^\d{12}$/;
  return aadhaarRegex.test(aadhaar.replace(/\s+/g, ''));
}

/**
 * ValiDate CGPA (0-10 scale)
 * @param cgpa - CGPA value
 * @returns True if CGPA is valid
 */
export function isValidCGPA(cgpa: number): boolean {
  return cgpa >= 0 && cgpa <= 10;
}

/**
 * ValiDate percentage (0-100)
 * @param percentage - Percentage value
 * @returns True if percentage is valid
 */
export function isValidPercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 100;
}

/**
 * Check if string contains only alphabets
 * @param str - String to check
 * @returns True if string contains only alphabets
 */
export function isAlphabetic(str: string): boolean {
  if (!str) return false;
  return /^[A-Za-z\s]+$/.test(str);
}

/**
 * Check if string contains only numbers
 * @param str - String to check
 * @returns True if string contains only numbers
 */
export function isNumeric(str: string): boolean {
  if (!str) return false;
  return /^\d+$/.test(str);
}

/**
 * Check if string is alphanumeric
 * @param str - String to check
 * @returns True if string is alphanumeric
 */
export function isAlphanumeric(str: string): boolean {
  if (!str) return false;
  return /^[A-Za-z0-9]+$/.test(str);
}

/**
 * ValiDate file size
 * @param fileSize - File size in bytes
 * @param maxSizeMB - Maximum allowed size in MB
 * @returns True if file size is within limit
 */
export function isValidFileSize(fileSize: number, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
}

/**
 * ValiDate file extension
 * @param fileName - Name of the file
 * @param allowedExtensions - Array of allowed extensions (e.g., ['.pdf', '.doc'])
 * @returns True if file extension is allowed
 */
export function isValidFileExtension(fileName: string, allowedExtensions: string[]): boolean {
  if (!fileName) return false;
  const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return allowedExtensions.map(ext => ext.toLowerCase()).includes(extension);
}

