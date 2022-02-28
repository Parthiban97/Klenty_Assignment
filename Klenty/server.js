const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const users_route = require('./routes/users')
const auth_route = require('./routes/auth')
const discussion_route = require('./routes/discussion')
const logger = require('./middlewares/logger.middleware')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

require('./middlewares/authentication.middleware')

const app = express()

app.use(express.json())
app.use(cors())



app.use(logger)
app.use(express.urlencoded({extended: false}))

//connect to db
connectDB()

app.use('/api/v1/', users_route)
app.use('/api/v1/', auth_route)
app.use('/api/v1/', discussion_route)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is up in ", port)
})