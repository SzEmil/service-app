import { createSlice } from '@reduxjs/toolkit';
import { restaurantType } from '../../types/restaurant';
import { addRestaurant } from './restaurantsOperations';

export type restaurantsStateType = {
  restaurants: restaurantType[];
  currentRestaurant: restaurantType | null;
};
const restaurantInitialState: restaurantsStateType = {
  restaurants: [],
  currentRestaurant: null,
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
  },
});

export const { setRestaurantData, setCurrentRestaurant } =
  restaurantSlice.actions;
export const restaurantsReducer = restaurantSlice.reducer;
