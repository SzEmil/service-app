import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './authOperations';

export type authInitialStateType = {
  user: {
    username: string | null;
    email: string | null;
    avatarURL: string | null;
  };
  token: string | null;
  isRefreshing: boolean;
  isLoggedIn: boolean;
  error: any;
  isLoading: boolean;
};

const authInitialState: authInitialStateType = {
  user: { username: null, email: null, avatarURL: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    importInfoData: state => state,
  },
  extraReducers: builder => {
    builder.addCase(register.pending, (state: authInitialStateType) => {
      state.error = null;
      state.isLoading = true;
      state.isRefreshing = true;
    });
    builder.addCase(
      register.rejected,
      (state: authInitialStateType, action: { payload: any }) => {
        (state.isLoading = false),
          (state.isLoggedIn = false),
          (state.isRefreshing = false),
          (state.error = action.payload);
      }
    );
    builder.addCase(
      register.fulfilled,
      (
        state: authInitialStateType,
        action: {
          payload: {
            username: string | null;
            email: string | null;
            token: string | null;
          };
        }
      ) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
      }
    );

    builder.addCase(logIn.pending, (state: authInitialStateType) => {
      state.error = null;
      state.isLoading = true;
      state.isRefreshing = true;
    });
    builder.addCase(
      logIn.rejected,
      (state: authInitialStateType, action: { payload: any }) => {
        (state.isLoading = false),
          (state.isLoggedIn = false),
          (state.isRefreshing = false),
          (state.error = action.payload);
      }
    );
    builder.addCase(
      logIn.fulfilled,
      (
        state: authInitialStateType,
        action: {
          payload: {
            token: string | null;
            user: {
              username: string | null;
              email: string | null;
              token: string | null;
            };
          };
        }
      ) => {
        state.user.username = action.payload.user.username;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
      }
    );

    builder.addCase(refreshUser.pending, (state: authInitialStateType) => {
      state.error = null;
      state.isLoading = true;
      state.isRefreshing = true;
    });
    builder.addCase(
      refreshUser.rejected,
      (state: authInitialStateType, action: { payload: any }) => {
        (state.isLoading = false),
          (state.isLoggedIn = false),
          (state.isRefreshing = false),
          (state.error = action.payload);
      }
    );
    builder.addCase(
      refreshUser.fulfilled,
      (
        state: authInitialStateType,
        action: {
          payload: any;
        }
      ) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
      }
    );

    builder.addCase(logOut.pending, state => {
      state.isRefreshing = true;
    });
    builder.addCase(logOut.rejected, (state, action) => {});
    builder.addCase(logOut.fulfilled, (state, action) => {
      (state.token = null),
        (state.error = null),
        (state.isLoggedIn = false),
        (state.user.avatarURL = null),
        (state.user.email = null),
        (state.user.username = null);
    });
  },
});

export const { importInfoData } = authSlice.actions;
export const authReducer = authSlice.reducer;
