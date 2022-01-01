const express = require("express")
const app = express()
const logger = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const port = process.env.PORT 
const mongo_url = process.env.MONGO_URL 
const UserRouter = require('./routes/User')
const MailRouter = require('./routes/Mail')
const cors = require('cors')
mongoose.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Connected to DB")
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/api',UserRouter)
app.use('/api',MailRouter)
app.listen(port,() => {
  console.log(`Server listening on port ${port}`)
})