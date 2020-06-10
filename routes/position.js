const express = require('express')
const router = express.Router()
const password = require('passport')

const controller = require ('../controllers/position')

router.get( '/:categoryId',password.authenticate( 'jwt',  {session: false }), controller.getByCategoryId )

router.post( '/',password.authenticate( 'jwt',  {session: false }), controller.create )

router.patch( '/:id',password.authenticate( 'jwt',  {session: false }), controller.update)

router.delete( '/:id',password.authenticate( 'jwt',  {session: false }), controller.remove)

module.exports = router