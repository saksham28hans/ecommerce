const Cart = require('../models/Cart');
const { verifyAndAuth, verifyTokenAndAdmin } = require('../verifyToken');

const router = require('express').Router();

router.post('/',verifyAndAuth,async(req,res)=>{
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
})

//Update Product
router.put('/:id', verifyAndAuth,async (req,res)=>{
    try
    {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set : req.body
        }, {new:true});
        return res.status(200).json(updatedCart);
    }catch(err){
        return res.status(500).json(err);
    }
})

//Delete Product
router.delete('/:id',verifyAndAuth, async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("Cart has been deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
})

//Get a Product
router.get('/find/:userId', async(req,res)=>{
    try {
        const cart = await Cart.findOne({userId : req.params.id});
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error)
    }
})

// //Get all carts

router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    try {
        const carts = await Cart.find();
        return res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router;