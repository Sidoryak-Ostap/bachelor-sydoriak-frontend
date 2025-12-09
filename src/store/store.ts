import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import resetPasswordReducer from './reducers/resetPasswordSlice';
import { useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    resetPassword: resetPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
