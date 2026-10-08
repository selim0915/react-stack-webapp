import { UserState } from '../store/slices/userSlice';
import mockUsers from '../test/users.json';
import { UserRole } from '../utils/constants';

const MOCK_DB: Record<string, UserState> = mockUsers as Record<string, UserState>;

export const getUserInfo = async (email: string | null): Promise<UserState> => 
  new Promise((resolve) => {
    setTimeout(() => {
      if (email && MOCK_DB[email]) {
        resolve(MOCK_DB[email]);
        
      } else {
        resolve({
          email: 'guest2@example.com',
          nickname: '게스트1',
          name: '신규 사용자',
          phoneNumber: '010-0000-0000',
          gender: 'M',
          birthDate: '2000-01-01',
          role: UserRole.USER,
          agreements: {
            termsOfService: false,
            privacyPolicy: false,
          },
        });
      }
    }, 300);
  });

export const updateProfile = async (data: Partial<Omit<UserState, 'email' | 'role'>>): Promise<boolean> => 
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('updateProfile success', data);
      resolve(true);
    }, 300);
  });
