import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Nav from '../components/layouts/Nav';
import ProtectedRoute from '../components/providers/ProtectedRoute';
import useAccess from '../hooks/useAccess';
import { routeConfig } from './route.config';

const AppRouter: React.FC = () => {
  const { currentRoute } = useAccess();
  const currentLayout = currentRoute?.layout || [];

  return (
    <main className="w-full h-full min-h-screen relative flex flex-col bg-[#f5f5f7]">
      {currentLayout.includes('header') && <Header />}
      {currentLayout.includes('nav') && <Nav />}

      <article className="w-full h-full overflow-auto" style={{ overflowAnchor: 'none' }}>
        <section className="w-full min-h-[calc(100%-60px)] px-6 py-6 box-border">
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
        </section>
        {currentLayout.includes('footer') && <Footer />}
      </article>
    </main>
  );
};

export default AppRouter;
