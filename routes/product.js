const express = require('express')
const router = express.Router()
const product = require('../controller/product')

router.get('/',product.getAllProducts)
router.get('/:id',product.getProduct)
router.get('/category/:category',product.getProductsInCategory)
router.post('/',product.addProduct)
router.put('/:id',product.editProduct)
router.patch('/:id',product.editProduct)
router.delete('/:id',product.deleteProduct)

module.exports = router