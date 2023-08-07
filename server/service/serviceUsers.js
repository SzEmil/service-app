import User from './schemas/user.js';
import Invitation from './schemas/invitation.js';
const getUsers = async () => {
  return User.find();
};

const getUserByEmail = async email => {
  return User.findOne({ email });
};
const getUserById = async _id => {
  return User.findOne({ _id });
};

const createUser = async (username, email) => {
  return User.create({ username, email });
};

const getInvitationByEmail = async email => {
  return Invitation.find({
    $and: [{ receiver: email }, { receiver: { $exists: true } }],
  });
};

const deleteInvitationById = async id => {
  return Invitation.findOneAndRemove({ _id: id });
};

const getInvitationById = async id => {
  return Invitation.findOne({ _id: id });
};

const getRestaurantColabolators = usersId => {
  return User.find({ _id: { $in: [usersId] } });
};

const userService = {
  getUsers,
  getUserByEmail,
  createUser,
  getUserById,
  getInvitationByEmail,
  deleteInvitationById,
  getInvitationById,
  getRestaurantColabolators,
};
export default userService;
