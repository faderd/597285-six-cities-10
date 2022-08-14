import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { APIRoute } from '../const';
import { dropToken, saveToken } from '../sevices/token';
import { AuthData } from '../types/auth-data';
import { Offer, Offers } from '../types/offer';
import { Reviews } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { storeNearbyOffers, storeOffer, storeReviews } from './app-data/app-data';
import { storeUser } from './user-process/user-process';

export const fetchOffers = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(generatePath(APIRoute.Offer, { offerId }));
    dispatch(storeOffer(data));
  },
);

export const fetchReviews = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (hotelId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(generatePath(APIRoute.Reviews, {hotelId}));
    dispatch(storeReviews(data));
  },
);

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (hotelId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(generatePath(APIRoute.NearbyOffers, { hotelId }));
    dispatch(storeNearbyOffers(data));
  },
);

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(storeUser(data));
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get(APIRoute.Login);
    dispatch(storeUser(data));
  },
);
