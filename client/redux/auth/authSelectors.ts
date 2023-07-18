import { authInitialStateType } from './authSlice';

export const selectAuthUser = (state: { auth: authInitialStateType }) =>
  state.auth;

  export const selectAuthUserIsLoggedIn = (state: { auth: authInitialStateType }) =>
  state.auth.isLoggedIn;

  export const selectAuthUserIsRefreshing = (state: { auth: authInitialStateType }) =>
  state.auth.isRefreshing;
