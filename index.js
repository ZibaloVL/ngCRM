const app = require('./app')
const port = process.env.PORT || 5000

/*
app.get ('/', ( req, res ) => {
    res.status(200).json({ message: 'worc'})
} )
*/
app.listen ( 5000, 
    () => {console.log(`server start in port  ${port}`)
})

