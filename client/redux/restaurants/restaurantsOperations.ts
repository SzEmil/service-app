import { createAsyncThunk } from '@reduxjs/toolkit';
import { restaurantsStateType } from './restaurantsSlice';
import axios from 'axios';
import { AuthStateType } from '../user/userOperations';
import { setCookie, destroyCookie } from 'nookies';
import { orderType } from '../../types/restaurant';
import Notiflix from 'notiflix';
import { editRestaurantTableType } from '../../Components/EditTableForm/EditTableForm';
import { tableRemoveDataType } from '../../Components/TablesRestaurant/TablesRestaurant';
import { menuDataType } from '../../Components/MenuForm/MenuForm';
import { editOrderType } from '../../Components/EditOrderForm/EditOrderForm';


  // export const apiLink = "https://service-api-x2zr.onrender.com/api";
  export const apiLink = 'http://localhost:3001/api';

axios.defaults.baseURL = apiLink;

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
      await axios.post(
        `/restaurants/${leaveRestaurantData.restaurantId}/removeColabolator`
      );
      return leaveRestaurantData.restaurantId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type addRestaurantTable = {
  table: {
    name: string;
    description: string;
    orders: orderType[];
  };
  restaurantId: string | string[] | undefined;
};
export const addRestaurantTable = createAsyncThunk(
  'restaurants/addRestaurantTable',
  async (restaurantTableData: addRestaurantTable, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.post(
        `/restaurants/${restaurantTableData.restaurantId}/tables`,
        restaurantTableData.table
      );
      Notiflix.Notify.success(response.data.ResponseBody.message);
      return response.data.ResponseBody.table;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

type completeOrderData = {
  restaurantId: string | string[] | undefined;
  orderData: { orderId: string | undefined; tableId: string };
};
export const completeOrder = createAsyncThunk(
  'restaurants/completeOrder',
  async (completeOrderData: completeOrderData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.post(
        `/restaurants/${completeOrderData.restaurantId}/order/complete`,
        completeOrderData.orderData
      );
      Notiflix.Notify.success(response.data.ResponseBody.message);
      return completeOrderData.orderData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateRestaurantTable = createAsyncThunk(
  'restaurants/updateRestaurantTable',
  async (editTableData: editRestaurantTableType, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.patch(
        `/restaurants/${editTableData.restaurantId}/tables`,
        editTableData.table
      );
      Notiflix.Notify.success(response.data.ResponseBody.message);
      return response.data.ResponseBody;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeRestaurantTable = createAsyncThunk(
  'restaurants/removeRestaurantTable',
  async (tableRemoveData: tableRemoveDataType, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.post(
        `/restaurants/${tableRemoveData.restaurantId}/tables/remove`,
        tableRemoveData.table
      );
      Notiflix.Notify.success(response.data.ResponseBody.message);
      return tableRemoveData.table.tableId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateRestaurantMenu = createAsyncThunk(
  'restaurants/updateRestaurantMenu',
  async (menuData: menuDataType, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.patch(
        `/restaurants/${menuData.restaurantId}/menu`,
        menuData.menu
      );
      Notiflix.Notify.success(response.data.ResponseBody.message);
      return response.data.ResponseBody.menu;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getRestaurantColabolators = createAsyncThunk(
  'restaurants/getRestaurantColabolators',
  async (restaurantId: string | string[] | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.get(
        `/restaurants/${restaurantId}/colabolators`
      );
      return response.data.ResponseBody.colabolators;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeRestaurant = createAsyncThunk(
  'restaurants/removeRestaurant',
  async (restaurantId: string | string[] | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.delete(`/restaurants/${restaurantId}`);
      Notiflix.Notify.success(response.data.ResponseBody.message);

      return response.data.ResponseBody.restaurantId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editOrder = createAsyncThunk(
  'restaurants/editOrder',
  async (orderObjData: editOrderType, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.patch(
        `/restaurants/${orderObjData.restaurantId}/order`,
        orderObjData.ordersData
      );
      Notiflix.Notify.success(response.data.ResponseBody.message);

      return response.data.ResponseBody.orderData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshTablesData = createAsyncThunk(
  'restaurants/refreshTablesData',
  async (restaurantId:string | string[] | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.get(`/restaurants/${restaurantId}/tables`);
      return response.data.ResponseBody.tables;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getRestaurantOverview = createAsyncThunk(
  'restaurants/getRestaurantOverview',
  async (restaurantId:string | string[] | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as AuthStateType;
      const token = state?.auth?.token || '';

      if (!token)
        return thunkAPI.rejectWithValue('Valid token is not provided');
      setAuthHeader(token);
      setCookieHeader(token);
      const response = await axios.get(`/restaurants/${restaurantId}/overview`);
      return response.data.ResponseBody.overviewData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);