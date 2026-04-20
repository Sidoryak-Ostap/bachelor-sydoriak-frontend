import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import resetPasswordReducer from './reducers/resetPasswordSlice';
import createFieldReducer from './reducers/createFieldSlice';
import subscriptionReducer from './reducers/subscriptionSlice';
import { useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    resetPassword: resetPasswordReducer,
    createField: createFieldReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
