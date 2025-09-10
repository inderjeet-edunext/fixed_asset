import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    assetForm: {
      isOpen: false,
      mode: 'create', // 'create', 'edit', 'view'
      data: null,
    },
    confirmation: {
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      onCancel: null,
    },
    bulkImport: {
      isOpen: false,
    },
  },
  notifications: [],
  loading: {
    global: false,
    assets: false,
    dashboard: false,
  },
  theme: 'light',
  layout: {
    sidebarWidth: 264,
    headerHeight: 64,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Modal actions
    openModal: (state, action) => {
      const { modalName, config } = action.payload;
      if (state.modals[modalName]) {
        state.modals[modalName] = {
          ...state.modals[modalName],
          isOpen: true,
          ...config,
        };
      }
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals[modalName]) {
        state.modals[modalName] = {
          ...initialState.modals[modalName],
        };
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modalName => {
        state.modals[modalName] = {
          ...initialState.modals[modalName],
        };
      });
    },
    
    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    
    // Loading actions
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    // Layout actions
    setLayout: (state, action) => {
      state.layout = { ...state.layout, ...action.payload };
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearAllNotifications,
  setLoading,
  setGlobalLoading,
  setTheme,
  toggleTheme,
  setLayout,
} = uiSlice.actions;

export default uiSlice.reducer;