import { configureStore } from '@reduxjs/toolkit';
import person from './slices/personSlice.js';
import { storage } from '../utils/localStorage.js';
import { setStorage } from '../utils/localStorage.js';

export const store = configureStore({
  reducer: { person },
});

// store.subscribe(() => {
//   console.log(store.getState().person);
//   setStorage('store', store.getState().person);
// });
