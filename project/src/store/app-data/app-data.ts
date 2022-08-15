import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../const';
import { City, Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { AppData } from '../../types/state';
import { fetchOffers } from '../api-actions';

export const getInitialStateAppData = (): AppData => ({
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
  reviews: [],
  nearbyOffers: [],
});

export const appData = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateAppData(),
  reducers: {
    changeActiveCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    storeOffer: (state, action: PayloadAction<Offer>) => {
      state.offers.push(action.payload);
    },
    storeReviews: (state, action: PayloadAction<Reviews>) => {
      state.reviews = action.payload;
    },
    storeNearbyOffers: (state, action: PayloadAction<Offers>) => {
      state.nearbyOffers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.offers = action.payload;
        state.isDataLoaded = true;
      });
  },
});

export const { changeActiveCity, storeOffer, storeReviews, storeNearbyOffers } = appData.actions;
