import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  name: string | null;
  email: string | null;
  role: string | null;
  isAuthorized: boolean;
  isAuthLoading: boolean;
  token: string | null;
  profile: {
    firstName: string | null;
    lastName: string | null;
    location: string | null;
    bio: string | null;
    phoneNumber: string | null;
    avatarUrl: string | null;
  };
  settings: {
    language: string;
    timezone: string;
    autoAreaCalculation?: boolean;
    emailUpdates?: boolean;
    weeklySummary?: boolean;
    marketingNews?: boolean;
  };
}

const storedToken = localStorage.getItem('accessToken') || null;
const initialState: IUserState = {
  name: null,
  email: null,
  token: storedToken,
  role: null,
  isAuthorized: false,
  isAuthLoading: true,
  profile: {
    phoneNumber: null,
    firstName: '',
    lastName: '',
    location: '',
    bio: '',
    avatarUrl: null,
  },
  settings: {
    language: 'en',
    timezone: 'UTC',
    autoAreaCalculation: true,
    emailUpdates: false,
    weeklySummary: false,
    marketingNews: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { profile, settings, ...rest } = action.payload;

      Object.assign(state, rest);
      state.isAuthorized = true;
      state.isAuthLoading = false;

      if (profile) state.profile = { ...state.profile, ...profile };
      if (settings) state.settings = { ...state.settings, ...settings };
    },

    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    logout: () => {
      localStorage.removeItem('accessToken');
      return initialState;
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setUser, logout, setAuthLoading, setProfile, setSettings } = userSlice.actions;

export default userSlice.reducer;
