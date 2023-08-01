import mongoose from 'mongoose';
const { Schema } = mongoose;

const invitationSchema = new Schema(
  {
    sender: {
      type: String,
      required: [true, 'Owner email is required'],
    },
    receiver: {
      type: String,
      required: [true, 'Receiver email is required'],
    },
    restaurantName: {
      type: String,
      required: [true, 'Restaurant name is required'],
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  },
  { versionKey: false, timestamps: true }
);

const Invitation = mongoose.model(
  'Invitation',
  invitationSchema,
  'invitations'
);
export default Invitation;
