const express = require('express')
const router = express.Router()
const product = require('../controller/product')

router.get('/',product.getAllProducts)
router.get('/:id',product.getProduct)
router.post('/',product.addProduct)
router.put('/',product.editProduct)
router.delete('/',product.deleteProduct)

module.exports = router