const express = require ('express')
const bodyParser = require ('body-parser') // for parser request
const cors = require ('cors') //  если клиент на другом домене дает воз можность отвечать
const morgan = require ('morgan') // логировать красивее сервер???
//  routers
const analiticsRoutes = require('./routes/analitics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
// end routers

const app = express()
app.use( morgan('dev')) // dev - type depend 
app.use( bodyParser.urlencoded({extended:true}) )
app.use( bodyParser.json() )
app.use( cors() )

// conect routers
    app.use('/api/auth', analiticsRoutes)
    app.use('/api/auth', authRoutes)
    app.use('/api/auth', categoryRoutes)
    app.use('/api/auth', orderRoutes)
    app.use('/api/auth', positionRoutes)

// end con routers


module.exports = app
