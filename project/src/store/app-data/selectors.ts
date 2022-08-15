import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State) => state[NameSpace.Data].offers;

export const getCurrentCity = (state: State) => state[NameSpace.Data].city;

export const getOffersFromCity = createSelector([getOffers, getCurrentCity], (offers, city) => offers.filter((offer: Offer) => offer.city.name === city.name));

export const getOffersCountFromCity = (state: State) => getOffersFromCity(state).length;

export const getIsDataLoadedStatus = (state: State) => state[NameSpace.Data].isDataLoaded;

export const getReviews = (state: State) => state[NameSpace.Data].reviews;

export const getNearbyOffers = (state: State) => state[NameSpace.Data].nearbyOffers;

export const getOfferById = (id: string | undefined) => (state: State) => state[NameSpace.Data].offers.find((offer: Offer) => offer.id.toString() === id);
