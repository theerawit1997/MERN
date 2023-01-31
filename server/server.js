const express = require("express")
const morgan = require("morgan")
const core = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')


const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() => console.log("!!!connect done!!!"))
    .catch((err) => console.log(err))

//middleware
app.use(express.json())
app.use(core())
app.use(morgan("dev"))

//route 
app.use('/api', blogRoute)
app.use('/api', authRoute)


const port = process.env.PORT || 8080 //if not fix port that use 8080
app.listen(port, () => console.log(`start server in port ${port}`))