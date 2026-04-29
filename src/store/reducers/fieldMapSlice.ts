import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  selectedFieldId: string | null;
  isNdviActive: boolean;
}

const initialState: MapState = {
  selectedFieldId: null,
  isNdviActive: false,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    changeField: (state, action: PayloadAction<string>) => {
      state.selectedFieldId = action.payload;
      state.isNdviActive = false;
    },

    setNdviActive: (state, action: PayloadAction<boolean>) => {
      state.isNdviActive = action.payload;
    },
  },
});

export const { changeField, setNdviActive } = mapSlice.actions;
export default mapSlice.reducer;
