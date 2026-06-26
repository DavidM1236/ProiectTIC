const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// READ (GET /api/products)
router.get('/', getAllProducts);

// CREATE (POST /api/products)
router.post('/', createProduct);

// UPDATE (PUT /api/products/:id)
router.put('/:id', updateProduct);

// DELETE (DELETE /api/products/:id)
router.delete('/:id', deleteProduct);

module.exports = router;