import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  gender: 'M' | 'F' | '';
  birthDate: string;
  role: string;
  agreements: {
    termsOfService: boolean;
    privacyPolicy: boolean;
  };
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
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => ({ ...state, ...action.payload }),
    clearUser: () => initialState,
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const { agreements, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
        agreements: agreements ? { ...state.agreements, ...agreements } : state.agreements,
      };
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
