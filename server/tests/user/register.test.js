import { jest, expect } from '@jest/globals';
import userService from '../../service/serviceUsers.js';
import userController from '../../controller/controllerUsers.js';
import { userSchemaLogin } from '../../controller/controllerUsers.js';
import User from '../../service/schemas/user.js';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';

userService.getUserByEmail = jest.fn();
userService.createUser = jest.fn();

const mockSetPassword = jest.fn();

const mockUser = {
  _id: 'sampleId',
  username: 'sampleUsername',
  password: '123456',
  email: 'sample@example.com',
  avatarURL: 'sampleAvatarURL',
};

describe('Login function', () => {
  it('Should return 400 if req.body is missing', async () => {
    const req = {
      body: undefined,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await userController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      ResponseBody: {
        message: 'Missing fields',
      },
      code: 400,
    });
  });

  it('should return 409 when email is already in database', async () => {
    const req = {
      body: {
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    userSchemaLogin.validateAsync = jest.fn().mockResolvedValueOnce({
      username: mockUser.username,
      email: mockUser.email,
      password: mockUser.password,
    });
    userService.getUserByEmail = jest.fn().mockResolvedValueOnce(mockUser);

    await userController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Conflict',
      code: 409,
      ResponseBody: {
        message: 'Email in use',
      },
    });
  });

  it('should return 201 with user data when user is created correctly', async () => {
    const req = {
      body: {
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    const hashedPassword = '#$%!%@!%!^!@_21@GS1_$@!@';

    userSchemaLogin.validateAsync = jest.fn().mockResolvedValueOnce({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    userService.getUserByEmail = jest.fn().mockResolvedValueOnce(null);

    userService.createUser = jest.fn().mockResolvedValueOnce({
      _id: 'sampleId',
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      token: null,
      avatarURL: 'sampleAvatarURL',
      setPassword: mockSetPassword,
      save: jest.fn().mockResolvedValue(this),
    });

    gravatar.url = jest.fn().mockReturnValueOnce('sampleAvatarURL');

    jwt.sign = jest.fn().mockReturnValueOnce('token');

    mockSetPassword.mockReturnValueOnce(hashedPassword);

    await userController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Created',
      code: 201,
      ResponseBody: {
        user: {
          username: req.body.username,
          email: req.body.email,
          token: 'token',
          avatarURL: 'sampleAvatarURL',
          _id: 'sampleId',
        },
      },
    });
  });
});
