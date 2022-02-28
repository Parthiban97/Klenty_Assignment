const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/Users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

passport.use(new LocalStrategy( {usernameField: 'email', passwordField: 'password'}, 
                function(username, password, next) {
                    User.findOne({email: username}, 'email username password', function(err, result) {
                        if(err) {
                            console.log('LocalStrategy error ', err)
                            return next(err)
                        }
                        if(!result) {
                            return next(null, false, {message: 'Incorrect username/password'})
                        }
                        console.log('LocalStrategy result ', result)
                        bcrypt.compare(password, result.password, (err, re) => {
                            if(!re) {
                                return next(null, false, {message: 'Incorrect username/password'})
                            }
                            return next(null, result)
                        })
                })
            }
))

passport.use(new JwtStrategy( options, 
                function(jwtPayload, next) {
                    console.log(jwtPayload)
                    User.findOne({email: jwtPayload.username}, 'email username password', function(err, result) {
                        if(err) {
                            console.log('JwtStrategy error ', err)
                            return next(err, false)
                        }
                        if(!result) {
                            return next(null, false, {message: 'Incorrect username/password'})
                        }
                        console.log('JwtStrategy result ', result)
                        return next(null, result)
                })
            }
))
