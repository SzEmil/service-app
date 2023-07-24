import Restaurant from './schemas/restaurant.js';
import Table from './schemas/table.js';
import Dish from './schemas/dish.js';
import Invitation from './schemas/invitation.js';

const getRestaurantsByOwner = async userId => {
  return await Restaurant.find({
    $and: [{ owner: userId }, { owner: { $exists: true } }],
  });
};

const getAllUserRestaurants = async (userId) => {
  return Restaurant.find({
    $or: [
      { owner: userId },
      { colabolators: { $in: [userId] } },
    ],
  });
};

const getRestaurantById = async (restaurantId, userId) => {
  return Restaurant.findOne({
    $or: [
      { owner: userId },
      { colabolators: { $in: [userId] } },
    ],
    _id: restaurantId,
    owner: { $exists: true },
  });
};

const getRestaurantOnlyById = async restaurantId => {
  return Restaurant.findOne({
    _id: restaurantId,
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

const getInvitationByEmailAndRestaurantName = async (email, restaurantName) => {
  return Invitation.findOne({
    $and: [
      { receiver: email },
      { receiver: { $exists: true } },
      { restaurantName: restaurantName },
    ],
  });
};

const getUserFromRestaurantColabolators = async (restaurantId, userId) => {
  return Restaurant.findOne({
    $and: [{ _id: restaurantId }, { colabolators: { $in: [userId] } }],
  });
};

const serviceRestaurant = {
  getRestaurantById,
  getRestaurantsByOwner,
  getRestaurantByName,
  getRestaurantTables,
  getRestaurantTableById,
  getDishById,
  getInvitationByEmailAndRestaurantName,
  getRestaurantOnlyById,
  getAllUserRestaurants
};
export default serviceRestaurant;
