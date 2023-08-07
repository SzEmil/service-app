import { jest, expect } from '@jest/globals';
import userService from '../../service/serviceUsers.js';
import userController from '../../controller/controllerUsers.js';
import { userSchemaLogin } from '../../controller/controllerUsers.js';
import jwt from 'jsonwebtoken';
import { fakeDB } from '../fakeDB.js';

userService.getUserById = jest.fn(_id => {
  return fakeDB.users.find(user => user._id.$oid === _id);
});

const mockId = '412c4ba4b95bdbc2df9';

describe('Logout function', () => {
    afterEach(() => {
        const index = fakeDB.users.findIndex(user => user._id.$oid === mockId);
        if (index !== -1) {
          fakeDB.users.splice(index, 1);
        }
      });

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

    await userController.logout(req, res);


    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      code: 401,
      ResponseBody: {
        message: 'Unauthorized',
      },
    });
  });

  it('should return 204 with status success on successful logout', async () => {
    const sampleUser = {
        _id: {
          $oid: mockId,
        },
        token: 'sampleToken',
        save: jest.fn().mockResolvedValueOnce(),
      };
      fakeDB.users.push(sampleUser);

    const req = {
      user: {
        _id: mockId,
      },
    };
     userService.getUserById = jest.fn().mockResolvedValueOnce(sampleUser);
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.logout(req, res);

    expect(sampleUser.token).toBeNull();
    expect(sampleUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      code: 204,
      ResponseBody: {
        message: 'Logout successful',
      },
    });
  });
});
