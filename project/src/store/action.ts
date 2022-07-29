import { createAction } from '@reduxjs/toolkit';

export enum Action {
  CityChange = 'CITY_CHANGE',
  OffersListFill = 'OFFERS_LIST_FILL',
}

export const cityChange = createAction(Action.CityChange, (city) => ({
  payload: city,
}));

export const offersListFill = createAction(Action.OffersListFill, (offersList) => ({
  payload: offersList,
}));
