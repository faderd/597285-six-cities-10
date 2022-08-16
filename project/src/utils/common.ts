import dayjs from 'dayjs';
import { SortingType } from '../const';
import { Offers } from '../types/offer';

export const humanizeDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

const filters = {
  [SortingType.Popular]: (offers: Offers) => offers,
  [SortingType.PriceHighToLow]: (offers: Offers) => offers.slice().sort((a, b) => b.price - a.price),
  [SortingType.PriceLowToHigh]: (offers: Offers) => offers.slice().sort((a, b) => a.price - b.price),
  [SortingType.TopRatedFirst]: (offers: Offers) => offers.slice().sort((a, b) => b.rating - a.rating),
};

export const getSortingOffers = (offers: Offers, sortingType: string): Offers => filters[sortingType](offers);
