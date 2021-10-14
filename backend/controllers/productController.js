import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const brand = req.query.keyword
    ? {
        brand: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({
    $and: [{ $or: [{ ...keyword }, { ...brand }] }],
  });
  res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    return res.status(404).json({ SysMessage: 'Product not found' });
  }
});

export { getProducts, getProductById };
