const express = require("express")

const mongoose = require("mongoose")

const Product = require("../models/product")

const routes = express.Router()

routes.get("/", (req,res,next)=>{
    res.status(200).json({
        message:"Handling GET request"
    })
})

routes.post("/", (req,res,next)=>{
    
    const products = new Product({
        // _id:new mongoose.Type.ObjectId(),
        name:req.body.name,
        price:req.body.price
    })
    products.save()
     .then(result=>{
        // console.log(result)
        res.status(201).json({
            message:"Handling POST request",
            productCreated : result
        })
     })
     .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
     })
    
})


routes.get("/:productId",(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
     .then(result=>{
        // console.log("from data base", result)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message:"No product found"
            })
        }
     })
     .catch(err=>{
         res.status(500).json({error:err})
         console.log(err)
     })
})

routes.patch("/:productId",(req,res,next)=>{
    const id = req.params.productId;
    if(id === '1234'){
        res.status(200).json({
            message:"updated product"
        })
    }else{
        res.status(200).json({
            message:"failed to update a product"
        })
    }
})

routes.delete("/:productId",(req,res,next)=>{
    const id = req.params.productId;
    if(id === '1234'){
        res.status(200).json({
            message:"deleted product"
        })
    }else{
        res.status(200).json({
            message:"failed to delete a product"
        })
    }
})

module.exports = routes