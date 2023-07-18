import { createSlice } from '@reduxjs/toolkit';
import { restaurantType } from '../../types/restaurant';

export type restaurantsStateType = {
  restaurants: restaurantType[];
};
const restaurantInitialState: restaurantsStateType = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: restaurantInitialState,
  reducers: {
    setRestaurantData(state, action) {
      state.restaurants = action.payload;
    },
  },
});

export const { setRestaurantData } = restaurantSlice.actions;
export const restaurantsReducer = restaurantSlice.reducer;
