const express = require('express')
const router = express.Router()
const shipping = require('../controller/shipping')

router.get('/',shipping.getAllShippings)
router.get('/:id',shipping.getShipping)
router.get('/check/:title',shipping.getShippingtByTitle)

router.post('/',shipping.addShipping)

router.put('/:id',shipping.editShipping)
router.put('/title/:id',shipping.editTitle)
router.put('/price/:id',shipping.editPrice)

router.delete('/:id',shipping.deleteShipping)

module.exports = router