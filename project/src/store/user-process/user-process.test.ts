import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuth, login, logout } from '../api-actions';
import { userProcess } from './user-process';

describe('Reducer: user', () => {
  let state: UserProcess | undefined;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      email: null,
      avatarUrl: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        email: null,
        avatarUrl: null,
      });
  });

  describe('checkAuth test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuth fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuth.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          email: null,
          avatarUrl: null,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthrejected', () => {
      expect(userProcess.reducer(state, { type: checkAuth.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        });
    });
  });

  describe('login test', () => {
    it('should update authorizationStatus to "AUTH" if login fulfilled', () => {
      expect(userProcess.reducer(state, { type: login.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          email: null,
          avatarUrl: null,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if login rejected', () => {
      expect(userProcess.reducer(state, { type: login.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        });
    });
  });

  describe('logout test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logout fulfilled', () => {
      expect(userProcess.reducer(state, { type: logout.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          email: null,
          avatarUrl: null,
        });
    });
  });
});
