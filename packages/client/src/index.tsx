import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app';
import { initSentry } from './libs/sentry';
import { store } from './store';
import GlobalStyle from './styles/global.style';
import './styles/tailwind.css';

const queryClient = new QueryClient();

initSentry();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <GlobalStyle />
            <App />
          </React.StrictMode>
      </QueryClientProvider>
    </Provider>,
  );
}

