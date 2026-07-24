import { createSlice } from '@reduxjs/toolkit';

export const storeDataSlice = createSlice({
  name: 'storeData',
  initialState: {
    storeData1: '',
    storeData2: '',
    storeData3: '',
  },
  reducers: {
    changeInitstoreData: (state) => {
      state.storeData1 = '';
      state.storeData2 = '';
      state.storeData3 = '';
    },
    changeStoreData1: (state, action) => {
      state.storeData1 = action.payload;
    },
    changeStoreData2: (state, action) => {
      state.storeData2 = action.payload;
    },
    changeStoreData3: (state, action) => {
      state.storeData3 = action.payload;
    },
  },
});

export const { changeInitstore, changeStoreData1, changeStoreData2, changeStoreData3 } = storeDataSlice.actions;
export const storeDataReducer = storeDataSlice.reducer;
