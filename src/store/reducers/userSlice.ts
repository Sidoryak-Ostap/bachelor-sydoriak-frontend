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
      const { settings, profile } = action.payload;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthorized = true;
      state.isAuthLoading = false;
      state.profile = { ...state.profile, ...profile };
      state.settings = { ...state.settings, ...settings };
    },

    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    logout: state => {
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
      state.profile.firstName = null;
      state.profile.lastName = null;
      state.profile.location = null;
      state.profile.bio = null;
      state.profile.phoneNumber = null;
      state.profile.avatarUrl = null;
      state.settings.language = 'en';
      state.settings.timezone = 'UTC';
      state.settings.autoAreaCalculation = true;
      state.settings.emailUpdates = false;
      state.settings.weeklySummary = false;
      state.settings.marketingNews = false;

      state.isAuthorized = false;
      state.isAuthLoading = false;

      localStorage.removeItem('accessToken');
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setUser, logout, setAuthLoading, setProfile, setSettings } = userSlice.actions;

export default userSlice.reducer;
