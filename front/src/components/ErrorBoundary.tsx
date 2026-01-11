import * as Sentry from '@sentry/react';
import React from 'react';
import GlobalError from '../pages/error/GlobalError';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <Sentry.ErrorBoundary
    fallback={<GlobalError />}
    onError={(error) => {
      console.log('ErrorBoundary caught an error:', error);
    }}
  >
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
