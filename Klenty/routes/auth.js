const express = require('express')
const authentication = require('../controllers/authentication')


const router = express.Router()

router.post('/login', authentication.authenticateUser)

module.exports = router