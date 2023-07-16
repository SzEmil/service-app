import mongoose from 'mongoose';
const { Schema } = mongoose;

const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = mongoose.model('Contact', contacts, 'contacts');

export default Contact;
