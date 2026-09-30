import React from 'react';
import { Outlet } from 'react-router-dom';
import GoogleAnalytics from '../components/providers/GoogleAnalytics';

const RootWrapper: React.FC = () => {
  return (
    <>
      <GoogleAnalytics />
      <Outlet />
    </>
  );
};

export default RootWrapper;
