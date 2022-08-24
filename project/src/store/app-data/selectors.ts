import { createSelector } from 'reselect';
import { NameSpace, NUMBER_OF_REVIEWS } from '../../const';
import { GroupedFavoritesOffer, GroupedFavoritesOffers, Offer } from '../../types/offer';
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

export const getSortedReviews = createSelector([getReviews], (reviews) => {
  const sortedReviews = Array.from(reviews)
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();

      return timeB - timeA;
    })
    .slice(0, NUMBER_OF_REVIEWS);

  return sortedReviews;
});

export const getReviewsCount = (state: State) => getReviews(state).length;

export const getOfferById = (id: string | undefined) => (state: State) => state[NameSpace.Data].offers.find((offer: Offer) => offer.id.toString() === id);

export const getNearbyOffers = (offer?: Offer) => (state: State) => {
  if (!offer) {
    return state[NameSpace.Data].nearbyOffers;
  }
  return [...state[NameSpace.Data].nearbyOffers, offer];
};

export const getFavoriteOffers = (state: State) => state[NameSpace.Data].favoriteOffers;

export const getFavoriteOffersCount = (state: State) => getFavoriteOffers(state).length || 0;

export const getGroupedFavoritesOffers = createSelector([getFavoriteOffers], (favoriteOffers) => {
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));
  const groupedFavoritesOffers: GroupedFavoritesOffers = [];

  cities.forEach((city) => {
    const groupedFavoritesOffer: GroupedFavoritesOffer = { city: { name: city }, offers: [] };
    favoriteOffers.forEach((offer) => {
      if (city === offer.city.name) {
        groupedFavoritesOffer.offers.push(offer);
      }
    });

    groupedFavoritesOffers.push(groupedFavoritesOffer);
  });
  return groupedFavoritesOffers;
});
