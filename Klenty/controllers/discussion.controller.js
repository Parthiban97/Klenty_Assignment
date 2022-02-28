const mongoose = require('mongoose')
const Discussion = require('../models/Discussion.model')

exports.getOneDiscussion = async (req, res, next) => {
    try {
        const discussion = await Discussion.findById(req.params.id)
        console.log(req.params.id)
        res.status(200).send({message: discussion})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }

}

exports.getAllDiscussion = async (req, res, next) => {
    try {
        const discussions = await Discussion.find()
        res.status(200).send({message: discussions})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }
}

exports.createDiscussion = async (req, res, next) => {
    try {
        const discussion = await Discussion.create(req.body)
        res.status(201).send({message: discussion})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }
}

exports.doComment = async (req, res, next) => {
    try {
        const discussion = await Discussion.findById(req.params.id)
        var comment = {username: req.body.username, comment: req.body.comment}
        discussion.comments.push(comment)
        await discussion.save()
        res.status(201).send({message: discussion})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }
}

exports.doReply = async (req, res, next) => {
    try {
        var reply = { username: req.body.username, reply: req.body.reply}
        const discussion = await Discussion.updateOne({"_id" : req.params.id, "comments._id": req.body.comment_id}, {
            $push: {
                "comments.$.replies" : reply
            }
        })
        
        // discussion.comments.push(comment)
        // await discussion.save()
        res.status(201).send({message: discussion})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }
}