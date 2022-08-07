import { createSelector } from 'reselect';
import { Offer } from '../types/offer';
import { State } from '../types/state';

export const getOffers = (state: State) => state.offers;

export const getCurrentCity = (state: State) => state.city;

export const getOffersFromCity = createSelector([getOffers, getCurrentCity], (offers, city) => offers.filter((offer: Offer) => offer.city.name === city.name));

export const getOffersCountFromCity = (state: State) => getOffersFromCity(state).length;

export const getIsDataLoaded = (state: State) => state.isDataLoaded;

export const getAuthorizationStatus = (state: State) => state.authorizationStatus;

export const getEmail = (state: State) => state.email;

export const getAvatarUrl = (state: State) => state.avatarUrl;
