import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import NotFoundScreen from './not-found-screen';
import HistoryRouter from '../../components/history-router/history-router';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);


const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  const store = mockStore({
    USER: { ...getInitialStateUserProcess() },
    DATA: { ...getInitialStateAppData() },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to the main page')).toBeInTheDocument();
  });
});
