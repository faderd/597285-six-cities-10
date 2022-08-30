import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { LOCATIONS } from '../../const';
import { DEFAULT_CITY, getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import LocationsList from './locations-list';

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
  DATA: { ...getInitialStateAppData() },
});

describe('Component: LocationsList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationsList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('link').length).toBe(LOCATIONS.length);
    expect(store.getState().DATA?.city).toBe(DEFAULT_CITY);
  });
});
