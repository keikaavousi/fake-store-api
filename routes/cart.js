const express = require('express')
const router = express.Router()
const cart = require('../controller/cart')

router.get('/',cart.getAllCarts)
router.get('/:id',cart.getSingleCart)
router.get('/user/:userid',cart.getCartsbyUserid)
router.get('/quantity/:id',cart.getQuantity)
router.post('/completed/:id',cart.editCartCompleted)

router.put('/printed/:id',cart.editCartPrinted)

router.post('/',cart.addCart)

router.put('/:id',cart.editCart)
router.patch('/:id',cart.editCart)
router.delete('/:id',cart.deleteCart)


router.post('/payment/:id',cart.payment)
module.exports = router
