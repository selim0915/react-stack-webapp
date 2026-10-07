import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/providers/ErrorBoundary';
import AuthProvider from './components/providers/AuthProvider';
import { routeConfig } from './routes/route.config';

const router = createBrowserRouter(routeConfig, {
  basename: '/',
  future: {
    v7_relativeSplatPath: true,
  },
});

const App: React.FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  </ErrorBoundary>
);

export default App;
