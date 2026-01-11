import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { RouteLink } from '../utils/constants';

interface ProtectedRouteProps {
  authRequired: boolean;
  roles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authRequired, roles, children }) => {
  const { isLoggedIn, userRole } = useAuth();
  const location = useLocation();

  // 1. 이미 로그인된 상태에서 로그인 페이지 접근 시 이전 페이지나 메인으로 이동
  if (isLoggedIn && !authRequired) {
    return <Navigate to={RouteLink.MAIN} replace />;
  }

  // 2. 인증이 필요한데 로그인하지 않은 경우
  if (!isLoggedIn && authRequired) {
    return <Navigate to={RouteLink.LOGIN} state={{ from: location }} replace />;
  }

  // 3. 권한(Role) 체크가 필요한 경우
  if (isLoggedIn && roles && !roles.includes(userRole || '')) {
    return <Navigate to={RouteLink.FORBIDDEN} replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
