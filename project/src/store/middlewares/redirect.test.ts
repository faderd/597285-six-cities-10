import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {AppRoute} from '../../const';
import {State} from '../../types/state';
import { redirectToPrevious } from '../app-data/action';
import { createBrowserHistory } from 'history';

const fakeHistory = createBrowserHistory();

// const fakeHistory = {
//   location: {pathname: ''},
//   push(path: string) {
//     this.location.pathname = path;
//   },
//   go() {},
// };

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {

  it('should be redirect to /login', () => {
    fakeHistory.push(AppRoute.Main);
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    fakeHistory.push(AppRoute.Login);
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    store.dispatch(redirectToPrevious());
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);

    expect(store.getActions()).toEqual([
      redirectToPrevious(),
    ]);
  });

  it('should not to be redirect / because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Main});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
