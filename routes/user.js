const express = require('express')
const router = express.Router()
const user = require('../controller/user')
const token = require('../controller/token')



// router.get('/',user.getUsers)
router.get('/:id',token.ensureToken,user.getUser)
router.post('/',token.ensureToken,user.addUser)
router.put('/:id',token.ensureToken,user.editUser)
//router.delete('/:id',token.ensureToken,user.deleteUser)


module.exports = router
