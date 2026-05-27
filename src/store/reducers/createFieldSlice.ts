import { createSlice } from '@reduxjs/toolkit';

interface CreateFieldState {
  data: {
    name: string;
    address: string;
    owner: string;
    area: number;
    cropType: string;
    soilType: string;
    seedingDate?: Date;
  };

  isDrawing: boolean;
}

const initialState: CreateFieldState = {
  data: {
    name: '',
    address: '',
    owner: '',
    area: 0,
    cropType: '',
    soilType: '',
  },

  isDrawing: false,
};

const createFieldSlice = createSlice({
  name: 'createField',
  initialState,
  reducers: {
    setFieldInfo: (state, action) => {
      const { fieldName, address, owner, area, cropType, soilType } = action.payload;
      state.data.name = fieldName;
      state.data.address = address;
      state.data.owner = owner;
      state.data.area = area;
      state.data.cropType = cropType;
      state.data.soilType = soilType;
      state.data.seedingDate = action.payload.seedingDate || null;
      state.isDrawing = true;
    },

    setArea: (state, action) => {
      state.data.area = action.payload;
    },

    setDrawing: state => {
      state.isDrawing = false;
    },

    resetFieldCreation: () => {
      return initialState;
    },
  },
});

export const { setFieldInfo, setDrawing, resetFieldCreation, setArea } = createFieldSlice.actions;
export default createFieldSlice.reducer;
