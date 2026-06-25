const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

// Ruta principala este /api/products (configurata in server.js)
router.get('/', getAllProducts);

module.exports = router;