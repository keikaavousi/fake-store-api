const express = require('express')
const router = express.Router()
const auth = require('../controller/auth')
const token = require('../controller/token')


router.post('/login',auth.login)
router.post('/changepassword',token.ensureToken,auth.changePassword)

module.exports = router