import { z } from 'zod';

// Common validation patterns
export const phoneNumberRegex = /^[0-9]{11}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const nameRegex = /^[a-zA-Z\s]+$/;

// Reusable field schemas
export const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const phoneField = z
  .string()
  .min(1, 'Phone number is required')
  .regex(phoneNumberRegex, 'Phone number must be exactly 11 digits')
  .refine((val) => val.startsWith('0'), {
    message: 'Phone number must start with 0',
  });

export const nameField = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .regex(nameRegex, 'Name can only contain letters and spaces');

export const passwordField = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters');

export const strongPasswordField = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  );

// Utility validation functions
export const validateFileSize = (file: File, maxSizeInMB: number) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]) => {
  return allowedTypes.includes(file.type);
};

export const validateImageFile = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5; // 5MB
  
  if (!validateFileType(file, allowedTypes)) {
    throw new Error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
  }
  
  if (!validateFileSize(file, maxSize)) {
    throw new Error('Image file size must be less than 5MB');
  }
  
  return true;
};

// Date validation helpers
export const isValidFutureDate = (date: Date) => {
  return date > new Date();
};

export const isValidBusinessHours = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  const startTime = 9 * 60; // 9:00 AM
  const endTime = 20 * 60; // 8:00 PM
  
  return timeInMinutes >= startTime && timeInMinutes <= endTime;
};

export const isValidWeekday = (date: Date) => {
  const day = date.getDay();
  return day >= 1 && day <= 6; // Monday to Saturday
};

// Custom error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_WEAK: 'Password must contain uppercase, lowercase, and numbers',
  PASSWORDS_DONT_MATCH: "Passwords don't match",
  INVALID_DATE: 'Please select a valid date',
  FUTURE_DATE_REQUIRED: 'Date must be in the future',
  BUSINESS_HOURS_ONLY: 'Please select a time between 9:00 AM and 8:00 PM',
  WEEKDAYS_ONLY: 'Pickup is only available Monday to Saturday',
  FILE_TOO_LARGE: 'File size is too large',
  INVALID_FILE_TYPE: 'Invalid file type',
  NETWORK_ERROR: 'Network error. Please check your connection and try again',
  GENERIC_ERROR: 'Something went wrong. Please try again',
} as const;