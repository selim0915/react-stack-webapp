import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app';
import { AuthProvider } from './context/AuthContext';
import { initSentry } from './utils/sentry';
import { store } from './store';
import GlobalStyle from './styles/global.style';


const queryClient = new QueryClient();

initSentry();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <React.StrictMode>
            <GlobalStyle />
            <App />
          </React.StrictMode>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>,
  );
}
