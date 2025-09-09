import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for combining and merging Tailwind CSS classes
 * Uses clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}