import { createSlice } from '@reduxjs/toolkit';
import { restaurantType } from '../../types/restaurant';
import { addRestaurant, refreshRestaurantsData, removeRestaurantColabolator } from './restaurantsOperations';

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

    builder.addCase(refreshRestaurantsData.fulfilled, (state, action) => {
      state.restaurants = [...action.payload]
    })

    builder.addCase(removeRestaurantColabolator.fulfilled, (state, action) => { 
      const indexToRemove = state.restaurants.findIndex(
        restaurant => restaurant._id!.toString() === action.payload
      );
      state.restaurants.splice(indexToRemove, 1);
    })
  },
});

export const { setRestaurantData, setCurrentRestaurant } =
  restaurantSlice.actions;
export const restaurantsReducer = restaurantSlice.reducer;
