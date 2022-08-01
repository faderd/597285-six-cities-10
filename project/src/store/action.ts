import { createAction } from '@reduxjs/toolkit';

export enum Action {
  ChangeActiveCity = 'CHANGE_ACTIVE_CITY',
  StoreOffers = 'STORE_OFFERS',
  IsDataLoaded = 'IS_DATA_LOADED',
}

export const changeActiveCity = createAction(Action.ChangeActiveCity, (city) => ({
  payload: city,
}));

export const storeOffers = createAction(Action.StoreOffers, (offers) => ({
  payload: offers,
}));

export const setDataLoadedStatus = createAction(Action.IsDataLoaded, (isDataLoaded) => ({
  payload: isDataLoaded,
}));
