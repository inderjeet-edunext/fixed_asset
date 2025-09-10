import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'https://assetmaster-6.preview.emergentagent.com';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Asset API endpoints
export const assetAPI = {
  // Get all assets with pagination and filters
  getAssets: (params = {}) => {
    return apiClient.get('/assets', { params });
  },
  
  // Get single asset by ID
  getAsset: (id) => {
    return apiClient.get(`/assets/${id}`);
  },
  
  // Create new asset
  createAsset: (data) => {
    return apiClient.post('/assets', data);
  },
  
  // Update asset
  updateAsset: (id, data) => {
    return apiClient.put(`/assets/${id}`, data);
  },
  
  // Delete asset
  deleteAsset: (id) => {
    return apiClient.delete(`/assets/${id}`);
  },
  
  // Bulk operations
  bulkImportAssets: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/assets/bulk-import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  bulkExportAssets: (params = {}) => {
    return apiClient.get('/assets/export', { 
      params,
      responseType: 'blob',
    });
  },
  
  // Asset transfer
  transferAsset: (id, data) => {
    return apiClient.post(`/assets/${id}/transfer`, data);
  },
  
  // Asset disposal
  disposeAsset: (id, data) => {
    return apiClient.post(`/assets/${id}/dispose`, data);
  },
  
  // Asset history
  getAssetHistory: (id) => {
    return apiClient.get(`/assets/${id}/history`);
  },
  
  // Upload asset image
  uploadAssetImage: (id, file) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post(`/assets/${id}/upload-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Dashboard API endpoints
export const dashboardAPI = {
  // Get dashboard summary data
  getDashboardData: () => {
    return apiClient.get('/dashboard');
  },
  
  // Get asset statistics
  getAssetStatistics: (params = {}) => {
    return apiClient.get('/dashboard/statistics', { params });
  },
  
  // Get recent activities
  getRecentActivities: (limit = 10) => {
    return apiClient.get('/dashboard/activities', { params: { limit } });
  },
  
  // Get important alerts
  getImportantAlerts: () => {
    return apiClient.get('/dashboard/alerts');
  },
  
  // Get compliance data
  getComplianceData: () => {
    return apiClient.get('/dashboard/compliance');
  },
  
  // Get asset value trends
  getAssetValueTrends: (period = '12months') => {
    return apiClient.get('/dashboard/trends', { params: { period } });
  },
};

// Categories API endpoints
export const categoryAPI = {
  getCategories: () => {
    return apiClient.get('/categories');
  },
  
  createCategory: (data) => {
    return apiClient.post('/categories', data);
  },
  
  updateCategory: (id, data) => {
    return apiClient.put(`/categories/${id}`, data);
  },
  
  deleteCategory: (id) => {
    return apiClient.delete(`/categories/${id}`);
  },
};

// Locations API endpoints
export const locationAPI = {
  getLocations: () => {
    return apiClient.get('/locations');
  },
  
  createLocation: (data) => {
    return apiClient.post('/locations', data);
  },
  
  updateLocation: (id, data) => {
    return apiClient.put(`/locations/${id}`, data);
  },
  
  deleteLocation: (id) => {
    return apiClient.delete(`/locations/${id}`);
  },
};

// Users API endpoints
export const userAPI = {
  getUsers: (params = {}) => {
    return apiClient.get('/users', { params });
  },
  
  getUser: (id) => {
    return apiClient.get(`/users/${id}`);
  },
  
  createUser: (data) => {
    return apiClient.post('/users', data);
  },
  
  updateUser: (id, data) => {
    return apiClient.put(`/users/${id}`, data);
  },
  
  deleteUser: (id) => {
    return apiClient.delete(`/users/${id}`);
  },
};

// Maintenance API endpoints
export const maintenanceAPI = {
  getMaintenanceTickets: (params = {}) => {
    return apiClient.get('/maintenance', { params });
  },
  
  createMaintenanceTicket: (data) => {
    return apiClient.post('/maintenance', data);
  },
  
  updateMaintenanceTicket: (id, data) => {
    return apiClient.put(`/maintenance/${id}`, data);
  },
  
  resolveMaintenanceTicket: (id, data) => {
    return apiClient.post(`/maintenance/${id}/resolve`, data);
  },
};

// Reports API endpoints
export const reportsAPI = {
  generateReport: (type, params = {}) => {
    return apiClient.post('/reports/generate', { type, ...params });
  },
  
  getReportTypes: () => {
    return apiClient.get('/reports/types');
  },
  
  downloadReport: (reportId) => {
    return apiClient.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    });
  },
};

// Depreciation API endpoints
export const depreciationAPI = {
  calculateDepreciation: (assetId, params = {}) => {
    return apiClient.post(`/depreciation/${assetId}/calculate`, params);
  },
  
  runDepreciationPeriod: (period) => {
    return apiClient.post('/depreciation/run-period', { period });
  },
  
  getDepreciationHistory: (assetId) => {
    return apiClient.get(`/depreciation/${assetId}/history`);
  },
};

// Authentication API endpoints
export const authAPI = {
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },
  
  logout: () => {
    return apiClient.post('/auth/logout');
  },
  
  refreshToken: () => {
    return apiClient.post('/auth/refresh');
  },
  
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },
};

export default apiClient;