import Restaurant from './schemas/restaurant.js';
import Table from './schemas/table.js';
import Dish from './schemas/dish.js';
import Invitation from './schemas/invitation.js';
import Order from './schemas/order.js';
import mongoose from 'mongoose';

const getRestaurantsByOwner = async (userId, restaurantId) => {
  return await Restaurant.findOne({
    $and: [
      { owner: userId },
      { owner: { $exists: true } },
      { _id: restaurantId },
    ],
  });
};

const getAllUserRestaurants = async userId => {
  return Restaurant.find({
    $or: [{ owner: userId }, { colabolators: { $in: [userId] } }],
  });
};

const getRestaurantByColabolator = async (userId, restaurantId) => {
  return Restaurant.findOne({
    $and: [{ colabolators: { $in: [userId] } }, { _id: restaurantId }],
  });
};

const getRestaurantById = async (restaurantId, userId) => {
  return Restaurant.findOne({
    $or: [{ owner: userId }, { colabolators: { $in: [userId] } }],
    _id: restaurantId,
    owner: { $exists: true },
  });
};

const getUserRestaurantById = async (restaurantId, userId) => {
  return Restaurant.findOne({
    $and: [{ owner: userId }, { _id: restaurantId }],
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

const getRestaurantTables = async restaurantId => {
  return Table.find({
    $and: [{ restaurant: restaurantId }],
  });
};

const getRestaurantTableById = async (restaurantId, tableId) => {
  return Table.findOne({
    $and: [{ restaurant: restaurantId }, { _id: tableId }],
  });
};

const getRestaurantTableOrderById = async (restaurantId, tableId, orderId) => {
  return Order.findOne({
    $and: [{ restaurant: restaurantId }, { _id: orderId }, { table: tableId }],
  });
};

const removeRestaurantTableOrderById = async (
  restaurantId,
  tableId,
  orderId
) => {
  return Order.findOneAndRemove({
    $and: [{ restaurant: restaurantId }, { _id: orderId }, { table: tableId }],
  });
};

const removeRestaurantTable = (restaurantId, tableId) => {
  return Table.findOneAndRemove({
    $and: [{ restaurant: restaurantId }, { _id: tableId }],
  });
};

const getDishById = async (dishId, restaurantId, userId) => {
  return Dish.findOne({
    $and: [
      { owner: { $exists: true } },
      { _id: dishId },
      { owner: userId },
      { restaurant: restaurantId },
    ],
  });
};

const getDishOnlyById = async (dishId, restaurantId) => {
  return Dish.findOne({
    $and: [{ _id: dishId }, { restaurant: restaurantId }],
  });
};

const getAllRestaurantDishes = async restaurantId => {
  return Dish.find({ restaurant: restaurantId });
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

const removeDishesFromRestaurant = async (dishesToDelete, restaurantId) => {
  const dishIds = dishesToDelete.map(
    dishId => new mongoose.Types.ObjectId(dishId)
  );
  Dish.deleteMany({
    $and: [{ restaurant: restaurantId }, { _id: { $in: dishIds } }],
  });
};

const removeRestaurant = async (userId, restaurantId) => {
  return Restaurant.findOneAndRemove({
    $and: [{ _id: restaurantId }, { owner: userId }],
  });
};

const serviceRestaurant = {
  getAllRestaurantDishes,
  removeRestaurant,
  getRestaurantById,
  getRestaurantsByOwner,
  getRestaurantByName,
  getRestaurantTables,
  getRestaurantTableById,
  getDishById,
  getInvitationByEmailAndRestaurantName,
  getRestaurantOnlyById,
  getAllUserRestaurants,
  getRestaurantByColabolator,
  getUserRestaurantById,
  getRestaurantTableOrderById,
  removeRestaurantTableOrderById,
  removeRestaurantTable,
  removeDishesFromRestaurant,
  getDishOnlyById,
};
export default serviceRestaurant;
