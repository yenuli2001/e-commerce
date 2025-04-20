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

// Validation middleware to ensure ID is a valid MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid product ID format' 
    });
  }
  next();
};

router.route('/')
  .get(getProducts)
  .post(createProduct);

// Add validation middleware to all routes that use ID parameter
router.route('/:id')
  .get(validateObjectId, getProduct)
  .put(validateObjectId, updateProduct)
  .delete(validateObjectId, deleteProduct);

module.exports = router;