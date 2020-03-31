const express = require('express')
const router = express.Router()
const user = require('../controller/user')

router.get('/',user.getAllUser)
router.get('/:id',user.getUser)
router.post('/',user.addUser)
router.put('/',user.editUser)
router.patch('/',user.editUser)
router.delete('/',user.deleteUser)

module.exports = router