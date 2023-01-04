const express = require("express")

const routes = express.Router()

routes.get("/", (req,res,next)=>{
    res.status(200).json({
        message:"Handling GET request"
    })
})

routes.post("/", (req,res,next)=>{
    const product ={
        name : req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:"Handling POST request",
        product : product
    })
})


routes.get("/:productId",(req,res,next)=>{
    const id = req.params.productId;
    if(id === '1234'){
        res.status(200).json({
            message:"getting individual product"
        })
    }else{
        res.status(200).json({
            message:"failed to get individual product"
        })
    }
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