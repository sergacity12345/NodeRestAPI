const express = require('express')
const router = express.Router()

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"Orders were fetched"
    });
})

router.post("/",(req,res,next)=>{
    const orders ={
        productId : req.body.productId,
        qty: req.body.qty
    };
    res.status(201).json({
        message:"Orders were created",
        orders: orders
    });
})

router.get("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    if(id === '1234'){
        res.status(200).json({
            message:"Orders details",
            id:`order id is ${id}`
        });
    }else{
        res.status(201).json({
            message:"Order not found",
            id:`order ${id}`
        }); 
    }
})

router.delete("/:orderId",(req,res,next)=>{
    const id = req.params.orderId;
    if(id === '1234'){
        res.status(200 ).json({
            message:"Order deleted",
            id:`order id is ${id}`
        });
    }else{
        res.status(201).json({
            message:"Order not found",
            id:`order ${id}`
        }); 
    }
})

module.exports = router;