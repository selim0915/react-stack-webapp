import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../libs/firebaseApp';

export const login = async (email: string, password: string): Promise<void> => {
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {
  const auth = getAuth(app);
  await signOut(auth);
};
