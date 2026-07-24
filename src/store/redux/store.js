import { configureStore } from '@reduxjs/toolkit';
import { storeDataReducer } from './storeDataSlice';
import { sampleReducer } from './sampleSlice';
export default configureStore({
  reducer: {
    store: storeDataReducer,
    sample: sampleReducer,
  },
});
