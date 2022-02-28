const passport = require('passport')
const User = require('../models/Users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.authenticateUser = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err) {
            return next(err);
        }

        if(!user) {
            return res.status(500).json(info.message)
        }
        
        const payload = {
            username: user.email,
        }

        const option = {
            subject: `${user.id}`,
            expiresIn: '24h'
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, option)

        res.send({loggedin: true, token: token, username: user.username})

    })(req, res, next)
}