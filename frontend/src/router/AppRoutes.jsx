import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import LoginPage from '../modules/auth/pages/LoginPage';
import EmployeeDirectory from '../modules/employees/pages/EmployeeDirectory';
import UserProfile from '../modules/profile/pages/UserProfile';
import Portfolio from '../modules/profile/pages/Portfolio';
import Dashboard from '../modules/dashboard/pages/Dashboard';
import HomePage from '../modules/home/HomePage';
import MainLayout from '../components/layout/MainLayout';
import PageWrapper from '../components/layout/PageWrapper';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
      <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
      <Route path="/portfolio/:username" element={<PageWrapper><Portfolio /></PageWrapper>} />

      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/employees" element={<PageWrapper><EmployeeDirectory /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><UserProfile /></PageWrapper>} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        </Route>
      </Route>

      <Route path="*" element={
        <div className="container text-center mt-5">
          <h2>404 - Page Not Found</h2>
        </div>
      } />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
