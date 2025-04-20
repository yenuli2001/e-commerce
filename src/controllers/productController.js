const Product = require('../models/product');
const mongoose = require('mongoose');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format',
      });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    // Extract fields from req.body for better security
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Create product with validated fields
    const productData = {};
    
    // Add string validation
    if (name && typeof name === 'string') productData.name = name;
    if (description && typeof description === 'string') productData.description = description;
    if (category && typeof category === 'string') productData.category = category;
    if (imageUrl && typeof imageUrl === 'string') productData.imageUrl = imageUrl;
    
    // Add numerical validation
    if (price !== undefined) {
      const numPrice = Number(price);
      if (!isNaN(numPrice)) {
        productData.price = numPrice;
      }
    }
    
    if (stock !== undefined) {
      const numStock = Number(stock);
      if (!isNaN(numStock)) {
        productData.stock = numStock;
      }
    }
    
    // Create with a new object to avoid direct use of user input
    const product = await Product.create({...productData});
    
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.error('Error creating product:', error);
      res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format',
      });
    }
    
    // Extract fields from req.body for better security
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Create update object with validated fields
    const updateData = {};
    
    // Add string validation
    if (name && typeof name === 'string') updateData.name = name;
    if (description && typeof description === 'string') updateData.description = description;
    if (category && typeof category === 'string') updateData.category = category;
    if (imageUrl && typeof imageUrl === 'string') updateData.imageUrl = imageUrl;
    
    // Add numerical validation
    if (price !== undefined) {
      const numPrice = Number(price);
      if (!isNaN(numPrice)) {
        updateData.price = numPrice;
      }
    }
    
    if (stock !== undefined) {
      const numStock = Number(stock);
      if (!isNaN(numStock)) {
        updateData.stock = numStock;
      }
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData }, // Use $set operator explicitly
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format',
      });
    }
    
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};