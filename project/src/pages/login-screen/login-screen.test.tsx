import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { getInitialStateAppData } from '../../store/app-data/app-data';
import { getInitialStateUserProcess } from '../../store/user-process/user-process';
import { Provider } from 'react-redux';
import LoginScreen from './login-screen';
import HistoryRouter from '../../components/history-router/history-router';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middleWares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleWares);

const history = createMemoryHistory();

describe('Component: LoginScreen', () => {
  const store = mockStore({
    USER: { ...getInitialStateUserProcess(), authorizationStatus: AuthorizationStatus.NoAuth },
    DATA: { ...getInitialStateAppData() },
  });

  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Email'), 'abc@abc.abc');
    await userEvent.type(screen.getByPlaceholderText('Password'), '123abc');

    expect(screen.getByDisplayValue(/abc@abc.abc/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123abc/i)).toBeInTheDocument();
  });

  it('should submit when clicked button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Email'), 'abc@abc.abc');
    await userEvent.type(screen.getByPlaceholderText('Password'), '123abc');
    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();
    expect(actions[0].type).toContain('user/login');

  });
});
