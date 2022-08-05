import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, LOCATIONS} from '../const';
import { City, Offers } from '../types/offer';
import { changeActiveCity, requireAuthorization, setDataLoadedStatus, storeAvatarUrl, storeEmail, storeOffers } from './action';

const DEFAULT_CITY: City = LOCATIONS.find((location) => location.name === 'Paris') || LOCATIONS[0];

type InitialState = {
  city: City,
  offers: Offers,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  email: string | null,
  avatarUrl: string | null,
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unkown,
  email: null,
  avatarUrl: null,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(storeEmail, (state, action) => {
      state.email = action.payload;
    })
    .addCase(storeAvatarUrl, (state, action) => {
      state.avatarUrl = action.payload;
    });
});

export default reducer;
