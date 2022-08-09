import { DEFAULT_CITY } from '../../const';
import { Offers } from '../../types/offer';
import { makeFakeOffers } from '../../utils/mocks';
import { fetchOffers } from '../api-actions';
import { appData, changeActiveCity } from './app-data';

const offers: Offers = makeFakeOffers();

describe('Reducer: appData', () => {
  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, { type: 'UNKNOWN' }))
      .toEqual({
        city: DEFAULT_CITY,
        offers: [],
        isDataLoaded: false,
      });
  });

  it('should update state by load offers', () => {
    const state = {
      city: DEFAULT_CITY,
      offers: [],
      isDataLoaded: false,
    };

    expect(appData.reducer(state, { type: fetchOffers.fulfilled.type, payload: offers }))
      .toEqual({
        city: DEFAULT_CITY,
        offers,
        isDataLoaded: true,
      });
  });

  it('should update state.city by change city', () => {
    const state = {
      city: DEFAULT_CITY,
      offers,
      isDataLoaded: true,
    };
    expect(appData.reducer(state, changeActiveCity({
      name: 'qwerty',
      location: {
        latitude: 123,
        longitude: 123,
        zoom: 123,
      }
    })))
      .toEqual({
        city: {
          name: 'qwerty',
          location: {
            latitude: 123,
            longitude: 123,
            zoom: 123,
          },
        },
        offers,
        isDataLoaded: true,
      });
  });
});
