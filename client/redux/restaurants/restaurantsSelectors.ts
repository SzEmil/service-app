import { restaurantsStateType } from './restaurantsSlice';
export const selectRestaurantsData = (state: {
  restaurants: restaurantsStateType;
}) => state.restaurants.restaurants;

export const selectState = (state: restaurantsStateType) => state;
