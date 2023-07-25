import { createAsyncThunk } from '@reduxjs/toolkit';
import { restaurantsStateType } from './restaurantsSlice';
import axios from 'axios';
import { AuthStateType } from '../user/userOperations';
import { setCookie, destroyCookie } from 'nookies';
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

type restaurantCredentials = {
  name: string;
  menu: { name: string; description: string; kcal: number; price: number }[];
  icon: string;
};

export const addRestaurant = createAsyncThunk(
  'restaurants/add',
  async (credentials: restaurantCredentials, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.post('/restaurants', credentials);
      return response.data.ResponseBody.restaurant;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshRestaurantsData = createAsyncThunk(
  'restaurants/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.get('/restaurants');
      return response.data.ResponseBody.restaurants;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
type leaveRestaurantData = {
  restaurantId: string | string[] | undefined;
};
export const removeRestaurantColabolator = createAsyncThunk(
  'restaurants/removeColabolator',
  async (leaveRestaurantData: leaveRestaurantData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      await axios.post(`/restaurants/${leaveRestaurantData.restaurantId}/removeColabolator`);
      return leaveRestaurantData.restaurantId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);