const express = require("express")

const mongoose = require("mongoose")

const Product = require("../models/product")

const routes = express.Router()


const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null,'uploads/')
    },
    filename:function(req, file, cb){
        cb(null,  file.originalname  )
    }
})

const upload = multer({storage:storage})

routes.get("/", (req,res,next)=>{
    Product.find()
     .select("name price  _id")
     .then(result=>{
        if(result){
            const response = {
                count: result.length,
                products:result.map(curr=>{
                    return {
                        names: curr.name,
                        price:curr.price,
                        _id: curr._id,
                        request:{
                            type:"GET",
                            url:`http://localhost:3000/product/${curr._id}`
                        }
                    }
                })
            }
            res.status(200).json({response})
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

routes.post("/", upload.single('product-image'),
 (req,res, next)=>{
    console.log(req.file)
    const products = new Product({
        name:req.body.name,
        price:req.body.price
    })
    products.save()
     .then(result=>{
        // console.log(result)
        res.status(201).json({
            message:"Created Product",
            productCreated : {
                name:result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type:"GET",
                    url:`http://localhost:3000/product/${result._id}`
                }
            }
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
         if(result){
            console.log("from data base", result)
            res.status(200).json({
                name:`Product name ${result.name}`,
                price:`Product price ${result.price}`,
                request:{
                    type:"GET",
                    url:`http://localhost:3000/product/`
                }

            })
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
    const name = req.body.name
    const price = req.body.price
    Product.updateOne({_id:id},{name:name, price:price})
     .then(result=>{
        res.status(201).json({
            message:"Product updated",
            name:name,
            price:price,
            request:{
                type:"GET",
                url:`http://localhost:3000/product/${id}`
            }

        })
     })
     .catch(err=>{
        res.status(500).json({error:err})
     })
})

routes.delete("/:productId",(req,res,next)=>{
    const id = req.params.productId;
    Product.deleteOne({_id:id})
     .then(result=>{
        res.status(200).json({
            message:"Product deleted",
            request:{
                type:"GET",
                url:`http://localhost:3000/product/`
            }
        })
     })
     .catch(err=>{
        res.status(500).json({error:err})
     })
})

module.exports = routes