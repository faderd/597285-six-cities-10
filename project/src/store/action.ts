import { createAction } from '@reduxjs/toolkit';

export enum Action {
  ChangeActiveCity = 'CHANGE_ACTIVE_CITY',
  StoreOffers = 'STORE_OFFERS',
}

export const changeActiveCity = createAction(Action.ChangeActiveCity, (city) => ({
  payload: city,
}));

export const storeOffers = createAction(Action.StoreOffers, (offers) => ({
  payload: offers,
}));
