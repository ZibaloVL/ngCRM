const express = require('express')
const router = express.Router()

const controller = require ('../controllers/analitics')

router.get( '/overview', controller.overview )

router.get( '/analytics', controller.analitics )

module.exports = router