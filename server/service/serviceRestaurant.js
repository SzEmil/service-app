import Restaurant from './schemas/restaurant.js';
import Table from './schemas/table.js';
import Dish from './schemas/dish.js';

const getRestaurantsByOwner = async userId => {
  return await Restaurant.find({
    $and: [{ owner: userId }, { owner: { $exists: true } }],
  });
};

const getRestaurantById = async (restaurantId, userId) => {
  return Restaurant.findOne({
    $and: [
      { owner: userId },
      { _id: restaurantId },
      { owner: { $exists: true } },
    ],
  });
};

const getRestaurantByName = async (name, userId) => {
  return Restaurant.findOne({
    $and: [{ owner: userId }, { name: name }, { owner: { $exists: true } }],
  });
};

const getRestaurantTables = async (restaurantId, userId) => {
  return Table.find({
    $and: [
      { owner: userId },
      { owner: { $exists: true }, restaurant: restaurantId },
    ],
  });
};

const getRestaurantTableById = async (restaurantId, userId, tableId) => {
  return Table.find({
    $and: [
      { owner: userId },
      { owner: { $exists: true }, restaurant: restaurantId },
      { _id: tableId },
    ],
  });
};

const getDishById = async (dishId, restaurantId, userId) => {
  return Dish.findOne({
    $and: [
      { owner: userId },
      { owner: { $exists: true } },
      { _id: dishId },
      { owner: userId },
      { restaurant: restaurantId },
    ],
  });
};

const serviceRestaurant = {
  getRestaurantById,
  getRestaurantsByOwner,
  getRestaurantByName,
  getRestaurantTables,
  getRestaurantTableById,
  getDishById
};
export default serviceRestaurant;
