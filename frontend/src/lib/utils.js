import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = 'INR') {
  if (typeof amount === 'string') {
    // Remove existing currency symbols and commas
    amount = amount.replace(/[₹$€£,]/g, '');
    amount = parseFloat(amount) || 0;
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency === 'INR' ? 'INR' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num) {
  if (typeof num === 'string') {
    num = parseFloat(num) || 0;
  }
  return num.toLocaleString('en-IN');
}

export function formatDate(date, format = 'short') {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  
  return dateObj.toLocaleDateString('en-IN');
}

export function formatTime(date) {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getStatusColor(status) {
  const statusColors = {
    'Active': 'bg-emerald-100 text-emerald-800',
    'Under Repair': 'bg-amber-100 text-amber-800',
    'Disposed': 'bg-red-100 text-red-800',
    'Lost': 'bg-slate-100 text-slate-800',
    'Available': 'bg-blue-100 text-blue-800',
    'Under Maintenance': 'bg-purple-100 text-purple-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export function downloadFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value.toString().trim() !== '';
}

export function validateNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function validateDate(date) {
  return date instanceof Date && !isNaN(date);
}

export function getErrorMessage(error) {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}