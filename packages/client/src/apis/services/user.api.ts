import { UserState } from '../../store/slices/userSlice';

// 실제 백엔드 API가 있다면 이 부분을 해당 API 호출로 변경해야 합니다.
// 현재는 데모를 위해 비동기 모의(Mock) 함수로 작성합니다.
export const getUserInfo = async (): Promise<Omit<UserState, 'isLoggedIn'>> => 
  // 예: const response = await axios.get('/api/user/me');
  // return response.data;

   new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'user123',
        name: '복구된 사용자',
        phoneNumber: '010-1234-5678',
        gender: 'M',
        birthDate: '1990-01-01',
        role: 'user',
        agreements: {
          termsOfService: true,
          privacyPolicy: true,
        },
      });
    }, 500); // 0.5초 딜레이
  })
;
