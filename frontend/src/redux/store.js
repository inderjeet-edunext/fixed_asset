import { configureStore } from '@reduxjs/toolkit';
import navigationSlice from './slices/navigationSlice';
import assetSlice from './slices/assetSlice';
import dashboardSlice from './slices/dashboardSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    assets: assetSlice,
    dashboard: dashboardSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
