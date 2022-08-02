import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Offers } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { Action, setDataLoadedStatus, storeOffers } from './action';

export const fetchOffers = createAsyncThunk < void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.StoreOffers,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(false));
    dispatch(storeOffers(data));
    dispatch(setDataLoadedStatus(true));
  },
);
