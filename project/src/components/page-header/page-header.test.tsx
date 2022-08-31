import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import HistoryRouter from '../history-router/history-router';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import PageHeader from './page-header';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const store = mockStore({
  USER: { ...getInitialStateUserProcess() },
  DATA: { ...getInitialStateAppData() },
});

const history = createMemoryHistory();

describe('Component: PageHeader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PageHeader />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('page-header')).toBeInTheDocument();
  });
});
