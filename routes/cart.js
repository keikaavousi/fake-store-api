const express = require('express')
const router = express.Router()
const cart = require('../controller/cart')

router.get('/',cart.getAllCarts)
//router.get('/:id',cart.getSingleCart)
router.get('/user/:userid',cart.getCartsbyUserid)
router.get('/quantity/:id',cart.getQuantity)


router.post('/',cart.addCart)

router.put('/:id',cart.editCart)
router.patch('/:id',cart.editCart)
router.delete('/:id',cart.deleteCart)

module.exports = router
