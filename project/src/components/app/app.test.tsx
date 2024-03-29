import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { createAPI } from '../../services/api';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offer';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { DEFAULT_CITY, getInitialStateAppData } from '../../store/app-data/app-data';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);
const offers: Offers = makeFakeOffers();

describe('Application Routing with authorization user', () => {
  const store = mockStore({
    USER: { authorizationStatus: AuthorizationStatus.Auth },
    DATA: { ...getInitialStateAppData(), isDataLoaded: true, offers: offers, nearbyOffers: offers, favoriteOffers: offers },
  });

  const history = createMemoryHistory();

  const fakeApp = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  );

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(new RegExp(`places to stay in ${DEFAULT_CITY.name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "MainScreen" when authorized user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp,);

    expect(screen.getByText(new RegExp(`places to stay in ${DEFAULT_CITY.name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer/2"', () => {
    history.push(generatePath(AppRoute.Room, { id: '2' }));

    render(fakeApp);

    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
    expect(screen.getByText('Go back to the main page')).toBeInTheDocument();
  });
});

describe('Application Routing with no authorization user', () => {
  const store = mockStore({
    USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    DATA: { ...getInitialStateAppData(), isDataLoaded: true, offers: offers, nearbyOffers: offers, favoriteOffers: offers },
  });

  const history = createMemoryHistory();

  const fakeApp = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </Provider>
  );

  it('should render "MainScreen" when no authorized user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp,);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });
});
