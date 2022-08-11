import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getUser = (state: State) => state[NameSpace.User];

export const getAuthorizationStatus = (state: State) => getUser(state).authorizationStatus;

export const getEmail = (state: State) => getUser(state).email;

export const getAvatarUrl = (state: State) => getUser(state).avatarUrl;
