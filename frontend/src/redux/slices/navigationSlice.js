import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMenuItem: 'Dashboard',
  sidebarCollapsed: false,
  expandedMenus: {},
  currentPage: 'Dashboard',
  breadcrumbs: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleExpandedMenu: (state, action) => {
      const menuItem = action.payload;
      state.expandedMenus[menuItem] = !state.expandedMenus[menuItem];
    },
    setExpandedMenus: (state, action) => {
      state.expandedMenus = action.payload;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    resetNavigation: (state) => {
      return initialState;
    },
  },
});

export const {
  setActiveMenuItem,
  setCurrentPage,
  toggleSidebar,
  setSidebarCollapsed,
  toggleExpandedMenu,
  setExpandedMenus,
  setBreadcrumbs,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer;