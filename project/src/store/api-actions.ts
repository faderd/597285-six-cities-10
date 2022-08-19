import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { APIRoute, AppRoute, FavoriteActionStatus } from '../const';
import { dropToken, getToken, saveToken } from '../sevices/token';
import { AuthData } from '../types/auth-data';
import { Offer, Offers } from '../types/offer';
import { Reviews, Review } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './app-data/action';
import { storeFavoriteOffers, storeNearbyOffers, storeOffer, storeReviews } from './app-data/app-data';
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

export const fetchOfferReviews = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(generatePath(APIRoute.Reviews, { offerId: offerId }));
    dispatch(storeReviews(data));
  },
);

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(generatePath(APIRoute.NearbyOffers, { offerId: offerId }));
    dispatch(storeNearbyOffers(data));
  },
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    const token = getToken();
    const { data } = await api.get<Offers>(APIRoute.Favorite, { headers: {'X-Token': token}});
    dispatch(storeFavoriteOffers(data));
  },
);

export const pushActionFavoriteOffer = createAsyncThunk<Offer, {offerId: string, actionStatus: FavoriteActionStatus}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/pushActionFavoriteOffer',
  async ({ offerId, actionStatus }, { dispatch, extra: api }) => {
    const token = getToken();
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${actionStatus}`, { offerId }, {headers: { 'X-Token': token }});
    dispatch(fetchFavoriteOffers());
    dispatch(fetchOffers());
    return data;
  },
);

export const pushReview = createAsyncThunk<Review, {offerId: string, review: {comment: string, rating: number}}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/pushReview',
  async ({ offerId, review }, { dispatch, extra: api }) => {
    const token = getToken();
    const { data } = await api.post<Review>( generatePath(APIRoute.Reviews, { offerId: offerId }), review, {headers: { 'X-Token': token }});
    dispatch(fetchOfferReviews(offerId));
    return data;
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
    dispatch(fetchFavoriteOffers());
    dispatch(redirectToRoute(AppRoute.Main));
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
    dispatch(storeFavoriteOffers([]));
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
    try {
      dispatch(storeUser(data));
      dispatch(fetchFavoriteOffers());
    } catch {
      dispatch(storeFavoriteOffers([]));
    }
  },
);
