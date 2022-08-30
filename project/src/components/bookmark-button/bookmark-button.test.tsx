import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import BookmarkButton from './bookmark-button';
import { makeFakeOffers } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const offers: Offers = makeFakeOffers();

const history = createMemoryHistory();

describe('Component: BookmarkButton', () => {
  const store = mockStore({
    USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    DATA: { ...getInitialStateAppData(), isDataLoaded: true, offers: offers, nearbyOffers: offers, favoriteOffers: offers },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BookmarkButton
            offer={offers[0]}
            className="FakeButton"
            iconHeight={10}
            iconWidth={10}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to "/login" when unauthorized user clicks', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path='*'
              element={
                <BookmarkButton
                  offer={offers[0]}
                  className="FakeButton"
                  iconHeight={10}
                  iconWidth={10}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });
});
