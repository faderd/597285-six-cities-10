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
import SortingForm, { SORTING_TYPES } from './sorting-form';
import userEvent from '@testing-library/user-event';

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

describe('Component: SortingForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortingForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(SORTING_TYPES.length);
  });

  it('should open sorting when user click sort-button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortingForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('sort-button'));
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
  });

  it('should close sorting when user click sort-button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortingForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('sort-button'));
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await userEvent.click(screen.getByText('Top rated first'));
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });
});
