import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATIONS, NameSpace, SortingType } from '../../const';
import { City, Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { AppData } from '../../types/state';
import { fetchOffer, fetchOffers } from '../api-actions';

export const DEFAULT_CITY: City = LOCATIONS.find((location) => location.name === 'Paris') || LOCATIONS[0];
export const DEFAULT_SORING_TYPE = SortingType.Popular;

export const getInitialStateAppData = (): AppData => ({
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
  reviews: [],
  nearbyOffers: [],
  sortingType: DEFAULT_SORING_TYPE,
  favoriteOffers: [],
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
    storeSortingType: (state, action: PayloadAction<string>) => {
      state.sortingType = action.payload;
    },
    storeFavoriteOffers: (state, action: PayloadAction<Offers>) => {
      state.favoriteOffers = action.payload;
    },
    clearFavoreteFlagsInOffers: (state) => {
      state.offers.forEach((offer) => { offer.isFavorite = false; });
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
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffer.fulfilled, (state) => {
        state.isDataLoaded = true;
      });
  },
});

export const { changeActiveCity, storeOffer, storeReviews, storeNearbyOffers, storeSortingType, storeFavoriteOffers, clearFavoreteFlagsInOffers } = appData.actions;
