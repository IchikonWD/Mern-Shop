import Mongoose from 'mongoose';

// Review System Schema

const reviewSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Product Schema

const productSchema = Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    manufacturer: {
      name: {
        type: String,
        required: true,
        unique: false,
      },
      cif: {
        type: String,
        required: true,
      },
      adress: {
        type: String,
        required: true,
      },
    },

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = Mongoose.model('Product', productSchema);

export default Product;
