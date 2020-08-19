const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 5000
require('./model/user')
require('./model/shopkeeper')
mongoose.connect('mongodb://localhost:27017/node-task',{ useNewUrlParser: true },(err)=>{
    if (err){
        console.log(err)
    }
    console.log('connected to Mongodb')
})

app.use(bodyParser.json())
require('./route/user')(app)
require('./route/shopkeeper')(app)
app.listen(port,()=>{
    console.log('app running 5000')
})
