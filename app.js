// import express from 'express'
const express = require("express")

const bodyParser = require("body-parser")

const mongooseDb = require('mongoose')

const morgan = require('morgan')

const app = express()

const userRoute = require('./api/routes/user')

const productRoutes = require ("./api/routes/product")
const orderRoutes = require("./api/routes/orders")


mongooseDb.set('strictQuery','false')
mongooseDb.connect("mongodb://localhost:27017/NodeApi"
)

app.use(morgan('dev'))
app.use('/uploads',express.static("uploads"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE")
        return res.status(200).json({})
    }
    next()
})

app.use("/product", productRoutes)
app.use("/order",orderRoutes)
app.use('/user',userRoute)

//ERROR HANDLING
app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message :error.message
        }
    })
})

module.exports = app