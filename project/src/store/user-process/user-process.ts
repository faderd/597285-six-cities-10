import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { UserData } from '../../types/user-data';
import { checkAuth, login, logout } from '../api-actions';

export const getInitialStateUserProcess = (): UserProcess => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  email: null,
  avatarUrl: null,
});

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState: getInitialStateUserProcess(),
  reducers: {
    storeUser: (state, action: PayloadAction<UserData>) => {
      state.avatarUrl = action.payload.avatarUrl;
      state.email = action.payload.email;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { storeUser } = userProcess.actions;
