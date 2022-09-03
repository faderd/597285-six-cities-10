import { City, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';
import { makeFakeOffers, makeFakeReviews, makeFakeFavoriteOffers } from '../../utils/mocks';
import { fetchOffers } from '../api-actions';
import { appData, changeActiveCity, clearFavoriteFlagsInOffers, getInitialStateAppData, storeFavoriteOffers, storeNearbyOffers, storeReviews, storeSortingType, toggleFavoriteInStore } from './app-data';

const offers: Offers = makeFakeOffers();
const reviews: Reviews = makeFakeReviews();
const favoriteOffers: Offers = makeFakeFavoriteOffers();

describe('Reducer: appData', () => {
  const initialState = getInitialStateAppData();

  // reducers tests
  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, { type: 'UNKNOWN' }))
      .toEqual(initialState);
  });

  it('should update state.city by change city', () => {
    const state = { ...initialState };
    const city: City = {
      name: 'qwerty',
      location: {
        latitude: 123,
        longitude: 123,
        zoom: 123,
      }
    };
    expect(appData.reducer(state, changeActiveCity(city)))
      .toEqual({ ...state, city });
  });

  it('should update state.reviews by storeReviews', () => {
    const state = { ...initialState };

    expect(appData.reducer(state, storeReviews(reviews)))
      .toEqual({ ...state, reviews });
  });

  it('should update state.nearbyOffers by storeNearbyOffers', () => {
    const state = { ...initialState };

    expect(appData.reducer(state, storeNearbyOffers(offers)))
      .toEqual({ ...state, nearbyOffers: offers });
  });

  it('should update state.sortingType by storeSortingType', () => {
    const state = { ...initialState };
    const sortingType = 'fake sorting type';

    expect(appData.reducer(state, storeSortingType(sortingType)))
      .toEqual({ ...state, sortingType });
  });

  it('should update state.favoriteOffers by storeFavoriteOffers', () => {
    const state = { ...initialState };

    expect(appData.reducer(state, storeFavoriteOffers(favoriteOffers)))
      .toEqual({ ...state, favoriteOffers });
  });

  it('should update isFavorite in store.offers and store.nearbyOffers by clearFavoriteFlagsInOffers', () => {
    const state = { ...initialState, offers: favoriteOffers, nearbyOffers: favoriteOffers };
    const newState = { ...initialState, offers, nearbyOffers: offers };

    expect(appData.reducer(state, clearFavoriteFlagsInOffers()))
      .toEqual({ ...newState });
  });

  it('should toggle isFavorite in store.offers, store.nearbyOffers and store.favoriteOffers by toggleFavoriteInStore remove action', () => {
    const state = { ...initialState, offers: favoriteOffers, nearbyOffers: favoriteOffers, favoriteOffers };
    const newState = { ...initialState, offers, nearbyOffers: offers };

    expect(appData.reducer(state, toggleFavoriteInStore(offers[0])))
      .toEqual({ ...newState });
  });

  it('should toggle isFavorite in store.offers, store.nearbyOffers and store.favoriteOffers by toggleFavoriteInStore add action', () => {
    const state = { ...initialState, offers, nearbyOffers: offers };
    const newState = { ...initialState, offers: favoriteOffers, nearbyOffers: favoriteOffers, favoriteOffers };

    expect(appData.reducer(state, toggleFavoriteInStore(favoriteOffers[0])))
      .toEqual({ ...newState });
  });

  // extraReducers tests
  // fetchOffers
  it('should update state by pending load offers', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.pending.type, payload: offers }))
      .toEqual({ ...initialState, isDataLoaded: false });
  });

  it('should update state by fulfilled load offers', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.fulfilled.type, payload: offers }))
      .toEqual({ ...initialState, offers, isDataLoaded: true });
  });

  it('should update state by rejected load offers', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.rejected.type, payload: offers }))
      .toEqual({ ...initialState, isDataLoaded: true });
  });

  // fetchOffer
  it('should update state by pending load offer', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.pending.type, payload: [offers[0]] }))
      .toEqual({ ...initialState, isDataLoaded: false });
  });

  it('should update state by fulfilled load offer', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.fulfilled.type, payload: [offers[0]] }))
      .toEqual({ ...initialState, offers, isDataLoaded: true });
  });

  it('should update state by rejected load offer', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.rejected.type, payload: [offers[0]] }))
      .toEqual({ ...initialState, isDataLoaded: true });
  });
});
