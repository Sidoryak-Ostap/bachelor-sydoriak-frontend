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
      state.profile.phoneNumber = action.payload.profile.phoneNumber;
      state.profile.firstName = action.payload.profile.firstName;
      state.profile.lastName = action.payload.profile.lastName;
      state.profile.location = action.payload.profile.location;
      state.profile.bio = action.payload.profile.bio;
      state.profile.avatarUrl = action.payload.profile.avatarUrl;
    },

    setProfile: (state, action) => {
      state.profile.phoneNumber = action.payload.phoneNumber;
      state.profile.firstName = action.payload.firstName;
      state.profile.lastName = action.payload.lastName;
      state.profile.location = action.payload.location;
      state.profile.bio = action.payload.bio;
      state.profile.avatarUrl = action.payload.avatarUrl;
    },

    logout: state => {
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
      state.isAuthorized = false;
      state.isAuthLoading = false;
      state.profile.firstName = null;
      state.profile.lastName = null;
      state.profile.location = null;
      state.profile.bio = null;
      state.profile.phoneNumber = null;
      state.profile.avatarUrl = null;
      localStorage.removeItem('accessToken');
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

export const { setUser, logout, setAuthLoading, setProfile } = userSlice.actions;

export default userSlice.reducer;
