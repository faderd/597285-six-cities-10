import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { getSortingOffers } from '../../utils/common';

export const getOffers = (state: State) => state[NameSpace.Data].offers;

export const getCurrentCity = (state: State) => state[NameSpace.Data].city;

export const getSortingType = (state: State) => state[NameSpace.Data].sortingType;

export const getOffersFromCity = createSelector([getOffers, getCurrentCity, getSortingType], (offers, city, sortingType) => {
  const offersFromCity = offers.filter((offer: Offer) => offer.city.name === city.name);

  return getSortingOffers(offersFromCity, sortingType);
});

export const getOffersCountFromCity = (state: State) => getOffersFromCity(state).length;

export const getIsDataLoadedStatus = (state: State) => state[NameSpace.Data].isDataLoaded;

export const getReviews = (state: State) => state[NameSpace.Data].reviews;

export const getOfferById = (id: string | undefined) => (state: State) => state[NameSpace.Data].offers.find((offer: Offer) => offer.id.toString() === id);

export const getNearbyOffers = (offer?: Offer) => (state: State) => {
  if (!offer) {
    return state[NameSpace.Data].nearbyOffers;
  }
  return [...state[NameSpace.Data].nearbyOffers, offer];
};
