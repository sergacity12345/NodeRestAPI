const express = require('express')
const router = express.Router()
const Product = require("../models/product")
const mongoose = require('mongoose')
const Order = require("../models/orders")

router.get("/",(req,res,next)=>{
    Order.find()
     .select("product quantity _id")
     .populate('product','name price')
     .then(result=>{
        res.status(200).json({
            count:result.length,
            orders:result.map(curr=>{
                return {
                    _id:curr._id,
                    productId:curr.product,
                    quantity:curr.quantity,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/order/"+ curr._id
                    }
                }
            })
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
})

router.post("/",(req,res,next)=>{
    const id = req.body.productId
    Product.findById(id)
     .then(result=>{
        if(result){
            const orders = new Order({
                quantity : req.body.quantity,
                product: req.body.productId
            })
            return orders.save()
        }
     })
     .then(result=>{
        res.status(201).json({
            message:'order created',
            order:{
                productId: result.product,
                productQTY: result.quantity,
                orderId:result._id
            },
            request:{
                type:"GET",
                url:"http://localhost:3000/order/" + result._id
            }
        })
     })
      .catch(err=>{
        res.status(500).json({
            error:err
        })
      })
    
})

router.get("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    console.log(id)
    Order.findById(id)
     .populate('product','name price')
     .then(result=>{
        if(!result){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        res.status(200).json({
            orderId:result._id,
            productId:result.product,
            quantity:result.quantity,
            request:{
                type:"GET",
                url:"http://localhost:3000/order"
            }
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
})

router.delete("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    Order.remove({_id:id})
     .then(result=>{
        res.status(200).json({
            message:"Order deleted",
            order: result,
            request:{
                type:'GET',
                url:"http://localhost:3000/order"
            }
        })
     })
     .catch(err=>{
        res.status(500).json({
            error:err
        })
     })
})

module.exports = router;