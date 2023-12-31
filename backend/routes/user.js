const User = require('../models/User');
const { verifyAndAuth, verifyTokenAndAdmin } = require('../verifyToken');

const router = require('express').Router();

router.put('/:id', verifyAndAuth,async (req,res)=>{
    if(req.body.password)
    {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }

    try
    {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        }, {new:true});
        return res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json(err);
    }
})

//Delete User
router.delete('/:id',verifyAndAuth, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
})

//Get a user
router.get('/find/:id', verifyAndAuth, async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        return res.status(200).json(others);
    } catch (error) {
        return res.status(500).json(error)
    }
})

//Get all user
router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
   try {
    const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
    return res.status(200).json(users);

   } catch (error) {
    return res.status(500).json(error)
   }
})

//Get Users Stats
router.get('/stats',verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    try {
        const data = await User.aggregate([
            {$match : {createdAt : {$gte : lastYear }}},
            {
                $project : {
                    month : {$month : "$createdAt"},
                },
            },
            {
                $group : {
                    _id : "$month",
                    total : {$sum : 1},
                },
            }
        ])
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;