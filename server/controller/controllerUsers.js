import userService from '../service/serviceUsers.js';
import joi from 'joi';
import User from '../service/schemas/user.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import contactService from '../service/serviceContacts.js';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import path from 'path';
import { nanoid } from 'nanoid';
import { storeImageDir } from '../middlewares/fileUpload/upload.js';
import fs from 'fs/promises';
import serviceRestaurant from '../service/serviceRestaurant.js';
import { join } from 'path';

dotenv.config();

const secret = process.env.SECRET;

export const userSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const userSchemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const userSubscriptionSchema = joi.object({
  subscription: ['starter', 'pro', 'business'],
});

export const authUser = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (error, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      const foundUser = await userService.getUserByEmail(user.email);

      if (foundUser.token !== user.token) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          ResponseBody: {
            message: 'Unauthorized: Invalid token',
          },
        });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const get = async (req, res, next) => {
  try {
    const results = await userService.getUsers();

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        users: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  if (!req.body)
    return res.status(400).json({
      status: 'error',
      ResponseBody: {
        message: 'Missing fields',
      },
      code: 400,
    });
  try {
    const value = await userSchema.validateAsync(req.body);
    const { username, email, password } = value;

    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(409).json({
        status: 'Conflict',
        code: 409,
        ResponseBody: {
          message: 'Email in use',
        },
      });
    }
    try {
      const newUser = await userService.createUser(username, email);
      newUser.setPassword(password);
      const avatarURL = gravatar.url(newUser.email, {
        protocol: 'https',
        s: '100',
      });
      newUser.avatarURL = avatarURL;

      const payload = {
        id: newUser._id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: '12h' });
      newUser.token = token;
      await newUser.save();

      return res.status(201).json({
        status: 'Created',
        code: 201,
        ResponseBody: {
          user: {
            username: newUser.username,
            email: newUser.email,
            token: newUser.token,
            avatarURL,
            _id: newUser._id,
          },
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      ResponseBody: {
        message: error.message,
      },
    });
    next(error);
  }
};

const login = async (req, res, next) => {
  if (!req.body)
    return res.status(400).json({
      status: 'error',
      ResponseBody: {
        message: 'Missing fields',
      },
      code: 400,
    });
  try {
    const value = await userSchemaLogin.validateAsync(req.body);
    const { email, password } = value;
    const user = await userService.getUserByEmail(email);

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Invalid login or password',
        },
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '12h' });
    user.token = token;
    await user.save();

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'User logged in successfully',
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      ResponseBody: {
        message: error.message,
      },
    });
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);

    user.token = null;
    await user.save();
    return res.status(204).json({
      status: 'success',
      code: 204,
      ResponseBody: {
        message: 'Logout successful',
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      ResponseBody: {
        message: 'Unauthorized',
      },
    });
  }
};

const currentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    return res.status(200).json({
      status: 'OK',
      code: 200,
      ResponseBody: {
        username: user.username,
        email: user.email,
        _id: user._id,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    const oldAvatarPath = user.avatarURL;
    const newOldAvatarPath = join('public', oldAvatarPath);

    const file = req.file;
    if (!file)
      return res
        .status(400)
        .json({ status: false, code: 400, message: 'Missing file' });

    const avatarPath = file.path;
    Jimp.read(avatarPath)
      .then(image => {
        return image.resize(250, 250);
      })
      .catch(error => console.log(error));

    const newAvatarName = `${nanoid()}_${user._id}_${file.originalname}`;
    const destinationPath = path.join(storeImageDir, newAvatarName);
    try {
      await fs.rename(avatarPath, destinationPath);
      if (!oldAvatarPath.includes('gravatar')) {
        fs.unlink(newOldAvatarPath);
      }
    } catch (error) {
      await fs.unlink(avatarPath);
      return next(error);
    }

    user.avatarURL = `/avatars/${newAvatarName}`;
    await user.save();
    return res.status(200).json({
      status: 'success',
      message: 'Avatar uploaded successfully',
      ResponseBody: {
        avatarURL: user.avatarURL,
        message: 'Avatar was successfully uploaded',
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserInvitations = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      const results = await userService.getInvitationByEmail(user.email);

      user.invitations = [...results];
      await user.save();
      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          invitations: user.invitations,
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const rejectUserInvitation = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      const { invitationId } = req.body;

      const results = await userService.deleteInvitationById(invitationId);
      if (!results) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found invitation with id ${invitationId}`,
          },
        });
      }
      const indexToRemove = user.invitations.findIndex(
        invitation => invitation._id.toString() === invitationId
      );

      if (indexToRemove === -1) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found user with invitation with id ${invitationId}`,
          },
        });
      }
      user.invitations.splice(indexToRemove, 1);
      await user.save();

      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          message: 'Invitation removed successfully',
          invitation: results,
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const acceptUserInvitation = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      const { invitationId } = req.body;

      const invitation = await userService.getInvitationById(invitationId);
      if (!invitation) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found invitation with id ${invitationId}`,
          },
        });
      }

      await userService.deleteInvitationById(invitationId);

      const indexToRemove = user.invitations.findIndex(
        invitation => invitation._id.toString() === invitationId
      );

      if (indexToRemove === -1) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found user with invitation with id ${invitationId}`,
          },
        });
      }
      user.invitations.splice(indexToRemove, 1);

      const restaurant = await serviceRestaurant.getRestaurantOnlyById(
        invitation.restaurantId
      );

      if (!restaurant) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found restaurant with id ${invitation.restaurantId}`,
          },
        });
      }
      restaurant.colabolators.push(user._id);
      await restaurant.save();
      await user.save();
      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          message: `User with id ${user._id} is added to restaurant ${restaurant.name}`,
          restaurant: restaurant,
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// const getRestaurantColabolators = colabolators => {
//   return User.findOne({ _id: { $in: colabolators } });
// };

const userController = {
  get,
  register,
  login,
  logout,
  currentUser,
  uploadAvatar,
  getUserInvitations,
  rejectUserInvitation,
  acceptUserInvitation,
};
export default userController;
