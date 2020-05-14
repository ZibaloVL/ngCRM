const express = require('express')
const router = express.Router()

const controller = require ('../controllers/category')

router.get( '/', controller.getAll )

router.get( '/:id', controller.getById )

outer.delete( '/:id', controller.remove )

outer.post( '/', controller.create )

outer.patch( '/:id', controller.update )

module.exports = router