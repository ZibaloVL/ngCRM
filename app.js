const express = require ('express')

//  routers
const analiticsRoutes = require('./routes/analitics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

// end routers
const app = express()

// conect routers
    app.use('/api/auth', analiticsRoutes)
    app.use('/api/auth', authRoutes)
    app.use('/api/auth', categoryRoutes)
    app.use('/api/auth', orderRoutes)
    app.use('/api/auth', positionRoutes)

// end con routers


module.exports = app
