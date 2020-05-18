const express = require('express')
const router = express.Router()
const discount = require('../controller/discount')

router.get('/',discount.getAllDiscount)
router.get('/:id',discount.getDiscount)
router.get('/check/:title',discount.getDiscountByTitle)

router.post('/',discount.addDiscount)

// router.put('/:id',discount.editDiscount)
router.put('/enable/:id',discount.editEnabled)
router.put('/count/:id',discount.editCount)

router.delete('/:id',discount.deleteDiscount)

module.exports = router