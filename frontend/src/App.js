import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StocksPage from './pages/StocksPage';
import WipPage from './pages/WipPage';
import CommandesPage from './pages/CommandesPage';
import UtilisateursPage from './pages/UtilisateursPage';
import './index.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="stocks" element={<StocksPage />} />
            <Route path="wip" element={<WipPage />} />
            <Route path="commandes" element={<CommandesPage />} />
            <Route path="utilisateurs" element={<UtilisateursPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
