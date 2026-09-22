import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routeConfig } from './route.config';

const AppRouter: React.FC = () => {
  // useRoutes 훅을 사용해 routeConfig 객체 배열을 실제 라우트로 변환합니다.
  const routing = useRoutes(routeConfig);

  return <>{routing}</>;
};

export default AppRouter;
