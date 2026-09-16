import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  counter: number;
  message: string;
  request: boolean;
}

const initialState: CounterState = {
  counter: 0,
  message: 'app store',
  request: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload) {
        state.counter += action.payload;
      } else {
        state.counter += 1;
      }
    },
    decrease: (state) => {
      state.counter -= 1;
    },
    setCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
    asyncRequest: (state) => {
      state.request = true;
    },
    asyncResponse: (state) => {
      state.request = false;
    },
  },
});

export const { increase, decrease, setCounter, asyncRequest, asyncResponse } = counterSlice.actions;

export const asyncIncrease = (_payload: any): any => (dispatch: any) => {
  dispatch(asyncRequest());
  setTimeout(() => {
    dispatch(increase(20));
    dispatch(asyncResponse());
  }, 3000);
};

export default counterSlice.reducer;
