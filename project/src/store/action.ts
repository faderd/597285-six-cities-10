import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { City, Offers } from '../types/offer';

export enum Action {
  ChangeActiveCity = 'CHANGE_ACTIVE_CITY',
  StoreOffers = 'STORE_OFFERS',
  IsDataLoaded = 'IS_DATA_LOADED',
  RequireAuthorization = 'REQUIRE_AUTHORIZATION',
  StoreEmail = 'STORE_EMAIL',
}

export const changeActiveCity = createAction(Action.ChangeActiveCity, (city: City) => ({
  payload: city,
}));

export const storeOffers = createAction(Action.StoreOffers, (offers: Offers) => ({
  payload: offers,
}));

export const setDataLoadedStatus = createAction(Action.IsDataLoaded, (isDataLoaded: boolean) => ({
  payload: isDataLoaded,
}));

export const requireAuthorization = createAction(Action.RequireAuthorization, (authorizationStatus: AuthorizationStatus) => ({
  payload: authorizationStatus,
}));

export const storeEmail = createAction(Action.StoreEmail, (email: string) => ({
  payload: email,
}));
