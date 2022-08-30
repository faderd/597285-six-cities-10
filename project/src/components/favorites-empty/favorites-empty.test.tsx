import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import HistoryRouter from '../history-router/history-router';
import FavoritesEmpty from './favorites-empty';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const history = createMemoryHistory();

const store = mockStore({
  USER: { ...getInitialStateUserProcess() },
  DATA: { ...getInitialStateAppData(), isDataLoaded: true},
});

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesEmpty />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
