import mongoose from 'mongoose';
const { Schema } = mongoose;

const tableSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    icon: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    // orders: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Order',
    //   },
    // ],
    orders: [
      {
        type: Object,
      },
    ],
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

const Table = mongoose.model('Table', tableSchema, 'tables');

export default Table;
