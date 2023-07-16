import express from 'express';
import contactsController from '../controller/controllerContacts.js';
import userController from '../controller/controllerUsers.js';
import { authUser } from '../controller/controllerUsers.js';
import upload from '../middlewares/fileUpload/upload.js';

const router = express.Router();

//contacts api router

//contacts/?page=1&limit=10&favorite=true
router.get('/contacts', contactsController.get);

router.get('/contacts/:contactId', contactsController.getById);

router.post('/contacts', authUser, contactsController.create);

router.delete('/contacts/:contactId', authUser, contactsController.remove);

router.put('/contacts/:contactId', authUser, contactsController.update);

router.patch(
  '/contacts/:contactId/favorite',
  authUser,
  contactsController.updateStatus
);

//users api router
router.get('/users', userController.get);

router.post('/users/signup', userController.register);

router.post('/users/login', userController.login);

router.post('/users/logout', authUser, userController.logout);

router.get('/users/current', authUser, userController.currentUser);

router.get('/users/current/contacts', authUser, userController.currentContacts);

router.patch('/users', authUser, userController.subscriptionStatus);

router.patch(
  '/users/avatars',
  authUser,
  upload.single('avatar'),
  userController.uploadAvatar
);
export default router;
