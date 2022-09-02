import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import OfferCard from './offer-card';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { AuthorizationStatus } from '../../const';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const store = mockStore({
  USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
  DATA: { ...getInitialStateAppData() },
});

const history = createMemoryHistory();
const offer = makeFakeOffers()[0];

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCard
            offer={offer}
            articleClassName="fake"
            imageWrapperClassName="fake"
            imageWidth="10"
            imageHeight="10"
            cardInfoClassName="fake"
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
    expect(screen.getByAltText('Place')).toBeInTheDocument();
    expect(screen.getByText('€654')).toBeInTheDocument();
    expect(screen.getByText('Fake offer title')).toBeInTheDocument();
    expect(screen.getByText('House')).toBeInTheDocument();
  });
});
