const express = require('express')
const router = express.Router()
const shipping = require('../controller/shipping')
const token = require('../controller/token')


router.get('/',shipping.getAllShippings)
router.get('/:id',shipping.getShipping)
router.get('/check/:title',shipping.getShippingtByTitle)

router.post('/',token.ensureToken,shipping.addShipping)

router.put('/:id',token.ensureToken,shipping.editShipping)
router.put('/title/:id',token.ensureToken,shipping.editTitle)
router.put('/price/:id',token.ensureToken,shipping.editPrice)

router.delete('/:id',token.ensureToken,shipping.deleteShipping)

module.exports = router