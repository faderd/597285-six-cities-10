import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute, FavoriteActionStatus } from '../const';
import { checkAuth, fetchFavoriteOffers, fetchOffer, fetchOffers, fetchOfferReviews, fetchNearbyOffers, toggleFavoriteOffer, submitReview, login, logout } from './api-actions';
import { storeUser } from './user-process/user-process';
import { makeFakeFavoriteOffers, makeFakeOffers, makeFakeReview, makeFakeReviews } from '../utils/mocks';
import { generatePath } from 'react-router-dom';
import { clearFavoriteFlagsInOffers, storeFavoriteOffers, storeNearbyOffers, storeReviews, toggleFavoriteInStore } from './app-data/app-data';
import { AuthData } from '../types/auth-data';
import { redirectToPrevious } from './app-data/action';

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
      fetchFavoriteOffers.pending.type,
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

  it('action data/fetchOffer', async () => {
    const mockOffer = makeFakeOffers()[0];

    mockAPI
      .onGet(generatePath(APIRoute.Offer, {id: '2'}))
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchOffer('2'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffer.pending.type,
      fetchOffer.fulfilled.type,
    ]);
  });

  it('action data/fetchOfferReviews', async () => {
    const mockReviews = makeFakeReviews();

    mockAPI
      .onGet(generatePath(APIRoute.Reviews, {offerId: '2'}))
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchOfferReviews('2'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOfferReviews.pending.type,
      storeReviews.type,
      fetchOfferReviews.fulfilled.type,
    ]);
  });

  it('action data/fetchNearbyOffers', async () => {
    const mockOffers = makeFakeOffers();

    mockAPI
      .onGet(generatePath(APIRoute.NearbyOffers, {offerId: '2'}))
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffers('2'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchNearbyOffers.pending.type,
      storeNearbyOffers.type,
      fetchNearbyOffers.fulfilled.type,
    ]);
  });

  it('action data/fetchFavoriteOffers', async () => {
    const mockOffers = makeFakeFavoriteOffers();

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffers());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoriteOffers.pending.type,
      storeFavoriteOffers.type,
      fetchFavoriteOffers.fulfilled.type,
    ]);
  });

  it('action data/toggleFavoriteOffer', async () => {
    const mockOffer = makeFakeOffers()[0];

    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/${FavoriteActionStatus.AddFavorite}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(toggleFavoriteOffer({offerId: mockOffer.id.toString(), actionStatus: FavoriteActionStatus.AddFavorite}));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      toggleFavoriteOffer.pending.type,
      toggleFavoriteInStore.type,
      toggleFavoriteOffer.fulfilled.type,
    ]);
  });

  it('action data/submitReview', async () => {
    const mockReview = makeFakeReview();

    mockAPI
      .onPost(generatePath(APIRoute.Reviews, {offerId: '2'}))
      .reply(200, mockReview);

    const store = mockStore();

    await store.dispatch(submitReview({offerId: '2', review: mockReview}));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      submitReview.pending.type,
      fetchOfferReviews.pending.type,
      submitReview.fulfilled.type,
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(login(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      login.pending.type,
      storeUser.type,
      fetchFavoriteOffers.pending.type,
      redirectToPrevious.type,
      login.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logout());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logout.pending.type,
      storeFavoriteOffers.type,
      clearFavoriteFlagsInOffers.type,
      logout.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
