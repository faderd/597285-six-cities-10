import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchOffers } from '../api-actions';

export const getInitialStateAppData = (): AppData => ({
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
  reviews: [],
});

export const appData = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateAppData(),
  reducers: {
    changeActiveCity: (state, action) => {
      state.city = action.payload;
    },
    storeOffer: (state, action) => {
      state.offers.push(action.payload);
    },
    storeReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = true;
      });
  },
});

export const { changeActiveCity, storeOffer, storeReviews } = appData.actions;
