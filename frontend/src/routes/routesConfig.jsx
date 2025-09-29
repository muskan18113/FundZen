import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing.jsx';
import LoginPage from '../pages/Login.jsx';
import SignUpPage from '../pages/Signup.jsx';
import DashboardPage from '../pages/Dashboard.jsx';
import TransactionsPage from '../pages/transactions.jsx';
import BudgetsPage from '../pages/budgets.jsx';
import AccountsPage from '../pages/accounts.jsx';
import SettingsPage from '../pages/settings.jsx';
import ProfilePage from '../pages/profile.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import DashboardLayout from '../components/layouts/dashboardLayout.jsx';
import ProtectedRoute from './protectedRoute.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<DashboardPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="budgets" element={<BudgetsPage />} />
      <Route path="accounts" element={<AccountsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
