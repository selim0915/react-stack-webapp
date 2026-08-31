import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { RouteLink } from '../../routes/routes';

interface ProtectedRouteProps {
  authRequired: boolean;
  roles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authRequired, roles, children }) => {
  const { isLoggedIn, userRole } = useAuth();
  const location = useLocation();

  // 1. 인증이 필요 없는 페이지(Public)는 조건 없이 렌더링
  if (!authRequired) {
    // 단, 로그인 페이지처럼 '이미 로그인된 상태'에서 가면 안 되는 경우를 처리하고 싶다면 여기서 처리 가능
    // 현재는 모든 Public 페이지를 허용
    return children as React.ReactElement;
  }

  // 2. 인증이 필요한데 로그인하지 않은 경우
  if (!isLoggedIn) {
    return <Navigate to={RouteLink.LOGIN} state={{ from: location }} replace />;
  }

  // 3. 권한(Role) 체크가 필요한 경우
  if (roles && !roles.includes(userRole || '')) {
    return <Navigate to={RouteLink.FORBIDDEN} replace />;
  }

  return children as React.ReactElement;
};

export default ProtectedRoute;
