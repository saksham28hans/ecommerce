const Order = require('../models/Order');
const { verifyAndAuth, verifyTokenAndAdmin } = require('../verifyToken');

const router = require('express').Router();

router.post('/',verifyAndAuth,async(req,res)=>{
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
})

//Update Order
router.put('/:id', verifyTokenAndAdmin,async (req,res)=>{
    try
    {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        }, {new:true});
        return res.status(200).json(updatedOrder);
    }catch(err){
        return res.status(500).json(err);
    }
})

//Delete Order
router.delete('/:id',verifyTokenAndAdmin, async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
})

//Get Order
router.get('/find/:userId', verifyAndAuth, async(req,res)=>{
    try {
        const orders = await Order.find({userId : req.params.userId});
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Get all orders
router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Get Monthly Income

router.get('/income',verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth()-1));

    try {
        const income = await Order.aggregate([
            { 
                $match : { createdAt: {$gte : previousMonth}}
            },
            {
                $project : {
                    month : {$month : "$createdAt"},
                    sales : "$amount",
                }
            },
            {
                $group : {
                    _id : "$month",
                    total : {$sum : "$sales"}
                }
            }
        ]);
        return res.status(200).json(income);
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router;