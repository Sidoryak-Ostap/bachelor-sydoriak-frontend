import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

interface IUserState {
  name: string | null;
  email: string | null;
  token: string | null;
  role: string | null;
  isAuthorized: boolean;
  isAuthLoading: boolean;
}

const initialState: IUserState = {
  name: null,
  email: null,
  token: null,
  role: null,
  isAuthorized: false,
  isAuthLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthorized = true;
    },

    clearUser: state => {
      state.name = null;
      state.email = null;
      state.token = null;
      state.role = null;
      state.isAuthorized = false;
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;

export default userSlice.reducer;
