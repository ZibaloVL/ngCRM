const express = require ('express')
const bodyParser = require ('body-parser') // for parser request
const cors = require ('cors') //  если клиент на другом домене дает воз можность отвечать
const morgan = require ('morgan') // логировать красивее сервер???
const mongoose = require ('mongoose')
const keys = require ('./config/keys')
//  routers
const analiticsRoutes = require('./routes/analitics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
// end routers

//connect db
mongoose.connect( keys.mongoURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then( ()=> console.log( 'db connect' ) )
    .catch( error => console.log( 'error conecn db', error ) )
//end conect db








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


// ZibaloVL - user mongo DB
// NqOOIoxRLBayPoit - password
//for app:
// mongodb+srv://ZibaloVL:<password>@cluster0-nztcc.gcp.mongodb.net/test?retryWrites=true&w=majority
// for compas:
//mongodb+srv://ZibaloVL:NqOOIoxRLBayPoit@cluster0-nztcc.gcp.mongodb.net/test?retryWrites=true&w=majority