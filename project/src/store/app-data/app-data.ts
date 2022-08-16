import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATIONS, NameSpace, SortingType } from '../../const';
import { City, Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { AppData } from '../../types/state';
import { fetchOffers } from '../api-actions';

export const DEFAULT_CITY: City = LOCATIONS.find((location) => location.name === 'Paris') || LOCATIONS[0];

const DEFAULT_SORING_TYPE = SortingType.Popular;

export const getInitialStateAppData = (): AppData => ({
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
  reviews: [],
  nearbyOffers: [],
  sortingType: DEFAULT_SORING_TYPE,
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

export const { changeActiveCity, storeOffer, storeReviews, storeNearbyOffers, storeSortingType } = appData.actions;
