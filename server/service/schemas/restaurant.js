import mongoose from 'mongoose';
const { Schema } = mongoose;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    icon: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // menu: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Dish',
    //   },
    // ],
    menu: [
      {
        type: Object,
      },
    ],
    currency: {
      type: String,
      default: null,
    },
    // tables: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Table',
    //   },
    // ],
    overview: {
      totalOrders: {
        type: Number,
        default: 0,
      },
      cashEarned: {
        type: Number,
        default: 0,
      },
      topDishes: {
        type: Array,
        default: [],
      },
    },
    tables: [
      {
        type: Object,
      },
    ],
    colabolators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Restaurant = mongoose.model(
  'Restaurant',
  restaurantSchema,
  'restaurants'
);

export default Restaurant;
