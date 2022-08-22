import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { City, Offers } from './offer';
import { Reviews } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  email: string | null,
  avatarUrl: string | null,
};

export type AppData = {
  city: City,
  offers: Offers,
  isDataLoaded: boolean,
  reviews: Reviews,
  nearbyOffers: Offers,
  sortingType: string,
  favoriteOffers: Offers,
};
