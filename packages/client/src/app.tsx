import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/providers/ErrorBoundary';
import AuthInitializer from './components/providers/AuthInitializer';
import { routeConfig } from './routes/route.config';

const router = createBrowserRouter(routeConfig, {
  basename: '/',
  future: {
    v7_relativeSplatPath: true,
  },
});

const App: React.FC = () => (
  <ErrorBoundary>
    <AuthInitializer>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthInitializer>
  </ErrorBoundary>
);

export default App;
