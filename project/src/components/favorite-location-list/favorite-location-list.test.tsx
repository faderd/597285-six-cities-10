import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import { GroupedFavoritesOffers } from '../../types/offer';
import { makeFakeGroupedFavoritesOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import FavoriteLocationList from './favorite-location-list';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { Provider } from 'react-redux';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const history = createMemoryHistory();
const groupedFavoritesOffers: GroupedFavoritesOffers = makeFakeGroupedFavoritesOffers();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  DATA: { ...getInitialStateAppData(), isDataLoaded: true, favoriteOffers: groupedFavoritesOffers },
});

describe('Component: FavoriteLocationList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteLocationList groupedFavoritesOffers={groupedFavoritesOffers} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('should list empty when []', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteLocationList groupedFavoritesOffers={[]} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Paris/i)).not.toBeInTheDocument();
  });
});
