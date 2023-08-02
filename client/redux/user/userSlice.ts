import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  getInvitationsData,
  rejectInvitation,
  acceptInvitation,
  changeUserAvatar,
} from './userOperations';

export type invitationType = {
  _id: string | null | undefined;
  sender: string | null | undefined;
  receiver: string | null | undefined;
  restaurantName: string | null | undefined;
  createdAt: string | null | undefined;
};
export type authInitialStateType = {
  user: {
    id: string | null | undefined;
    username: string | null;
    email: string | null;
    avatarURL: string | undefined;
  };
  token: string | null;
  isRefreshing: boolean;
  isLoggedIn: boolean;
  error: any;
  isLoading: boolean;

  invitations: {
    invitations: invitationType[];
    isLoading: boolean;
    error: any;
  };
};

const authInitialState: authInitialStateType = {
  user: { username: null, email: null, avatarURL: '', id: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,

  invitations: {
    invitations: [],
    isLoading: false,
    error: null,
  },
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    importInfoData: state => state,
    logoutSuccess: state => {
      (state.token = null),
        (state.error = null),
        (state.isLoggedIn = false),
        (state.user.avatarURL = ''),
        (state.user.email = null),
        (state.user.username = null);
    },
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
        (state.user.avatarURL = ''),
          (state.user.email = null),
          (state.user.username = null);
        state.user.id = null;
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
            avatarURL: string;
            token: string | null;
            _id: string | null;
          };
        }
      ) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.user.id = action.payload._id;
        state.user.avatarURL = action.payload.avatarURL;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
        state.isLoading = false;
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
        (state.user.avatarURL = ''),
          (state.user.email = null),
          (state.user.username = null);
        state.user.id = null;
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
              avatarURL: string;
              email: string | null;
              token: string | null;
              _id: string | null;
            };
          };
        }
      ) => {
        state.user.username = action.payload.user.username;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.user.avatarURL = action.payload.user.avatarURL;
        state.user.id = action.payload.user._id;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
        state.isLoading = false;
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
        (state.user.avatarURL = ''),
          (state.user.email = null),
          (state.user.username = null);
        state.user.id = null;
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
        state.user.id = action.payload._id;
        state.isLoggedIn = true;
        state.error = null;
        state.isRefreshing = false;
        state.isLoading = false;
      }
    );

    builder.addCase(logOut.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      (state.token = null),
        (state.error = null),
        (state.isLoggedIn = false),
        (state.user.avatarURL = ''),
        (state.user.email = null),
        (state.user.username = null);
      state.user.id = null;
      state.isLoading = false;
    });

    builder.addCase(getInvitationsData.pending, state => {
      state.invitations.isLoading = true;
      state.invitations.error = null;
    });
    builder.addCase(getInvitationsData.rejected, (state, action) => {
      state.invitations.isLoading = false;
      state.invitations.error = action.payload;
    });
    builder.addCase(getInvitationsData.fulfilled, (state, action) => {
      state.invitations.isLoading = false;
      state.invitations.error = null;
      state.invitations.invitations = [...action.payload];
    });

    builder.addCase(rejectInvitation.pending, state => {
      state.invitations.isLoading = true;
      state.invitations.error = null;
    });
    builder.addCase(rejectInvitation.rejected, (state, action) => {
      state.invitations.isLoading = false;
      state.invitations.error = action.payload;
    });
    builder.addCase(rejectInvitation.fulfilled, (state, action) => {
      state.invitations.isLoading = false;
      state.invitations.error = null;

      const indexToRemove = state.invitations.invitations.findIndex(
        invitation => invitation._id!.toString() === action.payload
      );
      state.invitations.invitations.splice(indexToRemove, 1);
    });

    builder.addCase(acceptInvitation.pending, state => {
      state.invitations.isLoading = true;
      state.invitations.error = null;
    });
    builder.addCase(acceptInvitation.rejected, (state, action) => {
      state.invitations.isLoading = false;
      state.invitations.error = action.payload;
    });
    builder.addCase(acceptInvitation.fulfilled, (state, action) => {
      state.invitations.isLoading = false;
      state.invitations.error = null;

      const indexToRemove = state.invitations.invitations.findIndex(
        invitation => invitation._id!.toString() === action.payload
      );
      state.invitations.invitations.splice(indexToRemove, 1);
    });

    builder.addCase(changeUserAvatar.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(changeUserAvatar.fulfilled, (state, action) => {
      state.user.avatarURL = action.payload;
    });
  },
});

export const { importInfoData, logoutSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
