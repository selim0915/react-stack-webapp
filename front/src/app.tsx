import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => (
  <Router
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <AppRouter />
  </Router>
);

export default App;
