import { createSlice } from '@reduxjs/toolkit';
import { restaurantType } from '../../types/restaurant';
import {
  addRestaurant,
  refreshRestaurantsData,
  removeRestaurantColabolator,
  addRestaurantTable,
  completeOrder,
} from './restaurantsOperations';

export type restaurantsStateType = {
  restaurants: restaurantType[];
  currentRestaurant: restaurantType | null;
  error: any;
};
const restaurantInitialState: restaurantsStateType = {
  restaurants: [],
  currentRestaurant: null,
  error: null,
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
  },
});

export const { setRestaurantData, setCurrentRestaurant } =
  restaurantSlice.actions;
export const restaurantsReducer = restaurantSlice.reducer;
