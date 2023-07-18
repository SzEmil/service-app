import React from 'react';
import { restaurantType } from '../../types/restaurant';

type restaurantPropType = {
  restaurant: restaurantType;
};
export const RestaurantBlock = ({ restaurant }: restaurantPropType) => {
  return (
    <div>
      <p>{restaurant.createdAt}</p>
      <h2>{restaurant.name}</h2>
      <img src={restaurant.icon} alt={restaurant.name} />
      <p>Tables: {restaurant.tables?.length}</p>
    </div>
  );
};
