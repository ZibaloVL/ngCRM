const bcrypt = require( 'bcryptjs')
const User = require( '../models/User')


module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}


module.exports.register = async function (req, res) {
    try {
        const candidate = await User.findOne( { email: req.body.email})
        if ( candidate ) {
            res.status(409).json( { message: "такой адресс уже существует"} )
        } else {
            const solt = bcrypt.genSaltSync(10)
            const user = new User({
                email: req.body.email,
                password: bcrypt.hashSync( req.body.password, solt )      
            })
            await user.save()
            res.status(201).json( user )
        }
    } catch (error) {
        console.log ( 'error making user', error )
    }
}

