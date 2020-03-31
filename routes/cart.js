const express = require('express')
const router = express.Router()
const cart = require('../controller/cart')

router.get('/',cart.getAllCart)
router.get('/:id',cart.getSingleCart)

router.post('/',cart.addCart)
//router.post('/:id',cart.addtoCart)

router.put('/:id',cart.editCart)
router.patch('/:id',cart.editCart)
router.delete('/:id',cart.deleteCart)

module.exports = router
