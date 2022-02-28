const express = require('express')
const users = require('../controllers/users.controller')
const router = express.Router()

router.post('/signup', users.createUser)

router.get('/user/:id', users.getUser)

module.exports = router