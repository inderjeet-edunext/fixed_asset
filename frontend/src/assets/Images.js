// Centralized image exports for better bundle optimization
// Only import images that are actually used to reduce bundle size

// Common images
import Logo from './Images/common/Logo.svg';

// Asset category icons (lazy loaded)
const getAssetIcon = (iconName) => {
  const iconMap = {
    laptop: () => import('./icons/laptop.svg'),
    printer: () => import('./icons/printer.svg'),
    chair: () => import('./icons/chair.svg'),
    building: () => import('./icons/building.svg'),
    vehicle: () => import('./icons/vehicle.svg'),
    server: () => import('./icons/server.svg'),
  };
  
  return iconMap[iconName]?.() || null;
};

// Placeholder image for lazy loading
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="%23888" font-family="Arial, sans-serif" font-size="16"%3ELoading...%3C/text%3E%3C/svg%3E';

const Images = {
  common: {
    Logo,
    placeholder: placeholderImage,
  },
  icons: {
    getAssetIcon,
  },
  // Add other image categories as needed
  avatars: {
    // User avatars would go here
  },
  illustrations: {
    // Illustrations would go here
  },
};

export default Images;