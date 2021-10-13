import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import router from '../routes/orderRoutes.js';

// @desc    Create new order
// @route   Post /api/orders
// @access  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (
    !orderItems ||
    !shippingAddress ||
    !paymentMethod ||
    !itemsPrice ||
    !taxPrice ||
    !shippingPrice ||
    !totalPrice
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please enter all fields',
    });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      data: createdOrder,
    });
  }
});

// @desc    Get order by id
// @route   get /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name');
  if (!order) {
    return res.status(400).json({
      success: false,
      message: 'No order found',
    });
  } else {
    res.status(200).json({
      success: true,
      data: order,
    });
  }
});

export { addOrderItems, getOrderById };
