const express = require('express')
const router = express.Router()
const media = require('../controller/media')
const token = require('../controller/token')



// media

router.post('/',token.ensureToken,media.addMedia)

router.get('/',media.getMedia)

router.get('/:id',media.getSingleMedia)

router.put('/:id',token.ensureToken,media.editMedia)

router.delete('/:id',token.ensureToken,media.deleteMedia)

module.exports = router