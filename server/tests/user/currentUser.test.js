import { jest, expect } from '@jest/globals';
import userService from '../../service/serviceUsers.js';
import userController from '../../controller/controllerUsers.js';
import { userSchemaLogin } from '../../controller/controllerUsers.js';
import jwt from 'jsonwebtoken';

describe('currentUser function', () => {
  it('should return 401 with status error when user is not authorized', async () => {
    const req = {
      user: {
        _id: 'incorrectId',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    userService.getUserById = jest.fn().mockResolvedValueOnce(null);

    const next = jest.fn();

    await userController.currentUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      code: 401,
      ResponseBody: {
        message: 'Unauthorized',
      },
    });
  });

  it('should return 200 with status success on successful currentUser check', async () => {
    const sampleUser = {
      _id: 'exampleId',
      username: 'sampleUsername',
      email: 'sample@example.com',
      avatarURL: 'sampleAvatarURL',
    };

    const req = {
      user: {
        _id: "exampleId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    userService.getUserById = jest.fn().mockResolvedValueOnce(sampleUser);

    await userController.currentUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'OK',
      code: 200,
      ResponseBody: {
        username: sampleUser.username,
        email: sampleUser.email,
        _id: sampleUser._id,
        avatarURL: sampleUser.avatarURL,
      },
    });
  });
});
