const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;