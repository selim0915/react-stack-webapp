import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string; // 로그인 아이디 (이메일)
  nickname: string; // 기존 id를 nickname으로 변경
  name: string;
  phoneNumber: string;
  gender: 'M' | 'F' | '';
  birthDate: string;
  role: string;
  agreements: {
    termsOfService: boolean;
    privacyPolicy: boolean;
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: '',
  nickname: '',
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
      const { email, nickname, name, phoneNumber, gender, birthDate, agreements, role } = action.payload;
      state.email = email;
      state.nickname = nickname;
      state.name = name;
      state.phoneNumber = phoneNumber;
      state.gender = gender;
      state.birthDate = birthDate;
      state.role = role;
      state.agreements = agreements;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = '';
      state.nickname = '';
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
