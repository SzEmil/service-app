import { jest, expect } from '@jest/globals';
import userService from '../../service/serviceUsers.js';
import userController from '../../controller/controllerUsers.js';
import { userSchemaLogin } from '../../controller/controllerUsers.js';
import jwt from 'jsonwebtoken';

userService.getUserByEmail = jest.fn();

const mockValidatePassword = jest.fn();

const mockUser = {
  _id: 'sampleId',
  username: 'sampleUsername',
  password: '123456',
  email: 'sample@example.com',
  avatarURL: 'sampleAvatarURL',
  validatePassword: mockValidatePassword,
};

describe('Login function', () => {
  it('should return 400 if req.body is missing', async () => {
    const req = {
      body: undefined,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      ResponseBody: {
        message: 'Missing fields',
      },
      code: 400,
    });
  });

  it('should return 400 when login or password are incorrect', async () => {
    const req = {
      body: {
        email: mockUser.email,
        password: mockUser.password,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userService.getUserByEmail = jest.fn().mockResolvedValueOnce(mockUser);
    mockValidatePassword.mockReturnValueOnce(false);

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      ResponseBody: {
        message: 'Invalid login or password',
      },
      code: 401,
    });
  });

  it('should return 200 with token and user data on successful login', async () => {
    const req = {
      body: {
        email: mockUser.email,
        password: mockUser.password,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userSchemaLogin.validateAsync = jest.fn().mockResolvedValueOnce({
      email: mockUser.email,
      password: mockUser.password,
    });

    userService.getUserByEmail.mockResolvedValueOnce(mockUser);

    mockValidatePassword.mockReturnValueOnce(true);

    jwt.sign = jest.fn().mockReturnValueOnce('sampleToken');

    mockUser.save = jest.fn().mockResolvedValueOnce(mockUser);

    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'User logged in successfully',
        token: 'sampleToken',
        user: {
          _id: mockUser._id,
          username: mockUser.username,
          email: mockUser.email,
          avatarURL: mockUser.avatarURL,
        },
      },
    });
  });
});
