import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  name: string | null;
  email: string | null;
  role: string | null;
  isAuthorized: boolean;
  isAuthLoading: boolean;
}

const initialState: IUserState = {
  name: null,
  email: null,
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
