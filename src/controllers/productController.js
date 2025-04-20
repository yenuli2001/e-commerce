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
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    // Validate ID format
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
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    // Extract and validate required fields
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Create a sanitized object with validated data
    const productData = {};
    if (name) productData.name = name;
    if (description) productData.description = description;
    
    // Validate numerical fields
    if (price !== undefined) {
      const parsedPrice = Number(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({
          success: false,
          error: 'Price must be a valid number',
        });
      }
      productData.price = parsedPrice;
    }
    
    if (stock !== undefined) {
      const parsedStock = Number(stock);
      if (isNaN(parsedStock)) {
        return res.status(400).json({
          success: false,
          error: 'Stock must be a valid number',
        });
      }
      productData.stock = parsedStock;
    }
    
    if (category) productData.category = category;
    if (imageUrl) productData.imageUrl = imageUrl;
    
    const product = await Product.create(productData);
    
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
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format',
      });
    }
    
    // Extract and validate fields
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Create a sanitized update object
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    
    // Validate numerical fields
    if (price !== undefined) {
      const parsedPrice = Number(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({
          success: false,
          error: 'Price must be a valid number',
        });
      }
      updateData.price = parsedPrice;
    }
    
    if (stock !== undefined) {
      const parsedStock = Number(stock);
      if (isNaN(parsedStock)) {
        return res.status(400).json({
          success: false,
          error: 'Stock must be a valid number',
        });
      }
      updateData.stock = parsedStock;
    }
    
    if (category) updateData.category = category;
    if (imageUrl) updateData.imageUrl = imageUrl;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
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
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    // Validate ID format
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
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};