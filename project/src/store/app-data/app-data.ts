import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchOffers } from '../api-actions';

const initialState: AppData = {
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeActiveCity: (state, action) => {
      state.city = action.payload;
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

export const { changeActiveCity } = appData.actions;
