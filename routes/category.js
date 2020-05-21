const express = require('express')
const router = express.Router()
const password = require('passport')

const controller = require('../controllers/category')
const upload = require('../middleware/upload')

router.get( '/', password.authenticate( 'jwt',  {session: false }), controller.getAll )

router.get( '/:id', password.authenticate( 'jwt',  {session: false }), controller.getById )

router.delete( '/:id', password.authenticate( 'jwt',  {session: false }), controller.remove )

router.post( '/', password.authenticate( 'jwt',  {session: false }), upload.single( 'image' ), controller.create )

router.patch( '/:id', password.authenticate( 'jwt',  {session: false }), upload.single( 'img' ), controller.update )

module.exports = router