import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const decoded = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      return res.status(401).json({
        error: 'Unauthorized request',
      });
    }
  } else {
    console.log('No token found');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
});

export default protect;
