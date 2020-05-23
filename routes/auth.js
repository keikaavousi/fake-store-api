const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const token = require('../controllers/token')

router.post('/login',auth.login)
router.post('/changepassword',token.ensureToken,auth.changePassword)

module.exports = router