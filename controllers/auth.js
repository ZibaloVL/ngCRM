const bcrypt = require( 'bcryptjs')  // for make parol shifr
const jwt = require( 'jsonwebtoken' ) // for make token  autorised user 
const User = require( '../models/User')
const keys = require( '../config/keys')

module.exports.login = async function (req, res) {
    try {
        const candidate = await User.findOne ( { email: req.body.email } )
        if ( candidate ) {
            const passwordResalt =  bcrypt.compareSync ( req.body.password, candidate.password )
            if ( passwordResalt ) {
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                },
                keys.jwt, // secret keys for jwt
                {
                    expiresIn: 60*60 // time live token
                })
                res.status(201).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(401).json({
                    message: ' ошибочный пароль !!!!'
                })
            }
        } else {
            res.status(404).json({
                message: 'такого пользователя не существует'
            }) 
        }
    } catch (error) {
        console.log( 'ошибка входа пользователя', error )
    }
}


module.exports.register = async function (req, res) {
    try {
        const candidate = await User.findOne( { email: req.body.email})
        if ( candidate ) {
            res.status(409).json( { message: 'такой адресс уже существует'} )
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

