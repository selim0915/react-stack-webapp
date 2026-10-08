import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as UserAPI from '../../apis/user.api';
import { app } from '../../libs/firebaseApp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearUser, setUser } from '../../store/slices/userSlice';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null,
});

export const useFirebaseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);
  
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  const [currentUser, setCurrentUser] = useState<User | null>(auth?.currentUser);
  const [isReduxInitializing, setIsReduxInitializing] = useState(true);
  const contextValue = useMemo(
    () => ({ isAuthenticated, currentUser }),
    [isAuthenticated, currentUser],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        
        if (!email) {
          try {
            const userInfo = await UserAPI.getUserInfo(user.email);
            
            dispatch(setUser({ ...userInfo }));
          } catch (error) {
            console.error('Session restore failed:', error);
            dispatch(clearUser());
          }
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        dispatch(clearUser());
      }
      
      setInit(true);
      setIsReduxInitializing(false);
    });

    return () => unsubscribe();
  }, [auth, dispatch, email]);

  if (!init || isReduxInitializing) return null;

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
