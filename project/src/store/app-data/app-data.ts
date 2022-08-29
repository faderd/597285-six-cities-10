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
    clearFavoriteFlagsInOffers: (state) => {
      state.offers.forEach((offer) => { offer.isFavorite = false; });
      state.nearbyOffers.forEach((offer) => { offer.isFavorite = false; });
    },
    toggleFavoriteInStore: (state, action: PayloadAction<Offer>) => {
      // поменяем флаг isFavorite оффера в offers
      const offer = state.offers.find((currentOffer) => currentOffer.id === action.payload.id);

      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      } else {
        state.offers.push(action.payload);
      }

      // добавим/удалим offer из favoriteOffers
      if (action.payload.isFavorite) {
        state.favoriteOffers.push(action.payload);
      } else {
        state.favoriteOffers.forEach((favoriteOffer, index) => {
          if (favoriteOffer.id === action.payload.id) {
            state.favoriteOffers.splice(index, 1);
          }
        });
      }

      // поменяем флаг isFavorite оффера в nearbyOffers
      state.nearbyOffers.forEach((nearbyOffer) => {
        if (nearbyOffer.id === action.payload.id) {
          nearbyOffer.isFavorite = action.payload.isFavorite;
        }
      });

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
      .addCase(fetchOffers.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
        if (!state.offers.find((offer) => offer.id === action.payload.id)) {
          state.offers.push(action.payload);
        }
        state.isDataLoaded = true;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isDataLoaded = true;
      });
  },
});

export const { changeActiveCity, storeReviews, storeNearbyOffers, storeSortingType, storeFavoriteOffers, clearFavoriteFlagsInOffers, toggleFavoriteInStore } = appData.actions;
