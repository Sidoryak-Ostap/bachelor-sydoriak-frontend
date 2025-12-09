import { createSlice } from '@reduxjs/toolkit';

interface IResetPasswordState {
  email: string | null;
  code: string | null;
}

const initialState: IResetPasswordState = {
  email: null,
  code: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setResetPasswordEmaiil: (state, action) => {
      state.email = action.payload;
    },

    setResetPasswordCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setResetPasswordEmaiil, setResetPasswordCode } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
