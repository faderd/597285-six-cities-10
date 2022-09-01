import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import HistoryRouter from '../history-router/history-router';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action, Store, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { AppRoute, AuthorizationStatus } from '../../const';
import UserMenu from './user-menu';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const history = createMemoryHistory();

const fakeApp = (store: Store) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path={AppRoute.Login}
          element={<h1>This is login page</h1>}
        />
        <Route
          path={AppRoute.Favorites}
          element={<h1>This is favorites page</h1>}
        />
        <Route
          path='*'
          element={
            <UserMenu />
          }
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: UserMenu', () => {
  it('should render when user authorized', async () => {
    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.Auth },
      DATA: { ...getInitialStateAppData() },
    });

    history.push('/fake');

    render(fakeApp(store));

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.queryByText('This is login page')).not.toBeInTheDocument();
    expect(screen.queryByText('This is favorites page')).not.toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('link')[0]);
    expect(screen.getByText('This is favorites page')).toBeInTheDocument();
  });

  it('should render when user no authorized', async () => {
    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
      DATA: { ...getInitialStateAppData() },
    });

    history.push('/fake');

    render(fakeApp(store));

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(1);
    expect(screen.queryByAltText('User avatar')).not.toBeInTheDocument();
    expect(screen.queryByText('This is login page')).not.toBeInTheDocument();
    expect(screen.queryByText('This is favorites page')).not.toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('link')[0]);
    expect(screen.getByText('This is login page')).toBeInTheDocument();
  });
});
