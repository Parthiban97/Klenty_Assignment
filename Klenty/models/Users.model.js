const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password: {
        type: String,
        required: [true, 'Please enter Password']
    },
    
})

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model("User", UserSchema);




module.exports = User
