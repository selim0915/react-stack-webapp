import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../components/providers/AuthProvider';
import { useAppSelector } from '../store/hooks';
import { UserRole } from '../utils/constants';
import { RouteLink } from './routes';

interface RequireAuthProps {
  authRequired?: boolean;
  guestRequired?: boolean;
  adminRequired?: boolean;
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ authRequired = false, guestRequired = false, adminRequired = false, children }) => {
  const location = useLocation();
  const { isAuthenticated } = useFirebaseAuth();
  const { role } = useAppSelector((state) => state.user);

  // 1. Guest Only
  if (guestRequired && isAuthenticated) {
    return <Navigate to={RouteLink.MAIN} replace />;
  }

  // 2. Auth Check
  if ((authRequired || adminRequired) && !isAuthenticated) {
    return <Navigate to={RouteLink.LOGIN} state={{ from: location }} replace />;
  }

  // 3. Admin Check
  if (adminRequired && role !== UserRole.ADMIN) {
    return <Navigate to="/error?type=403" replace />;
  }

  return children as React.ReactElement;
};

export default RequireAuth;
