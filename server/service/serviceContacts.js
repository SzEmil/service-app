import Contact from './schemas/contact.js';
import mongoose from 'mongoose';

const getAllContacts = async () => {
  return Contact.find();
};

const getPaginationContacts = async (page, limit, favorite) => {
  let query = Contact.find();
  if (favorite !== undefined) {
    query = query.find({ favorite: favorite });
  }
  return query
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};

const getContactById = async id => {
  return Contact.findOne({ _id: id });
};

const getUserContacts = async ({ id }) => {
  return Contact.find({
    $and: [
      { owner: new mongoose.Types.ObjectId(id) },
      { owner: { $exists: true } },
    ],
  });
};

const createContact = async ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const removeContact = async (contactId, userId) => {
  return Contact.findOneAndRemove({
    $and: [
      { _id: contactId },
      { owner: new mongoose.Types.ObjectId(userId) },
      { owner: { $exists: true } },
    ],
  });
};

const updateContact = async (id, fields, userId) => {
  return Contact.findOneAndUpdate(
    {
      $and: [
        { _id: id },
        { owner: new mongoose.Types.ObjectId(userId) },
        { owner: { $exists: true } },
      ],
    },
    { $set: fields },
    { new: true }
  );
};
const contactService = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  getUserContacts,
  getPaginationContacts,
};
export default contactService;
