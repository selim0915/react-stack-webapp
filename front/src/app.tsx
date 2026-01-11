import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import GoogleAnalytics from './components/GoogleAnalytics';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => (
  <ErrorBoundary>
    <Router
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
