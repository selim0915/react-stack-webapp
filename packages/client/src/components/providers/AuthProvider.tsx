import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../../libs/firebaseApp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginSuccess, logout as reduxLogout } from '../../store/slices/userSlice';
import { CookieKey } from '../../utils/constants';
import { setCookie } from '../../utils/cookie';
import * as UserAPI from '../../pages/login/user.api';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
});

export const useFirebaseAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  const [currentUser, setCurrentUser] = useState<User | null>(auth?.currentUser);
  const [isReduxInitializing, setIsReduxInitializing] = useState(true);

  useEffect(() => {
    // Firebase 인증 상태 감지
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        
        // Firebase는 로그인 상태인데 Redux가 비어있다면 복원 (새로고침 시)
        if (!isLoggedIn) {
          try {
            // Firebase 토큰을 쿠키에 갱신
            const token = await user.getIdToken();
            setCookie(CookieKey.ACCESS_TOKEN, token, 1);

            // API 호출로 Redux 유저 정보 복원
            const userInfo = await UserAPI.getUserInfo();
            dispatch(loginSuccess({
              ...userInfo,
              email: user.email || userInfo.email, // Firebase 이메일을 우선 사용
            }));
          } catch (error) {
            console.error('Session restore failed:', error);
            dispatch(reduxLogout());
          }
        }
      } else {
        // Firebase 로그아웃 상태일 때
        setIsAuthenticated(false);
        setCurrentUser(null);
        dispatch(reduxLogout()); // Redux도 강제로 로그아웃 상태로 동기화
      }
      
      setInit(true);
      setIsReduxInitializing(false);
    });

    return () => unsubscribe();
  }, [auth, dispatch, isLoggedIn]);

  // Firebase와 Redux 복원이 완료될 때까지 화면(Router) 렌더링 대기
  if (!init || isReduxInitializing) return null; 

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
