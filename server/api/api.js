import express from 'express';
import userController from '../controller/controllerUsers.js';
import { authUser } from '../controller/controllerUsers.js';
import upload from '../middlewares/fileUpload/upload.js';
import controllerRestaurant from '../controller/controllerRestaurants.js';

const router = express.Router();

//contacts api router

//contacts/?page=1&limit=10&favorite=true

//users api router
router.get('/users', userController.get);

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

// Restaurants
router.post('/restaurants', authUser, controllerRestaurant.create);

router.get('/restaurants', authUser, controllerRestaurant.getUserRestaurants);

router.get(
  '/restaurants/:restaurantId',
  authUser,
  controllerRestaurant.getUserRestaurantById
);

router.post(
  '/restaurants/:restaurantId/tables',
  authUser,
  controllerRestaurant.createRestaurantTable
);

router.get(
  '/restaurants/:restaurantId/tables',
  authUser,
  controllerRestaurant.getRestaurantTables
);
export default router;
