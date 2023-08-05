const router = require('express').Router();
const stripe = require('stripe')("sk_test_51NNeCNSHhpOG7KZDZ5oTHAlHUqSzx4GzJRpCnkwkG67oABzrmFpIxdOXNqIqeTeB4vfcLvy4TTDAylEYKfyf580D00Yr5o7GuA")

router.post('/payment',(req,res)=>{
    console.log(req.headers)
    stripe.charges.create({
        source : req.body.tokenId,
        amount : req.body.amount,
        currency : "usd",
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr)
        {
            console.log("ggd")
            return res.status(500).json(stripeErr)
        }
        else
        {
            return res.status(200).json(stripeRes);
        }
    })
})

module.exports = router;