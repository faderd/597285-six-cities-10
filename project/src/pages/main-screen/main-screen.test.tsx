import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeOffers } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { Offers } from '../../types/offer';
import { AuthorizationStatus } from '../../const';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import MainScreen from './main-screen';
import HistoryRouter from '../../components/history-router/history-router';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const offers: Offers = makeFakeOffers();

const history = createMemoryHistory();

describe('Component: MainScreen', () => {


  it('Should render correctly with offers', () => {
    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
      DATA: { ...getInitialStateAppData(), offers: offers, isDataLoaded: true },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-screen')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(`1 places to stay in ${store.getState().DATA?.city?.name}`)).toBeInTheDocument();
    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.queryByText(/No places to stay available/i)).not.toBeInTheDocument();
  });

  it('Should render correctly without offers', () => {
    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
      DATA: { ...getInitialStateAppData(), isDataLoaded: true },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-screen')).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.queryByText(`0 places to stay in ${store.getState().DATA?.city?.name}`)).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('offer-card').length).toBe(0);
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
    expect(screen.queryByText(/Sort by/i)).not.toBeInTheDocument();
  });
});
