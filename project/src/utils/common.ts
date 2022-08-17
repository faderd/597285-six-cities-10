import dayjs from 'dayjs';
import { SortingType } from '../const';
import { Offers } from '../types/offer';

export const humanizeDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

const filters: {[key: string]: (arg0: Offers) => Offers} = {
  [SortingType.Popular]: (offers) => offers,
  [SortingType.PriceHighToLow]: (offers) => offers.slice().sort((a, b) => b.price - a.price),
  [SortingType.PriceLowToHigh]: (offers) => offers.slice().sort((a, b) => a.price - b.price),
  [SortingType.TopRatedFirst]: (offers) => offers.slice().sort((a, b) => b.rating - a.rating),
};

export const getSortingOffers = (offers: Offers, sortingType: string): Offers => filters[sortingType](offers);
