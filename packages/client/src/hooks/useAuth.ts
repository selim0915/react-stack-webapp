import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout as reduxLogout } from '../store/slices/userSlice';
import { CookieKey } from '../utils/constants';
import { deleteAllCookies, setCookie } from '../utils/cookie';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, role: userRole, id: userId } = useAppSelector((state) => state.user);

  const login = useCallback(
    (id: string, role: string, token: string) => {
      setCookie(CookieKey.ACCESS_TOKEN, token, 1);
      dispatch(
        loginSuccess({
          id,
          name: '사용자',
          phoneNumber: '010-0000-0000',
          gender: 'M',
          birthDate: '2000-01-01',
          role,
          agreements: { termsOfService: true, privacyPolicy: true },
        }),
      );
    },
    [dispatch],
  );

  const logout = useCallback(
    (callback?: () => void) => {
      deleteAllCookies();
      dispatch(reduxLogout());
      if (callback) callback();
    },
    [dispatch],
  );

  return { isLoggedIn, userRole, userId, login, logout };
};

export default useAuth;
