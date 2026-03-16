import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  name: string | null;
  email: string | null;
  role: string | null;
  isAuthorized: boolean;
  isAuthLoading: boolean;
  token: string | null;
}

const storedToken = localStorage.getItem('accessToken') || null;
const initialState: IUserState = {
  name: null,
  email: null,
  token: storedToken,
  role: null,
  isAuthorized: false,
  isAuthLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthorized = true;
      state.isAuthLoading = false;
    },

    logout: state => {
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
      state.isAuthorized = false;
      state.isAuthLoading = false;
      localStorage.removeItem('accessToken');
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setUser, logout, setAuthLoading } = userSlice.actions;

export default userSlice.reducer;
