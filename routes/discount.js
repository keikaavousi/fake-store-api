const express = require('express')
const router = express.Router()
const discount = require('../controller/discount')
const token = require('../controller/token')


router.get('/',token.ensureToken,discount.getAllDiscount)
router.get('/:id',token.ensureToken,discount.getDiscount)
router.get('/check/:title',discount.getDiscountByTitle)

router.post('/',token.ensureToken,discount.addDiscount)

// router.put('/:id',discount.editDiscount)
router.put('/enable/:id',token.ensureToken,discount.editEnabled)
router.put('/count/:id',token.ensureToken,discount.editCount)

router.delete('/:id',token.ensureToken,discount.deleteDiscount)

module.exports = router