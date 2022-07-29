import { createReducer } from '@reduxjs/toolkit';
import { Location } from '../const';
import { offers } from '../mocks/offers';
import { getOffersFromCity } from '../utils';
import { cityChange, offersListFill } from './action';

const DEFAULT_CITY = Location.PARIS;

const initialState = {
  city: DEFAULT_CITY,
  offersList: getOffersFromCity(offers, DEFAULT_CITY),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersListFill, (state, action) => {
      state.offersList = action.payload;
    });
});

export default reducer;
