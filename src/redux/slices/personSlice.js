import { createSlice } from '@reduxjs/toolkit';
import { getStorage } from '../../utils/localStorage';

const personData = getStorage('store');
// console.log(personData);

// storage.getItem('store')

const initialState = {
  persons: personData,
};

export const addToFavorite = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPersonToFav(state, action) {
      state.persons.push(action.payload);
    },
    removePersonFromFav(state, action) {
      state.persons = state.persons.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setPersonToFav, removePersonFromFav } = addToFavorite.actions;

export default addToFavorite.reducer;
