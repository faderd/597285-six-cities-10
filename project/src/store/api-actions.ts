import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIRoute, FavoriteActionStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer, Offers } from '../types/offer';
import { Reviews, Review, SubmitReview } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToPrevious } from './app-data/action';
import { clearFavoriteFlagsInOffers, storeFavoriteOffers, storeNearbyOffers, storeReviews, toggleFavoriteInStore } from './app-data/app-data';
import { storeUser } from './user-process/user-process';

export const fetchOffers = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOffer = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer>(generatePath(APIRoute.Offer, { id: offerId }));
    return data;
  },
);

export const fetchOfferReviews = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOfferReviews',
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
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);
    dispatch(storeFavoriteOffers(data));
  },
);

export const toggleFavoriteOffer = createAsyncThunk<void, { offerId: string, actionStatus: FavoriteActionStatus }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/toggleFavoriteOffer',
  async ({ offerId, actionStatus }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${actionStatus}`, { offerId });
    dispatch(toggleFavoriteInStore(data));
  },
);

export const submitReview = createAsyncThunk<Review | undefined, SubmitReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/submitReview',
  async ({ offerId, review }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Review>(generatePath(APIRoute.Reviews, { offerId: offerId }), review);
      dispatch(fetchOfferReviews(offerId));
      return data;
    } catch {
      toast.warn('Error submitting review');
    }
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
    dispatch(redirectToPrevious());
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(storeFavoriteOffers([]));
    dispatch(clearFavoriteFlagsInOffers());
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get(APIRoute.Login);
    try {
      dispatch(storeUser(data));
      dispatch(fetchFavoriteOffers());
    } catch {
      dispatch(storeFavoriteOffers([]));
    }
  },
);
