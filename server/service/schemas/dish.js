import mongoose from 'mongoose';
const { Schema } = mongoose;

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
  },
  { versionKey: false, timestamps: true }
);

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
