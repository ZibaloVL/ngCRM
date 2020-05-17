const User = require( '../models/User')


module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
}


module.exports.register = function (req, res) {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        user.save()
    } catch (error) {
        console.log ( 'error making user', error )
    }
}

