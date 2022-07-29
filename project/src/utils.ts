import { City, Offers } from './types/offer';

export const getOffersFromCity = (offers: Offers, currentCity: City) => offers.filter((offer) => offer.city.name === currentCity.name);
