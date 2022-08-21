import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { GroupedFavoritesOffer, GroupedFavoritesOffers, Offer, Offers } from '../../types/offer';
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

export const getFavoriteOffers = (state: State) => state[NameSpace.Data].favoriteOffers;

export const getFavoriteOffersCount = (state: State) => getFavoriteOffers(state).length || 0;

export const getGroupedFavoritesOffers = (state: State) => {
  const favoriteOffers: Offers = getFavoriteOffers(state);
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));
  const groupedFavoritesOffers: GroupedFavoritesOffers = [];

  cities.forEach((city) => {
    const groupedFavoritesOffer: GroupedFavoritesOffer = {city: {name: city}, offers: []};
    favoriteOffers.forEach((offer) => {
      if (city === offer.city.name) {
        groupedFavoritesOffer.offers.push(offer);
      }
    });

    groupedFavoritesOffers.push(groupedFavoritesOffer);
  });
  return groupedFavoritesOffers;
};
