import { Action, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import newsReducer from './slices/newsSlice';
import userReducer from './slices/userSlice';

// Existing local middlewares migrated to Redux
const resetCountMiddleware: Middleware = (_store) => (next) => (action: any) => {
  if (action.type === 'counter/setCounter') {
    // Note: In real Redux, mutating action like this is possible but not recommended.
    // However, keeping the original logic:
    return next({ ...action, payload: 100 });
  }
  return next(action);
};

const loggerMiddleware: Middleware = (store) => (next) => (action: any) => {
  const currentState = store.getState();
  console.groupCollapsed('== action logger => ', action.type);
  console.log('current state: ', currentState);
  console.log('action payload', action.payload);
  console.groupEnd();
  return next(action);
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    news: newsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(resetCountMiddleware, loggerMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
