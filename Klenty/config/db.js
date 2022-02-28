const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })
        console.log("MongoDB connected: ", conn.connection.host)
    }
    catch(err) {
        console.log("MongoDB Error ", err.message )
        throw new Error(err.message)
    }
}

module.exports = connectDB