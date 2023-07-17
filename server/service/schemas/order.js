import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: {
    type: String,
  },
  // dishes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Dish',
  //   },
  // ],
  dishes: [
    {
      type: Object,
    },
  ],
  fullKcal: {
    type: Number,
    default: 0,
  },
  fullPrice: {
    type: Number,
    default: 0,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
});

const Order = mongoose.model('Order', orderSchema, 'orders');

export default Order;
