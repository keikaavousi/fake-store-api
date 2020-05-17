const express = require('express')
const router = express.Router()
const ordering = require('../controller/ordering')



// ordering

router.get('/',ordering.getOrdering)

router.put('/',ordering.updateOrdering)

router.put('/disable/:id',ordering.disableOrdering)
module.exports = router