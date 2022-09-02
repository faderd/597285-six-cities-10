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
import ReviewForm, { CommentLength } from './review-form';
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

describe('Component: ReviewForm', () => {
  jest.setTimeout(10000);
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId='0' />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'terribly' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'badly' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'not bad' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'good' })).toBeInTheDocument();
    expect(screen.getByRole('radio', {name: 'perfect'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Your review' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  it('should submit disasbled when review incorrect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId='0' />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getByRole('button')).toBeDisabled();

    await userEvent.type(screen.getByRole('textbox'), new Array(CommentLength.Min - 1).fill('a').join(''));
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should submit enabled when review correct', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm offerId='0' />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getAllByRole('radio')[0]);
    await userEvent.type(screen.getByRole('textbox'), new Array(CommentLength.Min).fill('a').join(''));
    expect(screen.getByRole('button')).toBeEnabled();

    await userEvent.type(screen.getByRole('textbox'), new Array(CommentLength.Max - 1).fill('a').join(''));
    expect(screen.getByRole('button')).toBeEnabled();
  });
});
