import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const getEmail = (state: State) => state[NameSpace.User].email;

export const getAvatarUrl = (state: State) => state[NameSpace.User].avatarUrl;
