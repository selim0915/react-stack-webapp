import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout as reduxLogout } from '../store/slices/userSlice';
import { CookieKey } from '../utils/constants';
import { deleteAllCookies, setCookie } from '../utils/cookie';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, role: userRole, email } = useAppSelector((state) => state.user);

  const login = useCallback(
    (emailId: string, role: string, token: string) => {
      setCookie(CookieKey.ACCESS_TOKEN, token, 1);
      dispatch(
        loginSuccess({
          email: emailId,
          nickname: emailId.split('@')[0], // 이메일 앞부분을 임시 닉네임으로
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

  return { isLoggedIn, userRole, email, login, logout };
};

export default useAuth;
