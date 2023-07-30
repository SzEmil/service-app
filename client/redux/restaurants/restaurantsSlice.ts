import { createSlice } from '@reduxjs/toolkit';
import { restaurantType } from '../../types/restaurant';
import {
  addRestaurant,
  refreshRestaurantsData,
  removeRestaurantColabolator,
  addRestaurantTable,
  completeOrder,
  updateRestaurantTable,
  removeRestaurantTable,
  updateRestaurantMenu,
  getRestaurantColabolators,
} from './restaurantsOperations';
import { userType } from '../../types/user';

export type restaurantsStateType = {
  restaurants: restaurantType[];
  currentRestaurant: restaurantType | null;
  error: any;

  colabolators: userType[] | [];
};
const restaurantInitialState: restaurantsStateType = {
  restaurants: [],
  currentRestaurant: null,
  error: null,
  colabolators: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: restaurantInitialState,
  reducers: {
    setRestaurantData(state, action) {
      state.restaurants = action.payload;
    },
    setCurrentRestaurant(state, action) {
      state.currentRestaurant = action.payload;
    },
    setCurrentRestaurantColabolators(state, action) {
      state.error = null;
      state.colabolators = [...action.payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(addRestaurant.fulfilled, (state, action) => {
      state.restaurants = [action.payload, ...state.restaurants];
    });

    builder.addCase(refreshRestaurantsData.fulfilled, (state, action) => {
      state.restaurants = [...action.payload];
    });

    builder.addCase(removeRestaurantColabolator.fulfilled, (state, action) => {
      const indexToRemove = state.restaurants.findIndex(
        restaurant => restaurant._id!.toString() === action.payload
      );
      state.restaurants.splice(indexToRemove, 1);
    });

    builder.addCase(addRestaurantTable.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addRestaurantTable.fulfilled, (state, action) => {
      state.error = null;
      if (state.currentRestaurant) {
        state.currentRestaurant.tables = [
          action.payload,
          ...(state.currentRestaurant.tables || []),
        ];
      }
    });

    builder.addCase(completeOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(completeOrder.fulfilled, (state, action) => {
      state.error = null;
      const table = state.currentRestaurant?.tables?.find(
        table => table._id === action.payload.tableId
      );
      const indexToRemove = table!.orders.findIndex(
        order => order._id!.toString() === action.payload.orderId
      );
      table?.orders.splice(indexToRemove, 1);
    });

    builder.addCase(updateRestaurantTable.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateRestaurantTable.fulfilled, (state, action) => {
      state.error = null;

      let tableToUpdate = state.currentRestaurant?.tables?.find(
        table => table._id === action.payload.table._id
      );

      if (tableToUpdate) {
        Object.assign(tableToUpdate, action.payload.table);
      }
    });

    builder.addCase(removeRestaurantTable.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(removeRestaurantTable.fulfilled, (state, action) => {
      state.error = null;
      const tableIndexToRemove = state.currentRestaurant?.tables?.findIndex(
        table => table._id.toString() === action.payload.toString()
      );

      if (tableIndexToRemove !== undefined) {
        state.currentRestaurant?.tables?.splice(tableIndexToRemove, 1);
      }
    });

    builder.addCase(updateRestaurantMenu.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateRestaurantMenu.fulfilled, (state, action) => {
      state.error = null;
      state.currentRestaurant!.menu = action.payload;
    });

    builder.addCase(getRestaurantColabolators.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getRestaurantColabolators.fulfilled, (state, action) => {
      state.error = null;
      state.colabolators = [...action.payload];
    });
  },
});

export const {
  setRestaurantData,
  setCurrentRestaurant,
  setCurrentRestaurantColabolators,
} = restaurantSlice.actions;
export const restaurantsReducer = restaurantSlice.reducer;
