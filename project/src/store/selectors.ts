import { createSelector } from 'reselect';
import { Offer } from '../types/offer';
import { State } from '../types/state';

const selectSelf = (state: State) => state;

export const getOffersFromCity = createSelector(selectSelf, (state: State) => state.offers.filter((offer: Offer) => offer.city.name === state.city.name));

export const getOffersCountFromCity = (state: State) => getOffersFromCity(state).length;

export const getCurrentCity = (state: State) => state.city;

export const getIsDataLoaded = (state: State) => state.isDataLoaded;

export const getAuthorizationStatus = (state: State) => state.authorizationStatus;

export const getEmail = (state: State) => state.email;

export const getAvatarUrl = (state: State) => state.avatarUrl;
