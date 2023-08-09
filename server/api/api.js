import express from 'express';
import userController from '../controller/controllerUsers.js';
import { authUser } from '../controller/controllerUsers.js';
import upload from '../middlewares/fileUpload/upload.js';
import controllerRestaurant from '../controller/controllerRestaurants.js';

const router = express.Router();

//contacts api router

//contacts/?page=1&limit=10&favorite=true



//users api router

router.post('/users/signup', userController.register);

router.post('/users/login', userController.login);

router.post('/users/logout', authUser, userController.logout);

router.get('/users/current', authUser, userController.currentUser);

router.patch(
  '/users/avatars',
  authUser,
  upload.single('avatar'),
  userController.uploadAvatar
);

router.get('/users/invitations', authUser, userController.getUserInvitations);

router.post(
  '/users/invitations/reject',
  authUser,
  userController.rejectUserInvitation
);

router.post(
  '/users/invitations/accept',
  authUser,
  userController.acceptUserInvitation
);
// Restaurants

router.post('/restaurants', authUser, controllerRestaurant.create);

router.get('/restaurants', authUser, controllerRestaurant.getUserRestaurants);

router.get(
  '/restaurants/:restaurantId',
  authUser,
  controllerRestaurant.getUserRestaurantById
);

router.delete(
  '/restaurants/:restaurantId',
  authUser,
  controllerRestaurant.removeRestaurant
);

router.post(
  '/restaurants/:restaurantId/tables',
  authUser,
  controllerRestaurant.createRestaurantTable
);

router.post(
  '/restaurants/:restaurantId/tables/remove',
  authUser,
  controllerRestaurant.removeRestaurantTable
);

router.patch(
  '/restaurants/:restaurantId/tables',
  authUser,
  controllerRestaurant.updateRestaurantTable
);
router.get(
  '/restaurants/:restaurantId/tables',
  authUser,
  controllerRestaurant.getRestaurantTables
);

router.get(
  '/restaurants/:restaurantId/colabolators',
  authUser,
  controllerRestaurant.getRestaurantColabolatorsAndOwner
);

router.get(
  '/restaurants/:restaurantId/overview',
  authUser,
  controllerRestaurant.getRestaurantOverview
);

router.patch(
  '/restaurants/:restaurantId/menu',
  authUser,
  controllerRestaurant.updateRestaurantMenu
);

router.post(
  '/restaurants/:restaurantId/invitations',
  authUser,
  controllerRestaurant.createInviteRestaurantColabolator
);

router.post(
  '/restaurants/:restaurantId/removeColabolator',
  authUser,
  controllerRestaurant.removeColabolatorRestaurant
);
router.patch(
  `/restaurants/:restaurantId/order`,
  authUser,
  controllerRestaurant.editTableOrder
);

router.post(
  `/restaurants/:restaurantId/order/complete`,
  authUser,
  controllerRestaurant.completeOrder
);
//By dodać zamówienie trzeba bedzie nowy obiekt zamówienia dodać push do tablicy orders danego stolika czyli ten stolik albo lepiej order trzeba wyszukać apotem table.orders.push(object)
export default router;
