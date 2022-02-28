const User = require('../models/Users.model')

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        
        res.status(201).send({message: user})
    }
    catch(err) {
        res.status(400).send(err.message)
    }

}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(201).send({message: user})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }
}

