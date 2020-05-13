const express = require ('express')

//  routers
const authRoutes = require('./routes/auth')
// end routers
const app = express()

// conect routers
    app.use('/api/auth', authRoutes)
// end con routers


module.exports = app
