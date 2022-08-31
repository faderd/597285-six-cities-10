import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from './private-route';
import HistoryRouter from '../history-router/history-router';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';

const history = createMemoryHistory();

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

describe('Test PrivateRoute component with no authorization user', () => {
  const store = mockStore({
    USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
    DATA: { ...getInitialStateAppData() },
  });

  it('should render Login page, when user not authorized', () => {
    history.push('/private');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>This is main page</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path={'/private'}
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
  });
});

describe('Test PrivateRoute component with authorization user', () => {
  const store = mockStore({
    USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.Auth },
    DATA: { ...getInitialStateAppData() },
  });

  it('should render Private Route, when user authorized', () => {
    history.push('/private');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>This is main page</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path={'/private'}
              element={
                <PrivateRoute>
                  <h1>Private Route</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
  });
});
