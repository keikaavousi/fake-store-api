const express = require('express')
const router = express.Router()
const ordering = require('../controller/ordering')



// ordering

router.get('/',ordering.getOrdering)

router.put('/',ordering.updateOrdering)

module.exports = router