import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getUser = (state: State) => state[NameSpace.User];

export const getAuthorizationStatus = (state: State) => getUser(state).authorizationStatus;

export const getEmail = (state: State) => getUser(state).email;

export const getAvatarUrl = (state: State) => getUser(state).avatarUrl;

export const isUserAuthorized = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const isAuthUnknown = (state: State) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Unknown;
