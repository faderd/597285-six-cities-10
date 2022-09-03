import { render, screen } from '@testing-library/react';
import { makeFakeOffers } from '../../utils/mocks';
import { LOCATIONS } from '../../const';
import PropertyMap from './property-map';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const offers = makeFakeOffers();

const store = mockStore({
  USER: { ...getInitialStateUserProcess() },
  DATA: { ...getInitialStateAppData(), offers: offers, isDataLoaded: true },
});

const history = createMemoryHistory();

describe('Test PropertyMap component', () => {
  const city = LOCATIONS[0];
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyMap
            currentCity={city}
            currentOffer={offers[0]}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map').classList.contains('leaflet-container')).toBeTruthy();
  });
});
