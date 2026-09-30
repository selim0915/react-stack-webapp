import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginSuccess, logout as reduxLogout } from '../../store/slices/userSlice';
import { CookieKey } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import * as UserAPI from '../../pages/login/user.api';

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie(CookieKey.ACCESS_TOKEN);

      if (token && !isLoggedIn) {
        try {
          const userInfo = await UserAPI.getUserInfo();
          dispatch(loginSuccess(userInfo));
        } catch (error) {
          console.error('Session restore failed:', error);
          dispatch(reduxLogout());
        }
      }
      setIsInitializing(false);
    };

    initAuth();
  }, [isLoggedIn, dispatch]);

  if (isInitializing) return null; // You can return a loading spinner here

  return <>{children}</>;
};

export default AuthInitializer;
