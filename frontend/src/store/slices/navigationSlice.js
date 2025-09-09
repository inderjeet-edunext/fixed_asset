import { createSlice } from '@reduxjs/toolkit';
import { ROUTES } from '@/config/constants';

const initialState = {
  activeMenuItem: 'Dashboard',
  sidebarCollapsed: false,
  expandedMenus: {},
  currentPage: 'Dashboard',
  breadcrumbs: [],
  previousPage: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveMenuItem: (state, action) => {
      state.previousPage = state.activeMenuItem;
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
      return { ...initialState, sidebarCollapsed: state.sidebarCollapsed };
    },
    
    navigateToPage: (state, action) => {
      const { page, menuItem } = action.payload;
      state.previousPage = state.currentPage;
      state.currentPage = page;
      state.activeMenuItem = menuItem || page;
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
  navigateToPage,
} = navigationSlice.actions;

// Selectors
export const selectNavigation = (state) => state.navigation;
export const selectActiveMenuItem = (state) => state.navigation.activeMenuItem;
export const selectSidebarCollapsed = (state) => state.navigation.sidebarCollapsed;
export const selectExpandedMenus = (state) => state.navigation.expandedMenus;
export const selectCurrentPage = (state) => state.navigation.currentPage;
export const selectBreadcrumbs = (state) => state.navigation.breadcrumbs;

export default navigationSlice.reducer;