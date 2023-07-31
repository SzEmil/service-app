import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authInitialStateType } from './userSlice';
import { setCookie, destroyCookie } from 'nookies';
import { logoutSuccess } from './userSlice';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'http://localhost:3001/api';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const setCookieHeader = (token: string) => {
  setCookie(null, 'token', token, {
    maxAge: 3600,
    path: '/',
    sameSite: 'none',
    secure: true,
  });
};
const removeCookieHeader = () => {
  destroyCookie(null, 'token');
};

type credentialsRegisterType = {
  username: string;
  email: string;
  password: string;
};
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: credentialsRegisterType, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      console.log(response.data);
      setAuthHeader(response.data.ResponseBody.user.token);
      setCookieHeader(response.data.ResponseBody.user.token);
      return response.data.ResponseBody.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type credentialsLoginType = {
  email: string;
  password: string;
};
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: credentialsLoginType, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.ResponseBody.token);
      setCookieHeader(response.data.ResponseBody.token);
      return response.data.ResponseBody;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.auth?.token || '';

    if (!token) return thunkAPI.rejectWithValue('Valid token is not provided');
    setAuthHeader(token);
    await axios.post('/users/logout');
    removeCookieHeader();
    removeAuthHeader();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      removeCookieHeader();
      removeAuthHeader();
      thunkAPI.dispatch(logoutSuccess());
      return thunkAPI.rejectWithValue('Unauthorized');
    }

    return thunkAPI.rejectWithValue(error.message);
  }
});

export type AuthStateType = {
  auth: authInitialStateType;
};

export const refreshUser = createAsyncThunk<
  ReturnType<typeof axios.get>,
  undefined,
  { state: AuthStateType }
>('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AuthStateType;
  const token = state?.auth?.token || '';

  if (!token)
    return thunkAPI.rejectWithValue('Login or register to get access');

  setAuthHeader(token);
  setCookieHeader(token);
  try {
    const res = await axios.get('/users/current');
    return res.data.ResponseBody;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const getInvitationsData = createAsyncThunk(
  'user/getInvitationsData',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.auth?.token || '';

    if (!token)
      return thunkAPI.rejectWithValue('Login or register to get access');

    setAuthHeader(token);
    setCookieHeader(token);
    try {
      const res = await axios.get('/users/invitations');
      return res.data.ResponseBody.invitations;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

type idToDeleteType = {
  invitationId: string | null | undefined;
};
export const rejectInvitation = createAsyncThunk(
  'user/rejectInvitation',
  async (idToDelete: idToDeleteType, thunkAPI) => {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.auth?.token || '';

    if (!token)
      return thunkAPI.rejectWithValue('Login or register to get access');

    setAuthHeader(token);
    setCookieHeader(token);
    try {
      await axios.post('/users/invitations/reject', idToDelete);
      return idToDelete.invitationId;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

type idToAcceptType = {
  invitationId: string | null | undefined;
};
export const acceptInvitation = createAsyncThunk(
  'user/acceptInvitation',
  async (idToAccept: idToAcceptType, thunkAPI) => {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.auth?.token || '';

    if (!token)
      return thunkAPI.rejectWithValue('Login or register to get access');

    setAuthHeader(token);
    setCookieHeader(token);
    try {
      await axios.post('/users/invitations/accept', idToAccept);
      return idToAccept.invitationId;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

type createInvitationsCredentialsType = {
  email: string;
};

type invitationData = {
  credentials: createInvitationsCredentialsType;
  restaurantId: string | string[] | undefined;
};
export const createInvitation = createAsyncThunk(
  'user/createInvitation',
  async (invitationData: invitationData, thunkAPI) => {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.auth?.token || '';

    if (!token)
      return thunkAPI.rejectWithValue('Login or register to get access');

    setAuthHeader(token);
    setCookieHeader(token);
    try {
      const res = await axios.post(
        `/restaurants/${invitationData.restaurantId}/invitations`,
        invitationData.credentials
      );
      const message = res.data.ResponseBody.message;
      Notiflix.Notify.success(message);
      return;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message.ResponseBody.message);
    }
  }
);
type avatarDataType = {
  formData: any;
};
export const changeUserAvatar = createAsyncThunk(
  'user/changeUserAvatar',
  async (avatarData: avatarDataType, thunkAPI) => {
    const state = thunkAPI.getState() as AuthStateType;
    const token = state?.auth?.token || '';

    if (!token)
      return thunkAPI.rejectWithValue('Login or register to get access');

    setAuthHeader(token);
    setCookieHeader(token);
    try {
      const res = await axios.patch('/users/avatars', avatarData.formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Notiflix.Notify.success(res.data.ResponseBody.message);
      return res.data.ResponseBody.avatarURL;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
