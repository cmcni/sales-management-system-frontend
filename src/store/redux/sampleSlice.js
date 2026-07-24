import { createSlice } from '@reduxjs/toolkit';

export const sampleSlice = createSlice({
  name: 'sample',
  initialState: {
    sample1: {},
    sample2: {},
    sample3: {},
  },
  reducers: {
    changeInitSample: (state) => {
      state.sample1 = {};
      state.sample1 = {};
      state.sample1 = {};
    },
    changeSample1: (state, action) => {
      state.sample1 = action.payload;
    },
    changeSample2: (state, action) => {
      state.sample2 = action.payload;
    },
    changeSample3: (state, action) => {
      state.sample3 = action.payload;
    },
  },
});

export const { changeInitSample, changeSample1, changeSample2, changeSample3 } = sampleSlice.actions;
export const sampleReducer = sampleSlice.reducer;
