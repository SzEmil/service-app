import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authInitialStateType } from './authSlice';

axios.defaults.baseURL = 'http://localhost:3001/api';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
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
      return response.data.ResponseBody.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.ResponseBody.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');

    removeAuthHeader();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

type AuthStateType = {
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

  if (!token) return thunkAPI.rejectWithValue('Valid token is not provided');

  setAuthHeader(token);
  try {
    const res = await axios.get('/users/current');
    return res.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
