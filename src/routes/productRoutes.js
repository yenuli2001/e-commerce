const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid product ID format'
    });
  }
  next();
};

// Routes
router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(validateObjectId, getProduct)
  .put(validateObjectId, updateProduct)
  .delete(validateObjectId, deleteProduct);

module.exports = router;