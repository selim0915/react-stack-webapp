import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../../libs/firebaseApp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginSuccess, logout as reduxLogout } from '../../store/slices/userSlice';
import { CookieKey } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
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
    // Firebase 인증 상태 감지 및 Context State 업데이트
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      setInit(true);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // 2. 기존 Redux 유저 정보 복원 로직 (유지)
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
      setIsReduxInitializing(false);
    };

    initAuth();
  }, [isLoggedIn, dispatch]);

  // Firebase와 Redux 복원 모두 대기
  if (!init || isReduxInitializing) return null; 

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
