import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import navigationSlice from './slices/navigationSlice';
import assetSlice from './slices/assetSlice';
import dashboardSlice from './slices/dashboardSlice';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['navigation', 'auth'], // Only persist navigation and auth state
  blacklist: ['ui'], // Don't persist UI state (modals, notifications, etc.)
};

const rootReducer = combineReducers({
  navigation: navigationSlice,
  assets: assetSlice,
  dashboard: dashboardSlice,
  ui: uiSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
      immutableCheck: {
        warnAfter: 128,
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;