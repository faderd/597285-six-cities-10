import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuth, login, logout } from '../api-actions';
import { getInitialStateUserProcess, userProcess } from './user-process';

describe('Reducer: user', () => {
  let initialState: UserProcess | undefined;

  beforeEach(() => {
    initialState = getInitialStateUserProcess();
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN'}))
      .toEqual(initialState);
  });

  describe('checkAuth test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuth fulfilled', () => {
      expect(userProcess.reducer(initialState, { type: checkAuth.fulfilled.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.Auth});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthrejected', () => {
      expect(userProcess.reducer(initialState, { type: checkAuth.rejected.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('login test', () => {
    it('should update authorizationStatus to "AUTH" if login fulfilled', () => {
      expect(userProcess.reducer(initialState, { type: login.fulfilled.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.Auth});
    });
    it('should update authorizationStatus to "NO_AUTH" if login rejected', () => {
      expect(userProcess.reducer(initialState, { type: login.rejected.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('logout test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logout fulfilled', () => {
      expect(userProcess.reducer(initialState, { type: logout.fulfilled.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });
});
