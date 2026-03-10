import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import resetPasswordReducer from './reducers/resetPasswordSlice';
import createFieldReducer from './reducers/createFieldSlice';
import { useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    resetPassword: resetPasswordReducer,
    createField: createFieldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
