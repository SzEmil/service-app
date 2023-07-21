import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authInitialStateType } from './authSlice';
import { setCookie, destroyCookie } from 'nookies';
import { logoutSuccess } from './authSlice';

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
  console.log(state);
  const token = state?.auth?.token || '';

  if (!token) return thunkAPI.rejectWithValue('Login or register to get access');

  setAuthHeader(token);
  setCookieHeader(token);
  try {
    const res = await axios.get('/users/current');
    return res.data.ResponseBody;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
