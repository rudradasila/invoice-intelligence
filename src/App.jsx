import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AuthLayout } from './components/layout/AuthLayout';

import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { DocumentDetail } from './pages/DocumentDetail';
import { Upload } from './pages/Upload';
import { Compare } from './pages/Compare';
import { ReviewCenter } from './pages/ReviewCenter';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export function App() {
  return (
    <Routes>
      {/* Protected SaaS App Routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<Documents />} />
        <Route path="documents/:id" element={<DocumentDetail />} />
        <Route path="upload" element={<Upload />} />
        <Route path="compare" element={<Compare />} />
        <Route path="review-center" element={<ReviewCenter />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Fallback to Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
