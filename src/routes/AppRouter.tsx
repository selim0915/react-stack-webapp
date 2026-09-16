import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import { StyledArticle, StyledContent, StyledMain } from '../components/layouts/layout.style';
import Nav from '../components/layouts/Nav';
import ProtectedRoute from '../components/providers/ProtectedRoute';
import useAccess from '../hooks/useAccess';
import { routeConfig } from './route.config';

const AppRouter: React.FC = () => {
  const { currentRoute } = useAccess();

  const currentLayout = currentRoute?.layout || [];

  return (
    <StyledMain>
      {currentLayout.includes('header') && <Header />}
      {currentLayout.includes('nav') && <Nav />}

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
