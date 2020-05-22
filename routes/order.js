const express = require('express')
const router = express.Router()
const password = require('passport')

const controller = require ('../controllers/order')

router.get( '/', password.authenticate( 'jwt',  {session: false }), controller.getAll )

router.post( '/', password.authenticate( 'jwt',  {session: false }), controller.create )

module.exports = router