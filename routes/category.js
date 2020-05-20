const express = require('express')
const router = express.Router()
const password = require('passport')

const controller = require('../controllers/category')
const upload = require('../middleware/upload')

router.get( '/', password.authenticate( 'jwt',  {session: false }), controller.getAll )

router.get( '/:id', controller.getById )

router.delete( '/:id', controller.remove )

router.post( '/', password.authenticate( 'jwt',  {session: false }), upload.single( 'image' ), controller.create )

router.patch( '/:id', upload.single( 'img' ), controller.update )

module.exports = router