import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Loader from './loader/Loader';

const ProtectedRoute: React.FC = () => {
  // Grab the user object from your store as well!
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !user.is_questionnaire_complete && location.pathname !== '/questionnaire') {
    return <Navigate to="/questionnaire" replace />;
  }

  if (user && user.is_questionnaire_complete && location.pathname === '/questionnaire') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;