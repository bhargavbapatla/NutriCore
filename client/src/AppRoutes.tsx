import React, { Fragment, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded components
const LandingPage = lazy(() => import('./components/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Questionnaire = lazy(() => import('./pages/Questionnaire'));


const AppRoutes: React.FC = () => {
  return (
    <Fragment>
      <Routes>
        {/* Unsecured Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Secured Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default AppRoutes;
