import { Offer } from '../types/offer';
import { State } from '../types/state';

export const getOffersFromCity = (state: State) => state.offers.filter((offer: Offer) => offer.city.name === state.city.name);

export const getOffersCountFromCity = (state: State) => getOffersFromCity(state).length;

export const getCurrentCity = (state: State) => state.city;

export const getIsDataLoaded = (state: State) => state.isDataLoaded;
