import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFavoriteOffers } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import FavoritesScreen from './favorites-screen';
import HistoryRouter from '../../components/history-router/history-router';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const offers = makeFakeFavoriteOffers();

const history = createMemoryHistory();

describe('Component: FavoritesScreen', () => {
  it('should render correctly when there is favorites offers', () => {
    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.Auth },
      DATA: { ...getInitialStateAppData(), favoriteOffers: offers },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });

  it('should render correctly when no favorites offers', () => {
    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.Auth },
      DATA: { ...getInitialStateAppData() },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    expect(screen.queryByTestId('offer-card')).not.toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
