const express = require('express')
const router = express.Router()
const ordering = require('../controller/ordering')
const token = require('../controller/token')



// ordering

router.get('/',ordering.getOrdering)

router.put('/',token.ensureToken,ordering.updateOrdering)

router.put('/disable/:id',token.ensureToken,ordering.disableOrdering)
module.exports = router