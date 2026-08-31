import React, { createContext, useCallback, useMemo } from 'react';
import APIs from '../apis';
import { CookieKey } from '../constants/app.config';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout as reduxLogout } from '../store/slices/userSlice';
import { deleteAllCookies, getCookie, setCookie } from '../utils/cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string | undefined;
  userId: string | undefined;
  login: (userId: string, role: string, token: string) => void;
  logout: (callback?: () => void) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, role: userRole, id: userId } = useAppSelector((state) => state.user);

  const login = useCallback(
    (id: string, role: string, token: string) => {
      // 엑세스 토큰만 쿠키에 저장 (사용자 정보는 제외)
      setCookie(CookieKey.ACCESS_TOKEN, token, 1);

      // Redux 상태 업데이트
      dispatch(
        loginSuccess({
          id,
          name: '사용자', // 추후 API API 연동 시 실제 데이터로 교체 필요
          phoneNumber: '010-0000-0000',
          gender: 'M',
          birthDate: '2000-01-01',
          role,
          agreements: {
            termsOfService: true,
            privacyPolicy: true,
          },
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

  // 새로고침 시 로그인 상태 복구 로직
  const [isInitializing, setIsInitializing] = React.useState(true);

  React.useEffect(() => {
    const initAuth = async () => {
      const token = getCookie(CookieKey.ACCESS_TOKEN);

      // 토큰은 있지만 리덕스에 정보가 없는 경우 (새로고침 직후)
      if (token && !isLoggedIn) {
        try {
          // 사용자 정보 API 호출 (토큰을 이용해 백엔드에서 정보 가져옴)
          const userInfo = await APIs.User.getUserInfo();
          dispatch(loginSuccess(userInfo));
        } catch (error) {
          console.error('Session restore failed:', error);
          logout(); // 토큰이 유효하지 않거나 API 실패 시 로그아웃 처리
        }
      }
      setIsInitializing(false);
    };

    initAuth();
  }, [isLoggedIn, dispatch, logout]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      userRole,
      userId,
      login,
      logout,
    }),
    [isLoggedIn, userRole, userId, login, logout],
  );

  if (isInitializing) return null; // 또는 <div /> 로딩 컴포넌트

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
