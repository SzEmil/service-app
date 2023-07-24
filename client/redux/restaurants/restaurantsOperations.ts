import { createAsyncThunk } from '@reduxjs/toolkit';
import { restaurantsStateType } from './restaurantsSlice';
import axios from 'axios';
import { AuthStateType } from '../user/userOperations';

axios.defaults.baseURL = 'http://localhost:3001/api';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
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
      const response = await axios.post('/restaurants', credentials);
      return response.data.ResponseBody.restaurant;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
