import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assetAPI } from '../../services/api';

// Async thunks
export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (params, { rejectWithValue }) => {
    try {
      const response = await assetAPI.getAssets(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAsset = createAsyncThunk(
  'assets/createAsset',
  async (assetData, { rejectWithValue }) => {
    try {
      const response = await assetAPI.createAsset(assetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await assetAPI.updateAsset(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id, { rejectWithValue }) => {
    try {
      await assetAPI.deleteAsset(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  assets: [
    {
      id: 1,
      assetTag: 'L-L001A',
      name: 'Dell Laptop',
      category: 'Office Equipment',
      location: 'HQ - IT Dept',
      assignedTo: 'John Doe',
      purchaseDate: '03-12-2023',
      purchaseTime: '12:00 PM',
      cost: '₹85,000',
      depreciationValue: '₹65,000',
      status: 'Active',
      icon: 'Laptop',
    },
    {
      id: 2,
      assetTag: 'OC-F001S',
      name: 'Office Chair',
      category: 'Furniture',
      location: 'Office 2',
      assignedTo: 'Maintenance Dept',
      purchaseDate: '03-12-2023',
      purchaseTime: '12:00 PM',
      cost: '₹5,50,000',
      depreciationValue: '₹4,20,000',
      status: 'Under Repair',
      icon: 'Building',
    },
    {
      id: 3,
      assetTag: 'HP-P00L',
      name: 'Printer HP 204',
      category: 'Office Equipment',
      location: 'Admin Room',
      assignedTo: 'Admin Dept',
      purchaseDate: '03-12-2023',
      purchaseTime: '12:00 PM',
      cost: '₹45,000',
      depreciationValue: '₹37,000',
      status: 'Disposed',
      icon: 'Printer',
    },
    {
      id: 4,
      assetTag: 'HY-P0042',
      name: 'Projector BenQ',
      category: 'Office Equipment',
      location: 'Meeting Room 2',
      assignedTo: 'Marketing Team',
      purchaseDate: '03-12-2023',
      purchaseTime: '12:00 PM',
      cost: '₹20,000',
      depreciationValue: '₹15,000',
      status: 'Lost',
      icon: 'MonitorSpeaker',
    }
  ],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    status: '',
    location: '',
    assignedTo: '',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 120,
    totalPages: 12,
  },
  selectedAssets: [],
  sortBy: 'name',
  sortOrder: 'asc',
};

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        status: '',
        location: '',
        assignedTo: '',
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setSelectedAssets: (state, action) => {
      state.selectedAssets = action.payload;
    },
    toggleAssetSelection: (state, action) => {
      const assetId = action.payload;
      const index = state.selectedAssets.indexOf(assetId);
      if (index > -1) {
        state.selectedAssets.splice(index, 1);
      } else {
        state.selectedAssets.push(assetId);
      }
    },
    selectAllAssets: (state) => {
      state.selectedAssets = state.assets.map(asset => asset.id);
    },
    clearSelection: (state) => {
      state.selectedAssets = [];
    },
    setSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    addAssetLocal: (state, action) => {
      state.assets.push({
        ...action.payload,
        id: Date.now(), // Temporary ID for local state
      });
    },
    updateAssetLocal: (state, action) => {
      const { id, data } = action.payload;
      const index = state.assets.findIndex(asset => asset.id === id);
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...data };
      }
    },
    removeAssetLocal: (state, action) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.assets || action.payload;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create asset
      .addCase(createAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.assets.push(action.payload);
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update asset
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.assets.findIndex(asset => asset.id === action.payload.id);
        if (index !== -1) {
          state.assets[index] = action.payload;
        }
      })
      // Delete asset
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter(asset => asset.id !== action.payload);
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setPagination,
  setSelectedAssets,
  toggleAssetSelection,
  selectAllAssets,
  clearSelection,
  setSorting,
  addAssetLocal,
  updateAssetLocal,
  removeAssetLocal,
} = assetSlice.actions;

export default assetSlice.reducer;