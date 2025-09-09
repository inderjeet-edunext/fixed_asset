// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://assetmaster-6.preview.emergentagent.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'AssetsTrack',
  VERSION: '1.0.0',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  },
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
};

// Routes
export const ROUTES = {
  DASHBOARD: '/dashboard',
  ASSET_MANAGEMENT: {
    ROOT: '/asset-management',
    ASSET_MASTER: '/asset-management/asset-master',
    ASSET_TRANSFER: '/asset-management/asset-transfer',
    ASSET_DISPOSAL: '/asset-management/asset-disposal',
    DEPRECIATION_CALCULATION: '/asset-management/depreciation-calculation',
  },
  MAINTENANCE_MANAGEMENT: '/maintenance-management',
  AUDIT_MODULE: '/audit-module',
  USERS: '/users',
  CONFIGURATION: '/configuration',
  REPORTS: '/reports',
};

// Asset Status
export const ASSET_STATUS = {
  ACTIVE: 'Active',
  UNDER_REPAIR: 'Under Repair',
  DISPOSED: 'Disposed',
  LOST: 'Lost',
  AVAILABLE: 'Available',
  UNDER_MAINTENANCE: 'Under Maintenance',
};

// Asset Categories
export const ASSET_CATEGORIES = [
  'Office Equipment',
  'Furniture',
  'IT Equipment',
  'Machinery',
  'Vehicles',
  'Building',
  'Others'
];

// Locations
export const LOCATIONS = [
  'HQ - IT Dept',
  'Office 2',
  'Admin Room',
  'Meeting Room 1',
  'Meeting Room 2',
  'Warehouse',
  'Factory Floor'
];

// Colors
export const COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#64748b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#0ea5e9',
  STATUS: {
    ACTIVE: '#10b981',
    UNDER_REPAIR: '#f59e0b',
    DISPOSED: '#ef4444',
    LOST: '#64748b',
    AVAILABLE: '#3b82f6',
    UNDER_MAINTENANCE: '#8b5cf6',
  }
};

// Validation Patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  ASSET_TAG: /^[A-Z]{1,3}-[A-Z0-9]{3,6}$/,
  CURRENCY: /^\₹?[\d,]+(\.\d{1,2})?$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
};

// Messages
export const MESSAGES = {
  SUCCESS: {
    ASSET_CREATED: 'Asset created successfully',
    ASSET_UPDATED: 'Asset updated successfully',
    ASSET_DELETED: 'Asset deleted successfully',
    DATA_SAVED: 'Data saved successfully',
    LOGIN_SUCCESS: 'Login successful',
  },
  ERROR: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
    VALIDATION_ERROR: 'Please check the form data.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
  },
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_ASSET_TAG: 'Asset tag format should be like "ABC-123"',
    INVALID_CURRENCY: 'Please enter a valid currency amount',
    INVALID_DATE: 'Please enter a valid date',
    MIN_LENGTH: (min) => `Minimum ${min} characters required`,
    MAX_LENGTH: (max) => `Maximum ${max} characters allowed`,
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  SIDEBAR_STATE: 'sidebar_state',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEETS: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  }
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Modal Types
export const MODAL_TYPES = {
  ASSET_FORM: 'assetForm',
  CONFIRMATION: 'confirmation',
  BULK_IMPORT: 'bulkImport',
  QUICK_ACTIONS: 'quickActions',
};

// Asset Form Modes
export const FORM_MODES = {
  CREATE: 'create',
  EDIT: 'edit',
  VIEW: 'view',
};