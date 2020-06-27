const express = require('express')
const router = express.Router()
const password = require('passport')


const controller = require ('../controllers/analitics')

router.get( '/overview', password.authenticate( 'jwt',  {session: false }), controller.overview )

router.get( '/analytics', password.authenticate( 'jwt',  {session: false }), controller.analitics )

module.exports = router