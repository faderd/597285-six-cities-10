import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeOffers } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import PropertyScreen from './property-screen';
import HistoryRouter from '../../components/history-router/history-router';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const offers = makeFakeOffers();

// подсунем моковые параметры useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '2',
  }),
  useRouteMatch: () => ({ url: '/offer/2' }),
}));

describe('Component: ProperyScreen', () => {

  it('should render correctly and render review-form when user authorize', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.Auth },
      DATA: { ...getInitialStateAppData(), offers: offers, isDataLoaded: true },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('property-screen')).toBeInTheDocument();
    expect(screen.getByText('Fake offer title')).toBeInTheDocument();
    expect(screen.getByText('3.3')).toBeInTheDocument();
    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getByText('2 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 3 adults')).toBeInTheDocument();
    expect(screen.getByText(/654/)).toBeInTheDocument();
    expect(screen.getByText('Fake description.')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('property-location-list')).toBeInTheDocument();
  });

  it('should don\'t render review-form when user no authorize', () => {
    const history = createMemoryHistory();

    const store = mockStore({
      USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
      DATA: { ...getInitialStateAppData(), offers: offers, isDataLoaded: true },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });
});
