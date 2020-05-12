const express = require('express')
const router = express.Router()
const media = require('../controller/media')



// media

router.post('/',media.addMedia)

router.get('/',media.getMedia)

router.get('/:id',media.getSingleMedia)

router.put('/:id',media.editMedia)

router.delete('/:id',media.deleteMedia)

module.exports = router