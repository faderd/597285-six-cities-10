import { createReducer } from '@reduxjs/toolkit';
import { Location } from '../const';
import { changeActiveCity, storeOffers } from './action';

const DEFAULT_CITY = Location.PARIS;

const initialState = {
  city: DEFAULT_CITY,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(storeOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export default reducer;
