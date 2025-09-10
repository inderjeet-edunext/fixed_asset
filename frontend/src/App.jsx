import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssetMaster from './pages/AssetMaster';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen bg-white">
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/asset-management/asset-master" element={<AssetMaster />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;