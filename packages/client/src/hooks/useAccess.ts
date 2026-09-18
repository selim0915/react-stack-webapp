import { useCallback } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { routeConfig } from '../routes/route.config';
import useAuth from './useAuth';

export type AccessStatus = 'AUTHORIZED' | 'NEED_LOGIN' | 'FORBIDDEN' | 'ALREADY_LOGGED_IN';

export const useAccess = () => {
  const { isLoggedIn, userRole } = useAuth();
  const { pathname } = useLocation();

  const currentRoute = routeConfig.find((r) => matchPath({ path: r.path, end: true }, pathname));

  const getStatus = useCallback((): AccessStatus => {
    if (isLoggedIn && currentRoute?.authRequired === false) return 'ALREADY_LOGGED_IN';
    if (!isLoggedIn && currentRoute?.authRequired === true) return 'NEED_LOGIN';
    if (isLoggedIn && currentRoute?.roles && !currentRoute.roles.includes(userRole || '')) return 'FORBIDDEN';
    return 'AUTHORIZED';
  }, [isLoggedIn, userRole, currentRoute]);

  // Redirection is now handled by ProtectedRoute component

  return {
    currentRoute,
    hasAccess: getStatus() === 'AUTHORIZED',
  };
};

export default useAccess;
