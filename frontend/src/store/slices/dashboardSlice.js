import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardAPI } from '@/services/api';

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getDashboardData();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  summary: {
    totalAssets: 2158,
    activeAssets: 1402,
    maintenanceDue: 756,
    totalValue: 18200000,
    categories: 5,
    locations: 12,
    users: 89
  },
  assetDistribution: [
    { category: 'IT Equipment', percentage: 38, count: 820, color: '#3B82F6' },
    { category: 'Furniture', percentage: 26, count: 561, color: '#F59E0B' },
    { category: 'Vehicles', percentage: 14, count: 302, color: '#10B981' },
    { category: 'Buildings', percentage: 12, count: 259, color: '#6B7280' },
    { category: 'Others', percentage: 10, count: 216, color: '#8B5CF6' }
  ],
  assetStatusOverview: [
    { status: 'In Use', count: 1613, percentage: 74.8 },
    { status: 'Available', count: 437, percentage: 20.3 },
    { status: 'Under Maintenance', count: 65, percentage: 3.0 },
    { status: 'Needs Repair', count: 43, percentage: 1.9 }
  ],
  recentActivities: [
    { 
      id: 1, 
      type: 'transferred',
      title: 'Asset #A1023 Transferred',
      description: 'From IT Department → Finance Department',
      location: 'Location Change: Floor 3 → Floor 5',
      time: 'Today, 10:23 AM',
      icon: 'Package'
    },
    { 
      id: 2, 
      type: 'added',
      title: 'New Asset Added',
      description: 'Laptop Dell XPS 15 - #A1024',
      details: 'Purchase Date: May 25, 2025 | Purchase Value: ₹1350',
      time: 'Yesterday, 2:45 PM',
      icon: 'Plus'
    }
  ],
  importantAlerts: [
    {
      id: 1,
      type: 'expiring',
      title: 'AMC Expiring in 7 Days',
      description: 'Server Infrastructure - #A0123',
      severity: 'high',
      icon: 'AlertCircle',
      color: 'text-red-600'
    }
  ],
  complianceData: [
    { rule: 'Warranty Expired', assets: 3210, actionBy: 'IT Department', percentage: 74 },
    { rule: 'Overdue Audits', assets: 756, actionBy: 'Compliance Officer', percentage: 18 }
  ],
  loading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateSummary: (state, action) => {
      state.summary = { ...state.summary, ...action.payload };
    },
    addActivity: (state, action) => {
      state.recentActivities.unshift(action.payload);
      if (state.recentActivities.length > 10) {
        state.recentActivities.pop();
      }
    },
    addAlert: (state, action) => {
      state.importantAlerts.unshift(action.payload);
    },
    removeAlert: (state, action) => {
      state.importantAlerts = state.importantAlerts.filter(
        alert => alert.id !== action.payload
      );
    },
    setLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        return { ...state, ...action.payload };
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateSummary,
  addActivity,
  addAlert,
  removeAlert,
  setLastUpdated,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;