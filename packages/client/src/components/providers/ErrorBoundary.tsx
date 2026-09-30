import * as Sentry from '@sentry/react';
import React from 'react';
import ErrorPage from '../../pages/error';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <Sentry.ErrorBoundary
    fallback={<ErrorPage type="500" />}
    onError={(error) => {
      console.error('ErrorBoundary caught an error:', error);
    }}
  >
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
