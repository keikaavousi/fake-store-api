const express = require('express')
const router = express.Router()
const payment = require('../controller/payment')



router.post('/pay/:id',payment.paymentRequest)
router.get('/verification/:cart/:token',payment.paymentVerification)
router.get('/unverified/:id',payment.unverifiedTransactions)
router.get('/refreshAuthority/:expire/:token',payment.refreshAuthurity)

module.exports = router