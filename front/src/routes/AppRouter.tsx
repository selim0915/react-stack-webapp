import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import useAccess from '../hooks/useAccess';
import useAuth from '../hooks/useAuth';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Nav from '../layouts/Nav';
import { StyledArticle, StyledContent, StyledMain } from '../styles/layout.style';
import { routeConfig } from './index';

const AppRouter: React.FC = () => {
  const { isLoggedIn, userRole, userId } = useAuth();
  const { currentRoute } = useAccess();

  const currentLayout = currentRoute?.layout || [];

  return (
    <StyledMain>
      {currentLayout.includes('header') && <Header userId={userId} />}
      {currentLayout.includes('nav') && isLoggedIn && <Nav userRole={userRole} />}

      <StyledArticle>
        <StyledContent>
          <Routes>
            {routeConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute authRequired={route.authRequired} roles={route.roles}>
                    <route.element />
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </StyledContent>
        {currentLayout.includes('footer') && <Footer />}
      </StyledArticle>
    </StyledMain>
  );
};

export default AppRouter;
