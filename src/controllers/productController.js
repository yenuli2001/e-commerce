const Product = require('../models/product');

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
    if (name) productData.name = name;
    if (description) productData.description = description;
    if (price !== undefined) productData.price = price;
    if (category) productData.category = category;
    if (imageUrl) productData.imageUrl = imageUrl;
    if (stock !== undefined) productData.stock = stock;
    
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
    // Extract fields from req.body for better security
    const { name, description, price, category, imageUrl, stock } = req.body;
    
    // Create update object with validated fields
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category) updateData.category = category;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (stock !== undefined) updateData.stock = stock;
    
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