const express = require('express');

const productController = require('../controllers/Product'); 

const router = express.Router();

/**
 * 
 * /product/products
*/ 
router.get('/products', productController.getProducts);


/**
 * 
 * /product/:productId
*/ 
router.get('/:productId', productController.getProduct);


/**
 * 
 * /product/product
*/ 
router.post('/product', productController.createProduct);



module.exports = router;