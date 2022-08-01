import { createReducer } from '@reduxjs/toolkit';
import { Location} from '../const';
import { City, Offers } from '../types/offer';
import { changeActiveCity, setDataLoadedStatus, storeOffers } from './action';

const DEFAULT_CITY = Location.PARIS;

type InitialState = {
  city: City,
  offers: Offers,
  isDataLoaded: boolean,
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(storeOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});

export default reducer;
