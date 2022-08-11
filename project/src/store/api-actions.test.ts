import { createAPI } from '../api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { checkAuth, fetchOffers } from './api-actions';
import { storeUser } from './user-process/user-process';
import { makeFakeOffers } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middleWares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleWares);

  it('should authorization status is "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      storeUser.type,
      checkAuth.fulfilled.type,
    ]);
  });

  it('should dispatch offers when GET /offers', async () => {
    const mockOffers = makeFakeOffers();

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffers());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffers.pending.type,
      fetchOffers.fulfilled.type,
    ]);
  });
});
