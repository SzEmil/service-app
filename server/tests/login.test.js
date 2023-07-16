import userController from '../controller/controllerUsers.js';
import { jest, expect } from '@jest/globals';
import connectToTestDatabase from './db.test.js';

describe('login', function () {
  let req, res, next;

  beforeAll(async () => {
    await connectToTestDatabase();
  });

  beforeEach(() => {
    req = { body: { email: 'admin@wp.pl', password: 'admin123' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return success response with token and user details', async done => {
    await userController.login(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      code: 200,
      ResponseBody: {
        token: expect.any(String),
        user: {
          _id: expect.any(String),
          email: expect.any(String),
          subscription: expect.any(String),
        },
      },
    });

    done();
  }, 20000);
});
