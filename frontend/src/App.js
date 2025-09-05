import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssetMaster from './pages/AssetMaster';
import AssetTransfer from './pages/AssetTransfer';
import AssetDisposal from './pages/AssetDisposal';
import DepreciationCalculation from './pages/DepreciationCalculation';
import MaintenanceManagement from './pages/MaintenanceManagement';
import AuditModule from './pages/AuditModule';
import Users from './pages/Users';
import Configuration from './pages/Configuration';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/asset-management/asset-master" element={<AssetMaster />} />
              <Route path="/asset-management/asset-transfer" element={<AssetTransfer />} />
              <Route path="/asset-management/asset-disposal" element={<AssetDisposal />} />
              <Route path="/asset-management/depreciation-calculation" element={<DepreciationCalculation />} />
              <Route path="/maintenance-management" element={<MaintenanceManagement />} />
              <Route path="/audit-module" element={<AuditModule />} />
              <Route path="/users" element={<Users />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;