const express = require('express');

const productController = require('../controllers/Product'); 

const router = express.Router();

/**
 * CRUD
 * C: CREATE
 * R: READ
 * U: UPDATE
 * D: DELETE
 */

/**
 * 
 * /product/product
*/ 
router.post('/product', productController.createProduct);

/**
 * 
 * /product/products
*/ 
router.get('/products', productController.readProducts);

/**
 * 
 * /product/:productId
*/ 
router.get('/:productId', productController.readProduct);

/**
 * 
 * /product/:productId
*/
router.patch('/:productId', productController.updateProduct);

/**
 * 
 * /product/:productId
*/
router.delete('/:productId', productController.deleteProduct);



module.exports = router;