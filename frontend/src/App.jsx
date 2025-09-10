import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Simple test component to verify app is working
const TestComponent = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900">Fixed Asset Management System</h1>
    <p className="mt-2 text-gray-600">Application is loading successfully!</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/dashboard" element={<TestComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;