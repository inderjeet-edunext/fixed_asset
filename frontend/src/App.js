import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ROUTES } from '@/config/constants';
import Layout from './components/Layout';
import GlobalSpinner from './components/ui/GlobalSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AssetMaster = React.lazy(() => import('./pages/AssetMaster'));
const AssetTransfer = React.lazy(() => import('./pages/AssetTransfer'));
const AssetDisposal = React.lazy(() => import('./pages/AssetDisposal'));
const DepreciationCalculation = React.lazy(() => import('./pages/DepreciationCalculation'));
const MaintenanceManagement = React.lazy(() => import('./pages/MaintenanceManagement'));
const AuditModule = React.lazy(() => import('./pages/AuditModule'));
const Users = React.lazy(() => import('./pages/Users'));
const Configuration = React.lazy(() => import('./pages/Configuration'));
const Reports = React.lazy(() => import('./pages/Reports'));

// Fallback component for lazy loading
const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center space-y-4">
      <div className="spinner w-8 h-8"></div>
      <p className="text-sm text-text-muted">Loading page...</p>
    </div>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="App min-h-screen bg-background">
            <Layout>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                  <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                  <Route path={ROUTES.ASSET_MANAGEMENT.ASSET_MASTER} element={<AssetMaster />} />
                  <Route path={ROUTES.ASSET_MANAGEMENT.ASSET_TRANSFER} element={<AssetTransfer />} />
                  <Route path={ROUTES.ASSET_MANAGEMENT.ASSET_DISPOSAL} element={<AssetDisposal />} />
                  <Route path={ROUTES.ASSET_MANAGEMENT.DEPRECIATION_CALCULATION} element={<DepreciationCalculation />} />
                  <Route path={ROUTES.MAINTENANCE_MANAGEMENT} element={<MaintenanceManagement />} />
                  <Route path={ROUTES.AUDIT_MODULE} element={<AuditModule />} />
                  <Route path={ROUTES.USERS} element={<Users />} />
                  <Route path={ROUTES.CONFIGURATION} element={<Configuration />} />
                  <Route path={ROUTES.REPORTS} element={<Reports />} />
                </Routes>
              </Suspense>
            </Layout>
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;