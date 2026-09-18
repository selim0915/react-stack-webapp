import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/providers/ErrorBoundary';
import GoogleAnalytics from './components/providers/GoogleAnalytics';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => (
  <ErrorBoundary>
    <Router
      basename="/"
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <GoogleAnalytics />
      <AppRouter />
    </Router>
  </ErrorBoundary>
);

export default App;
