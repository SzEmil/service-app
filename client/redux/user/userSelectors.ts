import { authInitialStateType } from './userSlice';

export const selectAuthUser = (state: { auth: authInitialStateType }) =>
  state.auth;

export const selectAuthUserData = (state: { auth: authInitialStateType }) =>
  state.auth.user;

export const selectAuthUserIsLoggedIn = (state: {
  auth: authInitialStateType;
}) => state.auth.isLoggedIn;

export const selectAuthUserIsLoading = (state: {
  auth: authInitialStateType;
}) => state.auth.isLoading;

export const selectAuthUserIsRefreshing = (state: {
  auth: authInitialStateType;
}) => state.auth.isRefreshing;

export const selectAuthUserInvitations = (state: {
  auth: authInitialStateType;
}) => state.auth.invitations.invitations;

export const selectIsServerConnected = (state: {
  auth: authInitialStateType;
}) => state.auth.serverConnected;
