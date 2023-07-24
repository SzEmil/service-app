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
    // tables: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Table',
    //   },
    // ],
    tables: [
      {
        type: Object,
      },
    ],
    colabolators: [
      {
        type: Schema.Types.ObjectId,
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
