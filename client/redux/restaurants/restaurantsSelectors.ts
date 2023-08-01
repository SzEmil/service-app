import { restaurantsStateType } from './restaurantsSlice';
export const selectRestaurantsData = (state: {
  restaurants: restaurantsStateType;
}) => state.restaurants.restaurants;

export const selectState = (state: restaurantsStateType) => state;

export const selectCurrentRestaurant = (state: {
  restaurants: restaurantsStateType;
}) => state.restaurants.currentRestaurant;
 
export const selectCurrentRestaurantMenu = (state: {
  restaurants: restaurantsStateType;
}) => state.restaurants.currentRestaurant?.menu;

export const selectCurrentRestaurantOrder = (state: {
  restaurants: restaurantsStateType;
}) => state.restaurants.currentRestaurant?.menu;

export const selectCurrentRestaurantCurrency = (state: {
  restaurants: restaurantsStateType;
}) => state.restaurants.currentRestaurant?.currency;