import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useAccess from '../hooks/useAccess';
import useAuth from '../hooks/useAuth';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Nav from '../layouts/Nav';
import { StyledArticle, StyledContent, StyledMain } from '../styles/layout.style';
import { routeConfig } from './index';

const AppRouter: React.FC = () => {
  const { isLoggedIn, userRole, userId } = useAuth();
  const { hasAccess, currentRoute } = useAccess();

  const currentLayout = currentRoute?.layout || [];

  return (
    <StyledMain>
      {currentLayout.includes('header') && <Header userId={userId} />}
      {currentLayout.includes('nav') && isLoggedIn && <Nav userRole={userRole} />}

      <StyledArticle>
        <StyledContent>
          <Routes>
            {routeConfig.map((route) => (
              <Route key={route.path} path={route.path} element={hasAccess ? <route.element /> : null} />
            ))}
          </Routes>
        </StyledContent>
        {currentLayout.includes('footer') && <Footer />}
      </StyledArticle>
    </StyledMain>
  );
};

export default AppRouter;
