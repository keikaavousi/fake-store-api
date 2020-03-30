const express = require('express')
const router = express.Router()
const home = require('../controller/home')

router.get('/',home.IndexPage)

module.exports = router