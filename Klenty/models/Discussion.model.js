const mongoose = require('mongoose')
const {Schema} = mongoose

const DiscussionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter title']
    },
    description: {
        type: String,
        required: [true, 'Please enter description']
    },
    comments: [
            {
                username: {
                    type: String,
                },
                comment: {
                    type: String,
                },
                replies: [{
                    username: {
                        type: String,
                    },
                    reply: {
                        type: String,
                    }
                }]
            }
        ]
})


const Discussion = mongoose.model("Discussion", DiscussionSchema);




module.exports = Discussion
