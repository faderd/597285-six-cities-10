import dayjs from 'dayjs';
import { LOCATIONS, SortingType } from '../const';
import { Offers } from '../types/offer';

export const humanizeDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

const Filters: {[key: string]: (offers: Offers) => Offers} = {
  [SortingType.Popular]: (offers) => offers,
  [SortingType.PriceHighToLow]: (offers) => offers.slice().sort((a, b) => b.price - a.price),
  [SortingType.PriceLowToHigh]: (offers) => offers.slice().sort((a, b) => a.price - b.price),
  [SortingType.TopRatedFirst]: (offers) => offers.slice().sort((a, b) => b.rating - a.rating),
} as const;

export const getSortingOffers = (offers: Offers, sortingType: string): Offers => Filters[sortingType](offers);

export const getRandomCity = () => {
  const randomIndex = Math.floor(Math.random() * (LOCATIONS.length));
  return LOCATIONS[randomIndex];
};
