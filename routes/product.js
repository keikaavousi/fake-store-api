const express = require('express')
const router = express.Router()
const product = require('../controller/product')
const token = require('../controller/token')



router.get('/',product.getAllProducts)
router.get('/:id',product.getProduct)
router.get('/slug/:slug',product.getProductByTitle)
router.get('/category/:category',product.getProductsInCategory)


router.post('/',token.ensureToken, product.addProduct)
router.put('/:id',token.ensureToken, product.editProduct)
router.put('/changePrice/:id',token.ensureToken, product.editProductPrice)
router.put('/changeQuantity/:id',token.ensureToken, product.editProductQuantity)
router.patch('/:id',token.ensureToken, product.editProduct)
router.delete('/:id',token.ensureToken, product.deleteProduct)

module.exports = router