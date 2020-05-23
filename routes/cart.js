const express = require('express')
const router = express.Router()
const cart = require('../controller/cart')
const token = require('../controller/token')


router.get('/',token.ensureToken,cart.getAllCarts)
router.get('/:id',cart.getSingleCart)
//router.get('/quantity/:id',cart.getQuantity)
router.post('/completed/:id',token.ensureToken,cart.editCartCompleted)

router.put('/printed/:id',token.ensureToken,cart.editCartPrinted)

router.post('/',token.ensureToken,cart.addCart)

router.put('/:id',token.ensureToken,cart.editCart)
router.patch('/:id',token.ensureToken,cart.editCart)
router.delete('/:id',token.ensureToken,cart.deleteCart)



module.exports = router
