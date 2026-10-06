import React from 'react';
import { Outlet } from 'react-router-dom';
import GoogleAnalytics from '../components/providers/GoogleAnalytics';

import Toast from '../components/commons/Toast';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { hideToast } from '../store/slices/uiSlice';

const RootWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const { isVisible, message } = useSelector((state: RootState) => state.ui.toast);

  return (
    <>
      <GoogleAnalytics />
      <Toast 
        message={message} 
        isVisible={isVisible} 
        onClose={() => dispatch(hideToast())} 
      />
      <Outlet />
    </>
  );
};

export default RootWrapper;
