import { VALIDATION, MESSAGES } from '@/config/constants';

/**
 * Validation utility functions
 */

export const validateEmail = (email) => {
  if (!email) return MESSAGES.VALIDATION.REQUIRED;
  if (!VALIDATION.EMAIL.test(email)) return MESSAGES.VALIDATION.INVALID_EMAIL;
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null; // Phone is optional
  if (!VALIDATION.PHONE.test(phone)) return MESSAGES.VALIDATION.INVALID_PHONE;
  return null;
};

export const validateAssetTag = (assetTag) => {
  if (!assetTag) return MESSAGES.VALIDATION.REQUIRED;
  if (!VALIDATION.ASSET_TAG.test(assetTag)) return MESSAGES.VALIDATION.INVALID_ASSET_TAG;
  return null;
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return MESSAGES.VALIDATION.REQUIRED;
  }
  return null;
};

export const validateMinLength = (value, minLength) => {
  if (!value) return null;
  if (value.length < minLength) return MESSAGES.VALIDATION.MIN_LENGTH(minLength);
  return null;
};

export const validateMaxLength = (value, maxLength) => {
  if (!value) return null;
  if (value.length > maxLength) return MESSAGES.VALIDATION.MAX_LENGTH(maxLength);
  return null;
};

export const validateCurrency = (value) => {
  if (!value) return null;
  if (!VALIDATION.CURRENCY.test(value)) return MESSAGES.VALIDATION.INVALID_CURRENCY;
  return null;
};

export const validateDate = (value) => {
  if (!value) return null;
  if (!VALIDATION.DATE.test(value)) return MESSAGES.VALIDATION.INVALID_DATE;
  
  const date = new Date(value);
  if (isNaN(date.getTime())) return MESSAGES.VALIDATION.INVALID_DATE;
  
  return null;
};

export const validateFileSize = (file, maxSize) => {
  if (file.size > maxSize) {
    return `File size should not exceed ${formatFileSize(maxSize)}`;
  }
  return null;
};

export const validateFileType = (file, allowedTypes) => {
  if (!allowedTypes.includes(file.type)) {
    return `File type ${file.type} is not allowed`;
  }
  return null;
};

/**
 * Form validation helper
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const fieldValue = values[field];
    
    for (const rule of fieldRules) {
      const error = rule(fieldValue, values);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Asset form validation rules
 */
export const assetValidationRules = {
  assetTag: [validateRequired, validateAssetTag],
  name: [validateRequired, (value) => validateMinLength(value, 2)],
  category: [validateRequired],
  location: [validateRequired],
  purchaseDate: [validateRequired, validateDate],
  cost: [validateRequired, validateCurrency],
};

/**
 * User form validation rules
 */
export const userValidationRules = {
  name: [validateRequired, (value) => validateMinLength(value, 2)],
  email: [validateRequired, validateEmail],
  phone: [validatePhone],
};

/**
 * Helper functions
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push(MESSAGES.VALIDATION.REQUIRED);
    return errors;
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};