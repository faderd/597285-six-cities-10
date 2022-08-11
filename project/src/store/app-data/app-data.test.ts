import { Offers } from '../../types/offer';
import { makeFakeOffers } from '../../utils/mocks';
import { fetchOffers } from '../api-actions';
import { appData, changeActiveCity, getInitialStateAppData } from './app-data';

const offers: Offers = makeFakeOffers();

describe('Reducer: appData', () => {
  const initialState = getInitialStateAppData();

  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, { type: 'UNKNOWN' }))
      .toEqual(initialState);
  });

  it('should update state by load offers', () => {
    expect(appData.reducer(initialState, { type: fetchOffers.fulfilled.type, payload: offers }))
      .toEqual({ ...initialState, offers, isDataLoaded: true });
  });

  it('should update state.city by change city', () => {
    const state = { ...initialState, offers, isDataLoaded: true };
    const city = {
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
});
