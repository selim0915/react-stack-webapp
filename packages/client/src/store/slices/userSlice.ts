import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string; // 사용자 아이디 (로그인 ID)
  name: string;
  phoneNumber: string;
  gender: 'M' | 'F' | ''; // 성별
  birthDate: string; // 생년월일 (YYYY-MM-DD)
  role: string; // 사용자 역할 (admin, user 등)
  agreements: {
    termsOfService: boolean; // 이용약관 동의
    privacyPolicy: boolean; // 개인정보 처리방침 동의
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: '',
  name: '',
  phoneNumber: '',
  gender: '',
  birthDate: '',
  role: '',
  agreements: {
    termsOfService: false,
    privacyPolicy: false,
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      const { id, name, phoneNumber, gender, birthDate, agreements, role } = action.payload;
      state.id = id;
      state.name = name;
      state.phoneNumber = phoneNumber;
      state.gender = gender;
      state.birthDate = birthDate;
      state.role = role;
      state.agreements = agreements;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.id = '';
      state.name = '';
      state.phoneNumber = '';
      state.gender = '';
      state.birthDate = '';
      state.role = '';
      state.agreements = {
        termsOfService: false,
        privacyPolicy: false,
      };
      state.isLoggedIn = false;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<Omit<UserState, 'isLoggedIn'>>>) => {
      const { agreements, ...rest } = action.payload;
      Object.assign(state, rest);
      if (agreements) {
        state.agreements = { ...state.agreements, ...agreements };
      }
    },
  },
});

export const { loginSuccess, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
