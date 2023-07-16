import User from './schemas/user.js';

const getUsers = async () => {
  return User.find();
};

const getUserByEmail = async email => {
  return User.findOne({ email });
};
const getUserById = async _id => {
  return User.findOne({ _id });
};

const createUser = async ({ email, password }) => {
  return User.create({ email, password });
};

const userService = {
  getUsers,
  getUserByEmail,
  createUser,
  getUserById,
};
export default userService;
